-- Migracion 0006: Sistema completo de gestion de agencia de viajes
-- Modulos: vuelos, hoteles, clientes, reservas, proveedores, itinerarios, facturacion, gastos

-- ── CLIENTES ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS customers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  document_type TEXT DEFAULT 'dni',
  document_number TEXT,
  nationality TEXT DEFAULT 'Peruana',
  birth_date TEXT,
  address TEXT,
  city TEXT,
  preferences TEXT,
  notes TEXT,
  source TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

-- ── PROVEEDORES ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS suppliers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK(type IN ('aerolinea','hotel','transporte','guia','restaurante','seguro','otro')),
  contact_name TEXT,
  phone TEXT,
  email TEXT,
  address TEXT,
  city TEXT,
  website TEXT,
  commission_type TEXT DEFAULT 'percentage' CHECK(commission_type IN ('percentage','fixed')),
  commission_rate REAL DEFAULT 0,
  payment_terms TEXT,
  tax_id TEXT,
  notes TEXT,
  status TEXT DEFAULT 'active' CHECK(status IN ('active','inactive','suspended')),
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

-- ── VUELOS (inventario) ─────────────────────────────────────
CREATE TABLE IF NOT EXISTS flights (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  airline TEXT NOT NULL,
  flight_number TEXT,
  supplier_id INTEGER REFERENCES suppliers(id),
  origin TEXT NOT NULL,
  destination TEXT NOT NULL,
  departure_date TEXT,
  departure_time TEXT,
  arrival_time TEXT,
  class TEXT DEFAULT 'economica' CHECK(class IN ('economica','ejecutiva','primera')),
  price REAL,
  currency TEXT DEFAULT 'PEN',
  seats_available INTEGER DEFAULT 0,
  total_seats INTEGER DEFAULT 0,
  stops INTEGER DEFAULT 0,
  duration_minutes INTEGER,
  baggage_kg INTEGER DEFAULT 23,
  status TEXT DEFAULT 'active' CHECK(status IN ('active','inactive','sold_out','cancelled')),
  notes TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

-- ── HOTELES (inventario) ────────────────────────────────────
CREATE TABLE IF NOT EXISTS hotels (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  supplier_id INTEGER REFERENCES suppliers(id),
  category INTEGER CHECK(category BETWEEN 1 AND 5),
  address TEXT,
  city TEXT NOT NULL,
  country TEXT DEFAULT 'Peru',
  phone TEXT,
  email TEXT,
  website TEXT,
  description TEXT,
  amenities TEXT,
  check_in_time TEXT DEFAULT '15:00',
  check_out_time TEXT DEFAULT '12:00',
  latitude REAL,
  longitude REAL,
  status TEXT DEFAULT 'active' CHECK(status IN ('active','inactive')),
  notes TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

-- ── HABITACIONES ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS hotel_rooms (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  hotel_id INTEGER NOT NULL REFERENCES hotels(id) ON DELETE CASCADE,
  room_type TEXT NOT NULL,
  description TEXT,
  max_guests INTEGER DEFAULT 2,
  beds TEXT,
  price_per_night REAL,
  currency TEXT DEFAULT 'PEN',
  breakfast_included INTEGER DEFAULT 0,
  amenities TEXT,
  available_rooms INTEGER DEFAULT 1,
  total_rooms INTEGER DEFAULT 1,
  status TEXT DEFAULT 'active' CHECK(status IN ('active','maintenance','inactive')),
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

-- ── RESERVAS UNIFICADAS ─────────────────────────────────────
CREATE TABLE IF NOT EXISTS bookings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  booking_type TEXT NOT NULL CHECK(booking_type IN ('vuelo','hotel','paquete','transporte','tour','seguro','combinado')),
  booking_reference TEXT UNIQUE,
  customer_id INTEGER REFERENCES customers(id),
  customer_name TEXT NOT NULL,
  customer_email TEXT,
  customer_phone TEXT,
  customer_document TEXT,
  pax_count INTEGER DEFAULT 1,
  service_details TEXT,
  start_date TEXT,
  end_date TEXT,
  total_amount REAL,
  currency TEXT DEFAULT 'PEN',
  paid_amount REAL DEFAULT 0,
  balance REAL GENERATED ALWAYS AS (COALESCE(total_amount,0) - COALESCE(paid_amount,0)) STORED,
  status TEXT DEFAULT 'pendiente' CHECK(status IN ('pendiente','confirmada','en_curso','completada','cancelada','reembolsada')),
  payment_status TEXT DEFAULT 'pendiente' CHECK(payment_status IN ('pendiente','parcial','pagado','reembolsado')),
  payment_method TEXT,
  source TEXT DEFAULT 'directo' CHECK(source IN ('directo','web','whatsapp','referido','otro')),
  notes TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_bookings_customer ON bookings(customer_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_dates ON bookings(start_date);

-- ── DETALLE DE RESERVAS (items individuales) ───────────────
CREATE TABLE IF NOT EXISTS booking_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  booking_id INTEGER NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  item_type TEXT NOT NULL CHECK(item_type IN ('vuelo','hotel','noche_hotel','transporte','tour','actividad','comida','seguro','otro')),
  description TEXT,
  supplier_id INTEGER REFERENCES suppliers(id),
  supplier_name TEXT,
  reference_number TEXT,
  date TEXT,
  time TEXT,
  quantity INTEGER DEFAULT 1,
  unit_price REAL,
  currency TEXT DEFAULT 'PEN',
  total_price REAL,
  notes TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
);

-- ── ITINERARIOS (viajes multi-dia) ──────────────────────────
CREATE TABLE IF NOT EXISTS itineraries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  customer_id INTEGER REFERENCES customers(id),
  customer_name TEXT,
  start_date TEXT NOT NULL,
  end_date TEXT NOT NULL,
  destination TEXT,
  pax_count INTEGER DEFAULT 1,
  total_amount REAL,
  currency TEXT DEFAULT 'PEN',
  status TEXT DEFAULT 'borrador' CHECK(status IN ('borrador','activo','completado','cancelado')),
  notes TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

-- ── ACTIVIDADES DEL ITINERARIO ──────────────────────────────
CREATE TABLE IF NOT EXISTS itinerary_activities (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  itinerary_id INTEGER NOT NULL REFERENCES itineraries(id) ON DELETE CASCADE,
  day_number INTEGER NOT NULL,
  date TEXT NOT NULL,
  time TEXT,
  activity_type TEXT CHECK(activity_type IN ('traslado','vuelo','visita','comida','hospedaje','actividad_libre','tour','taller','otro')),
  title TEXT NOT NULL,
  description TEXT,
  location TEXT,
  supplier_id INTEGER REFERENCES suppliers(id),
  supplier_name TEXT,
  reference_number TEXT,
  amount REAL,
  currency TEXT DEFAULT 'PEN',
  notes TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
);

-- ── FACTURAS / COMPROBANTES ─────────────────────────────────
CREATE TABLE IF NOT EXISTS invoices (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  invoice_number TEXT UNIQUE NOT NULL,
  invoice_type TEXT DEFAULT 'boleta' CHECK(invoice_type IN ('factura','boleta','recibo','proforma')),
  booking_id INTEGER REFERENCES bookings(id),
  customer_id INTEGER REFERENCES customers(id),
  customer_name TEXT NOT NULL,
  customer_document TEXT,
  customer_address TEXT,
  items TEXT,
  subtotal REAL,
  tax_rate REAL DEFAULT 18,
  tax_amount REAL,
  total REAL,
  currency TEXT DEFAULT 'PEN',
  status TEXT DEFAULT 'emitido' CHECK(status IN ('borrador','emitido','pagado','anulado','vencido')),
  issued_date TEXT,
  due_date TEXT,
  paid_date TEXT,
  payment_method TEXT,
  notes TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

-- ── GASTOS OPERATIVOS ───────────────────────────────────────
CREATE TABLE IF NOT EXISTS expenses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  category TEXT NOT NULL CHECK(category IN ('transporte','alojamiento','alimentacion','marketing','oficina','comisiones','impuestos','servicios','otros')),
  description TEXT NOT NULL,
  amount REAL NOT NULL,
  currency TEXT DEFAULT 'PEN',
  expense_date TEXT DEFAULT (date('now')),
  supplier_id INTEGER REFERENCES suppliers(id),
  booking_id INTEGER REFERENCES bookings(id),
  payment_method TEXT,
  receipt_url TEXT,
  notes TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

-- ── COMISIONES ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS commissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  supplier_id INTEGER NOT NULL REFERENCES suppliers(id),
  booking_id INTEGER REFERENCES bookings(id),
  booking_item_id INTEGER REFERENCES booking_items(id),
  commission_type TEXT DEFAULT 'percentage' CHECK(commission_type IN ('percentage','fixed')),
  rate REAL,
  base_amount REAL,
  amount REAL NOT NULL,
  currency TEXT DEFAULT 'PEN',
  status TEXT DEFAULT 'pendiente' CHECK(status IN ('pendiente','pagado','cancelado')),
  paid_date TEXT,
  notes TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

-- ── INDICES ADICIONALES ─────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_flights_route ON flights(origin, destination);
CREATE INDEX IF NOT EXISTS idx_flights_date ON flights(departure_date);
CREATE INDEX IF NOT EXISTS idx_hotels_city ON hotels(city);
CREATE INDEX IF NOT EXISTS idx_hotel_rooms_hotel ON hotel_rooms(hotel_id);
CREATE INDEX IF NOT EXISTS idx_invoices_customer ON invoices(customer_id);
CREATE INDEX IF NOT EXISTS idx_invoices_status ON invoices(status);
CREATE INDEX IF NOT EXISTS idx_itineraries_customer ON itineraries(customer_id);
CREATE INDEX IF NOT EXISTS idx_itinerary_activities_itinerary ON itinerary_activities(itinerary_id);
CREATE INDEX IF NOT EXISTS idx_expenses_date ON expenses(expense_date);
CREATE INDEX IF NOT EXISTS idx_commissions_supplier ON commissions(supplier_id);
CREATE INDEX IF NOT EXISTS idx_commissions_status ON commissions(status);
CREATE INDEX IF NOT EXISTS idx_booking_items_booking ON booking_items(booking_id);

-- ── SEED: Proveedores iniciales ─────────────────────────────
INSERT OR IGNORE INTO suppliers (name, type, commission_rate, status) VALUES
  ('Latam Airlines', 'aerolinea', 5, 'active'),
  ('Sky Airline', 'aerolinea', 3, 'active'),
  ('JetSmart Peru', 'aerolinea', 3, 'active'),
  ('Civa Bus', 'transporte', 8, 'active'),
  ('Cruz del Sur', 'transporte', 8, 'active');

-- Seed: Hoteles iniciales
INSERT OR IGNORE INTO hotels (name, city, category, status) VALUES
  ('Hotel Monasterio', 'Cusco', 5, 'active'),
  ('Tierra Viva Cusco', 'Cusco', 3, 'active'),
  ('Hotel Paracas', 'Paracas', 4, 'active'),
  ('Casa Andina Premium', 'Lima', 4, 'active'),
  ('Hotel DoubleTree', 'Lima', 4, 'active'),
  ('Sonesta Hotel', 'Ica', 3, 'active');
