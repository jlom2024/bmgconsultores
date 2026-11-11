// WhatsApp automation — templates, send log, reminder rules, and scheduler
import { createServerFn } from "@tanstack/react-start";

const WHATSAPP_NUMBER = "51994118084";

// ─── Templates ────────────────────────────────────────────────────────
const DEFAULT_TEMPLATES = [
  {
    id: "booking-confirm", name: "Confirmacion de Reserva", category: "reservas",
    message: `Hola {{cliente}}! Gracias por reservar con BG Travel Peru.\n\n*Reserva #{{referencia}}*\nTipo: {{tipo}}\nPasajeros: {{pasajeros}}\nFechas: {{fechas}}\nTotal: S/ {{total}}\n\nTu reserva esta siendo procesada. En breve te enviaremos la confirmacion oficial.\n\n?Necesitas ayuda? Responde a este mensaje.`,
    variables: ["cliente","referencia","tipo","pasajeros","fechas","total"],
  },
  {
    id: "quote-response", name: "Respuesta a Cotizacion", category: "cotizaciones",
    message: `Hola {{cliente}}! Gracias por solicitar una cotizacion en BG Travel Peru.\n\n*Cotizacion #{{id}}*\nDestino: {{destino}}\nServicios: {{servicios}}\nPresupuesto estimado: S/ {{presupuesto}}\n\nEstamos revisando tu solicitud y te enviaremos los detalles en las proximas 24 horas.`,
    variables: ["cliente","id","destino","servicios","presupuesto"],
  },
  {
    id: "payment-reminder", name: "Recordatorio de Pago", category: "pagos",
    message: `Hola {{cliente}}! Recordatorio amigable de BG Travel Peru.\n\n*Reserva #{{referencia}}*\nMonto pendiente: S/ {{pendiente}}\nFecha limite: {{fechaLimite}}\n\nPara realizar tu pago, haz clic aqui y te guiaremos en el proceso.\n\nGracias por confiar en nosotros!`,
    variables: ["cliente","referencia","pendiente","fechaLimite"],
  },
  {
    id: "payment-received", name: "Pago Recibido", category: "pagos",
    message: `Hola {{cliente}}! Hemos recibido tu pago de S/ {{monto}} por la reserva #{{referencia}}.\n\n*Reserva confirmada!*\nFecha: {{fechas}}\nDestino: {{destino}}\n\nTu itinerario esta listo. Te enviaremos los detalles pronto.\n\nGracias por elegir BG Travel Peru!`,
    variables: ["cliente","monto","referencia","fechas","destino"],
  },
  {
    id: "welcome", name: "Mensaje de Bienvenida", category: "general",
    message: `Hola {{cliente}}! Bienvenido a BG Travel Peru.\n\nSomos tu agencia de viajes inteligente. Ofrecemos:\n- Experiencias unicas en Peru\n- Vuelos nacionales e internacionales\n- Hoteles y paquetes turisticos\n- Asistencia personalizada via WhatsApp\n\n?Como podemos ayudarte hoy?`,
    variables: ["cliente"],
  },
  {
    id: "post-trip", name: "Post-Viaje / Seguimiento", category: "general",
    message: `Hola {{cliente}}! Esperamos que hayas disfrutado tu viaje a {{destino}} con BG Travel Peru.\n\n?Como fue tu experiencia? Nos encantaria conocer tu opinion.\n\nAdemas, recuerda que tenemos un descuento especial del 10% en tu proxima reserva si nos recomiendas con un amigo.\n\nGracias por viajar con nosotros!`,
    variables: ["cliente","destino"],
  },
];

// ─── Default Reminder Rules ───────────────────────────────────────────
const DEFAULT_RULES = [
  {
    id: "rule-payment-3d", name: "Recordatorio de Pago (3 dias antes)",
    description: "Envia un recordatorio de pago 3 dias antes del vencimiento para reservas con saldo pendiente",
    trigger: { type: "days_before_payment_due", days: 3, template: "payment-reminder", booking_status: "pendiente,confirmada" },
    origins: ["booking", "quote"], active: true,
  },
  {
    id: "rule-booking-24h", name: "Recordatorio de Reserva (24h antes)",
    description: "Envia un recordatorio con los detalles de la reserva 24h antes del check-in",
    trigger: { type: "days_before_start", days: 1, template: "booking-confirm", booking_status: "confirmada,en_curso" },
    origins: ["booking"], active: true,
  },
  {
    id: "rule-payment-1d", name: "Recordatorio de Pago (1 dia antes)",
    description: "Recordatorio urgente 1 dia antes del vencimiento de pago",
    trigger: { type: "days_before_payment_due", days: 1, template: "payment-reminder", booking_status: "pendiente,confirmada" },
    origins: ["booking", "quote"], active: true,
  },
  {
    id: "rule-post-trip", name: "Seguimiento Post-Viaje (3 dias despues)",
    description: "Envia un mensaje de seguimiento 3 dias despues del check-out",
    trigger: { type: "days_after_end", days: 3, template: "post-trip", booking_status: "completada" },
    origins: ["booking"], active: false,
  },
  {
    id: "rule-quote-followup", name: "Seguimiento de Cotizacion (48h)",
    description: "Envia un seguimiento 48h despues de una cotizacion sin respuesta",
    trigger: { type: "hours_after_quote", hours: 48, template: "quote-response", booking_status: "" },
    origins: ["quote"], active: false,
  },
];

// ─── In-memory stores ─────────────────────────────────────────────────
let messageLog: any[] = [];
let reminderRules: any[] = [...DEFAULT_RULES];
let schedulerLog: any[] = [];

// ─── Mock booking data for scheduler demo ─────────────────────────────
const MOCK_BOOKINGS = [
  { id: 1, booking_reference: "BG-001", customer_name: "Carlos Mendoza", booking_type: "paquete", pax_count: 2, total_amount: 850, paid_amount: 400, status: "confirmada", payment_status: "parcial", start_date: "2026-07-24", end_date: "2026-07-28", created_at: "2026-07-10" },
  { id: 2, booking_reference: "BG-002", customer_name: "Maria Lopez", booking_type: "vuelo", pax_count: 1, total_amount: 320, paid_amount: 0, status: "pendiente", payment_status: "pendiente", start_date: "2026-07-30", end_date: "2026-07-30", created_at: "2026-07-12" },
  { id: 3, booking_reference: "BG-003", customer_name: "Jose Ramirez", booking_type: "hotel", pax_count: 3, total_amount: 1260, paid_amount: 1260, status: "completada", payment_status: "pagado", start_date: "2026-07-18", end_date: "2026-07-22", created_at: "2026-07-05" },
  { id: 4, booking_reference: "BG-004", customer_name: "Ana Torres", booking_type: "paquete", pax_count: 2, total_amount: 2200, paid_amount: 1100, status: "confirmada", payment_status: "parcial", start_date: "2026-08-05", end_date: "2026-08-10", created_at: "2026-07-15" },
  { id: 5, booking_reference: "BG-005", customer_name: "Pedro Sanchez", booking_type: "experiencia", pax_count: 1, total_amount: 450, paid_amount: 450, status: "en_curso", payment_status: "pagado", start_date: "2026-07-23", end_date: "2026-07-24", created_at: "2026-07-08" },
  { id: 6, booking_reference: "BG-006", customer_name: "Lucia Fernandez", booking_type: "paquete", pax_count: 4, total_amount: 3800, paid_amount: 1500, status: "pendiente", payment_status: "parcial", start_date: "2026-08-15", end_date: "2026-08-20", created_at: "2026-07-20" },
];

const MOCK_QUOTES = [
  { id: 101, customer_name: "Roberto Garcia", destination: "Cusco - Machu Picchu", services: "Vuelo + Hotel + Tour", estimated_budget: 1500, status: "pendiente", created_at: "2026-07-21" },
  { id: 102, customer_name: "Carmen Diaz", destination: "Ica - Huacachina", services: "Tour + Hotel", estimated_budget: 600, status: "pendiente", created_at: "2026-07-22" },
  { id: 103, customer_name: "Diego Huaman", destination: "Arequipa", services: "Vuelo + Hotel + City Tour", estimated_budget: 1200, status: "cotizado", created_at: "2026-07-18" },
];

// ─── Helpers ──────────────────────────────────────────────────────────
function fillTemplate(tpl: any, vars: Record<string, string>) {
  let msg = tpl.message;
  for (const [k, v] of Object.entries(vars)) {
    msg = msg.replace(new RegExp(`\\{\\{${k}\\}\\}`, "g"), v || `[${k}]`);
  }
  return msg;
}

function daysFromNow(dateStr: string): number {
  const d = new Date(dateStr);
  const now = new Date();
  return Math.round((d.getTime() - now.getTime()) / 86400000);
}

// ─── Template Functions ───────────────────────────────────────────────
export const getTemplates = createServerFn({ method: "GET" })
  .handler(async () => ({ ok: true, templates: DEFAULT_TEMPLATES }));

export const getMessageLog = createServerFn({ method: "GET" })
  .handler(async () => ({ ok: true, messages: [...messageLog].reverse() }));

export const logSentMessage = createServerFn({ method: "POST" })
  .validator((x: any) => x)
  .handler(async ({ data }: any) => {
    const entry = {
      id: messageLog.length + 1,
      phone: data.phone || WHATSAPP_NUMBER,
      template: data.template || "",
      customer: data.customer || "",
      message: data.message || "",
      status: "enviado",
      rule_id: data.rule_id || "",
      created_at: new Date().toISOString(),
    };
    messageLog.push(entry);
    if (messageLog.length > 200) messageLog = messageLog.slice(-200);
    return { ok: true, message: entry };
  });

export const getWhatsAppNumber = createServerFn({ method: "GET" })
  .handler(async () => ({ ok: true, number: WHATSAPP_NUMBER, waLink: `https://wa.me/${WHATSAPP_NUMBER}` }));

export const buildWaLink = createServerFn({ method: "POST" })
  .validator((x: any) => x)
  .handler(async ({ data }: any) => {
    const tpl = DEFAULT_TEMPLATES.find(t => t.id === data.template);
    if (!tpl) return { ok: false, error: "Template no encontrado" };
    const msg = fillTemplate(tpl, data.variables || {});
    return { ok: true, url: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, message: msg };
  });

// ─── Reminder Rules CRUD ──────────────────────────────────────────────
export const getReminderRules = createServerFn({ method: "GET" })
  .handler(async () => ({ ok: true, rules: reminderRules }));

export const toggleReminderRule = createServerFn({ method: "POST" })
  .validator((x: any) => x)
  .handler(async ({ data }: any) => {
    const rule = reminderRules.find(r => r.id === data.id);
    if (!rule) return { ok: false, error: "Regla no encontrada" };
    rule.active = data.active !== undefined ? data.active : !rule.active;
    return { ok: true, rule };
  });

export const updateReminderRule = createServerFn({ method: "POST" })
  .validator((x: any) => x)
  .handler(async ({ data }: any) => {
    const idx = reminderRules.findIndex(r => r.id === data.id);
    if (idx === -1) return { ok: false, error: "Regla no encontrada" };
    reminderRules[idx] = { ...reminderRules[idx], ...data };
    return { ok: true, rule: reminderRules[idx] };
  });

export const resetReminderRules = createServerFn({ method: "POST" })
  .handler(async () => {
    reminderRules = [...DEFAULT_RULES.map(r => ({ ...r }))];
    return { ok: true, rules: reminderRules };
  });

// ─── Scheduler ─────────────────────────────────────────────────────────
export const runScheduler = createServerFn({ method: "POST" })
  .handler(async () => {
    const now = new Date();
    const results: any[] = [];
    const activeRules = reminderRules.filter(r => r.active);
    const today = now.toISOString().slice(0, 10);

    for (const rule of activeRules) {
      const tpl = DEFAULT_TEMPLATES.find(t => t.id === rule.trigger.template);
      if (!tpl) continue;

      const trig = rule.trigger;
      let matched: any[] = [];

      // Match bookings
      if (rule.origins.includes("booking")) {
        for (const b of MOCK_BOOKINGS) {
          const statuses = trig.booking_status ? trig.booking_status.split(",").map((s: string) => s.trim()) : [];
          if (statuses.length > 0 && !statuses.includes(b.status)) continue;

          let match = false;
          switch (trig.type) {
            case "days_before_start": {
              const d = daysFromNow(b.start_date);
              match = d === trig.days;
              break;
            }
            case "days_after_end": {
              const d = daysFromNow(b.end_date);
              match = d === -trig.days;
              break;
            }
            case "days_before_payment_due": {
              // Simulate payment due date = start_date - 3 days
              const dueDate = new Date(b.start_date);
              dueDate.setDate(dueDate.getDate() - 3);
              const d = Math.round((dueDate.getTime() - now.getTime()) / 86400000);
              match = d === trig.days && b.paid_amount < b.total_amount;
              break;
            }
          }
          if (match) matched.push({ type: "booking", record: b });
        }
      }

      // Match quotes
      if (rule.origins.includes("quote") && trig.type === "hours_after_quote") {
        for (const q of MOCK_QUOTES) {
          const hours = Math.round((now.getTime() - new Date(q.created_at).getTime()) / 3600000);
          if (hours >= trig.hours && q.status === "pendiente") {
            matched.push({ type: "quote", record: q });
          }
        }
      }

      // Generate messages for matched records
      for (const m of matched) {
        const rec = m.record;
        let vars: Record<string, string> = {};
        let label = "";

        if (m.type === "booking") {
          vars = {
            cliente: String(rec.customer_name), referencia: String(rec.booking_reference),
            tipo: String(rec.booking_type), pasajeros: String(rec.pax_count),
            fechas: `${rec.start_date} a ${rec.end_date}`,
            total: String(rec.total_amount),
            pendiente: String(rec.total_amount - rec.paid_amount),
            fechaLimite: String(rec.start_date),
          };
          label = `${rec.customer_name} — ${rec.booking_reference}`;
        } else {
          vars = {
            cliente: String(rec.customer_name), id: String(rec.id),
            destino: String(rec.destination), servicios: String(rec.services),
            presupuesto: String(rec.estimated_budget),
          };
          label = `${rec.customer_name} — Cotizacion #${rec.id}`;
        }

        const msg = fillTemplate(tpl, vars);
        const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

        const entry = {
          rule_id: rule.id, rule_name: rule.name,
          type: m.type, record_id: m.type === "booking" ? rec.booking_reference : `#${rec.id}`,
          customer: rec.customer_name, template: tpl.name,
          message: msg, wa_link: waLink,
          triggered_at: now.toISOString(),
        };
        results.push(entry);

        // Auto-log to message history
        messageLog.push({
          id: messageLog.length + 1, phone: WHATSAPP_NUMBER,
          template: tpl.name, customer: rec.customer_name,
          message: msg, status: "pendiente",
          rule_id: rule.id, created_at: now.toISOString(),
        });
        if (messageLog.length > 200) messageLog = messageLog.slice(-200);
      }
    }

    // Log scheduler run
    const run = {
      id: schedulerLog.length + 1,
      triggered_at: now.toISOString(),
      rules_evaluated: activeRules.length,
      messages_generated: results.length,
      results,
    };
    schedulerLog.push(run);
    if (schedulerLog.length > 50) schedulerLog = schedulerLog.slice(-50);

    return { ok: true, run };
  });

export const getSchedulerLog = createServerFn({ method: "GET" })
  .handler(async () => ({ ok: true, log: [...schedulerLog].reverse() }));

export const getSchedulerPreview = createServerFn({ method: "POST" })
  .handler(async () => {
    // Same logic as runScheduler but doesn't log — just previews
    const now = new Date();
    const results: any[] = [];
    const activeRules = reminderRules.filter(r => r.active);

    for (const rule of activeRules) {
      const tpl = DEFAULT_TEMPLATES.find(t => t.id === rule.trigger.template);
      if (!tpl) continue;
      const trig = rule.trigger;
      let matched: any[] = [];

      if (rule.origins.includes("booking")) {
        for (const b of MOCK_BOOKINGS) {
          const statuses = trig.booking_status ? trig.booking_status.split(",").map((s: string) => s.trim()) : [];
          if (statuses.length > 0 && !statuses.includes(b.status)) continue;
          let match = false;
          switch (trig.type) {
            case "days_before_start": match = daysFromNow(b.start_date) === trig.days; break;
            case "days_after_end": match = daysFromNow(b.end_date) === -trig.days; break;
            case "days_before_payment_due": {
              const dueDate = new Date(b.start_date); dueDate.setDate(dueDate.getDate() - 3);
              const d = Math.round((dueDate.getTime() - now.getTime()) / 86400000);
              match = d === trig.days && b.paid_amount < b.total_amount;
              break;
            }
          }
          if (match) matched.push({ type: "booking", record: b });
        }
      }
      if (rule.origins.includes("quote") && trig.type === "hours_after_quote") {
        for (const q of MOCK_QUOTES) {
          const hours = Math.round((now.getTime() - new Date(q.created_at).getTime()) / 3600000);
          if (hours >= trig.hours && q.status === "pendiente") matched.push({ type: "quote", record: q });
        }
      }
      for (const m of matched) {
        const rec = m.record;
        const vars: Record<string, string> = m.type === "booking"
          ? { cliente: String(rec.customer_name), referencia: String(rec.booking_reference), tipo: String(rec.booking_type), pasajeros: String(rec.pax_count), fechas: `${rec.start_date} a ${rec.end_date}`, total: String(rec.total_amount), pendiente: String(rec.total_amount - rec.paid_amount), fechaLimite: String(rec.start_date), id: "", destino: "", servicios: "", presupuesto: "" }
          : { cliente: String(rec.customer_name), id: String(rec.id), destino: String(rec.destination), servicios: String(rec.services), presupuesto: String(rec.estimated_budget), referencia: "", tipo: "", pasajeros: "", fechas: "", total: "", pendiente: "", fechaLimite: "" };
        results.push({
          rule_id: rule.id, rule_name: rule.name, type: m.type,
          record_id: m.type === "booking" ? rec.booking_reference : `#${rec.id}`,
          customer: rec.customer_name, template: tpl.name,
          message: fillTemplate(tpl, vars), total: m.type === "booking" ? rec.total_amount : rec.estimated_budget,
        });
      }
    }
    return { ok: true, rules_count: activeRules.length, results };
  });