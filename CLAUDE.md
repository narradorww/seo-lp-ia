# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `yarn dev` - Start development server with Turbopack
- `yarn build` - Build for production
- `yarn start` - Start production server
- `yarn lint` - Run Next.js linting
- `yarn test` - Run Jest tests
- `yarn test:watch` - Run tests in watch mode
- `yarn test:coverage` - Run tests with coverage report

## Project Architecture

This is a Next.js 15 SEO landing page with visitor analytics and a "Magic Mirror" feature. Key architectural elements:

### Core Structure
- **Next.js 15 App Router** with TypeScript
- **CSS Modules** for component styling + global CSS
- **MongoDB** for visitor data storage
- **Resend** for email notifications
- **React Context** for modal state management

### API Routes (`src/app/api/`)
- `/api/visitor` - Tracks visitor data (IP, geolocation, user agent)
- `/api/visitor/enrich` - Enriches visitor data with additional details
- `/api/stats` - Retrieves visitor statistics
- `/api/geo` - Geolocation services
- `/api/notify` - Email notifications via Resend

### Component Organization
- `Layout/` - Header, Footer, Cookie Notice
- `Stats/` - Visitor analytics (charts, maps, lead scoring)
- `Portfolio/` - Profile and project showcase
- `MagicMirror/` - Interactive user input component
- `common/` - Reusable UI components

### Data Flow
1. Visitors tracked via middleware and API routes
2. Geolocation resolved using ipapi.co
3. Analytics displayed in `/dashboard` with interactive charts
4. Email notifications sent for new visits
5. Lead scoring based on organization and engagement

### Environment Variables
Required in `.env.local`:
- `RESEND_API_KEY` - Email service API key
- `EMAIL_FROM` - Sender email address
- `EMAIL_TO` - Notification recipient
- `MONGODB_URI` - Database connection string

### Testing
- Jest with React Testing Library
- Tests located in `src/__tests__/`
- Components tested with user interactions and snapshots
- Utilities have dedicated test files

### Key Features
- Responsive design with mobile-first approach
- Real-time visitor analytics with geographic mapping
- Lead enrichment with organizational data
- Multi-language metadata support (PT/EN)
- Portfolio showcase with project cards