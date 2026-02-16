# Daily Work Logger

A personal daily work logging tool built as a React SPA. Enables structured documentation of daily tasks through a smart, repeatable form with analytics and full data export.

## Features

- **Log Entry** — Fast daily task logging with project selection, categories, technology picker with sub-technologies, solo/team toggle, and descriptions
- **Smart Defaults** — Form remembers your last session's selections to minimize repetitive input
- **Dashboard** — Analytics with 6 chart types (bar, donut, stacked bar), stat cards, filterable entry history, and CSV/JSON export
- **Schema Manager** — Full CRUD for projects, categories, technologies, and sub-technologies
- **Mobile-First** — Responsive design with bottom nav on mobile, top nav on desktop
- **Dark Theme** — Modern dark UI with cold blue accent colors and warm accents where appropriate
- **Skeleton Loading** — Optimized loading states with shimmer animations
- **Firebase + LocalStorage** — Dual persistence with automatic localStorage fallback when Firebase is not configured

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + TypeScript |
| Build | Vite |
| Styling | Emotion (styled + css) |
| Charts | Recharts |
| Icons | Lucide React |
| Animations | Framer Motion |
| Database | Firebase Firestore (with localStorage fallback) |

## Project Structure

```
src/
├── theme/          # Design tokens: colors, spacing, shadows, typography, animations
├── ui/             # Reusable UI primitives: Button, Card, Input, Modal, etc.
├── components/     # Shared composite components
├── layouts/        # Page layout with navbar
├── pages/          # Page modules (LogEntry, Dashboard, SchemaManager)
│   └── */components/  # Page-specific components
├── context/        # React Context for global state management
├── hooks/          # Custom hooks (useLogEntry, useDashboard, useToast)
├── services/       # Firebase, storage, and export services
└── utils/          # Types, helpers, default schema data
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Opens at `http://localhost:5173`

### Production Build

```bash
npm run build
npm run preview
```

## Firebase Setup (Optional)

The app works out of the box with localStorage. To enable Firebase persistence:

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable Firestore Database
3. Copy `.env.example` to `.env` and fill in your Firebase config:

```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
```

4. Restart the dev server

## Usage Guide

### Logging Work

1. Navigate to **Log Entry** (default page)
2. Select your project (or create a new one inline)
3. For each task: pick categories, enter a title, select technologies and sub-technologies, choose solo/team
4. Click **Add Task** to log multiple tasks in one session
5. Click **Submit Day Log** to save

### Viewing Analytics

1. Navigate to **Dashboard**
2. Use the filters (date range, project, category) to focus your view
3. Scroll through charts and entry history
4. Export data as CSV or schema as JSON

### Managing Schema

1. Navigate to **Schema**
2. Add/remove projects, categories, technologies, and sub-technologies
3. Use the Danger Zone to reset data or schema if needed
