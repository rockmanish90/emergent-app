# Rushabh Ventures - Landing Page PRD

## Original Problem Statement
Build a high-converting landing page for Rushabh Ventures, an elite IPO consultancy that helps high-growth Indian SME and Mainboard companies go public. The target audience is business owners/promoters with ₹50-200 Cr annual turnover who want legacy and liquid wealth through IPO.

**Design Standard**: Match $20,000+ agency-quality websites with luxury "Executive Midnight" aesthetic inspired by private cigar lounges and high-end investment banks.

## Design System
- **Style**: "Executive Midnight" luxury aesthetic (private bank/cigar lounge vibe)
- **Colors**:
  - Primary: Deep Navy Blue (#0A192F to #050d1a gradient) - Trust
  - Secondary: Charcoal Black (#000000) - Power
  - Accent: Brushed Gold (#D4AF37, #C5A028) - Wealth/Success
  - Text: White (#FFFFFF), Light Grey (rgba(229, 231, 235, 0.9))
- **Typography**:
  - Headlines: Playfair Display (serif, heavy weight)
  - Body: Inter (sans-serif, clean weights)

## User Personas
- **Primary**: Indian SME & Mainboard Business Owners/Promoters
- **Annual Turnover**: ₹50 Cr - ₹200 Cr
- **Goals**: National visibility, legacy building, wealth liquidity

## What's Been Implemented

### Phase 1 - Initial Build (Complete)
- ✅ Single-page landing with all 6 sections
- ✅ "Executive Midnight" luxury design system
- ✅ Google Fonts integration (Playfair Display + Inter)
- ✅ Fully responsive design with mobile optimization
- ✅ Application form with validation
- ✅ Toast notifications for form feedback

### Phase 2 - Design Refinement (Complete)
- ✅ Fixed luxury navigation with RUSHABH VENTURES logo
- ✅ Gradient backgrounds for depth
- ✅ Enhanced typography hierarchy
- ✅ Improved hover animations

### Phase 3 - Hero Layout Update (Complete)
- ✅ Centered hero layout
- ✅ Full-width centered content

### Phase 4 - Additional Pages (Complete)
- ✅ **About Us Page** (/about)
- ✅ **Contact Us Page** (/contact)
- ✅ **Privacy Policy** (/privacy)
- ✅ **Terms & Conditions** (/terms)

### Phase 5 - Blog Section (Complete)
- ✅ **Blog List Page** (/blog)
- ✅ **Blog Post Page** (/blog/:slug)
- ✅ 4 IPO-focused blog posts

### Phase 6 - Backend Integration (Complete - Feb 1, 2025)
- ✅ **Contact Form API** (`POST /api/contact`) - Saves to MongoDB + Email notification
- ✅ **Application Form API** (`POST /api/application`) - Saves to MongoDB + Email notification
- ✅ **Blog CRUD API** - Full REST API for blog management
- ✅ **Gmail SMTP Integration** - Notifications to justb2bemails@gmail.com

### Phase 7 - Admin Panel (Complete - Feb 1, 2025)
- ✅ **Admin Login** (/admin) - Simple password authentication with JWT
- ✅ **Dashboard Overview** - Stats cards for applications, contacts, blog posts, files
- ✅ **Applications Tab** - List, search, filter, status update, delete
- ✅ **Contacts Tab** - List, search, filter, status update, delete
- ✅ **Blog CMS** - Create, edit, delete blog posts with auto-slug generation
- ✅ **File Manager** - Upload, download, copy URL, delete files
- ✅ **Mobile Responsive** - Hamburger menu for admin on mobile

## Site Structure

### Public Pages
1. **Home** (/) - Main landing page with hero and application form
2. **About Us** (/about) - Company story and approach
3. **Contact Us** (/contact) - Contact form and information
4. **Blog** (/blog) - Blog listing page
5. **Blog Post** (/blog/:slug) - Individual blog article
6. **Privacy Policy** (/privacy)
7. **Terms & Conditions** (/terms)

### Admin Pages
1. **Admin Login** (/admin) - Secure login portal
2. **Admin Dashboard** (/admin/dashboard) - Management interface with tabs

## Technical Stack
- **Frontend**: React 19, React Router DOM, Tailwind CSS, Lucide React
- **Backend**: FastAPI, Motor (async MongoDB driver), PyJWT
- **Database**: MongoDB
- **Email**: Gmail SMTP with App Password
- **Auth**: JWT with 24hr expiration

## API Endpoints

### Public Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/contact | Submit contact form |
| POST | /api/application | Submit IPO application |
| GET | /api/blog | List all blog posts |
| GET | /api/blog/:slug | Get single blog post |
| GET | /api/files/:filename | Serve uploaded file |

### Admin Endpoints (JWT Protected)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/admin/login | Admin login |
| GET | /api/admin/verify | Verify token |
| GET | /api/admin/stats | Dashboard statistics |
| GET | /api/admin/contacts | List contacts |
| PUT | /api/admin/contacts/:id | Update contact |
| DELETE | /api/admin/contacts/:id | Delete contact |
| GET | /api/admin/applications | List applications |
| PUT | /api/admin/applications/:id | Update application |
| DELETE | /api/admin/applications/:id | Delete application |
| GET | /api/admin/blog | List blog posts |
| POST | /api/admin/blog | Create blog post |
| PUT | /api/admin/blog/:slug | Update blog post |
| DELETE | /api/admin/blog/:slug | Delete blog post |
| GET | /api/admin/files | List files |
| POST | /api/admin/files/upload | Upload file |
| DELETE | /api/admin/files/:filename | Delete file |

## Database Schema

### contacts
```javascript
{
  id: String (UUID),
  name: String,
  company_name: String,
  annual_turnover: String (optional),
  mobile_number: String,
  email: String (optional),
  message: String (optional),
  created_at: DateTime,
  status: String ("pending"|"contacted"|"converted"|"rejected"),
  notes: String
}
```

### applications
```javascript
{
  id: String (UUID),
  name: String,
  company_name: String,
  annual_turnover: String,
  mobile_number: String,
  created_at: DateTime,
  status: String ("pending"|"reviewing"|"qualified"|"contacted"|"converted"|"rejected"),
  notes: String
}
```

### blog_posts
```javascript
{
  id: String (UUID),
  slug: String (unique),
  title: String,
  excerpt: String,
  content: String (HTML),
  author: String,
  date: String,
  read_time: String,
  category: String,
  image: String (URL)
}
```

## File Structure
```
/app
├── backend/
│   ├── server.py           # FastAPI with all endpoints
│   ├── email_service.py    # Gmail SMTP service
│   ├── seed_data.py        # Blog data seeder
│   ├── uploads/            # Uploaded files directory
│   ├── tests/
│   │   └── test_admin_api.py
│   ├── requirements.txt
│   └── .env
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Header.jsx    # Navigation with mobile menu
    │   │   ├── Footer.jsx
    │   │   └── CTASection.jsx
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── AboutUs.jsx
    │   │   ├── ContactUs.jsx
    │   │   ├── PrivacyPolicy.jsx
    │   │   ├── TermsConditions.jsx
    │   │   ├── BlogList.jsx
    │   │   ├── BlogPost.jsx
    │   │   └── admin/
    │   │       ├── AdminLogin.jsx
    │   │       ├── AdminDashboard.jsx
    │   │       └── tabs/
    │   │           ├── ContactsTab.jsx
    │   │           ├── ApplicationsTab.jsx
    │   │           ├── BlogTab.jsx
    │   │           └── FilesTab.jsx
    │   ├── utils/
    │   │   ├── api.js        # Public API functions
    │   │   ├── adminApi.js   # Admin API functions
    │   │   └── blogData.js   # Fallback blog data
    │   ├── App.js
    │   └── index.css
    └── .env
```

## Admin Credentials
- **Email**: rushabhventureshq@gmail.com
- **Password**: rushabhventureshq
- **Access URL**: /admin

## Environment Variables

### Backend (.env)
```
MONGO_URL="mongodb://localhost:27017"
DB_NAME="test_database"
CORS_ORIGINS="*"
GMAIL_USER="justb2bemails@gmail.com"
GMAIL_APP_PASSWORD="[REDACTED]"
NOTIFICATION_EMAIL="justb2bemails@gmail.com"
ADMIN_EMAIL="rushabhventureshq@gmail.com"
ADMIN_PASSWORD="rushabhventureshq"
JWT_SECRET="[REDACTED]"
```

## Test Reports
- `/app/test_reports/iteration_1.json` - Backend API tests (18/18 passed)
- `/app/test_reports/iteration_2.json` - Admin panel tests (30/30 passed, 100% success)
- `/app/backend/tests/test_admin_api.py` - Admin API test suite

## Prioritized Backlog

### Completed ✅
- Landing page with luxury design
- Multi-page architecture
- Backend integration with MongoDB
- Email notifications via Gmail SMTP
- Admin dashboard with full CRUD
- Blog CMS
- File Manager

### P1 Features (Next Priority)
- Analytics integration (Google Analytics/PostHog)
- SEO optimization (meta tags, sitemap, robots.txt)
- Image optimization/CDN

### P2 Features (Future Enhancements)
- Lead scoring based on turnover/margins
- Automated follow-up email sequences
- Calendar integration for booking consultations
- Social proof widget ("12 applications this week")
- Newsletter subscription
- Blog categories/tags filtering
- Blog search functionality

### P3 Features (Nice-to-Have)
- Case study detail pages
- Video testimonials
- Resources section (whitepapers, guides)
- Multi-language support (Hindi, Gujarati)
- WhatsApp integration
- Blog comments system
