import { z } from "zod";

export const createTenantSchema = z.object({
  name: z.string().min(1, "Tenant name is required").max(255),
});

export const createUserSchema = z.object({
  email: z.string().email("Invalid email address").max(255),
  fullName: z.string().min(1, "Full name is required").max(255),
  role: z.enum(["admin", "advocate", "staff"]).optional(),
  barCouncilId: z.string().max(100).optional(),
});

export const createDocumentSchema = z.object({
  title: z.string().min(1, "Title is required").max(500),
  storageKey: z.string().min(1, "Storage key is required"),
  category: z.enum(["fir", "court_order", "pleading", "contract", "other"]).optional(),
});

export const updateDocumentStatusSchema = z.object({
  status: z.enum(["uploaded", "processing", "ready", "failed"]),
  ocrText: z.string().optional(),
});

export const saveSummarySchema = z.object({
  summaryText: z.string().min(1, "Summary text is required"),
  modelUsed: z.string().min(1, "Model used is required"),
});
