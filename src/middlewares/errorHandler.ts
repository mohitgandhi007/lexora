import type { ErrorHandler } from "hono";

export const errorHandler: ErrorHandler = (err, c) => {
  console.error(`[Error] ${c.req.method} ${c.req.url}`, err);

  const status = err instanceof Error && (err as any).status ? (err as any).status : 500;
  const message = err.message || "Internal Server Error";

  return c.json(
    {
      success: false,
      data: null,
      error: {
        message,
        details: process.env.NODE_ENV === "development" ? err.stack : undefined,
      },
    },
    status
  );
};
