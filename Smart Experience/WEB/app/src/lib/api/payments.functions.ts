// Culqi payment integration — sandbox mode, real API-ready structure
import { createServerFn } from "@tanstack/react-start";

// ─── Config ───────────────────────────────────────────────────────────
// Replace with real keys from https://www.culqi.com/
const CULQI_PUBLIC_KEY = "pk_test_xxxxxxxxxxxxx"; // sandbox key
const CULQI_SECRET_KEY = "sk_test_xxxxxxxxxxxxx"; // never exposed to client

// ─── In-memory stores ─────────────────────────────────────────────────
let transactions: any[] = [
  { id: "tkn_001", charge_id: "chr_test_001", amount: 850.00, currency: "PEN", customer: "Carlos Mendoza", email: "carlos@email.com", concept: "Reserva BG-001 — Paquete Cusco", status: "capturada", payment_method: "Visa **** 4242", installments: 1, receipt_url: null, created_at: "2026-07-10T14:30:00Z" },
  { id: "tkn_002", charge_id: "chr_test_002", amount: 320.00, currency: "PEN", customer: "Maria Lopez", email: "maria@email.com", concept: "Reserva BG-002 — Vuelo Lima-Cusco", status: "capturada", payment_method: "Mastercard **** 5555", installments: 3, receipt_url: null, created_at: "2026-07-12T10:15:00Z" },
  { id: "tkn_003", charge_id: "chr_test_003", amount: 1260.00, currency: "PEN", customer: "Jose Ramirez", email: "jose@email.com", concept: "Reserva BG-003 — Hotel Cusco", status: "capturada", payment_method: "Visa **** 9876", installments: 1, receipt_url: null, created_at: "2026-07-05T09:00:00Z" },
  { id: "tkn_004", charge_id: "chr_test_004", amount: 1500.00, currency: "PEN", customer: "Lucia Fernandez", email: "lucia@email.com", concept: "Reserva BG-006 — Paquete Cusco", status: "pendiente", payment_method: "Visa **** 4242", installments: 6, receipt_url: null, created_at: "2026-07-20T16:45:00Z" },
];

// ─── Server Functions ─────────────────────────────────────────────────

export const getCulqiPublicKey = createServerFn({ method: "GET" })
  .handler(async () => ({ ok: true, key: CULQI_PUBLIC_KEY, sandbox: true }));

export const getTransactions = createServerFn({ method: "GET" })
  .handler(async () => ({ ok: true, transactions: [...transactions].reverse() }));

export const getTransactionStats = createServerFn({ method: "GET" })
  .handler(async () => {
    const total = transactions.reduce((s, t) => s + (t.status === "capturada" ? t.amount : 0), 0);
    const pending = transactions.filter(t => t.status === "pendiente").length;
    const captured = transactions.filter(t => t.status === "capturada").length;
    const failed = transactions.filter(t => t.status === "fallida" || t.status === "anulada").length;
    return { ok: true, stats: { total, pending, captured, failed, count: transactions.length } };
  });

export const createCharge = createServerFn({ method: "POST" })
  .validator((x: any) => x)
  .handler(async ({ data }: any) => {
    const { token, amount, currency, customer, email, description, installments } = data;

    // Simulate charge creation (in production: POST to Culqi API)
    const chargeId = "chr_test_" + Math.random().toString(36).substring(2, 8);
    const tx = {
      id: token || "tkn_" + Math.random().toString(36).substring(2, 8),
      charge_id: chargeId,
      amount,
      currency: currency || "PEN",
      customer,
      email,
      concept: description,
      status: "capturada",
      payment_method: "Visa **** " + Math.floor(1000 + Math.random() * 9000),
      installments: installments || 1,
      receipt_url: null,
      created_at: new Date().toISOString(),
    };
    transactions.push(tx);
    return { ok: true, charge: tx };
  });

export const refundCharge = createServerFn({ method: "POST" })
  .validator((x: any) => x)
  .handler(async ({ data }: any) => {
    const tx = transactions.find(t => t.id === data.id || t.charge_id === data.id);
    if (!tx) return { ok: false, error: "Transaccion no encontrada" };
    tx.status = "anulada";
    return { ok: true, transaction: tx };
  });

export const getPaymentLink = createServerFn({ method: "POST" })
  .validator((x: any) => x)
  .handler(async ({ data }: any) => {
    const { amount, description, customer } = data;
    // In production, this would create a Culqi Order or Link
    const link = `https://checkout.culqi.com/pay?amount=${amount * 100}&description=${encodeURIComponent(description)}&customer=${encodeURIComponent(customer)}`;
    return { ok: true, link, sandbox: true };
  });