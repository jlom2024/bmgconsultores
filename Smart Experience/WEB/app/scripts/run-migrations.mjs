#!/usr/bin/env node
/**
 * scripts/run-migrations.mjs
 *
 * Aplica todas las migraciones SQL en migrations/ de forma idempotente.
 * Uso: node scripts/run-migrations.mjs [--db-path ./data/app.db]
 *
 * Compatible con VPS Node.js (Hostinger) — no requiere wrangler.
 */

import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

// --- Args ---
const dbPathArg = process.argv.find((a) => a.startsWith("--db-path="))?.split("=")[1];
const DB_PATH = dbPathArg ?? process.env.SQLITE_DB_PATH ?? path.join(ROOT, "data", "app.db");

fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });

const db = new Database(DB_PATH);
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

// Tabla de control de migraciones aplicadas
db.exec(`
  CREATE TABLE IF NOT EXISTS _migrations (
    name    TEXT PRIMARY KEY,
    applied TEXT DEFAULT (datetime('now'))
  )
`);

const migrationsDir = path.join(ROOT, "migrations");
const files = fs
  .readdirSync(migrationsDir)
  .filter((f) => f.endsWith(".sql"))
  .sort();

for (const file of files) {
  const already = db.prepare("SELECT name FROM _migrations WHERE name = ?").get(file);
  if (already) {
    console.log(`[skip]  ${file}`);
    continue;
  }

  const sql = fs.readFileSync(path.join(migrationsDir, file), "utf8");
  try {
    db.exec(sql);
    db.prepare("INSERT INTO _migrations (name) VALUES (?)").run(file);
    console.log(`[ok]    ${file}`);
  } catch (err) {
    console.error(`[error] ${file}: ${err.message}`);
    process.exit(1);
  }
}

console.log(`\nMigraciones completadas. DB: ${DB_PATH}`);
db.close();
