// Admin + Customer auth — session-based auth for admin panel and customer portal
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { bindings } from "../bindings.server";

// ── CRYPTO HELPERS ───────────────────────────────────────────────────────────

/** SHA-256 with per-user salt stored as "salt:hash" */
async function hashPasswordWithSalt(password: string, salt: string): Promise<string> {
  const encoder = new TextEncoder();
  const buf = await crypto.subtle.digest("SHA-256", encoder.encode(salt + ":" + password));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
}

/** Returns the full "salt:hash" string ready to store */
export async function makePasswordHash(password: string): Promise<string> {
  const salt = crypto.randomUUID();
  const hash = await hashPasswordWithSalt(password, salt);
  return `${salt}:${hash}`;
}

/** Verify a password against a stored "salt:hash" */
export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [salt, storedHash] = stored.split(":");
  if (!salt || !storedHash) return false;
  const hash = await hashPasswordWithSalt(password, salt);
  // Constant-time comparison via SubtleCrypto sign would be ideal;
  // this at minimum avoids returning early on first mismatch.
  return timingSafeEqual(hash, storedHash);
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

function generateToken(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes).map(b => b.toString(16).padStart(2, "0")).join("");
}

// ── ADMIN SESSION STORE ──────────────────────────────────────────────────────

const sessions = new Map<string, { userId: number; username: string; expires: number }>();

/** Remove expired sessions. Called on every login/validate to keep the map clean. */
function purgeExpiredSessions() {
  const now = Date.now();
  for (const [token, s] of sessions) {
    if (s.expires < now) sessions.delete(token);
  }
}

export function validateSession(token: string): { userId: number; username: string } | null {
  const session = sessions.get(token);
  if (!session) return null;
  if (session.expires < Date.now()) {
    sessions.delete(token);
    return null;
  }
  return { userId: session.userId, username: session.username };
}

/**
 * Call at the top of every admin handler.
 * Throws a Response(403) if the token is missing or invalid.
 */
export function requireAdminSession(token: string | null | undefined): { userId: number; username: string } {
  if (!token) throw new Response("Unauthorized", { status: 401 });
  const session = validateSession(token);
  if (!session) throw new Response("Forbidden", { status: 403 });
  return session;
}

// ── CUSTOMER SESSION STORE ───────────────────────────────────────────────────

const customerSessions = new Map<string, { customerId: number; accountId: number; email: string; name: string; expires: number }>();

function purgeExpiredCustomerSessions() {
  const now = Date.now();
  for (const [token, s] of customerSessions) {
    if (s.expires < now) customerSessions.delete(token);
  }
}

export function validateCustomerSession(token: string): { customerId: number; accountId: number; email: string; name: string } | null {
  const session = customerSessions.get(token);
  if (!session) return null;
  if (session.expires < Date.now()) {
    customerSessions.delete(token);
    return null;
  }
  return { customerId: session.customerId, accountId: session.accountId, email: session.email, name: session.name };
}

/**
 * Call at the top of every customer-portal handler.
 * Throws a Response(403) if the token is missing or expired.
 */
export function requireCustomerSession(token: string | null | undefined): { customerId: number; accountId: number; email: string; name: string } {
  if (!token) throw new Response("Unauthorized", { status: 401 });
  const session = validateCustomerSession(token);
  if (!session) throw new Response("Forbidden", { status: 403 });
  return session;
}

// ── RATE LIMITER ─────────────────────────────────────────────────────────────

/** Per-IP failed-login tracking. Clears itself after window expires. */
const loginAttempts = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 min

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = loginAttempts.get(ip);
  if (!entry || entry.resetAt < now) {
    loginAttempts.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  entry.count++;
  if (entry.count > RATE_LIMIT_MAX) return false;
  return true;
}

function clearRateLimit(ip: string) {
  loginAttempts.delete(ip);
}

// ── ZOD SCHEMAS ──────────────────────────────────────────────────────────────

const AdminLoginSchema = z.object({
  username: z.string().min(1).max(64),
  password: z.string().min(1).max(128),
});

const TokenSchema = z.string().min(64).max(64);

// ── SERVER FUNCTIONS ─────────────────────────────────────────────────────────

export const adminLogin = createServerFn({ method: "POST" })
  .validator((x: unknown) => AdminLoginSchema.parse(x))
  .handler(async ({ data, request }: any) => {
    // Resolve IP for rate limiting (CF Worker header first, then fallback)
    const ip: string =
      (request?.headers?.get("cf-connecting-ip")) ||
      (request?.headers?.get("x-forwarded-for")?.split(",")[0]?.trim()) ||
      "unknown";

    if (!checkRateLimit(ip)) {
      return { ok: false, error: "Demasiados intentos. Espera 15 minutos." };
    }

    const dbInst = bindings().DB;
    if (!dbInst) return { ok: false, error: "DB not available" };

    purgeExpiredSessions();

    const user = await dbInst
      .prepare("SELECT * FROM admin_users WHERE username = ?")
      .bind(data.username)
      .first() as any;

    if (!user) {
      // Don't reveal whether user exists
      return { ok: false, error: "Usuario o contrasena incorrectos" };
    }

    let isValid = false;

    if (user.password_hash.startsWith("$2a$")) {
      // Legacy bcrypt placeholder — accept default and re-hash immediately
      if (data.password === "admin123") {
        isValid = true;
        const newStored = await makePasswordHash(data.password);
        await dbInst
          .prepare("UPDATE admin_users SET password_hash = ? WHERE id = ?")
          .bind(newStored, user.id)
          .run();
        user.password_hash = newStored;
      }
    } else {
      isValid = await verifyPassword(data.password, user.password_hash);
    }

    if (!isValid) {
      return { ok: false, error: "Usuario o contrasena incorrectos" };
    }

    clearRateLimit(ip);

    const token = generateToken();
    const expires = Date.now() + 1000 * 60 * 60 * 24; // 24 h
    sessions.set(token, { userId: user.id, username: user.username, expires });

    return { ok: true, token, username: user.username };
  });

export const adminLogout = createServerFn({ method: "POST" })
  .validator((x: unknown) => TokenSchema.parse(x))
  .handler(async ({ data }: { data: string }) => {
    sessions.delete(data);
    return { ok: true };
  });

export const getAdminSession = createServerFn({ method: "POST" })
  .validator((x: unknown) => z.string().min(1).parse(x))
  .handler(async ({ data }: { data: string }) => {
    const session = validateSession(data);
    if (!session) return { ok: false, error: "Sesion expirada" };
    return { ok: true, username: session.username };
  });

// ── CUSTOMER SESSION SERVER FUNCTIONS ────────────────────────────────────────

export const getCustomerSession = createServerFn({ method: "POST" })
  .validator((x: unknown) => z.string().min(1).parse(x))
  .handler(async ({ data }: { data: string }) => {
    const session = validateCustomerSession(data);
    if (!session) return { ok: false, error: "Sesion expirada" };
    return { ok: true, customer: { id: session.customerId, account_id: session.accountId, email: session.email, name: session.name } };
  });

export const customerLogout = createServerFn({ method: "POST" })
  .validator((x: unknown) => z.string().min(1).parse(x))
  .handler(async ({ data }: { data: string }) => {
    customerSessions.delete(data);
    return { ok: true };
  });

/**
 * Internal helper used by agency.functions.ts customerLogin to create a
 * server-side customer session and return a token.
 */
export function createCustomerSession(customerId: number, accountId: number, email: string, name: string): string {
  purgeExpiredCustomerSessions();
  const token = generateToken();
  const expires = Date.now() + 1000 * 60 * 60 * 24 * 7; // 7 days
  customerSessions.set(token, { customerId, accountId, email, name, expires });
  return token;
}
