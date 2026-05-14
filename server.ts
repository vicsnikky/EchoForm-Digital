import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Multi-tenant Middleware Simulation
  app.use((req, res, next) => {
    // In a real app, this would extract the tenant from the Host header or a sub-domain
    // e.g. stellaracademy.schoolpulse.africa
    const tenantId = req.headers['x-tenant-id'] || 'default';
    req.tenantId = tenantId;
    next();
  });

  // API routes go here FIRST
  app.get("/api/health", (req, res) => {
    res.json({ 
      status: "ok", 
      version: "1.0.0",
      platform: "SchoolPulse Africa"
    });
  });

  // Mock Data API (SaaS Multi-tenant flavored)
  app.get("/api/v1/school/stats", (req, res) => {
    res.json({
      school_id: req.tenantId,
      students: 1248,
      attendance_rate: 91,
      revenue: 5600000,
      active_teachers: 42
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 SchoolPulse Server running on http://localhost:${PORT}`);
  });
}

// Extend Request type for TypeScript
declare global {
  namespace Express {
    interface Request {
      tenantId?: string | string[];
    }
  }
}

startServer();
