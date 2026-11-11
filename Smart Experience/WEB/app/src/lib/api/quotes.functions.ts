// Server functions for quotes
import { createServerFn } from "@tanstack/react-start";
import { bindings } from "../bindings.server";
import { z } from "zod";

const QuoteSchema = z.object({
  name: z.string().min(1).max(200),
  destination: z.string().min(1).max(200),
  whatsapp: z.string().min(7).max(20),
  message: z.string().max(2000).optional().nullable(),
});

export const createQuote = createServerFn({ method: "POST" })
  .validator(QuoteSchema.parse)
  .handler(async ({ data }) => {
    const db = bindings().DB;
    if (!db) return { ok: false, error: "DB not available" };
    const result = await db.prepare(
      "INSERT INTO quotes (name, destination, whatsapp, message) VALUES (?, ?, ?, ?)"
    ).bind(data.name, data.destination, data.whatsapp, data.message || null).run();
    return { ok: true, id: (result as any).lastRowId };
  });

export const getQuotes = createServerFn({ method: "GET" })
  .handler(async () => {
    const db = bindings().DB;
    if (!db) return { ok: false, error: "DB not available" };
    const rows = await db.prepare("SELECT * FROM quotes ORDER BY created_at DESC LIMIT 100").all();
    return { ok: true, data: rows.results as any[] };
  });

export const updateQuoteStatus = createServerFn({ method: "POST" })
  .validator((x: any) => x)
  .handler(async ({ data }) => {
    const db = bindings().DB;
    if (!db) return { ok: false, error: "DB not available" };
    await db.prepare(
      "UPDATE quotes SET status = ?, updated_at = datetime('now') WHERE id = ?"
    ).bind(data.status, data.id).run();
    return { ok: true };
  });
