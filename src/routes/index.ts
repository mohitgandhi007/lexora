import { Hono } from "hono";
import tenantsRouter from "./tenants.js";
import usersRouter from "./users.js";
import documentsRouter from "./documents.js";
import { authMiddleware } from "../middlewares/auth.js";
import type { Variables } from "../middlewares/auth.js";

const apiRouter = new Hono<{ Variables: Variables }>();

// Public routes (if any) could go here

// Mount routes
apiRouter.route("/tenants", tenantsRouter); // Needs super admin in reality

// Apply auth middleware to all subsequent routes
apiRouter.use("/*", authMiddleware);

apiRouter.route("/users", usersRouter);
apiRouter.route("/documents", documentsRouter);

export default apiRouter;
