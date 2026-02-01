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
- **Enhancement**: Grain texture overlay, decorative gold lines

## User Personas
- **Primary**: Indian SME & Mainboard Business Owners/Promoters
- **Annual Turnover**: ₹50 Cr - ₹200 Cr
- **Goals**: National visibility, legacy building, wealth liquidity
- **Pain Points**: Feeling "invisible" in public markets, wealth trapped in business

## What's Been Implemented

### Phase 1 - Initial Build (Complete)
- ✅ Single-page landing with all 6 sections
- ✅ "Executive Midnight" luxury design system
- ✅ Google Fonts integration (Playfair Display + Inter)
- ✅ Fully responsive design with mobile optimization
- ✅ Application form with validation
- ✅ Toast notifications for form feedback
- ✅ Smooth scroll behavior

### Phase 2 - Design Refinement (Complete)
- ✅ Fixed luxury navigation with RUSHABH VENTURES logo
- ✅ Gradient backgrounds for depth (navy to darker navy)
- ✅ Subtle grain texture overlay across site
- ✅ Decorative gold accent lines
- ✅ Enhanced typography hierarchy
- ✅ Improved hover animations with cubic-bezier easing

### Phase 3 - Hero Layout Update (Complete)
- ✅ Changed hero from split layout to centered layout
- ✅ Removed 3D Spline component per client request
- ✅ Full-width centered content with text-center alignment
- ✅ Button styled with brackets: "[ UNLOCK MY ROADMAP ]"

### Phase 4 - Additional Pages (Complete)
- ✅ **About Us Page** (/about) - Hero banner with company story
- ✅ **Contact Us Page** (/contact) - Contact form with info
- ✅ **Privacy Policy** (/privacy) - Professional 8-section policy
- ✅ **Terms & Conditions** (/terms) - Comprehensive 12-section terms

### Phase 5 - Blog Section (Complete)
- ✅ **Blog List Page** (/blog) - Grid layout with blog post cards
- ✅ **Blog Post Page** (/blog/:slug) - Individual article layout
- ✅ 4 blog posts with IPO-focused content
- ✅ Category badges, read time indicators
- ✅ Related articles section

### Phase 6 - Backend Integration (Complete - Feb 1, 2025)
- ✅ **Contact Form API** (`POST /api/contact`) - Saves to MongoDB
- ✅ **Application Form API** (`POST /api/application`) - Saves to MongoDB
- ✅ **Email Notifications** - Gmail SMTP integration sends notifications to justb2bemails@gmail.com
- ✅ **Blog CRUD API** - Full REST API for blog management
  - `GET /api/blog` - List all posts
  - `GET /api/blog/:slug` - Get single post
  - `POST /api/blog` - Create post
  - `PUT /api/blog/:slug` - Update post
  - `DELETE /api/blog/:slug` - Delete post
- ✅ **Header Navigation** - Added nav links (Home, About, Blog, Contact)
- ✅ **Mobile Menu** - Responsive hamburger menu for mobile devices
- ✅ **Data-testid Attributes** - Added for better testability

## Site Structure

### Pages
1. **Home** (/) - Main landing page with hero and application form
2. **About Us** (/about) - Company story and approach
3. **Contact Us** (/contact) - Contact form and information
4. **Blog** (/blog) - Blog listing page
5. **Blog Post** (/blog/:slug) - Individual blog article
6. **Privacy Policy** (/privacy) - Privacy policy document
7. **Terms & Conditions** (/terms) - Terms document

### Navigation
- Fixed top navigation with links: Home, About, Blog, Contact
- Active page indicator (gold underline)
- Mobile hamburger menu for responsive design
- Footer navigation with all page links

## Technical Stack
- **Frontend**: React 19, React Router DOM, Tailwind CSS, Lucide React
- **Backend**: FastAPI, Motor (async MongoDB driver)
- **Database**: MongoDB
- **Email**: Gmail SMTP with App Password

## API Endpoints

### Contact/Application
- `POST /api/contact` - Submit contact form (sends email notification)
- `GET /api/contacts` - List all contacts
- `POST /api/application` - Submit IPO application (sends email notification)
- `GET /api/applications` - List all applications

### Blog
- `GET /api/blog` - List all blog posts
- `GET /api/blog/:slug` - Get single blog post by slug
- `POST /api/blog` - Create new blog post
- `PUT /api/blog/:slug` - Update existing blog post
- `DELETE /api/blog/:slug` - Delete blog post

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
  status: String ("pending")
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
  status: String ("pending")
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
│   ├── server.py           # FastAPI app with all endpoints
│   ├── email_service.py    # Gmail SMTP service
│   ├── seed_data.py        # Blog data seeder
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
    │   │   └── BlogPost.jsx
    │   ├── utils/
    │   │   ├── api.js        # API service functions
    │   │   ├── blogData.js   # Fallback blog data
    │   │   └── mock.js       # Legacy mock (deprecated)
    │   ├── App.js
    │   └── index.css
    └── .env
```

## Environment Variables

### Backend (.env)
```
MONGO_URL="mongodb://localhost:27017"
DB_NAME="test_database"
CORS_ORIGINS="*"
GMAIL_USER="justb2bemails@gmail.com"
GMAIL_APP_PASSWORD="[REDACTED]"
NOTIFICATION_EMAIL="justb2bemails@gmail.com"
```

### Frontend (.env)
```
REACT_APP_BACKEND_URL=https://venture-partners-1.preview.emergentagent.com
```

## Prioritized Backlog

### P0 - Completed
- ✅ Backend API for form submissions
- ✅ MongoDB storage for contacts/applications
- ✅ Email notifications on new submissions
- ✅ Blog CRUD API

### P1 Features (Next Priority)
- Admin dashboard to view applications and contacts
- Blog CMS interface (create/edit/delete posts via UI)
- Analytics tracking (Google Analytics/PostHog)

### P2 Features (Future Enhancements)
- Lead scoring based on turnover/margins
- Automated follow-up email sequences
- Calendar integration for booking consultations
- Social proof widget ("12 applications this week")
- "As Seen In" media logos section
- Newsletter subscription
- Blog categories and tags filtering
- Blog search functionality
- Social sharing buttons for blog posts

### P3 Features (Nice-to-Have)
- Case study detail pages for each IPO success
- Video testimonials from past clients
- Resources section (whitepapers, guides)
- Multi-language support (Hindi, Gujarati)
- WhatsApp integration for instant contact
- Blog comments system
- Author pages
- Blog RSS feed

## Test Reports
- `/app/test_reports/iteration_1.json` - Backend API tests (18/18 passed)
- `/app/backend/tests/test_api.py` - pytest test suite
