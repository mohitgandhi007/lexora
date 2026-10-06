import { Hono } from "hono";
import { listDocumentsForTenant } from "../db/queries.js";

export const searchRoutes = new Hono();

searchRoutes.get("/", async (c) => {
  const q = (c.req.query("q") || "").trim().toLowerCase();
  const category = c.req.query("category") || "All";
  const tenantId = c.req.header("x-tenant-id") || "tenant-supreme-chambers";

  const docs = await listDocumentsForTenant(tenantId);

  if (!q && category === "All") {
    return c.json(docs);
  }

  const results = docs.filter((doc: any) => {
    const matchesQuery =
      !q ||
      (doc.filename && doc.filename.toLowerCase().includes(q)) ||
      (doc.title && doc.title.toLowerCase().includes(q)) ||
      (doc.courtName && doc.courtName.toLowerCase().includes(q)) ||
      (doc.category && doc.category.toLowerCase().includes(q)) ||
      (doc.ocrText && doc.ocrText.toLowerCase().includes(q));

    const matchesCategory =
      category === "All" ||
      (category === "Briefs" && (doc.category === "pleading" || doc.title?.toLowerCase().includes("petition"))) ||
      (category === "Precedents" && (doc.category === "court_order" || doc.title?.toLowerCase().includes("judgment"))) ||
      (category === "Statutes" && (doc.category === "contract" || doc.title?.toLowerCase().includes("act")));

    return matchesQuery && matchesCategory;
  });

  return c.json(results);
});

export default searchRoutes;
