import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { createUserSchema, updateUserSchema } from "../validators/schemas.js";
import { createUser, getUserById, listUsersForTenant, updateUser } from "../db/queries.js";
import type { AuthVariables } from "../middlewares/auth.js";

export const usersRouter = new Hono<{ Variables: AuthVariables }>();

// List all advocates / staff for current chambers tenant
usersRouter.get("/", async (c) => {
  const tenantId = c.get("tenantId");
  const users = await listUsersForTenant(tenantId);
  return c.json({ success: true, data: users, error: null });
});

// Get user profile by ID
usersRouter.get("/:id", async (c) => {
  const id = c.req.param("id");
  const user = await getUserById(id);
  if (!user) {
    return c.json({ success: false, data: null, error: { message: "Counsel profile not found" } }, 404);
  }
  return c.json({ success: true, data: user, error: null });
});

// Create / invite new counsel or staff to chambers
usersRouter.post("/", zValidator("json", createUserSchema), async (c) => {
  const tenantId = c.get("tenantId");
  const input = c.req.valid("json");

  const user = await createUser({
    tenantId,
    email: input.email,
    fullName: input.fullName,
    role: input.role,
    barCouncilId: input.barCouncilId,
    designation: input.designation,
  });

  return c.json({ success: true, data: user, error: null }, 201);
});

// Update counsel profile or role
usersRouter.patch("/:id", zValidator("json", updateUserSchema), async (c) => {
  const id = c.req.param("id");
  const input = c.req.valid("json");

  const updated = await updateUser(id, input);
  if (!updated) {
    return c.json({ success: false, data: null, error: { message: "Counsel profile not found" } }, 404);
  }

  return c.json({ success: true, data: updated, error: null });
});

export default usersRouter;
