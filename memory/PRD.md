# Rushabh Ventures - Landing Page PRD

## Original Problem Statement
Build a high-converting landing page for Rushabh Ventures, an elite IPO consultancy that helps high-growth Indian SME companies go public. The target audience is business owners/promoters with ₹50-200 Cr annual turnover who want legacy and liquid wealth through IPO.

## Design System
- **Style**: "Executive Midnight" luxury aesthetic
- **Colors**:
  - Primary: Dark Navy (#0A192F), Charcoal Black (#111111)
  - Accent: Brushed Gold (#D4AF37)
  - Text: White (#FFFFFF), Light Grey (#E5E7EB)
- **Typography**:
  - Headlines: Playfair Display (serif)
  - Body: Inter (sans-serif)
- **Enhancement**: 3D Spline integration (animated neon spheres)

## User Personas
- **Primary**: Indian SME Business Owners & Promoters
- **Annual Turnover**: ₹50 Cr - ₹200 Cr
- **Goals**: National visibility, legacy building, wealth liquidity
- **Pain Points**: Feeling "invisible" in public markets, wealth trapped in business

## Core Requirements (Static)

### Landing Page Sections
1. **Hero Section** - Dark navy background with 3D visual, powerful headline, CTA
2. **Reality Check** - White background, contrast messaging
3. **Authority** - Light grey background, firm positioning
4. **Wall of Proof** - Deep navy, data showcase (460x, 173x, 49x subscriptions)
5. **Gatekeeper** - Black background, qualification checklist
6. **Final CTA/Form** - Gold background, application form

### Form Fields
- Name
- Company Name
- Annual Turnover (in Crores ₹)
- Mobile Number

## What's Been Implemented

### Date: January 31, 2025

#### Frontend (Completed)
- ✅ Single-page landing with all 6 sections
- ✅ "Executive Midnight" luxury design system
- ✅ Google Fonts integration (Playfair Display + Inter)
- ✅ 3D Spline integration (animated neon spheres in hero)
- ✅ Fully responsive design with mobile optimization
- ✅ Application form with validation
- ✅ Mock data handling (localStorage)
- ✅ Toast notifications for form feedback
- ✅ Smooth scroll behavior
- ✅ Hover animations and transitions
- ✅ High-contrast color scheme for luxury feel

#### Technical Stack
- React 19
- Tailwind CSS
- Spline 3D (@splinetool/react-spline)
- Sonner (toast notifications)
- Lucide React (icons)

#### Files Created
- `/app/frontend/src/pages/Home.jsx` - Main landing page component
- `/app/frontend/src/utils/mock.js` - Mock form submission handler
- Updated `/app/frontend/src/App.js` - Routes and Toaster
- Updated `/app/frontend/public/index.html` - Google Fonts, meta tags
- Updated `/app/frontend/src/App.css` - Responsive styles
- Updated `/app/frontend/src/index.css` - Global styles

## Prioritized Backlog

### P0 Features (Not Implemented)
- Backend API for form submission
- MongoDB storage for applications
- Email notifications to admin on new applications
- Admin dashboard to view applications

### P1 Features (Future Enhancements)
- Analytics tracking (Google Analytics/PostHog)
- A/B testing for different headlines
- Lead scoring based on turnover/margins
- Automated follow-up email sequences
- Calendar integration for booking consultations

### P2 Features (Nice-to-Have)
- Case study detail pages for each IPO success
- Video testimonials from past clients
- Blog/Resources section for thought leadership
- Multi-language support (Hindi, Gujarati)
- WhatsApp integration for instant contact

## Next Tasks
1. Build backend API (FastAPI) for form submission
2. Integrate MongoDB for storing applications
3. Remove mock data and connect frontend to backend
4. Add email notifications for new submissions
5. Build admin dashboard to review applications
6. Deploy to production

## Technical Notes
- Form currently uses localStorage for data persistence (MOCKED)
- All form interactions are client-side only
- No backend integration yet
- Ready for backend integration when needed
