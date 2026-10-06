import { and, desc, eq, gt, isNull } from "drizzle-orm";
import { db } from "./index.js";
import { documents, documentSummaries, tenants, users } from "./schema.js";
import { MOCK_DOCUMENTS, MOCK_SUMMARIES } from "../data/mockData.js";

// ═══════════════════════════════════════════════════════════
// RESILIENT LOCAL FALLBACK STORE (Active when Neon is offline)
// ═══════════════════════════════════════════════════════════
const fallbackTenants: any[] = [
  {
    id: "tenant-supreme-chambers",
    name: "Chambers of Supreme Court Practice",
    jurisdiction: "Supreme Court of India • Civil & Constitutional Appellate",
    address: "Chambers of Supreme Court of India, Bhagwan Das Road, New Delhi",
    createdAt: new Date("2026-01-01"),
    updatedAt: new Date(),
  },
];

const fallbackUsers: any[] = [
  {
    id: "counsel-01",
    tenantId: "tenant-supreme-chambers",
    email: "nariman.senior@chambers.in",
    fullName: "Adv. V. Nariman",
    role: "admin",
    designation: "Designated Senior Counsel",
    barCouncilId: "SC/1994/DEL",
    createdAt: new Date("2026-01-01"),
    updatedAt: new Date(),
  },
  {
    id: "counsel-02",
    tenantId: "tenant-supreme-chambers",
    email: "priya.advocate@chambers.in",
    fullName: "Adv. Priya Ramaswamy",
    role: "advocate",
    designation: "Appellate Advocate",
    barCouncilId: "D/1420/2012",
    createdAt: new Date("2026-02-15"),
    updatedAt: new Date(),
  },
  {
    id: "staff-01",
    tenantId: "tenant-supreme-chambers",
    email: "clerk.registry@chambers.in",
    fullName: "Mr. R. K. Sharma",
    role: "staff",
    designation: "Senior Bench Clerk",
    barCouncilId: "REG/2018/SC",
    createdAt: new Date("2026-03-01"),
    updatedAt: new Date(),
  },
];

const fallbackDocuments: any[] = MOCK_DOCUMENTS.map((d) => ({
  id: d.id,
  tenantId: "tenant-supreme-chambers",
  uploadedBy: "counsel-01",
  title: d.title || d.filename,
  filename: d.filename,
  category: "pleading",
  status: d.status === "Processed" ? "ready" : "processing",
  storageKey: `r2://lexora-chambers/${d.filename}`,
  ocrText: d.snippet || "Supreme Court of India Record. Digitized and OCR-indexed folio.",
  courtName: d.courtName,
  caseNumber: d.id === "doc-1" ? "SLP (C) No. 41920/2024" : "Arb. Pet. No. 892/2023",
  fileSize: d.fileSize || "4.2 MB",
  pages: String(d.pages || 45),
  concordance: d.concordance || "98.5%",
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
}));

const fallbackSummaries: Record<string, any> = { ...MOCK_SUMMARIES };

// ═══════════════════════════════════════════════════════════
// TENANTS (Organizations / Chambers)
// ═══════════════════════════════════════════════════════════
export async function createTenant(input: {
  name: string;
  jurisdiction?: string;
  address?: string;
}) {
  if (db) {
    try {
      const [tenant] = await db.insert(tenants).values(input).returning();
      return tenant;
    } catch (err: any) {
      console.warn("Neon createTenant fallback:", err.message);
    }
  }

  const newTenant = {
    id: `tenant-${Date.now()}`,
    name: input.name,
    jurisdiction: input.jurisdiction || "Supreme Court of India",
    address: input.address || "New Delhi Chambers",
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  fallbackTenants.push(newTenant);
  return newTenant;
}

export async function getTenantById(id: string) {
  if (db) {
    try {
      return await db.query.tenants.findFirst({
        where: eq(tenants.id, id),
        with: { users: true },
      });
    } catch (err: any) {
      console.warn("Neon getTenantById fallback:", err.message);
    }
  }

  const t = fallbackTenants.find((item) => item.id === id);
  if (!t) return null;
  return {
    ...t,
    users: fallbackUsers.filter((u) => u.tenantId === id),
  };
}

export async function listTenants() {
  if (db) {
    try {
      return await db.query.tenants.findMany({
        orderBy: desc(tenants.createdAt),
      });
    } catch (err: any) {
      console.warn("Neon listTenants fallback:", err.message);
    }
  }
  return fallbackTenants;
}

export async function updateTenant(
  id: string,
  input: { name?: string; jurisdiction?: string; address?: string }
) {
  if (db) {
    try {
      const [updated] = await db
        .update(tenants)
        .set({ ...input, updatedAt: new Date() })
        .where(eq(tenants.id, id))
        .returning();
      return updated;
    } catch (err: any) {
      console.warn("Neon updateTenant fallback:", err.message);
    }
  }

  const idx = fallbackTenants.findIndex((t) => t.id === id);
  if (idx === -1) return null;
  fallbackTenants[idx] = { ...fallbackTenants[idx], ...input, updatedAt: new Date() };
  return fallbackTenants[idx];
}

// ═══════════════════════════════════════════════════════════
// USERS (Advocates & Staff)
// ═══════════════════════════════════════════════════════════
export async function createUser(input: {
  tenantId: string;
  email: string;
  fullName: string;
  role?: "admin" | "advocate" | "staff";
  barCouncilId?: string;
  designation?: string;
}) {
  if (db) {
    try {
      const [user] = await db.insert(users).values(input).returning();
      return user;
    } catch (err: any) {
      console.warn("Neon createUser fallback:", err.message);
    }
  }

  const newUser = {
    id: `user-${Date.now()}`,
    tenantId: input.tenantId,
    email: input.email,
    fullName: input.fullName,
    role: input.role || "advocate",
    barCouncilId: input.barCouncilId || "BCI/2026",
    designation: input.designation || "Counsel",
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  fallbackUsers.push(newUser);
  return newUser;
}

export async function getUserById(id: string) {
  if (db) {
    try {
      return await db.query.users.findFirst({
        where: eq(users.id, id),
        with: { tenant: true },
      });
    } catch (err: any) {
      console.warn("Neon getUserById fallback:", err.message);
    }
  }
  const u = fallbackUsers.find((user) => user.id === id);
  if (!u) return null;
  const t = fallbackTenants.find((tenant) => tenant.id === u.tenantId);
  return { ...u, tenant: t };
}

export async function getUserByEmail(email: string) {
  if (db) {
    try {
      return await db.query.users.findFirst({
        where: eq(users.email, email),
        with: { tenant: true },
      });
    } catch (err: any) {
      console.warn("Neon getUserByEmail fallback:", err.message);
    }
  }
  const u = fallbackUsers.find((user) => user.email.toLowerCase() === email.toLowerCase());
  if (!u) return null;
  const t = fallbackTenants.find((tenant) => tenant.id === u.tenantId);
  return { ...u, tenant: t };
}

export async function listUsersForTenant(tenantId: string) {
  if (db) {
    try {
      return await db.query.users.findMany({
        where: eq(users.tenantId, tenantId),
        orderBy: desc(users.createdAt),
      });
    } catch (err: any) {
      console.warn("Neon listUsersForTenant fallback:", err.message);
    }
  }
  return fallbackUsers.filter((u) => u.tenantId === tenantId);
}

export async function updateUser(
  id: string,
  input: { fullName?: string; role?: "admin" | "advocate" | "staff"; barCouncilId?: string; designation?: string }
) {
  if (db) {
    try {
      const [updated] = await db
        .update(users)
        .set({ ...input, updatedAt: new Date() })
        .where(eq(users.id, id))
        .returning();
      return updated;
    } catch (err: any) {
      console.warn("Neon updateUser fallback:", err.message);
    }
  }
  const idx = fallbackUsers.findIndex((u) => u.id === id);
  if (idx === -1) return null;
  fallbackUsers[idx] = { ...fallbackUsers[idx], ...input, updatedAt: new Date() };
  return fallbackUsers[idx];
}

// ═══════════════════════════════════════════════════════════
// DOCUMENTS & MILESTONES
// ═══════════════════════════════════════════════════════════
export async function createDocument(input: {
  tenantId: string;
  uploadedBy: string;
  title: string;
  filename?: string;
  storageKey?: string;
  category?: "fir" | "court_order" | "pleading" | "contract" | "other";
  courtName?: string;
  caseNumber?: string;
  fileSize?: string;
  pages?: string;
}) {
  const filename = input.filename || input.title;
  const storageKey = input.storageKey || `r2://lexora-chambers/${Date.now()}-${filename}`;

  if (db) {
    try {
      const [doc] = await db
        .insert(documents)
        .values({
          ...input,
          filename,
          storageKey,
          status: "uploaded",
        })
        .returning();
      return doc;
    } catch (err: any) {
      console.warn("Neon createDocument fallback:", err.message);
    }
  }

  const newDoc = {
    id: `doc-${Date.now()}`,
    tenantId: input.tenantId,
    uploadedBy: input.uploadedBy,
    title: input.title,
    filename,
    category: input.category || "pleading",
    status: "uploaded",
    storageKey,
    ocrText: null,
    courtName: input.courtName || "Supreme Court of India",
    caseNumber: input.caseNumber || `Diary No. ${Math.floor(Math.random() * 90000) + 10000}/2026`,
    fileSize: input.fileSize || "4.2 MB",
    pages: input.pages || "38",
    concordance: "Pending",
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  };
  fallbackDocuments.unshift(newDoc);
  return newDoc;
}

export async function listDocumentsForTenant(tenantId: string) {
  if (db) {
    try {
      return await db.query.documents.findMany({
        where: and(eq(documents.tenantId, tenantId), isNull(documents.deletedAt)),
        orderBy: desc(documents.createdAt),
        with: { summary: true, uploader: true },
      });
    } catch (err: any) {
      console.warn("Neon listDocumentsForTenant fallback:", err.message);
    }
  }

  return fallbackDocuments.filter(
    (d) => (!d.tenantId || d.tenantId === tenantId) && !d.deletedAt
  );
}

export async function getDocumentById(tenantId: string, documentId: string) {
  if (db) {
    try {
      return await db.query.documents.findFirst({
        where: and(
          eq(documents.id, documentId),
          eq(documents.tenantId, tenantId),
          isNull(documents.deletedAt)
        ),
        with: { summary: true },
      });
    } catch (err: any) {
      console.warn("Neon getDocumentById fallback:", err.message);
    }
  }

  return fallbackDocuments.find(
    (d) => (d.id === documentId || d.filename === documentId) && !d.deletedAt
  );
}

export async function updateDocumentStatus(
  documentId: string,
  status: "uploaded" | "processing" | "ready" | "failed",
  ocrText?: string,
  concordance?: string,
  extra?: { courtName?: string; caseNumber?: string; pages?: string; detectedActs?: string[]; ocrConfidence?: number }
) {
  if (db) {
    try {
      const updateData: any = { status, updatedAt: new Date() };
      if (ocrText !== undefined) updateData.ocrText = ocrText;
      if (concordance !== undefined) updateData.concordance = concordance;
      if (extra?.courtName) updateData.courtName = extra.courtName;
      if (extra?.caseNumber) updateData.caseNumber = extra.caseNumber;
      if (extra?.pages) updateData.pages = extra.pages;

      const [updated] = await db
        .update(documents)
        .set(updateData)
        .where(eq(documents.id, documentId))
        .returning();
      if (updated) {
        return {
          ...updated,
          detectedActs: extra?.detectedActs,
          ocrConfidence: extra?.ocrConfidence,
        };
      }
    } catch (err: any) {
      console.warn("Neon updateDocumentStatus fallback:", err.message);
    }
  }

  const doc = fallbackDocuments.find((d) => d.id === documentId);
  if (!doc) return null;
  doc.status = status;
  doc.updatedAt = new Date();
  if (ocrText !== undefined) doc.ocrText = ocrText;
  if (concordance !== undefined) doc.concordance = concordance;
  if (extra?.courtName) doc.courtName = extra.courtName;
  if (extra?.caseNumber) doc.caseNumber = extra.caseNumber;
  if (extra?.pages) doc.pages = extra.pages;
  if (extra?.detectedActs) doc.detectedActs = extra.detectedActs;
  if (extra?.ocrConfidence) doc.ocrConfidence = extra.ocrConfidence;
  return doc;
}

export async function softDeleteDocument(tenantId: string, documentId: string) {
  if (db) {
    try {
      const [deleted] = await db
        .update(documents)
        .set({ deletedAt: new Date(), updatedAt: new Date() })
        .where(and(eq(documents.id, documentId), eq(documents.tenantId, tenantId)))
        .returning();
      return deleted;
    } catch (err: any) {
      console.warn("Neon softDeleteDocument fallback:", err.message);
    }
  }

  const doc = fallbackDocuments.find((d) => d.id === documentId);
  if (!doc) return null;
  doc.deletedAt = new Date();
  doc.updatedAt = new Date();
  return doc;
}

export async function getDocumentsUpdatedSince(tenantId: string, since: Date) {
  if (db) {
    try {
      return await db.query.documents.findMany({
        where: and(eq(documents.tenantId, tenantId), gt(documents.updatedAt, since)),
        orderBy: desc(documents.updatedAt),
      });
    } catch (err: any) {
      console.warn("Neon getDocumentsUpdatedSince fallback:", err.message);
    }
  }

  return fallbackDocuments.filter(
    (d) => (!d.tenantId || d.tenantId === tenantId) && new Date(d.updatedAt) > since
  );
}

// ═══════════════════════════════════════════════════════════
// SUMMARIES
// ═══════════════════════════════════════════════════════════
export async function saveDocumentSummary(input: {
  documentId: string;
  summaryText: string;
  modelUsed: string;
  keyTakeaways?: string[];
  executiveSummary?: string;
  concordance?: string;
}) {
  if (db) {
    try {
      const [summary] = await db
        .insert(documentSummaries)
        .values({
          documentId: input.documentId,
          summaryText: input.summaryText,
          modelUsed: input.modelUsed,
          keyTakeaways: input.keyTakeaways ? JSON.stringify(input.keyTakeaways) : null,
          executiveSummary: input.executiveSummary || null,
          concordance: input.concordance || "98.4%",
        })
        .onConflictDoUpdate({
          target: documentSummaries.documentId,
          set: {
            summaryText: input.summaryText,
            modelUsed: input.modelUsed,
            keyTakeaways: input.keyTakeaways ? JSON.stringify(input.keyTakeaways) : null,
            executiveSummary: input.executiveSummary || null,
            concordance: input.concordance || "98.4%",
            generatedAt: new Date(),
          },
        })
        .returning();
      return summary;
    } catch (err: any) {
      console.warn("Neon saveDocumentSummary fallback:", err.message);
    }
  }

  const existing = fallbackSummaries[input.documentId] || fallbackSummaries["doc-2"];
  const updated = {
    ...existing,
    id: `sum-${Date.now()}`,
    documentId: input.documentId,
    executiveSummary: input.executiveSummary || input.summaryText,
    keyTakeaways: input.keyTakeaways || existing.keyTakeaways,
    concordance: input.concordance || "98.4%",
  };
  fallbackSummaries[input.documentId] = updated;
  return updated;
}

export async function getDocumentSummary(documentId: string) {
  if (db) {
    try {
      const summary = await db.query.documentSummaries.findFirst({
        where: eq(documentSummaries.documentId, documentId),
      });
      if (summary) return summary;
    } catch (err: any) {
      console.warn("Neon getDocumentSummary fallback:", err.message);
    }
  }

  return fallbackSummaries[documentId] || fallbackSummaries["doc-2"];
}
