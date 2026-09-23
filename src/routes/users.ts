import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { createUserSchema } from "../validators/schemas.js";
import { createUser, getUserByEmail } from "../db/queries.js";
import type { Variables } from "../middlewares/auth.js";

const usersRouter = new Hono<{ Variables: Variables }>();

usersRouter.post("/", zValidator("json", createUserSchema), async (c) => {
  const input = c.req.valid("json");
  const tenantId = c.get("tenantId");

  const existingUser = await getUserByEmail(input.email);
  if (existingUser) {
    return c.json({ success: false, data: null, error: { message: "Email already in use" } }, 409);
  }

  const user = await createUser({
    email: input.email,
    fullName: input.fullName,
    ...(input.role ? { role: input.role } : {}),
    ...(input.barCouncilId ? { barCouncilId: input.barCouncilId } : {}),
    tenantId,
  });

  return c.json({
    success: true,
    data: user,
    error: null,
  }, 201);
});

usersRouter.get("/me", async (c) => {
  const userId = c.get("userId");
  const tenantId = c.get("tenantId");

  // In a real app we might fetch user by ID
  // Here we just return the ids as verification
  return c.json({
    success: true,
    data: { userId, tenantId },
    error: null,
  });
});

export default usersRouter;
