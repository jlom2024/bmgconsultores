// Server functions for experiences
import { createServerFn } from "@tanstack/react-start";
import { bindings } from "../bindings.server";

export const getExperiences = createServerFn({ method: "GET" })
  .handler(async () => {
    const db = bindings().DB;
    if (!db) return { ok: false, error: "DB not available" };
    const rows = await db.prepare("SELECT * FROM experiences ORDER BY featured DESC, created_at DESC").all();
    return { ok: true, data: rows.results as any[] };
  });

export const getExperience = createServerFn({ method: "POST" })
  .validator((x: number) => x as number)
  .handler(async ({ data: id }) => {
    const db = bindings().DB;
    if (!db) return { ok: false, error: "DB not available" };
    const row = await db.prepare("SELECT * FROM experiences WHERE id = ?").bind(id).first();
    return { ok: true, data: row as any };
  });

export const createExperience = createServerFn({ method: "POST" })
  .validator((x: any) => x)
  .handler(async ({ data }) => {
    const db = bindings().DB;
    if (!db) return { ok: false, error: "DB not available" };
    const result = await db.prepare(
      "INSERT INTO experiences (name, subtitle, description, image_url, price, tag, duration, featured) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
    ).bind(data.name, data.subtitle || null, data.description || null, data.image_url || null, data.price, data.tag || null, data.duration || null, data.featured || 0).run();
    return { ok: true, id: (result as any).lastRowId };
  });

export const updateExperience = createServerFn({ method: "POST" })
  .validator((x: any) => x)
  .handler(async ({ data }) => {
    const db = bindings().DB;
    if (!db) return { ok: false, error: "DB not available" };
    await db.prepare(
      "UPDATE experiences SET name = ?, subtitle = ?, description = ?, image_url = ?, price = ?, tag = ?, duration = ?, featured = ?, updated_at = datetime('now') WHERE id = ?"
    ).bind(data.name, data.subtitle || null, data.description || null, data.image_url || null, data.price, data.tag || null, data.duration || null, data.featured || 0, data.id).run();
    return { ok: true };
  });

export const deleteExperience = createServerFn({ method: "POST" })
  .validator((x: number) => x as number)
  .handler(async ({ data: id }) => {
    const db = bindings().DB;
    if (!db) return { ok: false, error: "DB not available" };
    await db.prepare("DELETE FROM experiences WHERE id = ?").bind(id).run();
    return { ok: true };
  });