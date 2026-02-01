"""
Backend API Tests for Rushabh Ventures
Tests: Contact form, Application form, Blog CRUD APIs
"""
import pytest
import requests
import os
import uuid

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

class TestHealthCheck:
    """Basic API health check tests"""
    
    def test_api_root(self):
        """Test API root endpoint"""
        response = requests.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        data = response.json()
        assert "message" in data
        assert data["message"] == "Hello World"
        print("✓ API root endpoint working")


class TestContactAPI:
    """Contact form API tests"""
    
    def test_submit_contact_success(self):
        """Test successful contact form submission"""
        unique_id = str(uuid.uuid4())[:8]
        payload = {
            "name": f"TEST_Contact_{unique_id}",
            "company_name": f"TEST_Company_{unique_id}",
            "annual_turnover": "50",
            "mobile_number": "+91 9876543210",
            "email": f"test_{unique_id}@example.com",
            "message": "Test message for contact form"
        }
        
        response = requests.post(f"{BASE_URL}/api/contact", json=payload)
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        data = response.json()
        # Verify response structure
        assert "id" in data, "Response should contain 'id'"
        assert "name" in data, "Response should contain 'name'"
        assert "company_name" in data, "Response should contain 'company_name'"
        assert "created_at" in data, "Response should contain 'created_at'"
        assert "status" in data, "Response should contain 'status'"
        
        # Verify data values
        assert data["name"] == payload["name"]
        assert data["company_name"] == payload["company_name"]
        assert data["mobile_number"] == payload["mobile_number"]
        assert data["status"] == "pending"
        
        print(f"✓ Contact form submitted successfully with ID: {data['id']}")
        return data["id"]
    
    def test_submit_contact_minimal_fields(self):
        """Test contact form with only required fields"""
        unique_id = str(uuid.uuid4())[:8]
        payload = {
            "name": f"TEST_MinContact_{unique_id}",
            "company_name": f"TEST_MinCompany_{unique_id}",
            "mobile_number": "+91 1234567890"
        }
        
        response = requests.post(f"{BASE_URL}/api/contact", json=payload)
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        data = response.json()
        assert data["name"] == payload["name"]
        assert data["annual_turnover"] is None
        assert data["email"] is None
        assert data["message"] is None
        
        print("✓ Contact form with minimal fields works")
    
    def test_submit_contact_missing_required_field(self):
        """Test contact form with missing required field"""
        payload = {
            "name": "Test Name",
            # Missing company_name and mobile_number
        }
        
        response = requests.post(f"{BASE_URL}/api/contact", json=payload)
        assert response.status_code == 422, f"Expected 422 for validation error, got {response.status_code}"
        print("✓ Contact form validation works for missing fields")
    
    def test_get_contacts(self):
        """Test getting all contacts"""
        response = requests.get(f"{BASE_URL}/api/contacts")
        assert response.status_code == 200
        
        data = response.json()
        assert isinstance(data, list), "Response should be a list"
        print(f"✓ Get contacts returns {len(data)} records")


class TestApplicationAPI:
    """Application form (Homepage IPO form) API tests"""
    
    def test_submit_application_success(self):
        """Test successful application form submission"""
        unique_id = str(uuid.uuid4())[:8]
        payload = {
            "name": f"TEST_Applicant_{unique_id}",
            "company_name": f"TEST_IPOCompany_{unique_id}",
            "annual_turnover": "100",
            "mobile_number": "+91 9988776655"
        }
        
        response = requests.post(f"{BASE_URL}/api/application", json=payload)
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        data = response.json()
        # Verify response structure
        assert "id" in data
        assert "name" in data
        assert "company_name" in data
        assert "annual_turnover" in data
        assert "mobile_number" in data
        assert "created_at" in data
        assert "status" in data
        
        # Verify data values
        assert data["name"] == payload["name"]
        assert data["company_name"] == payload["company_name"]
        assert data["annual_turnover"] == payload["annual_turnover"]
        assert data["status"] == "pending"
        
        print(f"✓ Application submitted successfully with ID: {data['id']}")
        return data["id"]
    
    def test_submit_application_missing_field(self):
        """Test application form with missing required field"""
        payload = {
            "name": "Test Name",
            "company_name": "Test Company"
            # Missing annual_turnover and mobile_number
        }
        
        response = requests.post(f"{BASE_URL}/api/application", json=payload)
        assert response.status_code == 422, f"Expected 422 for validation error, got {response.status_code}"
        print("✓ Application form validation works for missing fields")
    
    def test_get_applications(self):
        """Test getting all applications"""
        response = requests.get(f"{BASE_URL}/api/applications")
        assert response.status_code == 200
        
        data = response.json()
        assert isinstance(data, list), "Response should be a list"
        print(f"✓ Get applications returns {len(data)} records")


class TestBlogAPI:
    """Blog CRUD API tests"""
    
    def test_get_blog_posts(self):
        """Test getting all blog posts"""
        response = requests.get(f"{BASE_URL}/api/blog")
        assert response.status_code == 200
        
        data = response.json()
        assert isinstance(data, list), "Response should be a list"
        assert len(data) >= 4, f"Expected at least 4 blog posts, got {len(data)}"
        
        # Verify blog post structure
        if len(data) > 0:
            post = data[0]
            assert "id" in post
            assert "slug" in post
            assert "title" in post
            assert "excerpt" in post
            assert "content" in post
            assert "author" in post
            assert "date" in post
            assert "read_time" in post
            assert "category" in post
            assert "image" in post
        
        print(f"✓ Get blog posts returns {len(data)} posts")
    
    def test_get_blog_post_by_slug(self):
        """Test getting a single blog post by slug"""
        # First get all posts to get a valid slug
        response = requests.get(f"{BASE_URL}/api/blog")
        assert response.status_code == 200
        posts = response.json()
        
        if len(posts) > 0:
            slug = posts[0]["slug"]
            
            # Get single post
            response = requests.get(f"{BASE_URL}/api/blog/{slug}")
            assert response.status_code == 200
            
            post = response.json()
            assert post["slug"] == slug
            assert "title" in post
            assert "content" in post
            
            print(f"✓ Get blog post by slug '{slug}' works")
    
    def test_get_blog_post_not_found(self):
        """Test getting a non-existent blog post"""
        response = requests.get(f"{BASE_URL}/api/blog/non-existent-slug-12345")
        assert response.status_code == 404
        print("✓ Blog post not found returns 404")
    
    def test_create_blog_post(self):
        """Test creating a new blog post"""
        unique_id = str(uuid.uuid4())[:8]
        payload = {
            "slug": f"test-blog-post-{unique_id}",
            "title": f"TEST Blog Post {unique_id}",
            "excerpt": "This is a test blog post excerpt",
            "content": "<p>This is the test blog post content.</p>",
            "author": "Test Author",
            "category": "Test Category",
            "image": "https://example.com/test-image.jpg",
            "read_time": "3 min read"
        }
        
        response = requests.post(f"{BASE_URL}/api/blog", json=payload)
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        data = response.json()
        assert data["slug"] == payload["slug"]
        assert data["title"] == payload["title"]
        assert "id" in data
        assert "date" in data
        
        print(f"✓ Blog post created with slug: {data['slug']}")
        
        # Cleanup - delete the test post
        delete_response = requests.delete(f"{BASE_URL}/api/blog/{payload['slug']}")
        assert delete_response.status_code == 200
        print(f"✓ Test blog post deleted")
    
    def test_create_blog_post_duplicate_slug(self):
        """Test creating a blog post with duplicate slug"""
        # First get existing posts
        response = requests.get(f"{BASE_URL}/api/blog")
        posts = response.json()
        
        if len(posts) > 0:
            existing_slug = posts[0]["slug"]
            
            payload = {
                "slug": existing_slug,  # Use existing slug
                "title": "Duplicate Test",
                "excerpt": "Test excerpt",
                "content": "<p>Test content</p>",
                "author": "Test Author",
                "category": "Test",
                "image": "https://example.com/test.jpg"
            }
            
            response = requests.post(f"{BASE_URL}/api/blog", json=payload)
            assert response.status_code == 400, f"Expected 400 for duplicate slug, got {response.status_code}"
            print("✓ Duplicate slug returns 400 error")
    
    def test_update_blog_post(self):
        """Test updating a blog post"""
        unique_id = str(uuid.uuid4())[:8]
        
        # Create a test post first
        create_payload = {
            "slug": f"test-update-post-{unique_id}",
            "title": f"TEST Update Post {unique_id}",
            "excerpt": "Original excerpt",
            "content": "<p>Original content</p>",
            "author": "Original Author",
            "category": "Test",
            "image": "https://example.com/original.jpg"
        }
        
        create_response = requests.post(f"{BASE_URL}/api/blog", json=create_payload)
        assert create_response.status_code == 200
        
        # Update the post
        update_payload = {
            "slug": create_payload["slug"],
            "title": f"UPDATED Title {unique_id}",
            "excerpt": "Updated excerpt",
            "content": "<p>Updated content</p>",
            "author": "Updated Author",
            "category": "Updated Category",
            "image": "https://example.com/updated.jpg"
        }
        
        update_response = requests.put(f"{BASE_URL}/api/blog/{create_payload['slug']}", json=update_payload)
        assert update_response.status_code == 200
        
        updated_data = update_response.json()
        assert updated_data["title"] == update_payload["title"]
        assert updated_data["excerpt"] == update_payload["excerpt"]
        
        print(f"✓ Blog post updated successfully")
        
        # Verify update persisted
        get_response = requests.get(f"{BASE_URL}/api/blog/{create_payload['slug']}")
        assert get_response.status_code == 200
        fetched_data = get_response.json()
        assert fetched_data["title"] == update_payload["title"]
        
        # Cleanup
        requests.delete(f"{BASE_URL}/api/blog/{create_payload['slug']}")
        print("✓ Test blog post cleaned up")
    
    def test_delete_blog_post(self):
        """Test deleting a blog post"""
        unique_id = str(uuid.uuid4())[:8]
        
        # Create a test post
        payload = {
            "slug": f"test-delete-post-{unique_id}",
            "title": f"TEST Delete Post {unique_id}",
            "excerpt": "To be deleted",
            "content": "<p>Delete me</p>",
            "author": "Test Author",
            "category": "Test",
            "image": "https://example.com/delete.jpg"
        }
        
        create_response = requests.post(f"{BASE_URL}/api/blog", json=payload)
        assert create_response.status_code == 200
        
        # Delete the post
        delete_response = requests.delete(f"{BASE_URL}/api/blog/{payload['slug']}")
        assert delete_response.status_code == 200
        
        # Verify deletion
        get_response = requests.get(f"{BASE_URL}/api/blog/{payload['slug']}")
        assert get_response.status_code == 404
        
        print("✓ Blog post deleted and verified")
    
    def test_delete_blog_post_not_found(self):
        """Test deleting a non-existent blog post"""
        response = requests.delete(f"{BASE_URL}/api/blog/non-existent-slug-99999")
        assert response.status_code == 404
        print("✓ Delete non-existent post returns 404")


class TestStatusAPI:
    """Status check API tests"""
    
    def test_create_status_check(self):
        """Test creating a status check"""
        payload = {
            "client_name": "TEST_StatusClient"
        }
        
        response = requests.post(f"{BASE_URL}/api/status", json=payload)
        assert response.status_code == 200
        
        data = response.json()
        assert "id" in data
        assert data["client_name"] == payload["client_name"]
        assert "timestamp" in data
        
        print(f"✓ Status check created with ID: {data['id']}")
    
    def test_get_status_checks(self):
        """Test getting all status checks"""
        response = requests.get(f"{BASE_URL}/api/status")
        assert response.status_code == 200
        
        data = response.json()
        assert isinstance(data, list)
        print(f"✓ Get status checks returns {len(data)} records")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
