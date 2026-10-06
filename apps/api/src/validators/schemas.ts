import { z } from "zod";

export const createTenantSchema = z.object({
  name: z.string().min(1, "Chambers / Tenant name is required").max(255),
  jurisdiction: z.string().max(255).optional(),
  address: z.string().optional(),
});

export const updateTenantSchema = z.object({
  name: z.string().min(1).max(255).optional(),
  jurisdiction: z.string().max(255).optional(),
  address: z.string().optional(),
});

export const createUserSchema = z.object({
  email: z.string().email("Invalid advocate email address").max(255),
  fullName: z.string().min(1, "Full name is required").max(255),
  role: z.enum(["admin", "advocate", "staff"]).optional().default("advocate"),
  barCouncilId: z.string().max(100).optional(),
  designation: z.string().max(100).optional().default("Counsel"),
});

export const updateUserSchema = z.object({
  fullName: z.string().min(1).max(255).optional(),
  role: z.enum(["admin", "advocate", "staff"]).optional(),
  barCouncilId: z.string().max(100).optional(),
  designation: z.string().max(100).optional(),
});

export const createDocumentSchema = z.object({
  title: z.string().min(1, "Title is required").max(500),
  filename: z.string().min(1, "Filename is required").optional(),
  storageKey: z.string().min(1, "Storage key is required").optional(),
  category: z.enum(["fir", "court_order", "pleading", "contract", "other"]).optional().default("pleading"),
  courtName: z.string().max(255).optional().default("Supreme Court of India"),
  caseNumber: z.string().max(100).optional(),
  fileSize: z.string().max(50).optional().default("4.2 MB"),
  pages: z.string().max(20).optional().default("45"),
});

export const updateDocumentStatusSchema = z.object({
  status: z.enum(["uploaded", "processing", "ready", "failed"]),
  ocrText: z.string().optional(),
  concordance: z.string().optional(),
});

export const saveSummarySchema = z.object({
  summaryText: z.string().min(1, "Summary text is required"),
  modelUsed: z.string().min(1, "Model used is required").default("Lexora-BGE-M3+Gemini1.5Pro"),
  keyTakeaways: z.array(z.string()).optional(),
  executiveSummary: z.string().optional(),
  concordance: z.string().optional().default("98.4%"),
});
