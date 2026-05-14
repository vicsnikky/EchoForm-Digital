# SchoolPulse Technical Architecture

## Tech Stack
- **Frontend**: React 18, Vite, Tailwind CSS, Framer Motion (for subtle transitions).
- **Backend/API**: Express.js (Node.js) with TypeScript.
- **Database**: SQLite (Development) / PostgreSQL (Production) with Multi-tenant isolation.
- **Server**: Cloud Run (Containerized).
- **Storage**: Cloud Storage with signed URLs for confidential documents.

## Multi-tenant Strategy
- **Shared DB, Isolated Rows**: Every table has a `school_id`.
- **Global Context**: Backend middleware extracts `school_id` from the JWT/Session.
- **Scoped Storage**: Files stored under `media/schools/{schoolId}/`.

## Frontend Organization
- `/src/components`: Atomic UI components (Buttons, Cards, Inputs).
- `/src/modules`: Role-specific logic (Admin, Teacher, Parent).
- `/src/services`: API clients (Firebase/Express).
- `/src/hooks`: Custom data fetching and auth hooks.

## Performance Optimization
- **Code Splitting**: Role-based route bundles.
- **Image Optimization**: WebP and lazy loading.
- **Caching**: Service worker for offline-first attendance.
- **HTMX-like Patterns**: Using lightweight React patterns that minimize state re-renders.

## Security
- **RBAC**: Role-Based Access Control enforced at both UI and API levels.
- **Data Isolation**: Strict `WHERE school_id = ?` on every query.
- **Audit Logs**: Every action (score update, fee record) is logged with a timestamp and user ID.
