import {
  pgTable,
  pgEnum,
  uuid,
  text,
  varchar,
  timestamp,
  boolean,
  index,
  customType,
} from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";

// ─────────────────────────────────────────────────────────
// CUSTOM TYPE: pgvector column (for AI embeddings / semantic search)
// Drizzle core doesn't ship a native `vector` helper on every version,
// so we define it ourselves — this always works regardless of version.
// Run `CREATE EXTENSION IF NOT EXISTS vector;` once on Neon (see README).
// ─────────────────────────────────────────────────────────
const vector = (name: string, dimensions: number) =>
  customType<{ data: number[]; driverData: string }>({
    dataType() {
      return `vector(${dimensions})`;
    },
    toDriver(value: number[]) {
      return `[${value.join(",")}]`;
    },
    fromDriver(value: string) {
      return value
        .slice(1, -1)
        .split(",")
        .map(Number);
    },
  })(name);

// ─────────────────────────────────────────────────────────
// ENUMS
// ─────────────────────────────────────────────────────────
export const userRoleEnum = pgEnum("user_role", ["admin", "advocate", "staff"]);

export const documentStatusEnum = pgEnum("document_status", [
  "uploaded",     // just uploaded, OCR not started
  "processing",   // OCR / entity extraction running
  "ready",        // searchable + summarized
  "failed",
]);

export const documentCategoryEnum = pgEnum("document_category", [
  "fir",
  "court_order",
  "pleading",
  "contract",
  "other",
]);

// ─────────────────────────────────────────────────────────
// TENANTS  (each law firm / advocate account = 1 tenant)
// Multi-tenancy ki root table. Har cheez tenant_id se link hogi.
// ─────────────────────────────────────────────────────────
export const tenants = pgTable("tenants", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

// ─────────────────────────────────────────────────────────
// USERS  (advocates / staff using the app)
// ─────────────────────────────────────────────────────────
export const users = pgTable(
  "users",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    tenantId: uuid("tenant_id")
      .notNull()
      .references(() => tenants.id, { onDelete: "cascade" }),
    email: varchar("email", { length: 255 }).notNull().unique(),
    fullName: varchar("full_name", { length: 255 }).notNull(),
    role: userRoleEnum("role").notNull().default("advocate"),
    barCouncilId: varchar("bar_council_id", { length: 100 }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    tenantIdx: index("users_tenant_id_idx").on(table.tenantId),
  })
);

// ─────────────────────────────────────────────────────────
// DOCUMENTS  (uploaded legal files — the core table)
// deletedAt = TOMBSTONE, hard delete kabhi mat karna (offline sync ke
// liye zaroori hai — report ke Section 4 mein bhi yehi bataya gaya hai)
// ─────────────────────────────────────────────────────────
export const documents = pgTable(
  "documents",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    tenantId: uuid("tenant_id")
      .notNull()
      .references(() => tenants.id, { onDelete: "cascade" }),
    uploadedBy: uuid("uploaded_by")
      .notNull()
      .references(() => users.id, { onDelete: "set null" }),

    title: varchar("title", { length: 500 }).notNull(),
    category: documentCategoryEnum("category").notNull().default("other"),
    status: documentStatusEnum("status").notNull().default("uploaded"),

    // Cloudflare R2 / S3 object key — actual file lives in storage, not DB
    storageKey: text("storage_key").notNull(),

    // OCR output — searchable text layer (PDF/A text extracted by PaddleOCR)
    ocrText: text("ocr_text"),

    // AI-generated embedding for semantic search (pgvector)
    // 1024 dims matches BGE-M3 as used in the research report
    embedding: vector("embedding", 1024),

    courtName: varchar("court_name", { length: 255 }),
    caseNumber: varchar("case_number", { length: 100 }),

    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
    // TOMBSTONE — soft delete only. NEVER write a hard DELETE query on this table.
    deletedAt: timestamp("deleted_at", { withTimezone: true }),
  },
  (table) => ({
    tenantIdx: index("documents_tenant_id_idx").on(table.tenantId),
    statusIdx: index("documents_status_idx").on(table.status),
    updatedAtIdx: index("documents_updated_at_idx").on(table.updatedAt), // for sync pulls
  })
);

// ─────────────────────────────────────────────────────────
// DOCUMENT SUMMARIES  (AI-generated summary per document)
// Alag table isliye rakhi hai kyunki summary re-generate ho sakti hai
// bina document row ko touch kiye.
// ─────────────────────────────────────────────────────────
export const documentSummaries = pgTable(
  "document_summaries",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    documentId: uuid("document_id")
      .notNull()
      .references(() => documents.id, { onDelete: "cascade" })
      .unique(),
    summaryText: text("summary_text").notNull(),
    modelUsed: varchar("model_used", { length: 100 }).notNull(),
    generatedAt: timestamp("generated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    documentIdx: index("summaries_document_id_idx").on(table.documentId),
  })
);

// ─────────────────────────────────────────────────────────
// RELATIONS (for Drizzle's relational query API — db.query.documents.findMany etc.)
// ─────────────────────────────────────────────────────────
export const tenantsRelations = relations(tenants, ({ many }) => ({
  users: many(users),
  documents: many(documents),
}));

export const usersRelations = relations(users, ({ one, many }) => ({
  tenant: one(tenants, { fields: [users.tenantId], references: [tenants.id] }),
  documents: many(documents),
}));

export const documentsRelations = relations(documents, ({ one }) => ({
  tenant: one(tenants, { fields: [documents.tenantId], references: [tenants.id] }),
  uploader: one(users, { fields: [documents.uploadedBy], references: [users.id] }),
  summary: one(documentSummaries, {
    fields: [documents.id],
    references: [documentSummaries.documentId],
  }),
}));

export const documentSummariesRelations = relations(documentSummaries, ({ one }) => ({
  document: one(documents, {
    fields: [documentSummaries.documentId],
    references: [documents.id],
  }),
}));
