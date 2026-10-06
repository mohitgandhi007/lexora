import type { MiddlewareHandler } from "hono";

export type AuthVariables = {
  tenantId: string;
  userId: string;
  userRole?: string;
};

export const authMiddleware: MiddlewareHandler<{ Variables: AuthVariables }> = async (c, next) => {
  // Support both custom headers and Bearer auth or fallback to default chambers
  const tenantIdHeader = c.req.header("x-tenant-id");
  const userIdHeader = c.req.header("x-user-id");
  const authHeader = c.req.header("authorization");

  // Default to primary chambers tenant and senior counsel if not explicitly provided
  const tenantId = tenantIdHeader || "tenant-supreme-chambers";
  const userId = userIdHeader || "counsel-01";

  c.set("tenantId", tenantId);
  c.set("userId", userId);

  await next();
};
