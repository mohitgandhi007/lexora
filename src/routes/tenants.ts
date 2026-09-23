import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { createTenantSchema } from "../validators/schemas.js";
import { createTenant } from "../db/queries.js";

const tenantsRouter = new Hono();

// Note: In a real app, creating a tenant might be restricted to super-admins
tenantsRouter.post("/", zValidator("json", createTenantSchema), async (c) => {
  const { name } = c.req.valid("json");
  
  const tenant = await createTenant(name);
  
  return c.json({
    success: true,
    data: tenant,
    error: null,
  }, 201);
});

export default tenantsRouter;
