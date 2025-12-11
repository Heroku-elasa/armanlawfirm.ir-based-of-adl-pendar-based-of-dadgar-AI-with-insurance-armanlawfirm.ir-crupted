# موسسه حقوقی آرمان | Arman Law Firm CMS

A WordPress-inspired CMS with an AI-powered legal services landing page (Persian RTL).

## Overview

This application features:
- **Landing Page**: Arman Law Firm website with AI-powered legal services
- **CMS Dashboard**: WordPress-style admin for content management
- **Posts/Pages Management**: Create, edit, delete content
- **Import/Export**: Content backup and migration

## Routes

- `/` - Landing page (Arman Law Firm, Persian RTL)
- `/dashboard` - Admin dashboard with stats
- `/posts` - Posts management
- `/pages` - Pages management
- `/posts/new` - Create new post
- `/posts/:id` - Edit existing post

## Technology Stack

- **Frontend**: React with Vite, TailwindCSS, shadcn/ui components
- **Backend**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Routing**: wouter (frontend), Express (backend)

## Project Structure

```
client/src/
  pages/
    landing.tsx    - Main landing page (RTL Persian law firm)
    dashboard.tsx  - Admin dashboard with stats
    posts.tsx      - Posts listing
    edit-post.tsx  - Post editor
  components/
    admin-layout.tsx - WordPress-style admin layout

server/
  routes.ts        - API endpoints
  storage.ts       - Database operations
  db.ts            - Database connection

shared/
  schema.ts        - Drizzle schema definitions
```

## API Endpoints

### Posts
- `GET /api/posts` - List all posts
- `GET /api/posts/:id` - Get single post
- `POST /api/posts` - Create post
- `PATCH /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post

### Media
- `GET /api/media` - List all media
- `POST /api/media` - Create media item
- `DELETE /api/media/:id` - Delete media

### Options
- `GET /api/options` - Get all options
- `POST /api/options` - Set option

### Migration
- `GET /api/export` - Export all content
- `POST /api/import` - Import content with defaults

### Dashboard
- `GET /api/stats` - Get content statistics

## Database Schema

- **posts**: id, title, slug, content, excerpt, status, type, author, featuredImage, createdAt, updatedAt
- **media**: id, title, filename, url, mimeType, altText, createdAt
- **options**: id, name, value
- **users**: id, username, password

## Landing Page Sections

1. Header with navigation (RTL)
2. Hero with AI consultation input
3. Statistics bar (500+ cases, 1000+ users, 24/7 support, 50+ years)
4. Quick services cards
5. Smart court assistant feature
6. Case studies
7. Pricing plans
8. Why AI section
9. Process steps (3 stages)
10. Client testimonials
11. Contact & booking form
12. FAQ accordion
13. Footer

## Color Theme

- Primary: Amber (#F59E0B)
- Background: Slate (#0F172A to #1E293B)
- Text: White/Slate variations

## Running the App

The application runs on port 5000 and starts with `npm run dev`.
