/**
 * bindings.node.server.ts
 *
 * Implementación Node.js de la misma interfaz que bindings.server.ts
 * (que usa cloudflare:workers). Aquí exponemos una D1Database-compatible
 * construida sobre better-sqlite3 para correr en VPS Hostinger.
 *
 * La interfaz es compatible con:
 *   db.prepare(sql).bind(...).all()
 *   db.prepare(sql).bind(...).first()
 *   db.prepare(sql).bind(...).run()
 *   db.batch([stmt1, stmt2])
 */

// --- Compatibilidad de tipos (no importamos @cloudflare/workers-types en Node) ---
type D1Result<T = Record<string, unknown>> = {
  results: T[];
  success: boolean;
  meta: Record<string, unknown>;
};

type D1ExecResult = {
  count: number;
  duration: number;
};

interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  all<T = Record<string, unknown>>(): Promise<D1Result<T>>;
  first<T = Record<string, unknown>>(colName?: string): Promise<T | null>;
  run(): Promise<D1Result>;
  raw<T = unknown[]>(): Promise<T[]>;
}

interface D1Database {
  prepare(query: string): D1PreparedStatement;
  exec(query: string): Promise<D1ExecResult>;
  batch<T = Record<string, unknown>>(statements: D1PreparedStatement[]): Promise<D1Result<T>[]>;
}

// ---------------------------------------------------------------------------
// Implementación SQLite sobre better-sqlite3
// ---------------------------------------------------------------------------

// @ts-ignore — better-sqlite3 es dep de producción (bun add better-sqlite3 en VPS). Solo se usa en build:node.
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Database from "better-sqlite3"; // eslint-disable-line
import path from "node:path";
import fs from "node:fs";

const DB_PATH = process.env.SQLITE_DB_PATH ?? path.join(process.cwd(), "data", "app.db");

// Asegurar directorio
fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });

let _db: InstanceType<typeof Database> | null = null;

function getDb(): InstanceType<typeof Database> {
  if (!_db) {
    _db = new Database(DB_PATH);
    // WAL mode para mejor concurrencia de lectura
    _db.pragma("journal_mode = WAL");
    _db.pragma("foreign_keys = ON");
    _db.pragma("busy_timeout = 5000");
  }
  return _db;
}

class NodeD1PreparedStatement implements D1PreparedStatement {
  private readonly sql: string;
  private readonly params: unknown[];

  constructor(sql: string, params: unknown[] = []) {
    this.sql = sql;
    this.params = params;
  }

  bind(...values: unknown[]): D1PreparedStatement {
    return new NodeD1PreparedStatement(this.sql, [...this.params, ...values]);
  }

  async all<T = Record<string, unknown>>(): Promise<D1Result<T>> {
    const db = getDb();
    const stmt = db.prepare(this.sql);
    const results = stmt.all(...this.params) as T[];
    return {
      results,
      success: true,
      meta: { rows_read: results.length, rows_written: 0 },
    };
  }

  async first<T = Record<string, unknown>>(colName?: string): Promise<T | null> {
    const db = getDb();
    const stmt = db.prepare(this.sql);
    const row = stmt.get(...this.params) as T | undefined;
    if (row == null) return null;
    if (colName) return (row as Record<string, unknown>)[colName] as T ?? null;
    return row;
  }

  async run(): Promise<D1Result> {
    const db = getDb();
    const stmt = db.prepare(this.sql);
    const info = stmt.run(...this.params);
    return {
      results: [],
      success: true,
      meta: {
        last_row_id: info.lastInsertRowid,
        lastRowId: info.lastInsertRowid,
        rows_written: info.changes,
        changes: info.changes,
      },
    };
  }

  async raw<T = unknown[]>(): Promise<T[]> {
    const db = getDb();
    const stmt = db.prepare(this.sql);
    return stmt.raw().all(...this.params) as T[];
  }
}

class NodeD1Database implements D1Database {
  prepare(query: string): D1PreparedStatement {
    return new NodeD1PreparedStatement(query);
  }

  async exec(query: string): Promise<D1ExecResult> {
    const db = getDb();
    const start = Date.now();
    db.exec(query);
    return { count: 1, duration: Date.now() - start };
  }

  /**
   * Ejecuta todos los statements en una transacción SQLite atómica.
   * Compatible con la semántica de D1.batch().
   */
  async batch<T = Record<string, unknown>>(
    statements: D1PreparedStatement[]
  ): Promise<D1Result<T>[]> {
    const db = getDb();
    const results: D1Result<T>[] = [];

    const tx = db.transaction(() => {
      for (const stmt of statements) {
        // Ejecutamos cada statement síncronamente dentro de la transacción
        const nodeStmt = stmt as NodeD1PreparedStatement;
        const s = db.prepare((nodeStmt as any).sql);
        const params = (nodeStmt as any).params as unknown[];
        const info = s.run(...params);
        results.push({
          results: [],
          success: true,
          meta: {
            last_row_id: info.lastInsertRowid,
            lastRowId: info.lastInsertRowid,
            rows_written: info.changes,
          },
        } as D1Result<T>);
      }
    });

    tx();
    return results;
  }
}

// ---------------------------------------------------------------------------
// Singleton de DB y función bindings() compatible con la interfaz CF
// ---------------------------------------------------------------------------

const nodeDb = new NodeD1Database();

type AppEnv = {
  DB?: D1Database;
  STORAGE?: unknown;
  KV?: unknown;
  CONTAINER?: unknown;
  HF_ENV?: string;
  APP_SLUG?: string;
};

export function bindings(): AppEnv {
  return {
    DB: nodeDb as unknown as D1Database,
    HF_ENV: process.env.NODE_ENV ?? "production",
    APP_SLUG: process.env.APP_SLUG ?? "bg-travel",
  };
}
