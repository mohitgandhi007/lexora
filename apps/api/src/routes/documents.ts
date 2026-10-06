import { Hono } from "hono";
import { streamSSE } from "hono/streaming";
import { zValidator } from "@hono/zod-validator";
import {
  createDocumentSchema,
  updateDocumentStatusSchema,
  saveSummarySchema,
} from "../validators/schemas.js";
import {
  createDocument,
  listDocumentsForTenant,
  getDocumentById,
  updateDocumentStatus,
  softDeleteDocument,
  getDocumentsUpdatedSince,
  saveDocumentSummary,
} from "../db/queries.js";
import { processDocumentOcr } from "../services/ocrService.js";
import { progressTracker } from "../services/progressTracker.js";
import { storageService } from "../services/storageService.js";
import type { AuthVariables } from "../middlewares/auth.js";

export const documentRoutes = new Hono<{ Variables: AuthVariables }>();

// List all documents in chambers custody
documentRoutes.get("/", async (c) => {
  const tenantId = c.get("tenantId") || "tenant-supreme-chambers";
  const docs = await listDocumentsForTenant(tenantId);
  return c.json(docs);
});

// Offline Sync Delta: fetch records modified after given date
documentRoutes.get("/sync", async (c) => {
  const tenantId = c.get("tenantId") || "tenant-supreme-chambers";
  const sinceQuery = c.req.query("since");

  if (!sinceQuery) {
    return c.json(
      { success: false, data: null, error: { message: "Missing 'since' timestamp query parameter" } },
      400
    );
  }

  const since = new Date(sinceQuery);
  if (isNaN(since.getTime())) {
    return c.json(
      { success: false, data: null, error: { message: "Invalid date format for 'since'" } },
      400
    );
  }

  const docs = await getDocumentsUpdatedSince(tenantId, since);
  return c.json({ success: true, data: docs, error: null });
});

// Presigned Upload URL generator (Cloudflare R2 / S3 simulation)
documentRoutes.post("/upload-url", async (c) => {
  const body = (await c.req.json().catch(() => ({}))) as Record<string, any>;
  const filename = body.filename || "Docket_Folio.pdf";
  const fileSize = Number(body.fileSize) || 1024 * 1024;
  const presigned = storageService.generatePresignedUploadUrl(filename, fileSize);
  return c.json(presigned);
});

// Real-Time Progress Stream via Server-Sent Events (SSE)
documentRoutes.get("/:id/progress", async (c) => {
  const id = c.req.param("id");

  return streamSSE(c, async (stream) => {
    // Send immediate state
    const initial = progressTracker.getProgress(id);
    await stream.writeSSE({
      data: JSON.stringify(initial),
      event: "progress",
    });

    if (initial.step === "COMPLETED" || initial.step === "FAILED") {
      return;
    }

    // Subscribe to real-time events
    const unsubscribe = progressTracker.subscribe(id, async (p) => {
      try {
        await stream.writeSSE({
          data: JSON.stringify(p),
          event: "progress",
        });
      } catch (err) {
        // Client disconnected
      }
    });

    // Keep stream open until completion or client disconnect
    while (!stream.aborted) {
      const current = progressTracker.getProgress(id);
      if (current.step === "COMPLETED" || current.step === "FAILED") {
        unsubscribe();
        break;
      }
      await stream.sleep(1000);
    }
  });
});

// Progress Status Polling Fallback
documentRoutes.get("/:id/status", async (c) => {
  const tenantId = c.get("tenantId") || "tenant-supreme-chambers";
  const id = c.req.param("id");
  const doc = await getDocumentById(tenantId, id);
  const progress = progressTracker.getProgress(id);
  return c.json({ progress, document: doc });
});

// Stream Document File Binary for Viewer
documentRoutes.get("/:id/file", async (c) => {
  const tenantId = c.get("tenantId") || "tenant-supreme-chambers";
  const id = c.req.param("id");
  const doc = await getDocumentById(tenantId, id);
  if (!doc) return c.text("Document not found", 404);

  const buffer = await storageService.getFileBuffer(doc.storageKey || "");
  if (!buffer) {
    return c.text(
      doc.ocrText || "Document folio content digitized and indexed in Lexora chambers custody.",
      200,
      { "Content-Type": "text/plain; charset=utf-8" }
    );
  }

  return c.body(new Uint8Array(buffer), 200, {
    // headers
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${doc.filename || "docket.pdf"}"`,
  
  });
});

// Get single document by ID
documentRoutes.get("/:id", async (c) => {
  const tenantId = c.get("tenantId") || "tenant-supreme-chambers";
  const id = c.req.param("id");

  const doc = await getDocumentById(tenantId, id);
  if (!doc) {
    return c.json({ error: "Document docket not found in chambers custody" }, 404);
  }

  return c.json(doc);
});

// Standard JSON Document Creation
documentRoutes.post("/", zValidator("json", createDocumentSchema), async (c) => {
  const tenantId = c.get("tenantId") || "tenant-supreme-chambers";
  const uploadedBy = c.get("userId") || "counsel-01";
  const input = c.req.valid("json");

  const doc = await createDocument({
    tenantId,
    uploadedBy,
    title: input.title,
    filename: input.filename || input.title,
    category: input.category,
    courtName: input.courtName,
    caseNumber: input.caseNumber,
    fileSize: input.fileSize,
    pages: input.pages,
    storageKey: input.storageKey,
  });

  return c.json(doc, 201);
});

// Multipart Form-Data Upload with Real OCR Pipeline & Progress Tracking
documentRoutes.post("/upload", async (c) => {
  const tenantId = c.get("tenantId") || "tenant-supreme-chambers";
  const uploadedBy = c.get("userId") || "counsel-01";

  const body = (await c.req.parseBody().catch(() => ({}))) as Record<string, any>;
  const uploadedFile = body["document"] as any;
  const filename =
    (typeof uploadedFile?.name === "string" ? uploadedFile.name : null) ||
    (typeof body["filename"] === "string" ? body["filename"] : null) ||
    "Ingested_Pleading_Folio.pdf";

  // Convert File / Blob to Buffer
  let fileBuffer: Buffer;
  let fileSizeMb = "4.5 MB";

  if (uploadedFile && typeof uploadedFile.arrayBuffer === "function") {
    const arrayBuffer = await uploadedFile.arrayBuffer();
    fileBuffer = Buffer.from(arrayBuffer);
    fileSizeMb = `${(fileBuffer.length / (1024 * 1024)).toFixed(1)} MB`;
  } else {
    // Synthetic fallback buffer for test runs
    fileBuffer = Buffer.from(`IN THE SUPREME COURT OF INDIA\nEXTRAORDINARY APPELLATE JURISDICTION\nSPECIAL LEAVE PETITION (CIVIL)\n${filename}\nFiled under Article 136 of the Constitution of India.`);
  }

  // 1. Save file to persistent storage
  const stored = await storageService.saveFile(fileBuffer, filename, uploadedFile?.type);

  // 2. Create database document in 'uploaded' status
  const doc = await createDocument({
    tenantId,
    uploadedBy,
    title: filename.replace(/\.pdf$/i, "").replace(/_/g, " "),
    filename,
    category: "pleading",
    courtName: "Supreme Court of India",
    caseNumber: `Diary No. ${Math.floor(Math.random() * 80000) + 10000}/2026`,
    fileSize: fileSizeMb,
    pages: "38",
    storageKey: stored.storageKey,
  });

  // 3. Initialize progress tracker
  progressTracker.updateProgress(
    doc.id,
    "UPLOADING",
    25,
    "Document securely received into encrypted chambers sandbox..."
  );

  // 4. Trigger Real OCR Processing & Intelligence Extraction Asynchronously
  (async () => {
    try {
      progressTracker.updateProgress(
        doc.id,
        "EXTRACTING_TEXT",
        45,
        "Supreme Court OCR Engine: Extracting bilingual text layer & stamps..."
      );

      const metadata = await processDocumentOcr(fileBuffer, filename, (percent, msg) => {
        const step =
          percent >= 85
            ? "PREPARING_SUMMARY"
            : percent >= 70
            ? "UNDERSTANDING_STRUCTURE"
            : "EXTRACTING_TEXT";
        progressTracker.updateProgress(doc.id, step, percent, msg);
      });

      // Update document record with real OCR text, page count, and concordance
      await updateDocumentStatus(doc.id, "ready", metadata.rawText, metadata.concordance, {
        courtName: metadata.courtName,
        caseNumber: metadata.caseNumber,
        pages: String(metadata.pages),
        detectedActs: metadata.detectedProvisions.map((p) => `${p.sectionNumber} (${p.actName})`),
        ocrConfidence: parseFloat(metadata.concordance),
      });

      // Save synthesized AI summary with real extracted takeaways
      await saveDocumentSummary({
        documentId: doc.id,
        summaryText: metadata.rawText.slice(0, 2000),
        modelUsed: "Lexora-SupremeCourt-OCR-v2.0",
        keyTakeaways: metadata.keyTakeaways,
        executiveSummary: `Appellate brief synthesized for ${filename}. Forum detected: ${metadata.courtName}. Extracted ${metadata.detectedProvisions.length} statutory provisions with ${metadata.concordance} OCR concordance.`,
        concordance: metadata.concordance,
      });

      progressTracker.updateProgress(
        doc.id,
        "COMPLETED",
        100,
        "Ingestion protocol finished: Ratio decidendi and citations ready for review."
      );
    } catch (err: any) {
      console.error("OCR Ingestion error:", err);
      progressTracker.updateProgress(
        doc.id,
        "FAILED",
        0,
        "Ingestion interrupted by OCR processing exception",
        err.message
      );
      await updateDocumentStatus(doc.id, "failed");
    }
  })();

  return c.json(doc, 201);
});

// Milestone Status Transition
documentRoutes.patch("/:id/status", zValidator("json", updateDocumentStatusSchema), async (c) => {
  const id = c.req.param("id");
  const { status, ocrText, concordance } = c.req.valid("json");

  const updatedDoc = await updateDocumentStatus(id, status, ocrText, concordance);
  if (!updatedDoc) {
    return c.json({ success: false, data: null, error: { message: "Document docket not found" } }, 404);
  }

  return c.json({ success: true, data: updatedDoc, error: null });
});

// Soft-Delete (Tombstone)
documentRoutes.delete("/:id", async (c) => {
  const tenantId = c.get("tenantId") || "tenant-supreme-chambers";
  const id = c.req.param("id");

  const deletedDoc = await softDeleteDocument(tenantId, id);
  if (!deletedDoc) {
    return c.json({ success: false, data: null, error: { message: "Document docket not found" } }, 404);
  }

  return c.json({ success: true, data: deletedDoc, error: null });
});

// Summary Milestone
documentRoutes.post("/:id/summary", zValidator("json", saveSummarySchema), async (c) => {
  const id = c.req.param("id");
  const input = c.req.valid("json");

  const summary = await saveDocumentSummary({
    documentId: id,
    summaryText: input.summaryText,
    modelUsed: input.modelUsed,
    keyTakeaways: input.keyTakeaways,
    executiveSummary: input.executiveSummary,
    concordance: input.concordance,
  });

  return c.json({ success: true, data: summary, error: null }, 201);
});

export default documentRoutes;
