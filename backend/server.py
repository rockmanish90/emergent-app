from fastapi import FastAPI, APIRouter, HTTPException, BackgroundTasks, UploadFile, File, Depends
from fastapi.responses import FileResponse
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import shutil
import jwt
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone, timedelta

from email_service import send_contact_notification, send_application_notification

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# File upload directory
UPLOAD_DIR = ROOT_DIR / "uploads"
UPLOAD_DIR.mkdir(exist_ok=True)

# JWT settings
JWT_SECRET = os.environ.get('JWT_SECRET', 'default-secret-key')
JWT_ALGORITHM = "HS256"
JWT_EXPIRATION_HOURS = 24

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Security
security = HTTPBearer()

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


# ============ MODELS ============

class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str


# Contact Form Models
class ContactCreate(BaseModel):
    name: str
    company_name: str
    annual_turnover: Optional[str] = None
    mobile_number: str
    email: Optional[str] = None
    message: Optional[str] = None

class ContactResponse(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str
    name: str
    company_name: str
    annual_turnover: Optional[str] = None
    mobile_number: str
    email: Optional[str] = None
    message: Optional[str] = None
    created_at: str
    status: str = "pending"

class ContactUpdate(BaseModel):
    status: Optional[str] = None
    notes: Optional[str] = None


# Application Form Models
class ApplicationCreate(BaseModel):
    name: str
    company_name: str
    annual_turnover: str
    mobile_number: str

class ApplicationResponse(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str
    name: str
    company_name: str
    annual_turnover: str
    mobile_number: str
    created_at: str
    status: str = "pending"

class ApplicationUpdate(BaseModel):
    status: Optional[str] = None
    notes: Optional[str] = None


# Blog Models
class FAQItem(BaseModel):
    question: str
    answer: str

class BlogPostCreate(BaseModel):
    slug: str
    title: str
    excerpt: str
    content: str
    author: str = "Rushabh Ventures Team"
    category: str
    image: str
    read_time: str = "5 min read"
    faqs: Optional[List[FAQItem]] = None

class BlogPostResponse(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str
    slug: str
    title: str
    excerpt: str
    content: str
    author: str
    date: str
    read_time: str
    category: str
    image: str
    faqs: Optional[List[FAQItem]] = None


# Admin Models
class AdminLogin(BaseModel):
    email: str
    password: str

class AdminLoginResponse(BaseModel):
    token: str
    email: str
    expires_at: str

class FileInfo(BaseModel):
    name: str
    path: str
    size: int
    type: str
    url: str
    created_at: str


# ============ AUTH HELPERS ============

def create_jwt_token(email: str) -> str:
    """Create a JWT token for admin"""
    expiration = datetime.now(timezone.utc) + timedelta(hours=JWT_EXPIRATION_HOURS)
    payload = {
        "email": email,
        "exp": expiration,
        "iat": datetime.now(timezone.utc)
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

def verify_jwt_token(credentials: HTTPAuthorizationCredentials = Depends(security)) -> str:
    """Verify JWT token and return email"""
    try:
        token = credentials.credentials
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return payload["email"]
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")


# ============ PUBLIC ROUTES ============

@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks


# Contact Form Endpoints
@api_router.post("/contact", response_model=ContactResponse)
async def submit_contact(contact: ContactCreate, background_tasks: BackgroundTasks):
    """Submit a contact form and send email notification"""
    contact_id = str(uuid.uuid4())
    created_at = datetime.now(timezone.utc).isoformat()
    
    contact_doc = {
        "id": contact_id,
        "name": contact.name,
        "company_name": contact.company_name,
        "annual_turnover": contact.annual_turnover,
        "mobile_number": contact.mobile_number,
        "email": contact.email,
        "message": contact.message,
        "created_at": created_at,
        "status": "pending",
        "notes": ""
    }
    
    await db.contacts.insert_one(contact_doc)
    
    # Send email notification in background
    background_tasks.add_task(send_contact_notification, contact_doc)
    
    return ContactResponse(**{k: v for k, v in contact_doc.items() if k != '_id'})


# Application Form Endpoints
@api_router.post("/application", response_model=ApplicationResponse)
async def submit_application(application: ApplicationCreate, background_tasks: BackgroundTasks):
    """Submit an IPO application and send email notification"""
    app_id = str(uuid.uuid4())
    created_at = datetime.now(timezone.utc).isoformat()
    
    app_doc = {
        "id": app_id,
        "name": application.name,
        "company_name": application.company_name,
        "annual_turnover": application.annual_turnover,
        "mobile_number": application.mobile_number,
        "created_at": created_at,
        "status": "pending",
        "notes": ""
    }
    
    await db.applications.insert_one(app_doc)
    
    # Send email notification in background
    background_tasks.add_task(send_application_notification, app_doc)
    
    return ApplicationResponse(**{k: v for k, v in app_doc.items() if k != '_id'})


# Blog Public Endpoints
@api_router.get("/blog", response_model=List[BlogPostResponse])
async def get_blog_posts():
    """Get all blog posts"""
    posts = await db.blog_posts.find({}, {"_id": 0}).to_list(100)
    return posts


@api_router.get("/blog/{slug}", response_model=BlogPostResponse)
async def get_blog_post(slug: str):
    """Get a single blog post by slug"""
    post = await db.blog_posts.find_one({"slug": slug}, {"_id": 0})
    if not post:
        raise HTTPException(status_code=404, detail="Blog post not found")
    return post


# ============ ADMIN AUTH ============

@api_router.post("/admin/login", response_model=AdminLoginResponse)
async def admin_login(credentials: AdminLogin):
    """Admin login endpoint"""
    admin_email = os.environ.get('ADMIN_EMAIL')
    admin_password = os.environ.get('ADMIN_PASSWORD')
    
    if credentials.email != admin_email or credentials.password != admin_password:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    token = create_jwt_token(credentials.email)
    expiration = datetime.now(timezone.utc) + timedelta(hours=JWT_EXPIRATION_HOURS)
    
    return AdminLoginResponse(
        token=token,
        email=credentials.email,
        expires_at=expiration.isoformat()
    )

@api_router.get("/admin/verify")
async def verify_admin(email: str = Depends(verify_jwt_token)):
    """Verify admin token"""
    return {"valid": True, "email": email}


# ============ ADMIN CONTACTS ============

@api_router.get("/admin/contacts", response_model=List[ContactResponse])
async def admin_get_contacts(email: str = Depends(verify_jwt_token)):
    """Get all contacts (admin only)"""
    contacts = await db.contacts.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return contacts

@api_router.put("/admin/contacts/{contact_id}")
async def admin_update_contact(contact_id: str, update: ContactUpdate, email: str = Depends(verify_jwt_token)):
    """Update contact status (admin only)"""
    update_data = {k: v for k, v in update.model_dump().items() if v is not None}
    if not update_data:
        raise HTTPException(status_code=400, detail="No update data provided")
    
    result = await db.contacts.update_one({"id": contact_id}, {"$set": update_data})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Contact not found")
    
    updated = await db.contacts.find_one({"id": contact_id}, {"_id": 0})
    return updated

@api_router.delete("/admin/contacts/{contact_id}")
async def admin_delete_contact(contact_id: str, email: str = Depends(verify_jwt_token)):
    """Delete a contact (admin only)"""
    result = await db.contacts.delete_one({"id": contact_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Contact not found")
    return {"message": "Contact deleted successfully"}


# ============ ADMIN APPLICATIONS ============

@api_router.get("/admin/applications", response_model=List[ApplicationResponse])
async def admin_get_applications(email: str = Depends(verify_jwt_token)):
    """Get all applications (admin only)"""
    applications = await db.applications.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return applications

@api_router.put("/admin/applications/{app_id}")
async def admin_update_application(app_id: str, update: ApplicationUpdate, email: str = Depends(verify_jwt_token)):
    """Update application status (admin only)"""
    update_data = {k: v for k, v in update.model_dump().items() if v is not None}
    if not update_data:
        raise HTTPException(status_code=400, detail="No update data provided")
    
    result = await db.applications.update_one({"id": app_id}, {"$set": update_data})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Application not found")
    
    updated = await db.applications.find_one({"id": app_id}, {"_id": 0})
    return updated

@api_router.delete("/admin/applications/{app_id}")
async def admin_delete_application(app_id: str, email: str = Depends(verify_jwt_token)):
    """Delete an application (admin only)"""
    result = await db.applications.delete_one({"id": app_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Application not found")
    return {"message": "Application deleted successfully"}


# ============ ADMIN BLOG CMS ============

@api_router.get("/admin/blog", response_model=List[BlogPostResponse])
async def admin_get_blog_posts(email: str = Depends(verify_jwt_token)):
    """Get all blog posts (admin only)"""
    posts = await db.blog_posts.find({}, {"_id": 0}).sort("date", -1).to_list(100)
    return posts

@api_router.post("/admin/blog", response_model=BlogPostResponse)
async def admin_create_blog_post(post: BlogPostCreate, email: str = Depends(verify_jwt_token)):
    """Create a new blog post (admin only)"""
    # Check if slug already exists
    existing = await db.blog_posts.find_one({"slug": post.slug})
    if existing:
        raise HTTPException(status_code=400, detail="A post with this slug already exists")
    
    post_id = str(uuid.uuid4())
    date = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    
    # Convert FAQs to dict format
    faqs_data = None
    if post.faqs:
        faqs_data = [{"question": faq.question, "answer": faq.answer} for faq in post.faqs]
    
    post_doc = {
        "id": post_id,
        "slug": post.slug,
        "title": post.title,
        "excerpt": post.excerpt,
        "content": post.content,
        "author": post.author,
        "date": date,
        "read_time": post.read_time,
        "category": post.category,
        "image": post.image,
        "faqs": faqs_data
    }
    
    await db.blog_posts.insert_one(post_doc)
    
    return BlogPostResponse(**{k: v for k, v in post_doc.items() if k != '_id'})

@api_router.put("/admin/blog/{slug}", response_model=BlogPostResponse)
async def admin_update_blog_post(slug: str, post: BlogPostCreate, email: str = Depends(verify_jwt_token)):
    """Update an existing blog post (admin only)"""
    existing = await db.blog_posts.find_one({"slug": slug}, {"_id": 0})
    if not existing:
        raise HTTPException(status_code=404, detail="Blog post not found")
    
    # Convert FAQs to dict format
    faqs_data = None
    if post.faqs:
        faqs_data = [{"question": faq.question, "answer": faq.answer} for faq in post.faqs]
    
    update_data = {
        "title": post.title,
        "excerpt": post.excerpt,
        "content": post.content,
        "author": post.author,
        "read_time": post.read_time,
        "category": post.category,
        "image": post.image,
        "faqs": faqs_data
    }
    
    # If slug is changing, check the new slug doesn't exist
    if post.slug != slug:
        slug_exists = await db.blog_posts.find_one({"slug": post.slug})
        if slug_exists:
            raise HTTPException(status_code=400, detail="A post with this slug already exists")
        update_data["slug"] = post.slug
    
    await db.blog_posts.update_one({"slug": slug}, {"$set": update_data})
    
    updated = await db.blog_posts.find_one({"slug": post.slug if post.slug != slug else slug}, {"_id": 0})
    return BlogPostResponse(**updated)

@api_router.delete("/admin/blog/{slug}")
async def admin_delete_blog_post(slug: str, email: str = Depends(verify_jwt_token)):
    """Delete a blog post (admin only)"""
    result = await db.blog_posts.delete_one({"slug": slug})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Blog post not found")
    return {"message": "Blog post deleted successfully"}


# ============ ADMIN FILE MANAGER ============

def get_file_type(filename: str) -> str:
    """Get file type based on extension"""
    ext = filename.lower().split('.')[-1] if '.' in filename else ''
    image_exts = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'ico']
    doc_exts = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt']
    
    if ext in image_exts:
        return 'image'
    elif ext in doc_exts:
        return 'document'
    else:
        return 'other'

@api_router.get("/admin/files", response_model=List[FileInfo])
async def admin_list_files(email: str = Depends(verify_jwt_token)):
    """List all uploaded files (admin only)"""
    files = []
    
    if UPLOAD_DIR.exists():
        for file_path in UPLOAD_DIR.iterdir():
            if file_path.is_file():
                stat = file_path.stat()
                files.append(FileInfo(
                    name=file_path.name,
                    path=str(file_path.relative_to(ROOT_DIR)),
                    size=stat.st_size,
                    type=get_file_type(file_path.name),
                    url=f"/api/files/{file_path.name}",
                    created_at=datetime.fromtimestamp(stat.st_ctime, timezone.utc).isoformat()
                ))
    
    # Sort by created_at descending
    files.sort(key=lambda x: x.created_at, reverse=True)
    return files

@api_router.post("/admin/files/upload")
async def admin_upload_file(file: UploadFile = File(...), email: str = Depends(verify_jwt_token)):
    """Upload a file (admin only)"""
    # Generate unique filename to avoid conflicts
    ext = file.filename.split('.')[-1] if '.' in file.filename else ''
    unique_name = f"{uuid.uuid4().hex[:8]}_{file.filename}"
    file_path = UPLOAD_DIR / unique_name
    
    try:
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        stat = file_path.stat()
        return FileInfo(
            name=unique_name,
            path=str(file_path.relative_to(ROOT_DIR)),
            size=stat.st_size,
            type=get_file_type(unique_name),
            url=f"/api/files/{unique_name}",
            created_at=datetime.now(timezone.utc).isoformat()
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to upload file: {str(e)}")

@api_router.delete("/admin/files/{filename}")
async def admin_delete_file(filename: str, email: str = Depends(verify_jwt_token)):
    """Delete a file (admin only)"""
    file_path = UPLOAD_DIR / filename
    
    if not file_path.exists():
        raise HTTPException(status_code=404, detail="File not found")
    
    try:
        file_path.unlink()
        return {"message": "File deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to delete file: {str(e)}")

# Public file serving
@api_router.get("/files/{filename}")
async def get_file(filename: str):
    """Serve uploaded files (public)"""
    file_path = UPLOAD_DIR / filename
    
    if not file_path.exists():
        raise HTTPException(status_code=404, detail="File not found")
    
    return FileResponse(file_path)


# ============ DASHBOARD STATS ============

@api_router.get("/admin/stats")
async def admin_get_stats(email: str = Depends(verify_jwt_token)):
    """Get dashboard statistics (admin only)"""
    contacts_count = await db.contacts.count_documents({})
    contacts_pending = await db.contacts.count_documents({"status": "pending"})
    
    applications_count = await db.applications.count_documents({})
    applications_pending = await db.applications.count_documents({"status": "pending"})
    
    blog_count = await db.blog_posts.count_documents({})
    
    # Count files
    files_count = len(list(UPLOAD_DIR.glob('*'))) if UPLOAD_DIR.exists() else 0
    
    # Recent activity
    recent_contacts = await db.contacts.find({}, {"_id": 0}).sort("created_at", -1).limit(5).to_list(5)
    recent_applications = await db.applications.find({}, {"_id": 0}).sort("created_at", -1).limit(5).to_list(5)
    
    return {
        "contacts": {
            "total": contacts_count,
            "pending": contacts_pending
        },
        "applications": {
            "total": applications_count,
            "pending": applications_pending
        },
        "blog_posts": blog_count,
        "files": files_count,
        "recent_contacts": recent_contacts,
        "recent_applications": recent_applications
    }


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
