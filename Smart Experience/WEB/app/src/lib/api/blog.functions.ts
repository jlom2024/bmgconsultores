// Server functions for blog posts
import { createServerFn } from "@tanstack/react-start";
import { bindings } from "../bindings.server";

export const getBlogPosts = createServerFn({ method: "GET" })
  .handler(async () => {
    const db = bindings().DB;
    if (!db) return { ok: false, error: "DB not available" };
    const rows = await db.prepare("SELECT id, title, slug, excerpt, image_url, author, published_at FROM blog_posts WHERE published = 1 ORDER BY published_at DESC").all();
    return { ok: true, data: rows.results as any[] };
  });

export const getBlogPost = createServerFn({ method: "POST" })
  .validator((x: any) => x)
  .handler(async ({ data }) => {
    const slug = typeof data === "string" ? data : data?.slug;
    const db = bindings().DB;
    if (!db) return { ok: false, error: "DB not available" };
    const row = await db.prepare("SELECT * FROM blog_posts WHERE slug = ? AND published = 1").bind(slug).first();
    return { ok: true, data: row as any };
  });

export const getAllBlogPosts = createServerFn({ method: "GET" })
  .handler(async () => {
    const db = bindings().DB;
    if (!db) return { ok: false, error: "DB not available" };
    const rows = await db.prepare("SELECT * FROM blog_posts ORDER BY published_at DESC").all();
    return { ok: true, data: rows.results as any[] };
  });

export const createBlogPost = createServerFn({ method: "POST" })
  .validator((x: any) => x)
  .handler(async ({ data }) => {
    const db = bindings().DB;
    if (!db) return { ok: false, error: "DB not available" };
    const result = await db.prepare(
      "INSERT INTO blog_posts (title, slug, excerpt, content, image_url, author, published, published_at) VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'))"
    ).bind(data.title, data.slug, data.excerpt || null, data.content || null, data.image_url || null, data.author || null, data.published || 0).run();
    return { ok: true, id: (result as any).lastRowId };
  });

export const updateBlogPost = createServerFn({ method: "POST" })
  .validator((x: any) => x)
  .handler(async ({ data }) => {
    const db = bindings().DB;
    if (!db) return { ok: false, error: "DB not available" };
    await db.prepare(
      "UPDATE blog_posts SET title = ?, slug = ?, excerpt = ?, content = ?, image_url = ?, author = ?, published = ?, updated_at = datetime('now') WHERE id = ?"
    ).bind(data.title, data.slug, data.excerpt || null, data.content || null, data.image_url || null, data.author || null, data.published || 0, data.id).run();
    return { ok: true };
  });

export const deleteBlogPost = createServerFn({ method: "POST" })
  .validator((x: number) => x as number)
  .handler(async ({ data: id }) => {
    const db = bindings().DB;
    if (!db) return { ok: false, error: "DB not available" };
    await db.prepare("DELETE FROM blog_posts WHERE id = ?").bind(id).run();
    return { ok: true };
  });