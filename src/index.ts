import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import apiRouter from "./routes/index.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = new Hono();

// Global Middlewares
app.use("*", logger());
app.use("*", cors());

// Error Handler
app.onError(errorHandler);

// Health check endpoint
app.get("/health", (c) => c.json({ status: "ok", timestamp: new Date() }));

// Mount API router
app.route("/api", apiRouter);

const port = Number(process.env.PORT) || 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port
});
