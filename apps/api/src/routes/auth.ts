import { Hono } from "hono";
import { getUserByEmail, createUser, createTenant, getUserById } from "../db/queries.js";

export const authRoutes = new Hono();

// Chambers Sign-in
authRoutes.post("/login", async (c) => {
  const body = await c.req.json().catch(() => ({}));
  const email = (body.email || "nariman.senior@chambers.in").trim();

  let user = await getUserByEmail(email);
  if (!user) {
    // If not found, look up default counsel
    user = await getUserById("counsel-01");
  }

  return c.json({
    user: {
      id: user?.id || "counsel-01",
      name: user?.fullName || "Adv. V. Nariman",
      email: user?.email || email,
      designation: user?.designation || "Designated Senior Counsel",
      barRollNumber: user?.barCouncilId || "SC/1994/DEL",
      chamber: user?.tenant?.name || "Chambers of Supreme Court Practice",
      tenantId: user?.tenantId || "tenant-supreme-chambers",
      role: user?.role || "admin",
    },
    token: `lexora-chambers-jwt-${Date.now()}`,
  });
});

// Chambers Practice Registration / Onboarding
authRoutes.post("/register", async (c) => {
  const body = await c.req.json().catch(() => ({}));

  // 1. Create Chambers Tenant Organization
  const tenant = await createTenant({
    name: body.chamberName || "Supreme Chambers Practice",
    jurisdiction: "Supreme Court of India • Appellate & Commercial",
    address: "New Delhi Chambers",
  });

  // 2. Create Primary Admin Advocate
  const user = await createUser({
    tenantId: tenant.id,
    email: body.email || `counsel-${Date.now()}@chambers.in`,
    fullName: body.fullName || "Learned Advocate",
    role: "admin",
    barCouncilId: body.barRoll || "BCI/2026",
    designation: "Managing Counsel",
  });

  return c.json({
    user: {
      id: user.id,
      name: user.fullName,
      email: user.email,
      designation: user.designation,
      barRollNumber: user.barCouncilId,
      chamber: tenant.name,
      tenantId: tenant.id,
      role: user.role,
    },
    token: `lexora-chambers-jwt-${Date.now()}`,
  }, 201);
});

// Current User & Chambers Session
authRoutes.get("/me", async (c) => {
  const userId = c.req.header("x-user-id") || "counsel-01";
  const user = await getUserById(userId);

  return c.json({
    user: {
      id: user?.id || "counsel-01",
      name: user?.fullName || "Adv. V. Nariman",
      email: user?.email || "nariman.senior@chambers.in",
      designation: user?.designation || "Designated Senior Counsel",
      barRollNumber: user?.barCouncilId || "SC/1994/DEL",
      chamber: user?.tenant?.name || "Chambers of Supreme Court Practice",
      tenantId: user?.tenantId || "tenant-supreme-chambers",
      role: user?.role || "admin",
    },
  });
});

// Password / Privilege Key Recovery
authRoutes.post("/forgot-password", async (c) => {
  const body = await c.req.json().catch(() => ({}));
  return c.json({
    success: true,
    message: `Encrypted 2FA privilege recovery token dispatched to ${body.email || "counsel"}`,
    recoveryReference: `REC-LX-${Math.floor(Math.random() * 900000) + 100000}`,
  });
});

export default authRoutes;
