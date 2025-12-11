# موسسه حقوقی آرمان | Arman Law Firm

A WordPress-style content management system with an AI-powered legal services landing page.

## Features

### Landing Page (Persian RTL)
- **Hero Section**: AI-powered legal consultation with smart search input
- **Statistics**: Display of successful cases, active users, 24/7 support, years of experience
- **Quick Services**: Legal consultation, emergency help, appointments, legal office finder
- **Smart Court Assistant**: Live voice analysis and legal response suggestions
- **Case Studies**: Showcase of successful legal cases
- **Pricing Plans**: Service packages with discounts
- **Why AI Section**: Benefits of AI-powered legal assistance
- **Process Steps**: 3-step cooperation workflow
- **Testimonials**: Client reviews and feedback
- **FAQ Section**: Expandable frequently asked questions
- **Contact Information**: Office address, booking forms, navigation links

### CMS Dashboard
- **Dashboard**: Overview of content statistics (posts, pages, published, drafts)
- **Posts Management**: Create, edit, and delete blog posts
- **Pages Management**: Create, edit, and delete static pages
- **Import/Export**: Backup and restore your content as JSON
- **Automatic Slug Generation**: URLs are automatically generated from titles
- **Status Management**: Draft or publish your content

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the database:
   ```bash
   npm run db:push
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser to `http://localhost:5000`

## Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page (Arman Law Firm) |
| `/dashboard` | Admin dashboard |
| `/posts` | Posts management |
| `/pages` | Pages management |
| `/posts/new` | Create new post |
| `/posts/:id` | Edit existing post |

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/posts` | Get all posts (use `?type=page` for pages) |
| GET | `/api/posts/:id` | Get a single post |
| POST | `/api/posts` | Create a new post |
| PATCH | `/api/posts/:id` | Update a post |
| DELETE | `/api/posts/:id` | Delete a post |
| GET | `/api/media` | Get all media items |
| POST | `/api/media` | Upload media |
| DELETE | `/api/media/:id` | Delete media |
| GET | `/api/options` | Get site options |
| POST | `/api/options` | Set site option |
| GET | `/api/stats` | Get dashboard statistics |
| GET | `/api/export` | Export all content |
| POST | `/api/import` | Import content |

## Tech Stack

- **Frontend**: React, Tailwind CSS, shadcn/ui, React Query
- **Backend**: Express.js, Node.js
- **Database**: PostgreSQL with Drizzle ORM
- **Routing**: Wouter
- **Language**: TypeScript

## Project Structure

```
├── client/              # Frontend React application
│   ├── src/
│   │   ├── components/  # UI components
│   │   ├── pages/       # Page components
│   │   │   ├── landing.tsx    # Main landing page (RTL Persian)
│   │   │   ├── dashboard.tsx  # Admin dashboard
│   │   │   ├── posts.tsx      # Posts listing
│   │   │   └── edit-post.tsx  # Post editor
│   │   ├── hooks/       # Custom hooks
│   │   └── lib/         # Utilities
│   └── index.html
├── server/              # Backend Express server
│   ├── db.ts           # Database connection
│   ├── routes.ts       # API routes
│   ├── storage.ts      # Data access layer
│   └── index.ts        # Server entry point
├── shared/              # Shared types and schemas
│   └── schema.ts       # Database schema
└── package.json
```

## Contact

- **Address**: تهران، جردن، خیابان طاهری پلاک ۱۸
- **Phone**: ۰۹۰۲۷۳۷۰۲۶۰

## License

MIT
