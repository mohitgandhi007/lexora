import type { MiddlewareHandler } from "hono";

// Extend Hono Context to include our custom variables
export type Variables = {
  tenantId: string;
  userId: string;
};

export const authMiddleware: MiddlewareHandler<{ Variables: Variables }> = async (c, next) => {
  // In a real application, you would validate a JWT or session token here.
  // For now, we expect "x-tenant-id" and "x-user-id" in headers for demonstration.
  
  const tenantId = c.req.header("x-tenant-id");
  const userId = c.req.header("x-user-id");

  if (!tenantId) {
    return c.json({ success: false, data: null, error: { message: "Unauthorized: Missing tenant ID" } }, 401);
  }

  if (!userId) {
    return c.json({ success: false, data: null, error: { message: "Unauthorized: Missing user ID" } }, 401);
  }

  // Inject into context
  c.set("tenantId", tenantId);
  c.set("userId", userId);

  await next();
};
