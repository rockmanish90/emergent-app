"""
Admin Panel API Tests
Tests for: Admin Auth, Contacts, Applications, Blog CMS, File Manager, Dashboard Stats
"""
import pytest
import requests
import os
import uuid

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

# Admin credentials from backend/.env
ADMIN_EMAIL = "rushabhventureshq@gmail.com"
ADMIN_PASSWORD = "rushabhventureshq"


class TestAdminAuth:
    """Admin authentication endpoint tests"""
    
    def test_admin_login_success(self):
        """Test successful admin login with correct credentials"""
        response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "email": ADMIN_EMAIL,
            "password": ADMIN_PASSWORD
        })
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        data = response.json()
        assert "token" in data, "Response should contain token"
        assert "email" in data, "Response should contain email"
        assert "expires_at" in data, "Response should contain expires_at"
        assert data["email"] == ADMIN_EMAIL
        assert len(data["token"]) > 0
    
    def test_admin_login_invalid_email(self):
        """Test login with invalid email"""
        response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "email": "wrong@example.com",
            "password": ADMIN_PASSWORD
        })
        assert response.status_code == 401, f"Expected 401, got {response.status_code}"
        
        data = response.json()
        assert "detail" in data
        assert data["detail"] == "Invalid credentials"
    
    def test_admin_login_invalid_password(self):
        """Test login with invalid password"""
        response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "email": ADMIN_EMAIL,
            "password": "wrongpassword"
        })
        assert response.status_code == 401, f"Expected 401, got {response.status_code}"
    
    def test_admin_verify_valid_token(self):
        """Test token verification with valid token"""
        # First login to get token
        login_response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "email": ADMIN_EMAIL,
            "password": ADMIN_PASSWORD
        })
        token = login_response.json()["token"]
        
        # Verify token
        response = requests.get(f"{BASE_URL}/api/admin/verify", headers={
            "Authorization": f"Bearer {token}"
        })
        assert response.status_code == 200
        
        data = response.json()
        assert data["valid"] == True
        assert data["email"] == ADMIN_EMAIL
    
    def test_admin_verify_invalid_token(self):
        """Test token verification with invalid token"""
        response = requests.get(f"{BASE_URL}/api/admin/verify", headers={
            "Authorization": "Bearer invalid-token-here"
        })
        assert response.status_code == 401
    
    def test_admin_verify_no_token(self):
        """Test token verification without token"""
        response = requests.get(f"{BASE_URL}/api/admin/verify")
        assert response.status_code in [401, 403]


@pytest.fixture(scope="class")
def auth_token():
    """Get authentication token for admin tests"""
    response = requests.post(f"{BASE_URL}/api/admin/login", json={
        "email": ADMIN_EMAIL,
        "password": ADMIN_PASSWORD
    })
    if response.status_code == 200:
        return response.json()["token"]
    pytest.skip("Authentication failed - skipping authenticated tests")


class TestAdminStats:
    """Dashboard statistics endpoint tests"""
    
    def test_get_stats_authenticated(self, auth_token):
        """Test getting dashboard stats with valid token"""
        response = requests.get(f"{BASE_URL}/api/admin/stats", headers={
            "Authorization": f"Bearer {auth_token}"
        })
        assert response.status_code == 200
        
        data = response.json()
        assert "contacts" in data
        assert "applications" in data
        assert "blog_posts" in data
        assert "files" in data
        assert "recent_contacts" in data
        assert "recent_applications" in data
        
        # Verify structure
        assert "total" in data["contacts"]
        assert "pending" in data["contacts"]
        assert "total" in data["applications"]
        assert "pending" in data["applications"]
    
    def test_get_stats_unauthenticated(self):
        """Test getting stats without authentication"""
        response = requests.get(f"{BASE_URL}/api/admin/stats")
        assert response.status_code in [401, 403]


class TestAdminContacts:
    """Admin contacts management tests"""
    
    def test_get_contacts_authenticated(self, auth_token):
        """Test getting all contacts with valid token"""
        response = requests.get(f"{BASE_URL}/api/admin/contacts", headers={
            "Authorization": f"Bearer {auth_token}"
        })
        assert response.status_code == 200
        
        data = response.json()
        assert isinstance(data, list)
    
    def test_get_contacts_unauthenticated(self):
        """Test getting contacts without authentication"""
        response = requests.get(f"{BASE_URL}/api/admin/contacts")
        assert response.status_code in [401, 403]
    
    def test_update_contact_status(self, auth_token):
        """Test updating contact status"""
        # First create a test contact via public API
        contact_data = {
            "name": "TEST_Contact_Update",
            "company_name": "TEST_Company",
            "mobile_number": "9999999999",
            "email": "test@example.com"
        }
        create_response = requests.post(f"{BASE_URL}/api/contact", json=contact_data)
        assert create_response.status_code == 200
        contact_id = create_response.json()["id"]
        
        # Update status
        update_response = requests.put(
            f"{BASE_URL}/api/admin/contacts/{contact_id}",
            json={"status": "contacted"},
            headers={"Authorization": f"Bearer {auth_token}"}
        )
        assert update_response.status_code == 200
        
        updated_data = update_response.json()
        assert updated_data["status"] == "contacted"
        
        # Cleanup - delete test contact
        requests.delete(
            f"{BASE_URL}/api/admin/contacts/{contact_id}",
            headers={"Authorization": f"Bearer {auth_token}"}
        )
    
    def test_delete_contact(self, auth_token):
        """Test deleting a contact"""
        # First create a test contact
        contact_data = {
            "name": "TEST_Contact_Delete",
            "company_name": "TEST_Company_Delete",
            "mobile_number": "8888888888"
        }
        create_response = requests.post(f"{BASE_URL}/api/contact", json=contact_data)
        assert create_response.status_code == 200
        contact_id = create_response.json()["id"]
        
        # Delete contact
        delete_response = requests.delete(
            f"{BASE_URL}/api/admin/contacts/{contact_id}",
            headers={"Authorization": f"Bearer {auth_token}"}
        )
        assert delete_response.status_code == 200
        
        # Verify deletion - should return 404
        get_response = requests.get(
            f"{BASE_URL}/api/admin/contacts",
            headers={"Authorization": f"Bearer {auth_token}"}
        )
        contacts = get_response.json()
        contact_ids = [c["id"] for c in contacts]
        assert contact_id not in contact_ids


class TestAdminApplications:
    """Admin applications management tests"""
    
    def test_get_applications_authenticated(self, auth_token):
        """Test getting all applications with valid token"""
        response = requests.get(f"{BASE_URL}/api/admin/applications", headers={
            "Authorization": f"Bearer {auth_token}"
        })
        assert response.status_code == 200
        
        data = response.json()
        assert isinstance(data, list)
    
    def test_get_applications_unauthenticated(self):
        """Test getting applications without authentication"""
        response = requests.get(f"{BASE_URL}/api/admin/applications")
        assert response.status_code in [401, 403]
    
    def test_update_application_status(self, auth_token):
        """Test updating application status"""
        # First create a test application via public API
        app_data = {
            "name": "TEST_Applicant_Update",
            "company_name": "TEST_IPO_Company",
            "annual_turnover": "100",
            "mobile_number": "7777777777"
        }
        create_response = requests.post(f"{BASE_URL}/api/application", json=app_data)
        assert create_response.status_code == 200
        app_id = create_response.json()["id"]
        
        # Update status
        update_response = requests.put(
            f"{BASE_URL}/api/admin/applications/{app_id}",
            json={"status": "reviewing"},
            headers={"Authorization": f"Bearer {auth_token}"}
        )
        assert update_response.status_code == 200
        
        updated_data = update_response.json()
        assert updated_data["status"] == "reviewing"
        
        # Cleanup
        requests.delete(
            f"{BASE_URL}/api/admin/applications/{app_id}",
            headers={"Authorization": f"Bearer {auth_token}"}
        )
    
    def test_delete_application(self, auth_token):
        """Test deleting an application"""
        # First create a test application
        app_data = {
            "name": "TEST_Applicant_Delete",
            "company_name": "TEST_IPO_Delete",
            "annual_turnover": "50",
            "mobile_number": "6666666666"
        }
        create_response = requests.post(f"{BASE_URL}/api/application", json=app_data)
        assert create_response.status_code == 200
        app_id = create_response.json()["id"]
        
        # Delete application
        delete_response = requests.delete(
            f"{BASE_URL}/api/admin/applications/{app_id}",
            headers={"Authorization": f"Bearer {auth_token}"}
        )
        assert delete_response.status_code == 200
        
        # Verify deletion
        get_response = requests.get(
            f"{BASE_URL}/api/admin/applications",
            headers={"Authorization": f"Bearer {auth_token}"}
        )
        applications = get_response.json()
        app_ids = [a["id"] for a in applications]
        assert app_id not in app_ids


class TestAdminBlog:
    """Admin blog CMS tests"""
    
    def test_get_blog_posts_authenticated(self, auth_token):
        """Test getting all blog posts with valid token"""
        response = requests.get(f"{BASE_URL}/api/admin/blog", headers={
            "Authorization": f"Bearer {auth_token}"
        })
        assert response.status_code == 200
        
        data = response.json()
        assert isinstance(data, list)
    
    def test_create_blog_post(self, auth_token):
        """Test creating a new blog post"""
        unique_slug = f"test-post-{uuid.uuid4().hex[:8]}"
        post_data = {
            "slug": unique_slug,
            "title": "TEST Blog Post Title",
            "excerpt": "This is a test blog post excerpt",
            "content": "<p>This is the test blog post content.</p>",
            "author": "Test Author",
            "category": "Testing",
            "image": "https://example.com/test-image.jpg",
            "read_time": "3 min read"
        }
        
        response = requests.post(
            f"{BASE_URL}/api/admin/blog",
            json=post_data,
            headers={"Authorization": f"Bearer {auth_token}"}
        )
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        data = response.json()
        assert data["slug"] == unique_slug
        assert data["title"] == "TEST Blog Post Title"
        assert data["category"] == "Testing"
        assert "id" in data
        assert "date" in data
        
        # Cleanup
        requests.delete(
            f"{BASE_URL}/api/admin/blog/{unique_slug}",
            headers={"Authorization": f"Bearer {auth_token}"}
        )
    
    def test_create_blog_post_duplicate_slug(self, auth_token):
        """Test creating blog post with duplicate slug fails"""
        unique_slug = f"test-duplicate-{uuid.uuid4().hex[:8]}"
        post_data = {
            "slug": unique_slug,
            "title": "First Post",
            "excerpt": "First excerpt",
            "content": "<p>First content</p>",
            "category": "Testing",
            "image": ""
        }
        
        # Create first post
        response1 = requests.post(
            f"{BASE_URL}/api/admin/blog",
            json=post_data,
            headers={"Authorization": f"Bearer {auth_token}"}
        )
        assert response1.status_code == 200
        
        # Try to create second post with same slug
        response2 = requests.post(
            f"{BASE_URL}/api/admin/blog",
            json=post_data,
            headers={"Authorization": f"Bearer {auth_token}"}
        )
        assert response2.status_code == 400
        assert "slug already exists" in response2.json()["detail"].lower()
        
        # Cleanup
        requests.delete(
            f"{BASE_URL}/api/admin/blog/{unique_slug}",
            headers={"Authorization": f"Bearer {auth_token}"}
        )
    
    def test_update_blog_post(self, auth_token):
        """Test updating a blog post"""
        unique_slug = f"test-update-{uuid.uuid4().hex[:8]}"
        post_data = {
            "slug": unique_slug,
            "title": "Original Title",
            "excerpt": "Original excerpt",
            "content": "<p>Original content</p>",
            "category": "Testing",
            "image": ""
        }
        
        # Create post
        create_response = requests.post(
            f"{BASE_URL}/api/admin/blog",
            json=post_data,
            headers={"Authorization": f"Bearer {auth_token}"}
        )
        assert create_response.status_code == 200
        
        # Update post
        updated_data = {
            "slug": unique_slug,
            "title": "Updated Title",
            "excerpt": "Updated excerpt",
            "content": "<p>Updated content</p>",
            "category": "Updated Category",
            "image": "https://example.com/updated.jpg"
        }
        
        update_response = requests.put(
            f"{BASE_URL}/api/admin/blog/{unique_slug}",
            json=updated_data,
            headers={"Authorization": f"Bearer {auth_token}"}
        )
        assert update_response.status_code == 200
        
        data = update_response.json()
        assert data["title"] == "Updated Title"
        assert data["category"] == "Updated Category"
        
        # Cleanup
        requests.delete(
            f"{BASE_URL}/api/admin/blog/{unique_slug}",
            headers={"Authorization": f"Bearer {auth_token}"}
        )
    
    def test_delete_blog_post(self, auth_token):
        """Test deleting a blog post"""
        unique_slug = f"test-delete-{uuid.uuid4().hex[:8]}"
        post_data = {
            "slug": unique_slug,
            "title": "Post to Delete",
            "excerpt": "Will be deleted",
            "content": "<p>Delete me</p>",
            "category": "Testing",
            "image": ""
        }
        
        # Create post
        create_response = requests.post(
            f"{BASE_URL}/api/admin/blog",
            json=post_data,
            headers={"Authorization": f"Bearer {auth_token}"}
        )
        assert create_response.status_code == 200
        
        # Delete post
        delete_response = requests.delete(
            f"{BASE_URL}/api/admin/blog/{unique_slug}",
            headers={"Authorization": f"Bearer {auth_token}"}
        )
        assert delete_response.status_code == 200
        
        # Verify deletion via public API
        get_response = requests.get(f"{BASE_URL}/api/blog/{unique_slug}")
        assert get_response.status_code == 404


class TestAdminFiles:
    """Admin file manager tests"""
    
    def test_get_files_authenticated(self, auth_token):
        """Test getting all files with valid token"""
        response = requests.get(f"{BASE_URL}/api/admin/files", headers={
            "Authorization": f"Bearer {auth_token}"
        })
        assert response.status_code == 200
        
        data = response.json()
        assert isinstance(data, list)
    
    def test_get_files_unauthenticated(self):
        """Test getting files without authentication"""
        response = requests.get(f"{BASE_URL}/api/admin/files")
        assert response.status_code in [401, 403]
    
    def test_upload_and_delete_file(self, auth_token):
        """Test uploading and deleting a file"""
        # Create a test file
        test_content = b"This is a test file content"
        files = {
            'file': ('test_upload.txt', test_content, 'text/plain')
        }
        
        # Upload file
        upload_response = requests.post(
            f"{BASE_URL}/api/admin/files/upload",
            files=files,
            headers={"Authorization": f"Bearer {auth_token}"}
        )
        assert upload_response.status_code == 200, f"Upload failed: {upload_response.text}"
        
        data = upload_response.json()
        assert "name" in data
        assert "url" in data
        assert "size" in data
        filename = data["name"]
        
        # Verify file exists in list
        list_response = requests.get(
            f"{BASE_URL}/api/admin/files",
            headers={"Authorization": f"Bearer {auth_token}"}
        )
        file_names = [f["name"] for f in list_response.json()]
        assert filename in file_names
        
        # Delete file
        delete_response = requests.delete(
            f"{BASE_URL}/api/admin/files/{filename}",
            headers={"Authorization": f"Bearer {auth_token}"}
        )
        assert delete_response.status_code == 200
        
        # Verify file is deleted
        list_response2 = requests.get(
            f"{BASE_URL}/api/admin/files",
            headers={"Authorization": f"Bearer {auth_token}"}
        )
        file_names2 = [f["name"] for f in list_response2.json()]
        assert filename not in file_names2
    
    def test_public_file_access(self, auth_token):
        """Test that uploaded files are publicly accessible"""
        # Upload a test file
        test_content = b"Public access test content"
        files = {
            'file': ('public_test.txt', test_content, 'text/plain')
        }
        
        upload_response = requests.post(
            f"{BASE_URL}/api/admin/files/upload",
            files=files,
            headers={"Authorization": f"Bearer {auth_token}"}
        )
        assert upload_response.status_code == 200
        
        filename = upload_response.json()["name"]
        
        # Access file publicly (no auth)
        public_response = requests.get(f"{BASE_URL}/api/files/{filename}")
        assert public_response.status_code == 200
        assert public_response.content == test_content
        
        # Cleanup
        requests.delete(
            f"{BASE_URL}/api/admin/files/{filename}",
            headers={"Authorization": f"Bearer {auth_token}"}
        )


class TestAdminEndpointSecurity:
    """Test that all admin endpoints require authentication"""
    
    def test_contacts_requires_auth(self):
        response = requests.get(f"{BASE_URL}/api/admin/contacts")
        assert response.status_code in [401, 403]
    
    def test_applications_requires_auth(self):
        response = requests.get(f"{BASE_URL}/api/admin/applications")
        assert response.status_code in [401, 403]
    
    def test_blog_admin_requires_auth(self):
        response = requests.get(f"{BASE_URL}/api/admin/blog")
        assert response.status_code in [401, 403]
    
    def test_files_requires_auth(self):
        response = requests.get(f"{BASE_URL}/api/admin/files")
        assert response.status_code in [401, 403]
    
    def test_stats_requires_auth(self):
        response = requests.get(f"{BASE_URL}/api/admin/stats")
        assert response.status_code in [401, 403]
