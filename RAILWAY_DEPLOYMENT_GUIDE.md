# Railway Deployment & Architecture Guide - SchoolPulse

This guide outlines the transition from Vercel (Frontend only) to a robust full-stack architecture on **Railway.app**.

## 1. APIs & Backend Logic
- **Runtime:** Node.js (Express/FastAPI) or Python (Django). Railway runs these as persistent services.
- **Architecture:** Use a monorepo or separate services within one Railway project.
- **Port Binding:** Ensure your backend listens on `0.0.0.0:$PORT` (Railway provides the `PORT` env variable).

## 2. Database & Storage
- **Database:** Provision a **Managed PostgreSQL** instance on Railway. Use **Prisma** or **TypeORM** for migrations.
- **Storage:** Since Railway's filesystem is ephemeral, use **AWS S3** or **Google Cloud Storage** for school logos, stamps, and signatures.
- **Caching:** Provision a **Railway Redis** instance for session storage and performance.

## 3. Auth & Permissions
- **Strategy:** Use **JWT (JSON Web Tokens)** or **Session-based auth** (Passport.js/Lucia).
- **RBAC:** Implement middleware that checks the `user.roles` array against the required permissions for each route.
- **Multi-tenancy:** Every database row must have a `school_id`. Use "Global Scopes" in your ORM to ensure one school cannot see another's data.

## 4. Security & RLS
- **Environment Variables:** Keep all secrets (DB_URL, JWT_SECRET, S3_KEYS) in Railway's "Variables" tab.
- **SQL RLS:** If you use a Postgres provider like Supabase, use Row Level Security. On Railway, handle isolation at the Application Layer (Middleware).
- **CORS:** Only white-list your frontend domain.

## 5. Hosting & Deployment (CI/CD)
- **CI/CD:** Connect your GitHub repo to Railway. Every push to `main` triggers an automatic build and zero-downtime deploy.
- **Version Control:** Use `Railway.json` to define custom start commands or health check endpoints.

## 6. Rate Limiting & Performance
- **Rate Limiting:** Use `express-rate-limit` with **Redis** to prevent brute force attacks on the login/forgot-password routes.
- **CDN:** Point your domain through **Cloudflare**. Use Cloudflare for SSL (Full/Strict), DDoS protection, and edge caching of static assets.

## 7. Scaling & Load Balancing
- **Horizontal Scaling:** Railway allows you to increase the "Replica" count. The Railway Edge Proxy automatically balances traffic between replicas.
- **Auto-scaling:** Monitor RAM/CPU metrics; Railway notifies you when it's time to bump up resources.

## 8. Error Tracking & Logs
- **Logging:** Use `winston` or `pino` to format logs. Railway's "Live Logs" dashboard shows real-time stdout/stderr.
- **Error Tracking:** Integrate **Sentry** (sentry.io). It will alert you via Email/Slack the moment a backend error or frontend crash occurs.

## 9. Availability & Recovery
- **Backups:** Railway performs daily snapshots of your PostgreSQL database.
- **Health Checks:** Configure a `/health` endpoint in your backend. Railway will restart the container if this endpoint stops responding.
- **DR Plan:** Keep regular backups of your S3 storage and DB snapshots in a different cloud region.
