-- Migration 0008: indices compuestos de rendimiento
-- Basado en auditoria 2026-07-23

-- customers: listado principal (created_at DESC) y busqueda por email/phone
CREATE INDEX IF NOT EXISTS idx_customers_created_at ON customers(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_customers_email ON customers(email);
CREATE INDEX IF NOT EXISTS idx_customers_phone ON customers(phone);

-- bookings: listado principal y filtros combinados frecuentes
CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON bookings(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_bookings_customer_created ON bookings(customer_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_bookings_email_created ON bookings(customer_email, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_bookings_payment_status ON bookings(payment_status);
CREATE INDEX IF NOT EXISTS idx_bookings_start_status ON bookings(start_date, status);

-- booking_items: orden de visualizacion
CREATE INDEX IF NOT EXISTS idx_booking_items_order
  ON booking_items(booking_id, date, time, sort_order);

-- itineraries
CREATE INDEX IF NOT EXISTS idx_itineraries_customer_start
  ON itineraries(customer_id, start_date DESC);

-- itinerary_activities: orden de visualizacion
CREATE INDEX IF NOT EXISTS idx_itinerary_activities_order
  ON itinerary_activities(itinerary_id, day_number, sort_order, time);

-- quotes: listado principal
CREATE INDEX IF NOT EXISTS idx_quotes_created_at ON quotes(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_quotes_status ON quotes(status);

-- invoices: listado principal
CREATE INDEX IF NOT EXISTS idx_invoices_created_at ON invoices(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_invoices_booking ON invoices(booking_id);

-- expenses: filtro por categoria y fecha
CREATE INDEX IF NOT EXISTS idx_expenses_category_date ON expenses(category, expense_date DESC);
CREATE INDEX IF NOT EXISTS idx_expenses_booking ON expenses(booking_id);

-- commissions
CREATE INDEX IF NOT EXISTS idx_commissions_booking ON commissions(booking_id);
CREATE INDEX IF NOT EXISTS idx_commissions_created_at ON commissions(created_at DESC);

-- experiences: listado y destacados
CREATE INDEX IF NOT EXISTS idx_experiences_featured_created
  ON experiences(featured DESC, created_at DESC);

-- blog_posts: listado publico
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at
  ON blog_posts(published DESC, published_at DESC);

-- suppliers
CREATE INDEX IF NOT EXISTS idx_suppliers_type_status ON suppliers(type, status);

-- hotel_rooms
CREATE INDEX IF NOT EXISTS idx_hotel_rooms_status ON hotel_rooms(hotel_id, status);

-- admin_users
CREATE INDEX IF NOT EXISTS idx_admin_users_username ON admin_users(username);
