import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { createTenantSchema, updateTenantSchema } from "../validators/schemas.js";
import { createTenant, getTenantById, listTenants, updateTenant } from "../db/queries.js";

export const tenantsRouter = new Hono();

// List all tenants (chambers)
tenantsRouter.get("/", async (c) => {
  const tenants = await listTenants();
  return c.json({ success: true, data: tenants, error: null });
});

// Get single tenant by ID
tenantsRouter.get("/:id", async (c) => {
  const id = c.req.param("id");
  const tenant = await getTenantById(id);
  if (!tenant) {
    return c.json({ success: false, data: null, error: { message: "Chambers tenant not found" } }, 404);
  }
  return c.json({ success: true, data: tenant, error: null });
});

// Create new tenant organization
tenantsRouter.post("/", zValidator("json", createTenantSchema), async (c) => {
  const input = c.req.valid("json");
  const tenant = await createTenant(input);
  return c.json({ success: true, data: tenant, error: null }, 201);
});

// Update tenant profile
tenantsRouter.patch("/:id", zValidator("json", updateTenantSchema), async (c) => {
  const id = c.req.param("id");
  const input = c.req.valid("json");
  const updated = await updateTenant(id, input);
  if (!updated) {
    return c.json({ success: false, data: null, error: { message: "Chambers tenant not found" } }, 404);
  }
  return c.json({ success: true, data: updated, error: null });
});

export default tenantsRouter;
