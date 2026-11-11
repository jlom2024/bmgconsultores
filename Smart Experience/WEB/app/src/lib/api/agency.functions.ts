// Server functions for travel agency modules
import { createServerFn } from "@tanstack/react-start";
import { bindings } from "../bindings.server";
import {
  requireAdminSession,
  requireCustomerSession,
  makePasswordHash,
  verifyPassword,
  createCustomerSession,
} from "./auth.functions";
import { z } from "zod";

// ── ZOD SCHEMAS ──────────────────────────────────────────────
const CustomerSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email().optional().nullable(),
  phone: z.string().max(30).optional().nullable(),
  document_type: z.enum(['dni','pasaporte','ce','ruc']).default('dni'),
  document_number: z.string().max(20).optional().nullable(),
  nationality: z.string().max(50).default('Peruana'),
  birth_date: z.string().optional().nullable(),
  address: z.string().max(300).optional().nullable(),
  city: z.string().max(100).optional().nullable(),
  preferences: z.string().max(500).optional().nullable(),
  notes: z.string().max(1000).optional().nullable(),
  source: z.string().max(50).default('directo'),
});

const BookingItemSchema = z.object({
  item_type: z.string().max(50),
  description: z.string().max(500),
  supplier_id: z.number().int().positive().optional().nullable(),
  supplier_name: z.string().max(200).optional().nullable(),
  reference_number: z.string().max(100).optional().nullable(),
  date: z.string().optional().nullable(),
  time: z.string().optional().nullable(),
  quantity: z.number().int().positive().default(1),
  unit_price: z.number().min(0).default(0),
  currency: z.enum(['PEN','USD']).default('PEN'),
  notes: z.string().max(500).optional().nullable(),
  sort_order: z.number().int().default(0),
});

const BookingSchema = z.object({
  booking_type: z.enum(['vuelo','hotel','paquete','transporte','tour','seguro','combinado']),
  customer_name: z.string().min(1).max(200),
  customer_id: z.number().int().positive().optional().nullable(),
  customer_email: z.string().email().optional().nullable(),
  customer_phone: z.string().max(30).optional().nullable(),
  customer_document: z.string().max(30).optional().nullable(),
  pax_count: z.number().int().positive().default(1),
  service_details: z.string().max(2000).optional().nullable(),
  start_date: z.string().optional().nullable(),
  end_date: z.string().optional().nullable(),
  total_amount: z.number().min(0).default(0),
  paid_amount: z.number().min(0).default(0),
  currency: z.enum(['PEN','USD']).default('PEN'),
  status: z.enum(['pendiente','confirmada','en_curso','completada','cancelada','reembolsada']).default('pendiente'),
  payment_status: z.enum(['pendiente','parcial','pagado','reembolsado']).default('pendiente'),
  payment_method: z.string().max(50).optional().nullable(),
  source: z.enum(['directo','web','whatsapp','referido','otro']).default('directo'),
  notes: z.string().max(2000).optional().nullable(),
  booking_reference: z.string().max(50).optional().nullable(),
  items: z.array(BookingItemSchema).optional().default([]),
});

// ── HELPERS ──────────────────────────────────────────────────
function db() {
  const d = bindings().DB;
  if (!d) throw new Error("DB not available");
  return d;
}

// ── CUSTOMERS ────────────────────────────────────────────────
export const getCustomers = createServerFn({ method: "POST" })
  .validator((x: any) => x as { token: string })
  .handler(async ({ data }) => {
    requireAdminSession(data.token);
    const rows = await db().prepare("SELECT * FROM customers ORDER BY created_at DESC LIMIT 200").all();
    return { ok: true, data: rows.results as any[] };
  });

export const searchCustomers = createServerFn({ method: "POST" })
  .validator(z.object({ token: z.string(), q: z.string().min(1).max(100) }).parse)
  .handler(async ({ data }) => {
    requireAdminSession(data.token);
    const q = data.q;
    const rows = await db().prepare(
      "SELECT * FROM customers WHERE name LIKE ? OR email LIKE ? OR phone LIKE ? OR document_number LIKE ? ORDER BY created_at DESC LIMIT 50"
    ).bind(`%${q}%`, `%${q}%`, `%${q}%`, `%${q}%`).all();
    return { ok: true, data: rows.results as any[] };
  });

export const getCustomer = createServerFn({ method: "POST" })
  .validator(z.object({ token: z.string(), id: z.number().int().positive() }).parse)
  .handler(async ({ data }) => {
    requireAdminSession(data.token);
    const row = await db().prepare("SELECT * FROM customers WHERE id = ?").bind(data.id).first();
    return { ok: true, data: row as any };
  });

export const createCustomer = createServerFn({ method: "POST" })
  .validator(CustomerSchema.extend({ token: z.string() }).parse)
  .handler(async ({ data }) => {
    requireAdminSession(data.token);
    const r = await db().prepare(
      `INSERT INTO customers (name, email, phone, document_type, document_number, nationality, birth_date, address, city, preferences, notes, source)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(data.name, data.email ?? null, data.phone ?? null, data.document_type ?? 'dni', data.document_number ?? null,
           data.nationality ?? 'Peruana', data.birth_date ?? null, data.address ?? null, data.city ?? null,
           data.preferences ?? null, data.notes ?? null, data.source ?? 'directo').run();
    return { ok: true, id: (r as any).lastRowId };
  });

export const updateCustomer = createServerFn({ method: "POST" })
  .validator((x: any) => x)
  .handler(async ({ data }) => {
    requireAdminSession(data.token);
    await db().prepare(
      `UPDATE customers SET name=?, email=?, phone=?, document_type=?, document_number=?, nationality=?, birth_date=?, address=?, city=?, preferences=?, notes=?, updated_at=datetime('now') WHERE id=?`
    ).bind(data.name, data.email||null, data.phone||null, data.document_type||'dni', data.document_number||null,
           data.nationality||'Peruana', data.birth_date||null, data.address||null, data.city||null,
           data.preferences||null, data.notes||null, data.id).run();
    return { ok: true };
  });

export const deleteCustomer = createServerFn({ method: "POST" })
  .validator(z.object({ token: z.string(), id: z.number().int().positive() }).parse)
  .handler(async ({ data }) => {
    requireAdminSession(data.token);
    await db().prepare("DELETE FROM customers WHERE id = ?").bind(data.id).run();
    return { ok: true };
  });

export const getCustomerBookings = createServerFn({ method: "POST" })
  .validator((x: any) => x as { token: string; id: number })
  .handler(async ({ data }) => {
    requireAdminSession(data.token);
    const rows = await db().prepare("SELECT * FROM bookings WHERE customer_id = ? ORDER BY created_at DESC").bind(data.id).all();
    return { ok: true, data: rows.results as any[] };
  });

// ── BOOKINGS ─────────────────────────────────────────────────
export const getBookings = createServerFn({ method: "POST" })
  .validator((x: any) => x as { token: string })
  .handler(async ({ data }) => {
    requireAdminSession(data.token);
    const rows = await db().prepare("SELECT * FROM bookings ORDER BY created_at DESC LIMIT 200").all();
    return { ok: true, data: rows.results as any[] };
  });

export const getBooking = createServerFn({ method: "POST" })
  .validator((x: any) => x as { token: string; id: number })
  .handler(async ({ data }) => {
    requireAdminSession(data.token);
    const row = await db().prepare("SELECT * FROM bookings WHERE id = ?").bind(data.id).first();
    const items = await db().prepare("SELECT * FROM booking_items WHERE booking_id = ? ORDER BY sort_order, date").bind(data.id).all();
    return { ok: true, data: row as any, items: (items.results as any[]) || [] };
  });

export const createBooking = createServerFn({ method: "POST" })
  .validator(BookingSchema.extend({ token: z.string() }).parse)
  .handler(async ({ data }) => {
    requireAdminSession(data.token);
    const ref = data.booking_reference || `BG-${Date.now().toString(36).toUpperCase()}`;
    const bookingStmt = db().prepare(
      `INSERT INTO bookings (booking_type, booking_reference, customer_id, customer_name, customer_email, customer_phone, customer_document, pax_count, service_details, start_date, end_date, total_amount, paid_amount, currency, status, payment_status, payment_method, source, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(data.booking_type, ref, data.customer_id||null, data.customer_name, data.customer_email||null,
           data.customer_phone||null, data.customer_document||null, data.pax_count||1,
           data.service_details||null, data.start_date||null, data.end_date||null,
           data.total_amount||0, data.paid_amount||0, data.currency||'PEN',
           data.status||'pendiente', data.payment_status||'pendiente', data.payment_method||null,
           data.source||'directo', data.notes||null);
    // Insert booking first to get the ID, then batch-insert items atomically
    const bookingResult = await bookingStmt.run();
    const bookingId = (bookingResult as any).lastRowId;
    if (data.items && data.items.length > 0) {
      await db().batch(
        data.items.map((item: any) =>
          db().prepare(
            `INSERT INTO booking_items (booking_id, item_type, description, supplier_id, supplier_name, reference_number, date, time, quantity, unit_price, currency, total_price, notes, sort_order)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
          ).bind(bookingId, item.item_type, item.description, item.supplier_id||null, item.supplier_name||null,
            item.reference_number||null, item.date||null, item.time||null, item.quantity||1,
            item.unit_price||0, item.currency||'PEN', (item.unit_price||0)*(item.quantity||1),
            item.notes||null, item.sort_order||0)
        )
      );
    }
    return { ok: true, id: bookingId, reference: ref };
  });

export const updateBooking = createServerFn({ method: "POST" })
  .validator((x: any) => x)
  .handler(async ({ data }) => {
    requireAdminSession(data.token);
    await db().prepare(
      `UPDATE bookings SET booking_type=?, customer_id=?, customer_name=?, customer_email=?, customer_phone=?, customer_document=?, pax_count=?, service_details=?, start_date=?, end_date=?, total_amount=?, paid_amount=?, currency=?, status=?, payment_status=?, payment_method=?, source=?, notes=?, updated_at=datetime('now') WHERE id=?`
    ).bind(data.booking_type, data.customer_id||null, data.customer_name, data.customer_email||null,
           data.customer_phone||null, data.customer_document||null, data.pax_count||1,
           data.service_details||null, data.start_date||null, data.end_date||null,
           data.total_amount||0, data.paid_amount||0, data.currency||'PEN',
           data.status||'pendiente', data.payment_status||'pendiente', data.payment_method||null,
           data.source||'directo', data.notes||null, data.id).run();
    return { ok: true };
  });

export const deleteBooking = createServerFn({ method: "POST" })
  .validator(z.object({ token: z.string(), id: z.number().int().positive() }).parse)
  .handler(async ({ data }) => {
    requireAdminSession(data.token);
    await db().batch([
      db().prepare("DELETE FROM booking_items WHERE booking_id = ?").bind(data.id),
      db().prepare("DELETE FROM bookings WHERE id = ?").bind(data.id),
    ]);
    return { ok: true };
  });

export const getBookingStats = createServerFn({ method: "POST" })
  .validator((x: any) => x as { token: string })
  .handler(async ({ data }) => {
    requireAdminSession(data.token);
    const totals = await db().prepare(
      `SELECT status, COUNT(*) as count, COALESCE(SUM(total_amount),0) as total_amount
       FROM bookings GROUP BY status`
    ).all();
    const monthly = await db().prepare(
      `SELECT strftime('%Y-%m', created_at) as month, COUNT(*) as count, COALESCE(SUM(total_amount),0) as revenue
       FROM bookings WHERE created_at >= date('now', '-12 months')
       GROUP BY month ORDER BY month DESC`
    ).all();
    return { ok: true, totals: (totals.results as any[]) || [], monthly: (monthly.results as any[]) || [] };
  });

// ── BOOKING ITEMS ────────────────────────────────────────────
export const createBookingItem = createServerFn({ method: "POST" })
  .validator((x: any) => x)
  .handler(async ({ data }) => {
    requireAdminSession(data.token);
    const r = await db().prepare(
      `INSERT INTO booking_items (booking_id, item_type, description, supplier_id, supplier_name, reference_number, date, time, quantity, unit_price, currency, total_price, notes, sort_order)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(data.booking_id, data.item_type, data.description, data.supplier_id||null, data.supplier_name||null,
           data.reference_number||null, data.date||null, data.time||null, data.quantity||1,
           data.unit_price||0, data.currency||'PEN', data.total_price||(data.unit_price||0)*(data.quantity||1),
           data.notes||null, data.sort_order||0).run();
    return { ok: true, id: (r as any).lastRowId };
  });

export const deleteBookingItem = createServerFn({ method: "POST" })
  .validator((x: any) => x as { token: string; id: number })
  .handler(async ({ data }) => {
    requireAdminSession(data.token);
    await db().prepare("DELETE FROM booking_items WHERE id = ?").bind(data.id).run();
    return { ok: true };
  });

// ── FLIGHTS ──────────────────────────────────────────────────
export const getFlights = createServerFn({ method: "POST" })
  .validator((x: any) => x as { token: string })
  .handler(async ({ data }) => {
    requireAdminSession(data.token);
    const rows = await db().prepare("SELECT f.*, s.name as supplier_name FROM flights f LEFT JOIN suppliers s ON f.supplier_id = s.id ORDER BY f.departure_date DESC, f.departure_time").all();
    return { ok: true, data: rows.results as any[] };
  });

export const getFlight = createServerFn({ method: "POST" })
  .validator((x: any) => x as { token: string; id: number })
  .handler(async ({ data }) => {
    requireAdminSession(data.token);
    const row = await db().prepare("SELECT f.*, s.name as supplier_name FROM flights f LEFT JOIN suppliers s ON f.supplier_id = s.id WHERE f.id = ?").bind(data.id).first();
    return { ok: true, data: row as any };
  });

export const createFlight = createServerFn({ method: "POST" })
  .validator((x: any) => x)
  .handler(async ({ data }) => {
    requireAdminSession(data.token);
    const r = await db().prepare(
      `INSERT INTO flights (airline, flight_number, supplier_id, origin, destination, departure_date, departure_time, arrival_time, class, price, currency, seats_available, total_seats, stops, duration_minutes, baggage_kg, status, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(data.airline, data.flight_number||null, data.supplier_id||null, data.origin, data.destination,
           data.departure_date||null, data.departure_time||null, data.arrival_time||null,
           data.class||'economica', data.price||0, data.currency||'PEN', data.seats_available||0,
           data.total_seats||0, data.stops||0, data.duration_minutes||null, data.baggage_kg||23,
           data.status||'active', data.notes||null).run();
    return { ok: true, id: (r as any).lastRowId };
  });

export const updateFlight = createServerFn({ method: "POST" })
  .validator((x: any) => x)
  .handler(async ({ data }) => {
    requireAdminSession(data.token);
    await db().prepare(
      `UPDATE flights SET airline=?, flight_number=?, supplier_id=?, origin=?, destination=?, departure_date=?, departure_time=?, arrival_time=?, class=?, price=?, currency=?, seats_available=?, total_seats=?, stops=?, duration_minutes=?, baggage_kg=?, status=?, notes=?, updated_at=datetime('now') WHERE id=?`
    ).bind(data.airline, data.flight_number||null, data.supplier_id||null, data.origin, data.destination,
           data.departure_date||null, data.departure_time||null, data.arrival_time||null, data.class||'economica',
           data.price||0, data.currency||'PEN', data.seats_available||0, data.total_seats||0,
           data.stops||0, data.duration_minutes||null, data.baggage_kg||23, data.status||'active',
           data.notes||null, data.id).run();
    return { ok: true };
  });

export const deleteFlight = createServerFn({ method: "POST" })
  .validator((x: any) => x as { token: string; id: number })
  .handler(async ({ data }) => {
    requireAdminSession(data.token);
    await db().prepare("DELETE FROM flights WHERE id = ?").bind(data.id).run();
    return { ok: true };
  });

export const searchFlights = createServerFn({ method: "POST" })
  .validator((x: any) => x)
  .handler(async ({ data }) => {
    requireAdminSession(data.token);
    let sql = "SELECT f.*, s.name as supplier_name FROM flights f LEFT JOIN suppliers s ON f.supplier_id = s.id WHERE 1=1";
    const params: any[] = [];
    if (data.origin) { sql += " AND f.origin LIKE ?"; params.push(`%${data.origin}%`); }
    if (data.destination) { sql += " AND f.destination LIKE ?"; params.push(`%${data.destination}%`); }
    if (data.date) { sql += " AND f.departure_date = ?"; params.push(data.date); }
    if (data.airline) { sql += " AND f.airline LIKE ?"; params.push(`%${data.airline}%`); }
    sql += " ORDER BY f.departure_date";
    const rows = await db().prepare(sql).bind(...params).all();
    return { ok: true, data: rows.results as any[] };
  });

// ── HOTELS ───────────────────────────────────────────────────
export const getHotels = createServerFn({ method: "POST" })
  .validator((x: any) => x as { token: string })
  .handler(async ({ data }) => {
    requireAdminSession(data.token);
    const rows = await db().prepare("SELECT h.*, s.name as supplier_name FROM hotels h LEFT JOIN suppliers s ON h.supplier_id = s.id ORDER BY h.name").all();
    return { ok: true, data: rows.results as any[] };
  });

export const getHotel = createServerFn({ method: "POST" })
  .validator((x: any) => x as { token: string; id: number })
  .handler(async ({ data }) => {
    requireAdminSession(data.token);
    const row = await db().prepare("SELECT h.*, s.name as supplier_name FROM hotels h LEFT JOIN suppliers s ON h.supplier_id = s.id WHERE h.id = ?").bind(data.id).first();
    const rooms = await db().prepare("SELECT * FROM hotel_rooms WHERE hotel_id = ? ORDER BY room_type").bind(data.id).all();
    return { ok: true, data: row as any, rooms: (rooms.results as any[]) || [] };
  });

export const createHotel = createServerFn({ method: "POST" })
  .validator((x: any) => x)
  .handler(async ({ data }) => {
    requireAdminSession(data.token);
    const r = await db().prepare(
      `INSERT INTO hotels (name, supplier_id, category, address, city, country, phone, email, website, description, amenities, check_in_time, check_out_time, notes, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(data.name, data.supplier_id||null, data.category||null, data.address||null, data.city||'',
           data.country||'Peru', data.phone||null, data.email||null, data.website||null,
           data.description||null, data.amenities||null, data.check_in_time||'15:00', data.check_out_time||'12:00',
           data.notes||null, data.status||'active').run();
    return { ok: true, id: (r as any).lastRowId };
  });

export const updateHotel = createServerFn({ method: "POST" })
  .validator((x: any) => x)
  .handler(async ({ data }) => {
    requireAdminSession(data.token);
    await db().prepare(
      `UPDATE hotels SET name=?, supplier_id=?, category=?, address=?, city=?, country=?, phone=?, email=?, website=?, description=?, amenities=?, check_in_time=?, check_out_time=?, notes=?, status=?, updated_at=datetime('now') WHERE id=?`
    ).bind(data.name, data.supplier_id||null, data.category||null, data.address||null, data.city||'',
           data.country||'Peru', data.phone||null, data.email||null, data.website||null, data.description||null,
           data.amenities||null, data.check_in_time||'15:00', data.check_out_time||'12:00',
           data.notes||null, data.status||'active', data.id).run();
    return { ok: true };
  });

export const deleteHotel = createServerFn({ method: "POST" })
  .validator(z.object({ token: z.string(), id: z.number().int().positive() }).parse)
  .handler(async ({ data }) => {
    requireAdminSession(data.token);
    await db().batch([
      db().prepare("DELETE FROM hotel_rooms WHERE hotel_id = ?").bind(data.id),
      db().prepare("DELETE FROM hotels WHERE id = ?").bind(data.id),
    ]);
    return { ok: true };
  });

// ── HOTEL ROOMS ──────────────────────────────────────────────
export const createHotelRoom = createServerFn({ method: "POST" })
  .validator((x: any) => x)
  .handler(async ({ data }) => {
    requireAdminSession(data.token);
    const r = await db().prepare(
      `INSERT INTO hotel_rooms (hotel_id, room_type, description, max_guests, beds, price_per_night, currency, breakfast_included, amenities, available_rooms, total_rooms, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(data.hotel_id, data.room_type, data.description||null, data.max_guests||2, data.beds||null,
           data.price_per_night||0, data.currency||'PEN', data.breakfast_included||0,
           data.amenities||null, data.available_rooms||1, data.total_rooms||1, data.status||'active').run();
    return { ok: true, id: (r as any).lastRowId };
  });

export const updateHotelRoom = createServerFn({ method: "POST" })
  .validator((x: any) => x)
  .handler(async ({ data }) => {
    requireAdminSession(data.token);
    await db().prepare(
      `UPDATE hotel_rooms SET room_type=?, description=?, max_guests=?, beds=?, price_per_night=?, currency=?, breakfast_included=?, amenities=?, available_rooms=?, total_rooms=?, status=?, updated_at=datetime('now') WHERE id=?`
    ).bind(data.room_type, data.description||null, data.max_guests||2, data.beds||null, data.price_per_night||0,
           data.currency||'PEN', data.breakfast_included||0, data.amenities||null, data.available_rooms||1,
           data.total_rooms||1, data.status||'active', data.id).run();
    return { ok: true };
  });

export const deleteHotelRoom = createServerFn({ method: "POST" })
  .validator((x: any) => x as { token: string; id: number })
  .handler(async ({ data }) => {
    requireAdminSession(data.token);
    await db().prepare("DELETE FROM hotel_rooms WHERE id = ?").bind(data.id).run();
    return { ok: true };
  });

// ── SUPPLIERS ────────────────────────────────────────────────
export const getSuppliers = createServerFn({ method: "POST" })
  .validator((x: any) => x as { token: string })
  .handler(async ({ data }) => {
    requireAdminSession(data.token);
    const rows = await db().prepare("SELECT * FROM suppliers ORDER BY name").all();
    return { ok: true, data: rows.results as any[] };
  });

export const getSuppliersByType = createServerFn({ method: "POST" })
  .validator((x: any) => x as { token: string; type: string })
  .handler(async ({ data }) => {
    requireAdminSession(data.token);
    const rows = await db().prepare("SELECT * FROM suppliers WHERE type = ? AND status = 'active' ORDER BY name").bind(data.type).all();
    return { ok: true, data: rows.results as any[] };
  });

export const createSupplier = createServerFn({ method: "POST" })
  .validator((x: any) => x)
  .handler(async ({ data }) => {
    requireAdminSession(data.token);
    const r = await db().prepare(
      `INSERT INTO suppliers (name, type, contact_name, phone, email, address, city, website, commission_type, commission_rate, payment_terms, tax_id, notes, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(data.name, data.type, data.contact_name||null, data.phone||null, data.email||null,
           data.address||null, data.city||null, data.website||null, data.commission_type||'percentage',
           data.commission_rate||0, data.payment_terms||null, data.tax_id||null,
           data.notes||null, data.status||'active').run();
    return { ok: true, id: (r as any).lastRowId };
  });

export const updateSupplier = createServerFn({ method: "POST" })
  .validator((x: any) => x)
  .handler(async ({ data }) => {
    requireAdminSession(data.token);
    await db().prepare(
      `UPDATE suppliers SET name=?, type=?, contact_name=?, phone=?, email=?, address=?, city=?, website=?, commission_type=?, commission_rate=?, payment_terms=?, tax_id=?, notes=?, status=?, updated_at=datetime('now') WHERE id=?`
    ).bind(data.name, data.type, data.contact_name||null, data.phone||null, data.email||null, data.address||null,
           data.city||null, data.website||null, data.commission_type||'percentage', data.commission_rate||0,
           data.payment_terms||null, data.tax_id||null, data.notes||null, data.status||'active', data.id).run();
    return { ok: true };
  });

export const deleteSupplier = createServerFn({ method: "POST" })
  .validator((x: any) => x as { token: string; id: number })
  .handler(async ({ data }) => {
    requireAdminSession(data.token);
    await db().prepare("DELETE FROM suppliers WHERE id = ?").bind(data.id).run();
    return { ok: true };
  });

// ── ITINERARIES ──────────────────────────────────────────────
export const getItineraries = createServerFn({ method: "POST" })
  .validator((x: any) => x as { token: string })
  .handler(async ({ data }) => {
    requireAdminSession(data.token);
    const rows = await db().prepare("SELECT * FROM itineraries ORDER BY start_date DESC LIMIT 100").all();
    return { ok: true, data: rows.results as any[] };
  });

export const getItinerary = createServerFn({ method: "POST" })
  .validator((x: any) => x as { token: string; id: number })
  .handler(async ({ data }) => {
    requireAdminSession(data.token);
    const row = await db().prepare("SELECT * FROM itineraries WHERE id = ?").bind(data.id).first();
    const activities = await db().prepare("SELECT * FROM itinerary_activities WHERE itinerary_id = ? ORDER BY day_number, sort_order, time").bind(data.id).all();
    return { ok: true, data: row as any, activities: (activities.results as any[]) || [] };
  });

export const createItinerary = createServerFn({ method: "POST" })
  .validator((x: any) => x)
  .handler(async ({ data }) => {
    requireAdminSession(data.token);
    const r = await db().prepare(
      `INSERT INTO itineraries (name, customer_id, customer_name, start_date, end_date, destination, pax_count, total_amount, currency, status, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(data.name, data.customer_id||null, data.customer_name||null, data.start_date, data.end_date,
           data.destination||null, data.pax_count||1, data.total_amount||0, data.currency||'PEN',
           data.status||'borrador', data.notes||null).run();
    return { ok: true, id: (r as any).lastRowId };
  });

export const updateItinerary = createServerFn({ method: "POST" })
  .validator((x: any) => x)
  .handler(async ({ data }) => {
    requireAdminSession(data.token);
    await db().prepare(
      `UPDATE itineraries SET name=?, customer_id=?, customer_name=?, start_date=?, end_date=?, destination=?, pax_count=?, total_amount=?, currency=?, status=?, notes=?, updated_at=datetime('now') WHERE id=?`
    ).bind(data.name, data.customer_id||null, data.customer_name||null, data.start_date, data.end_date,
           data.destination||null, data.pax_count||1, data.total_amount||0, data.currency||'PEN',
           data.status||'borrador', data.notes||null, data.id).run();
    return { ok: true };
  });

export const deleteItinerary = createServerFn({ method: "POST" })
  .validator((x: any) => x as { token: string; id: number })
  .handler(async ({ data }) => {
    requireAdminSession(data.token);
    await db().prepare("DELETE FROM itinerary_activities WHERE itinerary_id = ?").bind(data.id).run();
    await db().prepare("DELETE FROM itineraries WHERE id = ?").bind(data.id).run();
    return { ok: true };
  });

// ── ITINERARY ACTIVITIES ─────────────────────────────────────
export const createItineraryActivity = createServerFn({ method: "POST" })
  .validator((x: any) => x)
  .handler(async ({ data }) => {
    requireAdminSession(data.token);
    const r = await db().prepare(
      `INSERT INTO itinerary_activities (itinerary_id, day_number, date, time, activity_type, title, description, location, supplier_id, supplier_name, reference_number, amount, currency, notes, sort_order)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(data.itinerary_id, data.day_number, data.date, data.time||null, data.activity_type||'otro',
           data.title, data.description||null, data.location||null, data.supplier_id||null,
           data.supplier_name||null, data.reference_number||null, data.amount||0, data.currency||'PEN',
           data.notes||null, data.sort_order||0).run();
    return { ok: true, id: (r as any).lastRowId };
  });

export const updateItineraryActivity = createServerFn({ method: "POST" })
  .validator((x: any) => x)
  .handler(async ({ data }) => {
    requireAdminSession(data.token);
    await db().prepare(
      `UPDATE itinerary_activities SET day_number=?, date=?, time=?, activity_type=?, title=?, description=?, location=?, supplier_id=?, supplier_name=?, reference_number=?, amount=?, currency=?, notes=?, sort_order=? WHERE id=?`
    ).bind(data.day_number, data.date, data.time||null, data.activity_type||'otro', data.title,
           data.description||null, data.location||null, data.supplier_id||null, data.supplier_name||null,
           data.reference_number||null, data.amount||0, data.currency||'PEN', data.notes||null,
           data.sort_order||0, data.id).run();
    return { ok: true };
  });

export const deleteItineraryActivity = createServerFn({ method: "POST" })
  .validator((x: any) => x as { token: string; id: number })
  .handler(async ({ data }) => {
    requireAdminSession(data.token);
    await db().prepare("DELETE FROM itinerary_activities WHERE id = ?").bind(data.id).run();
    return { ok: true };
  });

// ── INVOICES ─────────────────────────────────────────────────
export const getInvoices = createServerFn({ method: "POST" })
  .validator((x: any) => x as { token: string })
  .handler(async ({ data }) => {
    requireAdminSession(data.token);
    const rows = await db().prepare("SELECT * FROM invoices ORDER BY created_at DESC LIMIT 200").all();
    return { ok: true, data: rows.results as any[] };
  });

export const createInvoice = createServerFn({ method: "POST" })
  .validator((x: any) => x)
  .handler(async ({ data }) => {
    requireAdminSession(data.token);
    const invNum = data.invoice_number || `F-${Date.now().toString(36).toUpperCase()}`;
    const tax = data.tax_rate != null ? data.tax_rate : 18;
    const subtotal = data.subtotal || data.total / (1 + tax/100) || 0;
    const taxAmount = data.tax_amount || subtotal * tax / 100;
    const total = data.total || subtotal + taxAmount;
    const r = await db().prepare(
      `INSERT INTO invoices (invoice_number, invoice_type, booking_id, customer_id, customer_name, customer_document, customer_address, items, subtotal, tax_rate, tax_amount, total, currency, status, issued_date, due_date, paid_date, payment_method, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(invNum, data.invoice_type||'boleta', data.booking_id||null, data.customer_id||null,
           data.customer_name, data.customer_document||null, data.customer_address||null,
           data.items||null, subtotal, tax, taxAmount, total, data.currency||'PEN',
           data.status||'emitido', data.issued_date||new Date().toISOString().split('T')[0],
           data.due_date||null, data.paid_date||null, data.payment_method||null, data.notes||null).run();
    return { ok: true, id: (r as any).lastRowId, invoice_number: invNum };
  });

export const updateInvoice = createServerFn({ method: "POST" })
  .validator((x: any) => x)
  .handler(async ({ data }) => {
    requireAdminSession(data.token);
    await db().prepare(
      `UPDATE invoices SET invoice_type=?, booking_id=?, customer_id=?, customer_name=?, customer_document=?, customer_address=?, items=?, subtotal=?, tax_rate=?, tax_amount=?, total=?, currency=?, status=?, issued_date=?, due_date=?, paid_date=?, payment_method=?, notes=?, updated_at=datetime('now') WHERE id=?`
    ).bind(data.invoice_type||'boleta', data.booking_id||null, data.customer_id||null, data.customer_name,
           data.customer_document||null, data.customer_address||null, data.items||null, data.subtotal||0,
           data.tax_rate||18, data.tax_amount||0, data.total||0, data.currency||'PEN',
           data.status||'emitido', data.issued_date||null, data.due_date||null, data.paid_date||null,
           data.payment_method||null, data.notes||null, data.id).run();
    return { ok: true };
  });

export const deleteInvoice = createServerFn({ method: "POST" })
  .validator((x: any) => x as { token: string; id: number })
  .handler(async ({ data }) => {
    requireAdminSession(data.token);
    await db().prepare("DELETE FROM invoices WHERE id = ?").bind(data.id).run();
    return { ok: true };
  });

// ── EXPENSES ─────────────────────────────────────────────────
export const getExpenses = createServerFn({ method: "POST" })
  .validator((x: any) => x as { token: string })
  .handler(async ({ data }) => {
    requireAdminSession(data.token);
    const rows = await db().prepare("SELECT e.*, s.name as supplier_name FROM expenses e LEFT JOIN suppliers s ON e.supplier_id = s.id ORDER BY e.expense_date DESC LIMIT 200").all();
    return { ok: true, data: rows.results as any[] };
  });

export const createExpense = createServerFn({ method: "POST" })
  .validator((x: any) => x)
  .handler(async ({ data }) => {
    requireAdminSession(data.token);
    const r = await db().prepare(
      `INSERT INTO expenses (category, description, amount, currency, expense_date, supplier_id, booking_id, payment_method, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(data.category, data.description, data.amount, data.currency||'PEN',
           data.expense_date||new Date().toISOString().split('T')[0],
           data.supplier_id||null, data.booking_id||null, data.payment_method||null, data.notes||null).run();
    return { ok: true, id: (r as any).lastRowId };
  });

export const deleteExpense = createServerFn({ method: "POST" })
  .validator((x: any) => x as { token: string; id: number })
  .handler(async ({ data }) => {
    requireAdminSession(data.token);
    await db().prepare("DELETE FROM expenses WHERE id = ?").bind(data.id).run();
    return { ok: true };
  });

// ── COMMISSIONS ──────────────────────────────────────────────
export const getCommissions = createServerFn({ method: "POST" })
  .validator((x: any) => x as { token: string })
  .handler(async ({ data }) => {
    requireAdminSession(data.token);
    const rows = await db().prepare(
      `SELECT c.*, s.name as supplier_name FROM commissions c LEFT JOIN suppliers s ON c.supplier_id = s.id ORDER BY c.created_at DESC LIMIT 200`
    ).all();
    return { ok: true, data: rows.results as any[] };
  });

export const createCommission = createServerFn({ method: "POST" })
  .validator((x: any) => x)
  .handler(async ({ data }) => {
    requireAdminSession(data.token);
    const r = await db().prepare(
      `INSERT INTO commissions (supplier_id, booking_id, booking_item_id, commission_type, rate, base_amount, amount, currency, status, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(data.supplier_id, data.booking_id||null, data.booking_item_id||null, data.commission_type||'percentage',
           data.rate||0, data.base_amount||0, data.amount, data.currency||'PEN',
           data.status||'pendiente', data.notes||null).run();
    return { ok: true, id: (r as any).lastRowId };
  });

export const payCommission = createServerFn({ method: "POST" })
  .validator((x: any) => x as { token: string; id: number })
  .handler(async ({ data }) => {
    requireAdminSession(data.token);
    await db().prepare("UPDATE commissions SET status='pagado', paid_date=date('now'), updated_at=datetime('now') WHERE id=?").bind(data.id).run();
    return { ok: true };
  });

// ── DASHBOARD STATS ──────────────────────────────────────────
export const getDashboardStats = createServerFn({ method: "POST" })
  .validator((x: any) => x as { token: string })
  .handler(async ({ data }) => {
    requireAdminSession(data.token);
    const activeBookings = await db().prepare(
      "SELECT COUNT(*) as count, COALESCE(SUM(total_amount),0) as revenue FROM bookings WHERE status IN ('pendiente','confirmada','en_curso')"
    ).first();
    const totalCustomers = await db().prepare("SELECT COUNT(*) as count FROM customers").first();
    const totalRevenue = await db().prepare("SELECT COALESCE(SUM(total_amount),0) as total FROM bookings WHERE status != 'cancelada'").first();
    const recentBookings = await db().prepare(
      "SELECT * FROM bookings ORDER BY created_at DESC LIMIT 5"
    ).all();
    const monthlyRevenue = await db().prepare(
      `SELECT strftime('%Y-%m', created_at) as month, COUNT(*) as bookings, COALESCE(SUM(total_amount),0) as revenue
       FROM bookings WHERE created_at >= date('now', '-6 months') AND status != 'cancelada'
       GROUP BY month ORDER BY month ASC`
    ).all();
    const byStatus = await db().prepare(
      `SELECT status, COUNT(*) as count FROM bookings GROUP BY status ORDER BY count DESC`
    ).all();
    const pendingCommissions = await db().prepare(
      "SELECT COALESCE(SUM(amount),0) as total FROM commissions WHERE status='pendiente'"
    ).first();
    return {
      ok: true,
      activeBookings: (activeBookings as any)?.count || 0,
      activeRevenue: (activeBookings as any)?.revenue || 0,
      totalCustomers: (totalCustomers as any)?.count || 0,
      totalRevenue: (totalRevenue as any)?.total || 0,
      recentBookings: (recentBookings.results as any[]) || [],
      monthlyRevenue: (monthlyRevenue.results as any[]) || [],
      byStatus: (byStatus.results as any[]) || [],
      pendingCommissions: (pendingCommissions as any)?.total || 0,
    };
  });

// ── CUSTOMER PORTAL ──────────────────────────────────────────

export const customerRegister = createServerFn({ method: "POST" })
  .validator((x: any) => x)
  .handler(async ({ data }) => {
    const existing = await db().prepare("SELECT id FROM customer_accounts WHERE email = ?").bind(data.email).first();
    if (existing) return { ok: false, error: "Este email ya tiene una cuenta registrada" };

    // Find or create customer
    let customerId = data.customer_id || null;
    if (!customerId) {
      const existingCustomer = await db().prepare("SELECT id FROM customers WHERE email = ? OR phone = ?").bind(data.email, data.phone||"").first();
      if (existingCustomer) {
        customerId = (existingCustomer as any).id;
      } else {
        const r = await db().prepare(
          "INSERT INTO customers (name, email, phone, source) VALUES (?, ?, ?, 'portal')"
        ).bind(data.name, data.email, data.phone||null).run();
        customerId = (r as any).lastRowId;
      }
    }

    const hash = await makePasswordHash(data.password);
    await db().prepare(
      "INSERT INTO customer_accounts (customer_id, email, password_hash) VALUES (?, ?, ?)"
    ).bind(customerId, data.email, hash).run();
    return { ok: true, message: "Cuenta creada exitosamente" };
  });

export const customerLogin = createServerFn({ method: "POST" })
  .validator((x: any) => x)
  .handler(async ({ data }) => {
    const account = await db().prepare(
      "SELECT ca.*, c.name as customer_name, c.phone as customer_phone FROM customer_accounts ca LEFT JOIN customers c ON ca.customer_id = c.id WHERE ca.email = ?"
    ).bind(data.email).first() as any;
    if (!account) return { ok: false, error: "Email no registrado" };

    const isValid = await verifyPassword(data.password, account.password_hash);
    if (!isValid) return { ok: false, error: "Contrasena incorrecta" };

    await db().prepare("UPDATE customer_accounts SET last_login = datetime('now') WHERE id = ?").bind(account.id).run();

    // Create a server-side session; client stores only the opaque token
    const sessionToken = createCustomerSession(
      account.customer_id,
      account.id,
      account.email,
      account.customer_name || account.email
    );

    return { ok: true, sessionToken };
  });

export const getCustomerPortalBookings = createServerFn({ method: "POST" })
  .validator((x: any) => x as { sessionToken: string })
  .handler(async ({ data }) => {
    const session = requireCustomerSession(data.sessionToken);
    const rows = await db().prepare(
      "SELECT * FROM bookings WHERE customer_id = ? ORDER BY created_at DESC LIMIT 50"
    ).bind(session.customerId).all();
    return { ok: true, data: rows.results as any[] };
  });

export const getCustomerPortalBookingDetail = createServerFn({ method: "POST" })
  .validator((x: any) => x as { sessionToken: string; booking_id: number })
  .handler(async ({ data }) => {
    const session = requireCustomerSession(data.sessionToken);

    const booking = await db().prepare(
      "SELECT * FROM bookings WHERE id = ?"
    ).bind(data.booking_id).first() as any;
    if (!booking) return { ok: false, error: "Reserva no encontrada" };

    // Server-enforced ownership check — no client-supplied customer_id trusted
    if (booking.customer_id !== session.customerId) {
      return { ok: false, error: "Esta reserva no te pertenece" };
    }

    const items = await db().prepare(
      "SELECT * FROM booking_items WHERE booking_id = ? ORDER BY date, time, sort_order"
    ).bind(data.booking_id).all();

    const itineraries = await db().prepare(
      "SELECT * FROM itineraries WHERE customer_id = ? ORDER BY start_date DESC"
    ).bind(session.customerId).all();

    return {
      ok: true,
      booking: booking as any,
      items: (items.results as any[]) || [],
      itineraries: (itineraries.results as any[]) || [],
    };
  });

export const getCustomerPortalItinerary = createServerFn({ method: "POST" })
  .validator((x: any) => x as { sessionToken: string; id: number })
  .handler(async ({ data }) => {
    const session = requireCustomerSession(data.sessionToken);
    const itinerary = await db().prepare("SELECT * FROM itineraries WHERE id = ?").bind(data.id).first() as any;
    if (!itinerary) return { ok: false, error: "Itinerario no encontrado" };
    // Ownership: itinerary must belong to this customer
    if (itinerary.customer_id !== session.customerId) {
      return { ok: false, error: "Este itinerario no te pertenece" };
    }
    const activities = await db().prepare(
      "SELECT * FROM itinerary_activities WHERE itinerary_id = ? ORDER BY day_number, sort_order, time"
    ).bind(data.id).all();
    return { ok: true, itinerary: itinerary as any, activities: (activities.results as any[]) || [] };
  });
