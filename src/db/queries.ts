import { and, desc, eq, gt, isNull } from "drizzle-orm";
import { db } from "./index.js";
import { documents, documentSummaries, tenants, users } from "./schema.js";

// ═══════════════════════════════════════════════════════════
// TENANT
// ═══════════════════════════════════════════════════════════
export async function createTenant(name: string) {
  const [tenant] = await db.insert(tenants).values({ name }).returning();
  return tenant;
}

// ═══════════════════════════════════════════════════════════
// USERS
// ═══════════════════════════════════════════════════════════
export async function createUser(input: {
  tenantId: string;
  email: string;
  fullName: string;
  role?: "admin" | "advocate" | "staff";
  barCouncilId?: string;
}) {
  const [user] = await db.insert(users).values(input).returning();
  return user;
}

export async function getUserByEmail(email: string) {
  return db.query.users.findFirst({ where: eq(users.email, email) });
}

// ═══════════════════════════════════════════════════════════
// DOCUMENTS
// LOOPHOLE CHECK: har query mein tenantId filter ZAROOR hona chahiye.
// Agar tenantId filter bhool gaye, to ek law firm doosri firm ka
// data dekh sakti hai — ye sabse bada security bug hoga is app mein.
// ═══════════════════════════════════════════════════════════

export async function createDocument(input: {
  tenantId: string;
  uploadedBy: string;
  title: string;
  storageKey: string;
  category?: "fir" | "court_order" | "pleading" | "contract" | "other";
}) {
  const [doc] = await db.insert(documents).values(input).returning();
  return doc;
}

// Sirf non-deleted documents, tenant-scoped
export async function listDocumentsForTenant(tenantId: string) {
  return db.query.documents.findMany({
    where: and(eq(documents.tenantId, tenantId), isNull(documents.deletedAt)),
    orderBy: desc(documents.createdAt),
    with: { summary: true, uploader: true },
  });
}

export async function getDocumentById(tenantId: string, documentId: string) {
  // tenantId check yaha bhi zaroori hai — sirf ID se lookup mat karo
  return db.query.documents.findFirst({
    where: and(
      eq(documents.id, documentId),
      eq(documents.tenantId, tenantId),
      isNull(documents.deletedAt)
    ),
    with: { summary: true },
  });
}

export async function updateDocumentStatus(
  documentId: string,
  status: "uploaded" | "processing" | "ready" | "failed",
  ocrText?: string
) {
  const [updated] = await db
    .update(documents)
    .set({ status, ocrText, updatedAt: new Date() })
    .where(eq(documents.id, documentId))
    .returning();
  return updated;
}

// SOFT DELETE ONLY — tombstone pattern. Kabhi bhi db.delete() mat use
// karna documents table pe, warna mobile app ka offline sync tut jayega.
export async function softDeleteDocument(tenantId: string, documentId: string) {
  const [deleted] = await db
    .update(documents)
    .set({ deletedAt: new Date(), updatedAt: new Date() })
    .where(and(eq(documents.id, documentId), eq(documents.tenantId, tenantId)))
    .returning();
  return deleted;
}

// Mobile client ke offline-sync ke liye: "mujhe last sync ke baad ka
// sab kuch do, deleted rows (tombstones) sahit"
export async function getDocumentsUpdatedSince(tenantId: string, since: Date) {
  return db.query.documents.findMany({
    where: and(eq(documents.tenantId, tenantId), gt(documents.updatedAt, since)),
    orderBy: desc(documents.updatedAt),
  });
}

// ═══════════════════════════════════════════════════════════
// SUMMARIES
// ═══════════════════════════════════════════════════════════
export async function saveDocumentSummary(input: {
  documentId: string;
  summaryText: string;
  modelUsed: string;
}) {
  const [summary] = await db
    .insert(documentSummaries)
    .values(input)
    .onConflictDoUpdate({
      target: documentSummaries.documentId,
      set: { summaryText: input.summaryText, modelUsed: input.modelUsed, generatedAt: new Date() },
    })
    .returning();
  return summary;
}
