import {
  pgTable,
  pgEnum,
  uuid,
  text,
  varchar,
  timestamp,
  index,
  customType,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// ─────────────────────────────────────────────────────────
// CUSTOM TYPE: pgvector column (for AI embeddings / semantic search)
// ─────────────────────────────────────────────────────────
export const vector = (name: string, dimensions: number) =>
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
// TENANTS (law firm chambers / advocate organization)
// ─────────────────────────────────────────────────────────
export const tenants = pgTable("tenants", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  jurisdiction: varchar("jurisdiction", { length: 255 }).default("Supreme Court of India • Appellate & Commercial"),
  address: text("address").default("Chambers of Supreme Court of India, Bhagwan Das Road, New Delhi"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

// ─────────────────────────────────────────────────────────
// USERS (advocates / partners / clerks)
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
    designation: varchar("designation", { length: 100 }).default("Counsel"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    tenantIdx: index("users_tenant_id_idx").on(table.tenantId),
  })
);

// ─────────────────────────────────────────────────────────
// DOCUMENTS (uploaded legal files with milestone status)
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
    filename: varchar("filename", { length: 500 }).notNull(),
    category: documentCategoryEnum("category").notNull().default("other"),
    status: documentStatusEnum("status").notNull().default("uploaded"),

    // Cloudflare R2 / S3 storage key
    storageKey: text("storage_key").notNull(),

    // OCR output layer
    ocrText: text("ocr_text"),

    // AI embedding for semantic similarity search
    embedding: vector("embedding", 1024),

    courtName: varchar("court_name", { length: 255 }).default("Supreme Court of India"),
    caseNumber: varchar("case_number", { length: 100 }),
    fileSize: varchar("file_size", { length: 50 }).default("4.2 MB"),
    pages: varchar("pages", { length: 20 }).default("45"),
    concordance: varchar("concordance", { length: 20 }).default("98.5%"),

    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
    // TOMBSTONE soft-delete
    deletedAt: timestamp("deleted_at", { withTimezone: true }),
  },
  (table) => ({
    tenantIdx: index("documents_tenant_id_idx").on(table.tenantId),
    statusIdx: index("documents_status_idx").on(table.status),
    updatedAtIdx: index("documents_updated_at_idx").on(table.updatedAt),
  })
);

// ─────────────────────────────────────────────────────────
// DOCUMENT SUMMARIES (AI synthesized brief milestone)
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
    modelUsed: varchar("model_used", { length: 100 }).notNull().default("Lexora-BGE-M3+Gemini1.5Pro"),
    keyTakeaways: text("key_takeaways"),
    executiveSummary: text("executive_summary"),
    concordance: varchar("concordance", { length: 50 }).default("98.4%"),
    generatedAt: timestamp("generated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    documentIdx: index("summaries_document_id_idx").on(table.documentId),
  })
);

// ─────────────────────────────────────────────────────────
// RELATIONS
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
