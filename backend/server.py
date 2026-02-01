from fastapi import FastAPI, APIRouter, HTTPException, BackgroundTasks
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone

from email_service import send_contact_notification, send_application_notification

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
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


# Application Form Models (Homepage IPO form)
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


# Blog Models
class BlogPostCreate(BaseModel):
    slug: str
    title: str
    excerpt: str
    content: str
    author: str = "Rushabh Ventures Team"
    category: str
    image: str
    read_time: str = "5 min read"

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


# Add your routes to the router instead of directly to app
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
        "status": "pending"
    }
    
    await db.contacts.insert_one(contact_doc)
    
    # Send email notification in background
    background_tasks.add_task(send_contact_notification, contact_doc)
    
    return ContactResponse(**{k: v for k, v in contact_doc.items() if k != '_id'})


@api_router.get("/contacts", response_model=List[ContactResponse])
async def get_contacts():
    """Get all contact submissions"""
    contacts = await db.contacts.find({}, {"_id": 0}).to_list(1000)
    return contacts


# Application Form Endpoints (Homepage IPO form)
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
        "status": "pending"
    }
    
    await db.applications.insert_one(app_doc)
    
    # Send email notification in background
    background_tasks.add_task(send_application_notification, app_doc)
    
    return ApplicationResponse(**{k: v for k, v in app_doc.items() if k != '_id'})


@api_router.get("/applications", response_model=List[ApplicationResponse])
async def get_applications():
    """Get all IPO applications"""
    applications = await db.applications.find({}, {"_id": 0}).to_list(1000)
    return applications


# Blog Endpoints
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


@api_router.post("/blog", response_model=BlogPostResponse)
async def create_blog_post(post: BlogPostCreate):
    """Create a new blog post"""
    # Check if slug already exists
    existing = await db.blog_posts.find_one({"slug": post.slug})
    if existing:
        raise HTTPException(status_code=400, detail="A post with this slug already exists")
    
    post_id = str(uuid.uuid4())
    date = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    
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
        "image": post.image
    }
    
    await db.blog_posts.insert_one(post_doc)
    
    return BlogPostResponse(**{k: v for k, v in post_doc.items() if k != '_id'})


@api_router.put("/blog/{slug}", response_model=BlogPostResponse)
async def update_blog_post(slug: str, post: BlogPostCreate):
    """Update an existing blog post"""
    existing = await db.blog_posts.find_one({"slug": slug}, {"_id": 0})
    if not existing:
        raise HTTPException(status_code=404, detail="Blog post not found")
    
    update_data = {
        "title": post.title,
        "excerpt": post.excerpt,
        "content": post.content,
        "author": post.author,
        "read_time": post.read_time,
        "category": post.category,
        "image": post.image
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


@api_router.delete("/blog/{slug}")
async def delete_blog_post(slug: str):
    """Delete a blog post"""
    result = await db.blog_posts.delete_one({"slug": slug})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Blog post not found")
    return {"message": "Blog post deleted successfully"}


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()