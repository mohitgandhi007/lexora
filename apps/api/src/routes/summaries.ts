import { Hono } from "hono";
import { getDocumentSummary } from "../db/queries.js";
import { MOCK_SUMMARIES } from "../data/mockData.js";

export const summaryRoutes = new Hono();

// List all generated summaries
summaryRoutes.get("/", (c) => {
  return c.json(Object.values(MOCK_SUMMARIES));
});

// Get summary for specific document docket
summaryRoutes.get("/:id", async (c) => {
  const id = c.req.param("id");
  const summary = await getDocumentSummary(id);
  return c.json(summary);
});

export default summaryRoutes;
