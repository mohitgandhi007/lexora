import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { serve } from "@hono/node-server";
import { authRoutes } from "./routes/auth.js";
import { tenantsRouter } from "./routes/tenants.js";
import { usersRouter } from "./routes/users.js";
import { documentRoutes } from "./routes/documents.js";
import { summaryRoutes } from "./routes/summaries.js";
import { searchRoutes } from "./routes/search.js";
import { getDbStatus } from "./db/index.js";
import { authMiddleware } from "./middlewares/auth.js";

const app = new Hono();

// Global Middleware
app.use("*", logger());
app.use("*", cors());

// Health & Database Diagnostics
app.get("/health", (c) => {
  const dbStatus = getDbStatus();
  return c.json({
    status: "ok",
    service: "Lexora Hono API Gateway",
    version: "2.0.0",
    database: dbStatus,
    timestamp: new Date().toISOString(),
  });
});

// Public Authentication & Onboarding
app.route("/api/auth", authRoutes);
app.route("/auth", authRoutes);

// Apply auth middleware for context variables
app.use("/api/*", authMiddleware);
app.use("/*", authMiddleware);

// Organization / Chambers Tenants
app.route("/api/tenants", tenantsRouter);
app.route("/tenants", tenantsRouter);

// Counsel & Staff Users
app.route("/api/users", usersRouter);
app.route("/users", usersRouter);

// Documents & Milestones
app.route("/api/documents", documentRoutes);
app.route("/documents", documentRoutes);

// Intelligence Summaries
app.route("/api/summaries", summaryRoutes);
app.route("/summaries", summaryRoutes);

// Research & Search
app.route("/api/search", searchRoutes);
app.route("/search", searchRoutes);

const port = Number(process.env.PORT) || 8787;
console.log(`⚖️ Lexora Hono API Gateway active on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});

export default app;
