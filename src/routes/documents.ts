import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { 
  createDocumentSchema, 
  updateDocumentStatusSchema, 
  saveSummarySchema 
} from "../validators/schemas.js";
import { 
  createDocument, 
  listDocumentsForTenant, 
  getDocumentById, 
  updateDocumentStatus, 
  softDeleteDocument, 
  getDocumentsUpdatedSince,
  saveDocumentSummary
} from "../db/queries.js";
import type { Variables } from "../middlewares/auth.js";

const documentsRouter = new Hono<{ Variables: Variables }>();

// List all documents for the tenant
documentsRouter.get("/", async (c) => {
  const tenantId = c.get("tenantId");
  const docs = await listDocumentsForTenant(tenantId);
  return c.json({ success: true, data: docs, error: null });
});

// Offline sync: get updated since
documentsRouter.get("/sync", async (c) => {
  const tenantId = c.get("tenantId");
  const sinceQuery = c.req.query("since");
  
  if (!sinceQuery) {
    return c.json({ success: false, data: null, error: { message: "Missing 'since' query parameter" } }, 400);
  }

  const since = new Date(sinceQuery);
  if (isNaN(since.getTime())) {
    return c.json({ success: false, data: null, error: { message: "Invalid date format for 'since'" } }, 400);
  }

  const docs = await getDocumentsUpdatedSince(tenantId, since);
  return c.json({ success: true, data: docs, error: null });
});

// Get a single document
documentsRouter.get("/:id", async (c) => {
  const tenantId = c.get("tenantId");
  const id = c.req.param("id");

  const doc = await getDocumentById(tenantId, id);
  if (!doc) {
    return c.json({ success: false, data: null, error: { message: "Document not found" } }, 404);
  }

  return c.json({ success: true, data: doc, error: null });
});

// Create document
documentsRouter.post("/", zValidator("json", createDocumentSchema), async (c) => {
  const tenantId = c.get("tenantId");
  const uploadedBy = c.get("userId");
  const input = c.req.valid("json");

  const doc = await createDocument({
    title: input.title,
    storageKey: input.storageKey,
    ...(input.category ? { category: input.category } : {}),
    tenantId,
    uploadedBy,
  });

  return c.json({ success: true, data: doc, error: null }, 201);
});

// Update document status (e.g. after OCR finishes)
documentsRouter.patch("/:id/status", zValidator("json", updateDocumentStatusSchema), async (c) => {
  const tenantId = c.get("tenantId");
  const id = c.req.param("id");
  const { status, ocrText } = c.req.valid("json");

  // Verify it belongs to the tenant
  const doc = await getDocumentById(tenantId, id);
  if (!doc) {
    return c.json({ success: false, data: null, error: { message: "Document not found" } }, 404);
  }

  const updatedDoc = await updateDocumentStatus(id, status, ocrText);
  return c.json({ success: true, data: updatedDoc, error: null });
});

// Soft delete document
documentsRouter.delete("/:id", async (c) => {
  const tenantId = c.get("tenantId");
  const id = c.req.param("id");

  const deletedDoc = await softDeleteDocument(tenantId, id);
  if (!deletedDoc) {
    return c.json({ success: false, data: null, error: { message: "Document not found" } }, 404);
  }

  return c.json({ success: true, data: deletedDoc, error: null });
});

// Save document summary
documentsRouter.post("/:id/summary", zValidator("json", saveSummarySchema), async (c) => {
  const tenantId = c.get("tenantId");
  const id = c.req.param("id");
  const input = c.req.valid("json");

  // Verify ownership
  const doc = await getDocumentById(tenantId, id);
  if (!doc) {
    return c.json({ success: false, data: null, error: { message: "Document not found" } }, 404);
  }

  const summary = await saveDocumentSummary({
    documentId: id,
    summaryText: input.summaryText,
    modelUsed: input.modelUsed,
  });

  return c.json({ success: true, data: summary, error: null }, 201);
});

export default documentsRouter;
