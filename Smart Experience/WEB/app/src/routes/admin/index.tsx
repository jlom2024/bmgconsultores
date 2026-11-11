import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { AdminExportButton, exportToCSV } from "../../lib/admin-export";
import WhatsAppModule from "../../components/admin/WhatsAppModule";
import PaymentsModule from "../../components/admin/PaymentsModule";
import { getAdminSession, adminLogout } from "../../lib/api/auth.functions";
import { getExperiences, createExperience, updateExperience, deleteExperience } from "../../lib/api/experiences.functions";
import { getQuotes, updateQuoteStatus } from "../../lib/api/quotes.functions";
import { getAllBlogPosts, createBlogPost, updateBlogPost, deleteBlogPost } from "../../lib/api/blog.functions";
import {
  getDashboardStats, getCustomers, searchCustomers, createCustomer, updateCustomer, deleteCustomer, getCustomerBookings,
  getBookings, getBooking, createBooking, updateBooking, deleteBooking, getBookingStats,
  getFlights, createFlight, updateFlight, deleteFlight, searchFlights,
  getHotels, getHotel, createHotel, updateHotel, deleteHotel, createHotelRoom, updateHotelRoom, deleteHotelRoom,
  getSuppliers, createSupplier, updateSupplier, deleteSupplier,
  getItineraries, getItinerary, createItinerary, updateItinerary, deleteItinerary, createItineraryActivity, updateItineraryActivity, deleteItineraryActivity,
  getInvoices, createInvoice, updateInvoice, deleteInvoice,
  getExpenses, createExpense, deleteExpense,
  getCommissions, createCommission, payCommission,
} from "../../lib/api/agency.functions";
import { getAdminToken } from "../../lib/admin-client";

// @ts-ignore
export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
  head: () => ({
    meta: [
      { title: "Panel Admin — BG Travel" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
});

type Module = "dashboard" | "experiences" | "quotes" | "blog" | "customers" | "bookings" | "flights" | "hotels" | "suppliers" | "itineraries" | "invoices" | "expenses" | "commissions" | "whatsapp" | "payments";

const MODULES: { id: Module; label: string; icon: string }[] = [
  { id: "dashboard", label: "Dashboard", icon: "📊" },
  { id: "bookings", label: "Reservas", icon: "📋" },
  { id: "customers", label: "Clientes", icon: "👥" },
  { id: "flights", label: "Vuelos", icon: "✈️" },
  { id: "hotels", label: "Hoteles", icon: "🏨" },
  { id: "itineraries", label: "Itinerarios", icon: "🗺️" },
  { id: "suppliers", label: "Proveedores", icon: "🏢" },
  { id: "invoices", label: "Facturacion", icon: "💰" },
  { id: "expenses", label: "Gastos", icon: "💳" },
  { id: "commissions", label: "Comisiones", icon: "📈" },
  { id: "experiences", label: "Experiencias", icon: "🏔️" },
  { id: "quotes", label: "Cotizaciones", icon: "📩" },
  { id: "blog", label: "Blog", icon: "📝" },
  { id: "whatsapp", label: "WhatsApp", icon: "💬" },
  { id: "payments", label: "Pagos", icon: "💳" },
];

function AdminDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<string | null>(null);
  const [module, setModule] = useState<Module>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("bg_admin_token");
    if (!token) { navigate({ to: "/login" as any }); return; }
    getAdminSession({ data: token }).then((res: any) => {
      if (res.ok) setUser(res.username || "admin");
      else { localStorage.removeItem("bg_admin_token"); localStorage.removeItem("bg_admin_user"); navigate({ to: "/login" as any }); }
      setLoading(false);
    }).catch(() => { setLoading(false); navigate({ to: "/login" as any }); });
  }, [navigate]);

  const handleLogout = () => {
    const token = localStorage.getItem("bg_admin_token");
    if (token) adminLogout({ data: token });
    localStorage.removeItem("bg_admin_token"); localStorage.removeItem("bg_admin_user");
    navigate({ to: "/login" as any });
  };

  if (loading) return <div className="flex min-h-dvh items-center justify-center bg-bg-navy"><div className="h-8 w-8 animate-spin rounded-full border-2 border-amber/30 border-t-amber" /></div>;

  return (
    <div className="dark flex min-h-dvh bg-bg-navy">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 transform border-r border-border-light bg-bg-surface transition-transform duration-200 lg:static lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex h-16 items-center gap-3 border-b border-border-light px-5">
          <img src="/assets/logo-bg-travel.png" alt="BG Travel" className="h-7 w-auto" />
          <span className="text-sm font-bold">BG Travel Admin</span>
        </div>
        <nav className="overflow-y-auto p-3 space-y-1" style={{ height: "calc(100vh - 4rem)" }}>
          {MODULES.map((m) => (
            <button
              key={m.id}
              onClick={() => { setModule(m.id); setSidebarOpen(false); }}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                module === m.id ? "bg-amber/15 text-amber" : "text-text-secondary hover:bg-bg-card hover:text-text-primary"
              }`}
            >
              <span className="text-base">{m.icon}</span>
              {m.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Header */}
        <header className="sticky top-0 z-20 border-b border-border-light bg-bg-surface/95 backdrop-blur">
          <div className="flex items-center justify-between px-4 py-3 lg:px-6">
            <div className="flex items-center gap-3">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-text-secondary hover:text-text-primary">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
              </button>
              <h1 className="text-lg font-bold capitalize">{MODULES.find(m => m.id === module)?.label || "Dashboard"}</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="hidden text-sm text-text-secondary md:inline">{user}</span>
              <button onClick={handleLogout} className="rounded-lg border border-border-light px-3 py-1.5 text-xs text-text-secondary transition-colors hover:border-amber/30 hover:text-amber">Cerrar sesion</button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          {module === "dashboard" && <DashboardModule onNavigate={setModule} />}
          {module === "experiences" && <ExperiencesModule />}
          {module === "quotes" && <QuotesModule />}
          {module === "blog" && <BlogModule />}
          {module === "whatsapp" && <WhatsAppModule />}
          {module === "payments" && <PaymentsModule />}
          {module === "customers" && <CustomersModule />}
          {module === "bookings" && <BookingsModule />}
          {module === "flights" && <FlightsModule />}
          {module === "hotels" && <HotelsModule />}
          {module === "suppliers" && <SuppliersModule />}
          {module === "itineraries" && <ItinerariesModule />}
          {module === "invoices" && <InvoicesModule />}
          {module === "expenses" && <ExpensesModule />}
          {module === "commissions" && <CommissionsModule />}
        </main>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// DASHBOARD MODULE
// ═══════════════════════════════════════════════════════════════════
function DashboardModule({ onNavigate }: { onNavigate: (m: Module) => void }) {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardStats({ data: { token: getAdminToken() } }).then((res: any) => {
      if (res.ok) setStats(res);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="flex items-center justify-center py-20"><div className="h-6 w-6 animate-spin rounded-full border-2 border-amber/30 border-t-amber" /></div>;
  if (!stats) return <p className="text-text-muted">Error al cargar estadisticas</p>;

  const cards = [
    { label: "Reservas Activas", value: stats.activeBookings, color: "bg-amber/10 text-amber", icon: "📋" },
    { label: "Clientes Registrados", value: stats.totalCustomers, color: "bg-blue-500/10 text-blue-400", icon: "👥" },
    { label: "Ingresos Totales", value: `S/ ${Number(stats.totalRevenue).toFixed(2)}`, color: "bg-green-500/10 text-green-400", icon: "💰" },
    { label: "Ingresos x Reservas Act.", value: `S/ ${Number(stats.activeRevenue).toFixed(2)}`, color: "bg-purple-500/10 text-purple-400", icon: "📈" },
    { label: "Comisiones Pendientes", value: `S/ ${Number(stats.pendingCommissions).toFixed(2)}`, color: "bg-red-500/10 text-red-400", icon: "⏳" },
  ];

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {cards.map((c) => (
          <div key={c.label} className="rounded-2xl border border-border-light bg-bg-card p-5 hover:border-amber/20 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <span className="text-lg">{c.icon}</span>
              <span className={`text-xs font-medium rounded-full px-2 py-0.5 ${c.color}`}>{c.label}</span>
            </div>
            <p className="text-2xl font-bold">{c.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Monthly revenue (recharts) */}
        {stats.monthlyRevenue?.length > 0 && (
          <div className="rounded-2xl border border-border-light bg-bg-card p-5">
            <h3 className="text-sm font-bold mb-4">Ingresos Mensuales (ultimos 6 meses)</h3>
            <div className="flex items-end gap-2 h-48">
              {(() => {
                const max = Math.max(...stats.monthlyRevenue.map((x: any) => x.revenue), 1);
                return stats.monthlyRevenue.map((m: any) => {
                  const h = (m.revenue / max) * 100;
                  const month = m.month?.slice(5) || m.month;
                  const months = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Set","Oct","Nov","Dic"];
                  const label = months[parseInt(month) - 1] || month;
                  return (
                    <div key={m.month} className="flex-1 flex flex-col items-center gap-1 group">
                      <span className="text-[10px] text-text-muted opacity-0 group-hover:opacity-100 transition-opacity">
                        S/{Number(m.revenue).toFixed(0)}
                      </span>
                      <div className="w-full rounded-t-lg relative" style={{ height: `${Math.max(h, 4)}%`, minHeight: '8px' }}>
                        <div className="absolute inset-0 rounded-t-lg bg-amber/20" />
                        <div className="absolute bottom-0 left-0 right-0 rounded-t-lg bg-gradient-to-t from-amber to-amber/60 transition-all hover:from-amber-light" style={{ height: `${h}%` }} />
                      </div>
                      <span className="text-[10px] text-text-muted">{label}</span>
                    </div>
                  );
                });
              })()}
            </div>
          </div>
        )}

        {/* Status distribution */}
        {stats.byStatus?.length > 0 && (
          <div className="rounded-2xl border border-border-light bg-bg-card p-5">
            <h3 className="text-sm font-bold mb-4">Reservas por Estado</h3>
            <div className="space-y-3">
              {stats.byStatus.map((s: any) => {
                const total = stats.byStatus.reduce((a: number, x: any) => a + x.count, 0);
                const pct = total > 0 ? (s.count / total) * 100 : 0;
                const colors: Record<string, string> = {
                  pendiente: "bg-amber", confirmada: "bg-green-500", en_curso: "bg-blue-500",
                  completada: "bg-gray-500", cancelada: "bg-red-500",
                };
                const statusLabels: Record<string, string> = {
                  pendiente: "Pendiente", confirmada: "Confirmada", en_curso: "En Curso",
                  completada: "Completada", cancelada: "Cancelada",
                };
                return (
                  <div key={s.status} className="flex items-center gap-3">
                    <span className="w-28 text-xs capitalize text-text-secondary">{statusLabels[s.status] || s.status}</span>
                    <div className="flex-1 h-3 rounded-full bg-bg-surface overflow-hidden">
                      <div className={`h-full rounded-full transition-all ${colors[s.status] || 'bg-amber'}`} style={{ width: `${pct}%` }} />
                    </div>
                    <span className="w-10 text-right text-xs text-text-muted">{s.count}</span>
                    <span className="w-10 text-right text-xs text-text-muted">({pct.toFixed(0)}%)</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Recent bookings + Quick actions */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl border border-border-light bg-bg-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold">Reservas Recientes</h3>
            <span className="text-xs text-text-muted">{stats.recentBookings?.length || 0} registros</span>
          </div>
          <div className="space-y-2">
            {(stats.recentBookings || []).slice(0, 8).map((b: any) => {
              const statusColors: Record<string, string> = {
                pendiente: "bg-amber/10 text-amber", confirmada: "bg-green-500/10 text-green-400",
                en_curso: "bg-blue-500/10 text-blue-400", completada: "bg-gray-500/10 text-gray-400",
                cancelada: "bg-red-500/10 text-red-400",
              };
              return (
                <div key={b.id} className="flex items-center justify-between rounded-lg border border-border-light bg-bg-surface/50 px-4 py-2.5 text-xs">
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-text-primary">{b.customer_name || "—"}</span>
                    <span className="text-text-muted">{b.booking_reference || `#${b.id}`}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-amber font-medium">S/{Number(b.total_amount).toFixed(0)}</span>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] ${statusColors[b.status] || 'bg-gray-500/10 text-gray-400'}`}>
                      {b.status}
                    </span>
                  </div>
                </div>
              );
            })}
            {(!stats.recentBookings || stats.recentBookings.length === 0) && (
              <p className="text-xs text-text-muted text-center py-4">Sin reservas recientes</p>
            )}
          </div>
        </div>
        <div className="rounded-2xl border border-border-light bg-bg-card p-5">
          <h3 className="text-sm font-bold mb-4">Acciones Rapidas</h3>
          <div className="space-y-2">
            <button onClick={() => onNavigate("bookings")} className="flex w-full items-center gap-3 rounded-lg border border-border-light bg-bg-surface/50 px-4 py-2.5 text-xs hover:border-amber/30 hover:bg-amber/5 transition-colors">
              <span className="text-base">📋</span> Ver todas las reservas
            </button>
            <button onClick={() => onNavigate("customers")} className="flex w-full items-center gap-3 rounded-lg border border-border-light bg-bg-surface/50 px-4 py-2.5 text-xs hover:border-amber/30 hover:bg-amber/5 transition-colors">
              <span className="text-base">👥</span> Gestionar clientes
            </button>
            <button onClick={() => onNavigate("quotes")} className="flex w-full items-center gap-3 rounded-lg border border-border-light bg-bg-surface/50 px-4 py-2.5 text-xs hover:border-amber/30 hover:bg-amber/5 transition-colors">
              <span className="text-base">📩</span> Cotizaciones pendientes
            </button>
            <button onClick={() => onNavigate("invoices")} className="flex w-full items-center gap-3 rounded-lg border border-border-light bg-bg-surface/50 px-4 py-2.5 text-xs hover:border-amber/30 hover:bg-amber/5 transition-colors">
              <span className="text-base">💰</span> Facturacion
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// CUSTOMERS MODULE
// ═══════════════════════════════════════════════════════════════════
function CustomersModule() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<any>({ name: "", email: "", phone: "", document_type: "dni", document_number: "", nationality: "Peruana", birth_date: "", address: "", city: "", preferences: "", notes: "" });
  const [detail, setDetail] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);

  const load = () => { setLoading(true); getCustomers({ data: { token: getAdminToken() } }).then((r: any) => { if (r.ok) setItems(r.data); setLoading(false); }); };
  useEffect(() => { load(); }, []);

  const handleSearch = () => { if (query.trim()) { searchCustomers({ data: { token: getAdminToken(), q: query } }).then((r: any) => { if (r.ok) setItems(r.data); }); } else load(); };
  const resetForm = () => { setForm({ name: "", email: "", phone: "", document_type: "dni", document_number: "", nationality: "Peruana", birth_date: "", address: "", city: "", preferences: "", notes: "" }); setEditing(null); setShowForm(false); };
  const handleEdit = (item: any) => { setEditing(item); setForm({ ...item }); setShowForm(true); };
  const handleDelete = async (id: number) => { if (!confirm("Eliminar cliente?")) return; await deleteCustomer({ data: { token: getAdminToken(), id: id } }); load(); };
  const handleSave = async (e: React.FormEvent) => { e.preventDefault(); setSaving(true); try { if (editing) await updateCustomer({ data: { token: getAdminToken(), ...form, id: editing.id } }); else await createCustomer({ data: { token: getAdminToken(), ...form } }); resetForm(); load(); } finally { setSaving(false); } };
  const viewDetail = async (item: any) => { setDetail(item); const r = await getCustomerBookings({ data: { token: getAdminToken(), id: item.id } }); if (r.ok) setBookings(r.data); };

  const formatDate = (d: string) => { try { return new Date(d).toLocaleDateString("es-PE"); } catch { return d; } };

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-bold">Clientes ({items.length})</h2>
        <div className="flex gap-2">
          <input value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSearch()} placeholder="Buscar cliente..." className="w-48 rounded-lg border border-border-light bg-bg-card px-3 py-2 text-sm" />
          <button onClick={handleSearch} className="rounded-lg border border-border-light px-3 py-2 text-sm">Buscar</button>
          <button onClick={() => { resetForm(); setShowForm(true); }} className="rounded-xl bg-amber px-4 py-2 text-sm font-semibold text-bg-navy">+ Nuevo</button>
        </div>
      </div>

      {showForm && (
        <div className="mb-6 rounded-2xl border border-border-light bg-bg-card p-6">
          <h3 className="mb-4 text-lg font-bold">{editing ? "Editar Cliente" : "Nuevo Cliente"}</h3>
          <form onSubmit={handleSave} className="grid gap-4 md:grid-cols-3">
            <div className="md:col-span-3"><label className="block text-sm font-medium text-text-secondary">Nombre *</label><input value={form.name} onChange={e => setForm({...form, name: e.target.value})} required className="mt-1 w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2" /></div>
            <div><label className="block text-sm font-medium text-text-secondary">Email</label><input value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="mt-1 w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2" /></div>
            <div><label className="block text-sm font-medium text-text-secondary">Telefono</label><input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="mt-1 w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2" /></div>
            <div className="flex gap-2">
              <div className="flex-1">
                <label className="block text-sm font-medium text-text-secondary">Doc.</label>
                <select value={form.document_type} onChange={e => setForm({...form, document_type: e.target.value})} className="mt-1 w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2 text-sm">
                  <option value="dni">DNI</option><option value="ce">C.E.</option><option value="pasaporte">Pasaporte</option><option value="ruc">RUC</option>
                </select>
              </div>
              <div className="flex-[2]">
                <label className="block text-sm font-medium text-text-secondary">Nro. Documento</label>
                <input value={form.document_number} onChange={e => setForm({...form, document_number: e.target.value})} className="mt-1 w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2" />
              </div>
            </div>
            <div><label className="block text-sm font-medium text-text-secondary">Nacionalidad</label><input value={form.nationality} onChange={e => setForm({...form, nationality: e.target.value})} className="mt-1 w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2" /></div>
            <div><label className="block text-sm font-medium text-text-secondary">Fecha Nac.</label><input type="date" value={form.birth_date} onChange={e => setForm({...form, birth_date: e.target.value})} className="mt-1 w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2" /></div>
            <div><label className="block text-sm font-medium text-text-secondary">Ciudad</label><input value={form.city} onChange={e => setForm({...form, city: e.target.value})} className="mt-1 w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2" /></div>
            <div className="md:col-span-3"><label className="block text-sm font-medium text-text-secondary">Direccion</label><input value={form.address} onChange={e => setForm({...form, address: e.target.value})} className="mt-1 w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2" /></div>
            <div className="md:col-span-3"><label className="block text-sm font-medium text-text-secondary">Preferencias / Notas</label><textarea value={form.preferences} onChange={e => setForm({...form, preferences: e.target.value})} rows={2} className="mt-1 w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2" /></div>
            <div className="md:col-span-3 flex gap-3 justify-end">
              <button type="button" onClick={resetForm} className="rounded-lg border border-border-light px-4 py-2 text-sm">Cancelar</button>
              <button type="submit" disabled={saving} className="rounded-lg bg-amber px-6 py-2 text-sm font-semibold text-bg-navy disabled:opacity-50">{saving ? "Guardando..." : (editing ? "Guardar" : "Crear")}</button>
            </div>
          </form>
        </div>
      )}

      {/* Detail view */}
      {detail && (
        <div className="mb-6 rounded-2xl border border-border-light bg-bg-card p-5">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold">{detail.name}</h3>
              <p className="text-sm text-text-secondary">{detail.email} {detail.phone && `| ${detail.phone}`}</p>
              <p className="text-xs text-text-muted">{detail.document_type?.toUpperCase()}: {detail.document_number} | {detail.nationality}</p>
            </div>
            <button onClick={() => setDetail(null)} className="text-text-muted hover:text-text-primary">Cerrar</button>
          </div>
          <h4 className="text-sm font-bold mb-2">Historial de Reservas</h4>
          {bookings.length === 0 ? <p className="text-xs text-text-muted">Sin reservas registradas</p> : (
            <div className="space-y-2">
              {bookings.map((b: any) => (
                <div key={b.id} className="flex items-center justify-between rounded-lg border border-border-light bg-bg-surface px-4 py-2 text-xs">
                  <span className="font-medium">{b.booking_reference}</span>
                  <span className="text-text-secondary capitalize">{b.booking_type}</span>
                  <span className="text-text-muted">S/{Number(b.total_amount).toFixed(2)}</span>
                  <span className={`rounded-full px-2 py-0.5 ${
                    b.status === 'confirmada' ? 'bg-green-500/10 text-green-400' :
                    b.status === 'pendiente' ? 'bg-amber/10 text-amber' : 'bg-red-500/10 text-red-400'
                  }`}>{b.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {loading ? <div className="flex justify-center py-20"><div className="h-6 w-6 animate-spin rounded-full border-2 border-amber/30 border-t-amber" /></div> : (
        <div className="overflow-hidden rounded-2xl border border-border-light bg-bg-card">
          <table className="w-full text-left text-sm">
            <thead className="bg-bg-surface border-b border-border-light">
              <tr><th className="px-4 py-3 font-medium text-text-secondary">ID</th><th className="px-4 py-3 font-medium text-text-secondary">Nombre</th><th className="px-4 py-3 font-medium text-text-secondary">Email</th><th className="px-4 py-3 font-medium text-text-secondary">Telefono</th><th className="px-4 py-3 font-medium text-text-secondary">Documento</th><th className="px-4 py-3 font-medium text-text-secondary">Ciudad</th><th className="px-4 py-3 font-medium text-text-secondary text-right">Acciones</th></tr>
            </thead>
            <tbody>
              {items.map((c) => (
                <tr key={c.id} className="border-b border-border-light last:border-b-0 hover:bg-bg-surface/50 cursor-pointer" onClick={() => viewDetail(c)}>
                  <td className="px-4 py-3 text-text-muted">{c.id}</td>
                  <td className="px-4 py-3 font-medium">{c.name}</td>
                  <td className="px-4 py-3 text-text-secondary">{c.email || "-"}</td>
                  <td className="px-4 py-3 text-text-secondary">{c.phone || "-"}</td>
                  <td className="px-4 py-3 text-text-secondary text-xs">{c.document_type?.toUpperCase()}: {c.document_number || "-"}</td>
                  <td className="px-4 py-3 text-text-secondary">{c.city || "-"}</td>
                  <td className="px-4 py-3 text-right" onClick={e => e.stopPropagation()}>
                    <button onClick={() => handleEdit(c)} className="text-amber hover:underline mr-2 text-xs">Editar</button>
                    <button onClick={() => handleDelete(c.id)} className="text-red-400 hover:underline text-xs">Eliminar</button>
                  </td>
                </tr>
              ))}
              {items.length === 0 && <tr><td colSpan={7} className="px-4 py-8 text-center text-text-muted">No hay clientes</td></tr>}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// BOOKINGS MODULE
// ═══════════════════════════════════════════════════════════════════
function BookingsModule() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [detail, setDetail] = useState<any>(null);
  const [detailItems, setDetailItems] = useState<any[]>([]);
  const [form, setForm] = useState<any>({ booking_type: "paquete", customer_name: "", customer_email: "", customer_phone: "", customer_document: "", pax_count: 1, start_date: "", end_date: "", total_amount: 0, paid_amount: 0, currency: "PEN", status: "pendiente", payment_status: "pendiente", source: "directo", notes: "" });

  const load = () => { setLoading(true); getBookings({ data: { token: getAdminToken() } }).then((r: any) => { if (r.ok) setItems(r.data); setLoading(false); }); };
  useEffect(() => { load(); }, []);

  const resetForm = () => { setForm({ booking_type: "paquete", customer_name: "", customer_email: "", customer_phone: "", customer_document: "", pax_count: 1, start_date: "", end_date: "", total_amount: 0, paid_amount: 0, currency: "PEN", status: "pendiente", payment_status: "pendiente", source: "directo", notes: "" }); setEditing(null); setShowForm(false); };
  const handleEdit = (item: any) => { setEditing(item); setForm({ ...item }); setShowForm(true); };
  const handleDelete = async (id: number) => { if (!confirm("Eliminar reserva?")) return; await deleteBooking({ data: { token: getAdminToken(), id: id } }); load(); };
  const handleSave = async (e: React.FormEvent) => { e.preventDefault(); setSaving(true); try { if (editing) await updateBooking({ data: { token: getAdminToken(), ...form, id: editing.id } }); else await createBooking({ data: { token: getAdminToken(), ...form } }); resetForm(); load(); } finally { setSaving(false); } };
  const viewDetail = async (item: any) => { const r = await getBooking({ data: { token: getAdminToken(), id: item.id } }); if (r.ok) { setDetail(r.data); setDetailItems(r.items || []); } };

  const statusColors: Record<string, string> = { pendiente: "bg-amber/10 text-amber", confirmada: "bg-green-500/10 text-green-400", en_curso: "bg-blue-500/10 text-blue-400", completada: "bg-gray-500/10 text-gray-400", cancelada: "bg-red-500/10 text-red-400", reembolsada: "bg-purple-500/10 text-purple-400" };
  const payColors: Record<string, string> = { pendiente: "bg-amber/10 text-amber", parcial: "bg-blue-500/10 text-blue-400", pagado: "bg-green-500/10 text-green-400", reembolsado: "bg-purple-500/10 text-purple-400" };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold">Reservas ({items.length})</h2>
        <div className="flex items-center gap-2">
          <AdminExportButton data={items} filename="reservas-bg-travel" columns={[
            { key: "id", label: "ID" }, { key: "booking_reference", label: "Referencia" },
            { key: "customer_name", label: "Cliente" }, { key: "booking_type", label: "Tipo" },
            { key: "pax_count", label: "Pasajeros" }, { key: "total_amount", label: "Total" },
            { key: "paid_amount", label: "Pagado" }, { key: "status", label: "Estado" },
            { key: "payment_status", label: "Pago" }, { key: "start_date", label: "Inicio" },
            { key: "end_date", label: "Fin" }, { key: "created_at", label: "Creado" },
          ]} />
          <button onClick={() => { resetForm(); setShowForm(true); }} className="rounded-xl bg-amber px-4 py-2 text-sm font-semibold text-bg-navy">+ Nueva Reserva</button>
        </div>
      </div>

      {showForm && (
        <div className="mb-6 rounded-2xl border border-border-light bg-bg-card p-6">
          <h3 className="mb-4 text-lg font-bold">{editing ? "Editar Reserva" : "Nueva Reserva"}</h3>
          <form onSubmit={handleSave} className="grid gap-4 md:grid-cols-3">
            <div><label className="block text-sm font-medium text-text-secondary">Tipo</label>
              <select value={form.booking_type} onChange={e => setForm({...form, booking_type: e.target.value})} className="mt-1 w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2 text-sm">
                <option value="paquete">Paquete</option><option value="vuelo">Vuelo</option><option value="hotel">Hotel</option><option value="transporte">Transporte</option><option value="tour">Tour</option><option value="seguro">Seguro</option><option value="combinado">Combinado</option>
              </select></div>
            <div><label className="block text-sm font-medium text-text-secondary">Estado</label>
              <select value={form.status} onChange={e => setForm({...form, status: e.target.value})} className="mt-1 w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2 text-sm">
                <option value="pendiente">Pendiente</option><option value="confirmada">Confirmada</option><option value="en_curso">En Curso</option><option value="completada">Completada</option><option value="cancelada">Cancelada</option><option value="reembolsada">Reembolsada</option>
              </select></div>
            <div><label className="block text-sm font-medium text-text-secondary">Fuente</label>
              <select value={form.source} onChange={e => setForm({...form, source: e.target.value})} className="mt-1 w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2 text-sm">
                <option value="directo">Directo</option><option value="web">Web</option><option value="whatsapp">WhatsApp</option><option value="referido">Referido</option><option value="otro">Otro</option>
              </select></div>
            <div className="md:col-span-3"><label className="block text-sm font-medium text-text-secondary">Cliente *</label><input value={form.customer_name} onChange={e => setForm({...form, customer_name: e.target.value})} required className="mt-1 w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2" /></div>
            <div><label className="block text-sm font-medium text-text-secondary">Email</label><input value={form.customer_email} onChange={e => setForm({...form, customer_email: e.target.value})} className="mt-1 w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2" /></div>
            <div><label className="block text-sm font-medium text-text-secondary">Telefono</label><input value={form.customer_phone} onChange={e => setForm({...form, customer_phone: e.target.value})} className="mt-1 w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2" /></div>
            <div><label className="block text-sm font-medium text-text-secondary">Documento</label><input value={form.customer_document} onChange={e => setForm({...form, customer_document: e.target.value})} className="mt-1 w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2" /></div>
            <div><label className="block text-sm font-medium text-text-secondary">Pax</label><input type="number" min={1} value={form.pax_count} onChange={e => setForm({...form, pax_count: parseInt(e.target.value) || 1})} className="mt-1 w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2" /></div>
            <div><label className="block text-sm font-medium text-text-secondary">Inicio</label><input type="date" value={form.start_date} onChange={e => setForm({...form, start_date: e.target.value})} className="mt-1 w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2" /></div>
            <div><label className="block text-sm font-medium text-text-secondary">Fin</label><input type="date" value={form.end_date} onChange={e => setForm({...form, end_date: e.target.value})} className="mt-1 w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2" /></div>
            <div><label className="block text-sm font-medium text-text-secondary">Total (S/)</label><input type="number" step="0.01" value={form.total_amount} onChange={e => setForm({...form, total_amount: parseFloat(e.target.value) || 0})} className="mt-1 w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2" /></div>
            <div><label className="block text-sm font-medium text-text-secondary">Pagado (S/)</label><input type="number" step="0.01" value={form.paid_amount} onChange={e => setForm({...form, paid_amount: parseFloat(e.target.value) || 0})} className="mt-1 w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2" /></div>
            <div><label className="block text-sm font-medium text-text-secondary">Pago</label>
              <select value={form.payment_status} onChange={e => setForm({...form, payment_status: e.target.value})} className="mt-1 w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2 text-sm">
                <option value="pendiente">Pendiente</option><option value="parcial">Parcial</option><option value="pagado">Pagado</option><option value="reembolsado">Reembolsado</option>
              </select></div>
            <div><label className="block text-sm font-medium text-text-secondary">Metodo Pago</label>
              <select value={form.payment_method} onChange={e => setForm({...form, payment_method: e.target.value})} className="mt-1 w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2 text-sm">
                <option value="">--</option><option value="efectivo">Efectivo</option><option value="transferencia">Transferencia</option><option value="tarjeta">Tarjeta</option><option value="yape">Yape</option><option value="plin">Plin</option>
              </select></div>
            <div className="md:col-span-3"><label className="block text-sm font-medium text-text-secondary">Notas</label><textarea value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} rows={2} className="mt-1 w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2" /></div>
            <div className="md:col-span-3 flex gap-3 justify-end">
              <button type="button" onClick={resetForm} className="rounded-lg border border-border-light px-4 py-2 text-sm">Cancelar</button>
              <button type="submit" disabled={saving} className="rounded-lg bg-amber px-6 py-2 text-sm font-semibold text-bg-navy disabled:opacity-50">{saving ? "Guardando..." : (editing ? "Guardar" : "Crear")}</button>
            </div>
          </form>
        </div>
      )}

      {detail && (
        <div className="mb-6 rounded-2xl border border-border-light bg-bg-card p-5">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold">{detail.customer_name}</h3>
              <p className="text-sm text-text-secondary">Ref: {detail.booking_reference} | {detail.booking_type}</p>
              <p className="text-xs text-text-muted">{detail.start_date} → {detail.end_date} | {detail.pax_count} pax | S/{Number(detail.total_amount).toFixed(2)}</p>
            </div>
            <div className="flex items-center gap-2">
              <a href={`https://wa.me/51994118084?text=${encodeURIComponent(
                `Hola ${detail.customer_name}! Tu reserva #${detail.booking_reference} esta ${detail.status}. Total: S/${Number(detail.total_amount).toFixed(2)}. Fechas: ${detail.start_date} a ${detail.end_date}.`
              )}`} target="_blank" className="rounded-lg bg-green-600/10 border border-green-500/30 px-3 py-1 text-xs text-green-400 hover:bg-green-600/20">
                WhatsApp
              </a>
              <button onClick={() => setDetail(null)} className="text-text-muted hover:text-text-primary">Cerrar</button>
            </div>
          </div>
          {detailItems.length > 0 && (
            <div>
              <h4 className="text-sm font-bold mb-2">Items de la Reserva</h4>
              <div className="space-y-1">
                {detailItems.map((i: any) => (
                  <div key={i.id} className="flex items-center justify-between rounded-lg border border-border-light bg-bg-surface px-4 py-2 text-xs">
                    <span className="font-medium">{i.description}</span>
                    <span className="text-text-secondary">{i.supplier_name || "-"}</span>
                    <span className="text-text-muted">{i.date} {i.time}</span>
                    <span className="text-text-secondary">S/{Number(i.total_price).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {loading ? <div className="flex justify-center py-20"><div className="h-6 w-6 animate-spin rounded-full border-2 border-amber/30 border-t-amber" /></div> : (
        <div className="overflow-hidden rounded-2xl border border-border-light bg-bg-card">
          <table className="w-full text-left text-sm">
            <thead className="bg-bg-surface border-b border-border-light">
              <tr><th className="px-4 py-3 font-medium text-text-secondary">Ref</th><th className="px-4 py-3 font-medium text-text-secondary">Cliente</th><th className="px-4 py-3 font-medium text-text-secondary">Tipo</th><th className="px-4 py-3 font-medium text-text-secondary">Total</th><th className="px-4 py-3 font-medium text-text-secondary">Pagado</th><th className="px-4 py-3 font-medium text-text-secondary">Estado</th><th className="px-4 py-3 font-medium text-text-secondary">Pago</th><th className="px-4 py-3 font-medium text-text-secondary text-right">Acciones</th></tr>
            </thead>
            <tbody>
              {items.map((b) => (
                <tr key={b.id} className="border-b border-border-light last:border-b-0 hover:bg-bg-surface/50 cursor-pointer" onClick={() => viewDetail(b)}>
                  <td className="px-4 py-3 text-xs text-text-muted font-mono">{b.booking_reference}</td>
                  <td className="px-4 py-3 font-medium">{b.customer_name}</td>
                  <td className="px-4 py-3 text-text-secondary capitalize">{b.booking_type}</td>
                  <td className="px-4 py-3 text-text-secondary">S/{Number(b.total_amount).toFixed(2)}</td>
                  <td className="px-4 py-3 text-text-secondary">S/{Number(b.paid_amount).toFixed(2)}</td>
                  <td className="px-4 py-3"><span className={`rounded-full px-2 py-0.5 text-xs ${statusColors[b.status] || statusColors.pendiente}`}>{b.status}</span></td>
                  <td className="px-4 py-3"><span className={`rounded-full px-2 py-0.5 text-xs ${payColors[b.payment_status] || ''}`}>{b.payment_status}</span></td>
                  <td className="px-4 py-3 text-right" onClick={e => e.stopPropagation()}>
                    <button onClick={() => handleEdit(b)} className="text-amber hover:underline mr-2 text-xs">Editar</button>
                    <button onClick={() => handleDelete(b.id)} className="text-red-400 hover:underline text-xs">Eliminar</button>
                  </td>
                </tr>
              ))}
              {items.length === 0 && <tr><td colSpan={8} className="px-4 py-8 text-center text-text-muted">No hay reservas</td></tr>}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// FLIGHTS MODULE
// ═══════════════════════════════════════════════════════════════════
function FlightsModule() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<any>({ airline: "", flight_number: "", origin: "", destination: "", departure_date: "", departure_time: "", arrival_time: "", class: "economica", price: 0, currency: "PEN", seats_available: 0, total_seats: 0, stops: 0, duration_minutes: "", baggage_kg: 23, status: "active", notes: "" });

  const load = () => { setLoading(true); getFlights({ data: { token: getAdminToken() } }).then((r: any) => { if (r.ok) setItems(r.data); setLoading(false); }); };
  useEffect(() => { load(); }, []);

  const resetForm = () => { setForm({ airline: "", flight_number: "", origin: "", destination: "", departure_date: "", departure_time: "", arrival_time: "", class: "economica", price: 0, currency: "PEN", seats_available: 0, total_seats: 0, stops: 0, duration_minutes: "", baggage_kg: 23, status: "active", notes: "" }); setEditing(null); setShowForm(false); };
  const handleEdit = (item: any) => { setEditing(item); setForm({ ...item }); setShowForm(true); };
  const handleDelete = async (id: number) => { if (!confirm("Eliminar vuelo?")) return; await deleteFlight({ data: { token: getAdminToken(), id: id } }); load(); };
  const handleSave = async (e: React.FormEvent) => { e.preventDefault(); setSaving(true); try { if (editing) await updateFlight({ data: { token: getAdminToken(), ...form, id: editing.id } }); else await createFlight({ data: { token: getAdminToken(), ...form } }); resetForm(); load(); } finally { setSaving(false); } };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold">Vuelos ({items.length})</h2>
        <button onClick={() => { resetForm(); setShowForm(true); }} className="rounded-xl bg-amber px-4 py-2 text-sm font-semibold text-bg-navy">+ Nuevo Vuelo</button>
      </div>
      {showForm && (
        <div className="mb-6 rounded-2xl border border-border-light bg-bg-card p-6">
          <h3 className="mb-4 text-lg font-bold">{editing ? "Editar Vuelo" : "Nuevo Vuelo"}</h3>
          <form onSubmit={handleSave} className="grid gap-4 md:grid-cols-3">
            <div><label className="block text-sm font-medium text-text-secondary">Aerolinea *</label><input value={form.airline} onChange={e => setForm({...form, airline: e.target.value})} required className="mt-1 w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2" /></div>
            <div><label className="block text-sm font-medium text-text-secondary">Nro. Vuelo</label><input value={form.flight_number} onChange={e => setForm({...form, flight_number: e.target.value})} className="mt-1 w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2" /></div>
            <div><label className="block text-sm font-medium text-text-secondary">Clase</label>
              <select value={form.class} onChange={e => setForm({...form, class: e.target.value})} className="mt-1 w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2 text-sm">
                <option value="economica">Economica</option><option value="ejecutiva">Ejecutiva</option><option value="primera">Primera</option>
              </select></div>
            <div><label className="block text-sm font-medium text-text-secondary">Origen *</label><input value={form.origin} onChange={e => setForm({...form, origin: e.target.value})} required className="mt-1 w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2" /></div>
            <div><label className="block text-sm font-medium text-text-secondary">Destino *</label><input value={form.destination} onChange={e => setForm({...form, destination: e.target.value})} required className="mt-1 w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2" /></div>
            <div><label className="block text-sm font-medium text-text-secondary">Escalas</label><input type="number" min={0} value={form.stops} onChange={e => setForm({...form, stops: parseInt(e.target.value) || 0})} className="mt-1 w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2" /></div>
            <div><label className="block text-sm font-medium text-text-secondary">Fecha Salida</label><input type="date" value={form.departure_date} onChange={e => setForm({...form, departure_date: e.target.value})} className="mt-1 w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2" /></div>
            <div><label className="block text-sm font-medium text-text-secondary">Hora Salida</label><input type="time" value={form.departure_time} onChange={e => setForm({...form, departure_time: e.target.value})} className="mt-1 w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2" /></div>
            <div><label className="block text-sm font-medium text-text-secondary">Hora Llegada</label><input type="time" value={form.arrival_time} onChange={e => setForm({...form, arrival_time: e.target.value})} className="mt-1 w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2" /></div>
            <div><label className="block text-sm font-medium text-text-secondary">Duracion (min)</label><input type="number" value={form.duration_minutes} onChange={e => setForm({...form, duration_minutes: parseInt(e.target.value) || 0})} className="mt-1 w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2" /></div>
            <div><label className="block text-sm font-medium text-text-secondary">Precio (S/)</label><input type="number" step="0.01" value={form.price} onChange={e => setForm({...form, price: parseFloat(e.target.value) || 0})} className="mt-1 w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2" /></div>
            <div><label className="block text-sm font-medium text-text-secondary">Equipaje (kg)</label><input type="number" value={form.baggage_kg} onChange={e => setForm({...form, baggage_kg: parseInt(e.target.value) || 23})} className="mt-1 w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2" /></div>
            <div><label className="block text-sm font-medium text-text-secondary">Asientos Disp.</label><input type="number" value={form.seats_available} onChange={e => setForm({...form, seats_available: parseInt(e.target.value) || 0})} className="mt-1 w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2" /></div>
            <div><label className="block text-sm font-medium text-text-secondary">Total Asientos</label><input type="number" value={form.total_seats} onChange={e => setForm({...form, total_seats: parseInt(e.target.value) || 0})} className="mt-1 w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2" /></div>
            <div><label className="block text-sm font-medium text-text-secondary">Estado</label>
              <select value={form.status} onChange={e => setForm({...form, status: e.target.value})} className="mt-1 w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2 text-sm">
                <option value="active">Activo</option><option value="inactive">Inactivo</option><option value="sold_out">Agotado</option><option value="cancelled">Cancelado</option>
              </select></div>
            <div className="md:col-span-3"><label className="block text-sm font-medium text-text-secondary">Notas</label><textarea value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} rows={2} className="mt-1 w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2" /></div>
            <div className="md:col-span-3 flex gap-3 justify-end">
              <button type="button" onClick={resetForm} className="rounded-lg border border-border-light px-4 py-2 text-sm">Cancelar</button>
              <button type="submit" disabled={saving} className="rounded-lg bg-amber px-6 py-2 text-sm font-semibold text-bg-navy disabled:opacity-50">{saving ? "Guardando..." : (editing ? "Guardar" : "Crear")}</button>
            </div>
          </form>
        </div>
      )}
      {loading ? <div className="flex justify-center py-20"><div className="h-6 w-6 animate-spin rounded-full border-2 border-amber/30 border-t-amber" /></div> : (
        <div className="overflow-hidden rounded-2xl border border-border-light bg-bg-card">
          <table className="w-full text-left text-sm">
            <thead className="bg-bg-surface border-b border-border-light">
              <tr><th className="px-4 py-3 font-medium text-text-secondary">Aerolinea</th><th className="px-4 py-3 font-medium text-text-secondary">Vuelo</th><th className="px-4 py-3 font-medium text-text-secondary">Ruta</th><th className="px-4 py-3 font-medium text-text-secondary">Fecha</th><th className="px-4 py-3 font-medium text-text-secondary">Hora</th><th className="px-4 py-3 font-medium text-text-secondary">Precio</th><th className="px-4 py-3 font-medium text-text-secondary">Asientos</th><th className="px-4 py-3 font-medium text-text-secondary">Estado</th><th className="px-4 py-3 font-medium text-text-secondary text-right">Acciones</th></tr>
            </thead>
            <tbody>
              {items.map((f) => (
                <tr key={f.id} className="border-b border-border-light last:border-b-0">
                  <td className="px-4 py-3 font-medium">{f.airline}</td>
                  <td className="px-4 py-3 text-text-muted text-xs">{f.flight_number || "-"}</td>
                  <td className="px-4 py-3 text-text-secondary">{f.origin} → {f.destination}</td>
                  <td className="px-4 py-3 text-text-secondary text-xs">{f.departure_date}</td>
                  <td className="px-4 py-3 text-text-secondary text-xs">{f.departure_time?.slice(0,5)}</td>
                  <td className="px-4 py-3 text-text-secondary">S/{Number(f.price).toFixed(0)}</td>
                  <td className="px-4 py-3 text-text-secondary">{f.seats_available}/{f.total_seats}</td>
                  <td className="px-4 py-3"><span className={`rounded-full px-2 py-0.5 text-xs ${f.status === 'active' ? 'bg-green-500/10 text-green-400' : f.status === 'sold_out' ? 'bg-amber/10 text-amber' : 'bg-red-500/10 text-red-400'}`}>{f.status}</span></td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => handleEdit(f)} className="text-amber hover:underline mr-2 text-xs">Editar</button>
                    <button onClick={() => handleDelete(f.id)} className="text-red-400 hover:underline text-xs">Eliminar</button>
                  </td>
                </tr>
              ))}
              {items.length === 0 && <tr><td colSpan={9} className="px-4 py-8 text-center text-text-muted">No hay vuelos registrados</td></tr>}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// HOTELS MODULE
// ═══════════════════════════════════════════════════════════════════
function HotelsModule() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [detail, setDetail] = useState<any>(null);
  const [rooms, setRooms] = useState<any[]>([]);
  const [roomForm, setRoomForm] = useState<any>({ hotel_id: 0, room_type: "", description: "", max_guests: 2, beds: "", price_per_night: 0, breakfast_included: 0, available_rooms: 1, total_rooms: 1 });
  const [showRoomForm, setShowRoomForm] = useState(false);
  const [form, setForm] = useState<any>({ name: "", category: 3, city: "", country: "Peru", address: "", phone: "", email: "", website: "", description: "", amenities: "", check_in_time: "15:00", check_out_time: "12:00", status: "active", notes: "" });

  const load = () => { setLoading(true); getHotels({ data: { token: getAdminToken() } }).then((r: any) => { if (r.ok) setItems(r.data); setLoading(false); }); };
  useEffect(() => { load(); }, []);

  const resetForm = () => { setForm({ name: "", category: 3, city: "", country: "Peru", address: "", phone: "", email: "", website: "", description: "", amenities: "", check_in_time: "15:00", check_out_time: "12:00", status: "active", notes: "" }); setEditing(null); setShowForm(false); };
  const handleEdit = (item: any) => { setEditing(item); setForm({ ...item }); setShowForm(true); };
  const handleDelete = async (id: number) => { if (!confirm("Eliminar hotel?")) return; await deleteHotel({ data: { token: getAdminToken(), id: id } }); load(); };
  const handleSave = async (e: React.FormEvent) => { e.preventDefault(); setSaving(true); try { if (editing) await updateHotel({ data: { token: getAdminToken(), ...form, id: editing.id } }); else await createHotel({ data: { token: getAdminToken(), ...form } }); resetForm(); load(); } finally { setSaving(false); } };
  const viewDetail = async (item: any) => { const r = await getHotel({ data: { token: getAdminToken(), id: item.id } }); if (r.ok) { setDetail(r.data); setRooms(r.rooms || []); } };
  const handleSaveRoom = async () => { await createHotelRoom({ data: { token: getAdminToken(), ...roomForm, hotel_id: detail.id } }); setShowRoomForm(false); setRoomForm({ hotel_id: 0, room_type: "", description: "", max_guests: 2, beds: "", price_per_night: 0, breakfast_included: 0, available_rooms: 1, total_rooms: 1 }); viewDetail(detail); };
  const handleDeleteRoom = async (id: number) => { await deleteHotelRoom({ data: { token: getAdminToken(), id: id } }); viewDetail(detail); };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold">Hoteles ({items.length})</h2>
        <button onClick={() => { resetForm(); setShowForm(true); }} className="rounded-xl bg-amber px-4 py-2 text-sm font-semibold text-bg-navy">+ Nuevo Hotel</button>
      </div>
      {showForm && (
        <div className="mb-6 rounded-2xl border border-border-light bg-bg-card p-6">
          <h3 className="mb-4 text-lg font-bold">{editing ? "Editar Hotel" : "Nuevo Hotel"}</h3>
          <form onSubmit={handleSave} className="grid gap-4 md:grid-cols-3">
            <div className="md:col-span-2"><label className="block text-sm font-medium text-text-secondary">Nombre *</label><input value={form.name} onChange={e => setForm({...form, name: e.target.value})} required className="mt-1 w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2" /></div>
            <div><label className="block text-sm font-medium text-text-secondary">Categoria</label>
              <select value={form.category} onChange={e => setForm({...form, category: parseInt(e.target.value) || 3})} className="mt-1 w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2 text-sm">
                {[1,2,3,4,5].map(s => <option key={s} value={s}>{'★'.repeat(s)}</option>)}
              </select></div>
            <div><label className="block text-sm font-medium text-text-secondary">Ciudad *</label><input value={form.city} onChange={e => setForm({...form, city: e.target.value})} required className="mt-1 w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2" /></div>
            <div><label className="block text-sm font-medium text-text-secondary">Pais</label><input value={form.country} onChange={e => setForm({...form, country: e.target.value})} className="mt-1 w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2" /></div>
            <div className="md:col-span-3"><label className="block text-sm font-medium text-text-secondary">Direccion</label><input value={form.address} onChange={e => setForm({...form, address: e.target.value})} className="mt-1 w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2" /></div>
            <div><label className="block text-sm font-medium text-text-secondary">Telefono</label><input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="mt-1 w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2" /></div>
            <div><label className="block text-sm font-medium text-text-secondary">Email</label><input value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="mt-1 w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2" /></div>
            <div><label className="block text-sm font-medium text-text-secondary">Web</label><input value={form.website} onChange={e => setForm({...form, website: e.target.value})} className="mt-1 w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2" /></div>
            <div><label className="block text-sm font-medium text-text-secondary">Check-in</label><input type="time" value={form.check_in_time} onChange={e => setForm({...form, check_in_time: e.target.value})} className="mt-1 w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2" /></div>
            <div><label className="block text-sm font-medium text-text-secondary">Check-out</label><input type="time" value={form.check_out_time} onChange={e => setForm({...form, check_out_time: e.target.value})} className="mt-1 w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2" /></div>
            <div className="md:col-span-3"><label className="block text-sm font-medium text-text-secondary">Descripcion</label><textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows={2} className="mt-1 w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2" /></div>
            <div className="md:col-span-3"><label className="block text-sm font-medium text-text-secondary">Amenities</label><input value={form.amenities} onChange={e => setForm({...form, amenities: e.target.value})} placeholder="Wifi, desayuno, piscina..." className="mt-1 w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2" /></div>
            <div className="md:col-span-3 flex gap-3 justify-end">
              <button type="button" onClick={resetForm} className="rounded-lg border border-border-light px-4 py-2 text-sm">Cancelar</button>
              <button type="submit" disabled={saving} className="rounded-lg bg-amber px-6 py-2 text-sm font-semibold text-bg-navy disabled:opacity-50">{saving ? "Guardando..." : (editing ? "Guardar" : "Crear")}</button>
            </div>
          </form>
        </div>
      )}

      {detail && (
        <div className="mb-6 rounded-2xl border border-border-light bg-bg-card p-5">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold">{detail.name}</h3>
              <p className="text-sm text-text-secondary">{detail.city} | {'★'.repeat(detail.category)} | {detail.phone}</p>
            </div>
            <button onClick={() => setDetail(null)} className="text-text-muted hover:text-text-primary">Cerrar</button>
          </div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-bold">Habitaciones ({rooms.length})</h4>
            <button onClick={() => { setRoomForm({ hotel_id: detail.id, room_type: "", description: "", max_guests: 2, beds: "", price_per_night: 0, breakfast_included: 0, available_rooms: 1, total_rooms: 1 }); setShowRoomForm(true); }} className="rounded-lg bg-amber/20 px-3 py-1 text-xs text-amber">+ Habitacion</button>
          </div>
          {showRoomForm && (
            <div className="mb-4 grid gap-3 md:grid-cols-4 rounded-lg border border-border-light bg-bg-surface p-4">
              <input value={roomForm.room_type} onChange={e => setRoomForm({...roomForm, room_type: e.target.value})} placeholder="Tipo" className="rounded-lg border border-border-light bg-bg-navy px-3 py-1.5 text-xs" />
              <input value={roomForm.beds} onChange={e => setRoomForm({...roomForm, beds: e.target.value})} placeholder="Camas" className="rounded-lg border border-border-light bg-bg-navy px-3 py-1.5 text-xs" />
              <input type="number" value={roomForm.price_per_night} onChange={e => setRoomForm({...roomForm, price_per_night: parseFloat(e.target.value) || 0})} placeholder="Precio/noche" className="rounded-lg border border-border-light bg-bg-navy px-3 py-1.5 text-xs" />
              <div className="flex gap-2">
                <button onClick={handleSaveRoom} className="rounded-lg bg-amber px-3 py-1.5 text-xs font-semibold text-bg-navy">Guardar</button>
                <button onClick={() => setShowRoomForm(false)} className="rounded-lg border border-border-light px-3 py-1.5 text-xs">Cancelar</button>
              </div>
            </div>
          )}
          <div className="space-y-1">
            {rooms.map((r: any) => (
              <div key={r.id} className="flex items-center justify-between rounded-lg border border-border-light bg-bg-surface px-4 py-2 text-xs">
                <span className="font-medium">{r.room_type}</span>
                <span className="text-text-secondary">{r.beds || "-"}</span>
                <span className="text-text-muted">Max: {r.max_guests} pax</span>
                <span className="text-text-secondary">S/{Number(r.price_per_night).toFixed(0)}/noche</span>
                <span className="text-text-muted">{r.available_rooms}/{r.total_rooms} disp.</span>
                <button onClick={() => handleDeleteRoom(r.id)} className="text-red-400 hover:underline">Eliminar</button>
              </div>
            ))}
            {rooms.length === 0 && <p className="text-xs text-text-muted">Sin habitaciones registradas</p>}
          </div>
        </div>
      )}

      {loading ? <div className="flex justify-center py-20"><div className="h-6 w-6 animate-spin rounded-full border-2 border-amber/30 border-t-amber" /></div> : (
        <div className="overflow-hidden rounded-2xl border border-border-light bg-bg-card">
          <table className="w-full text-left text-sm">
            <thead className="bg-bg-surface border-b border-border-light">
              <tr><th className="px-4 py-3 font-medium text-text-secondary">Nombre</th><th className="px-4 py-3 font-medium text-text-secondary">Ciudad</th><th className="px-4 py-3 font-medium text-text-secondary">Cat.</th><th className="px-4 py-3 font-medium text-text-secondary">Telefono</th><th className="px-4 py-3 font-medium text-text-secondary">Estado</th><th className="px-4 py-3 font-medium text-text-secondary text-right">Acciones</th></tr>
            </thead>
            <tbody>
              {items.map((h) => (
                <tr key={h.id} className="border-b border-border-light last:border-b-0 hover:bg-bg-surface/50 cursor-pointer" onClick={() => viewDetail(h)}>
                  <td className="px-4 py-3 font-medium">{h.name}</td>
                  <td className="px-4 py-3 text-text-secondary">{h.city}</td>
                  <td className="px-4 py-3 text-text-secondary">{'★'.repeat(h.category)}</td>
                  <td className="px-4 py-3 text-text-secondary text-xs">{h.phone || "-"}</td>
                  <td className="px-4 py-3"><span className={`rounded-full px-2 py-0.5 text-xs ${h.status === 'active' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>{h.status}</span></td>
                  <td className="px-4 py-3 text-right" onClick={e => e.stopPropagation()}>
                    <button onClick={() => handleEdit(h)} className="text-amber hover:underline mr-2 text-xs">Editar</button>
                    <button onClick={() => handleDelete(h.id)} className="text-red-400 hover:underline text-xs">Eliminar</button>
                  </td>
                </tr>
              ))}
              {items.length === 0 && <tr><td colSpan={6} className="px-4 py-8 text-center text-text-muted">No hay hoteles</td></tr>}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// SUPPLIERS MODULE
// ═══════════════════════════════════════════════════════════════════
function SuppliersModule() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<any>({ name: "", type: "aerolinea", contact_name: "", phone: "", email: "", city: "", commission_type: "percentage", commission_rate: 0, payment_terms: "", tax_id: "", notes: "", status: "active" });

  const load = () => { setLoading(true); getSuppliers({ data: { token: getAdminToken() } }).then((r: any) => { if (r.ok) setItems(r.data); setLoading(false); }); };
  useEffect(() => { load(); }, []);

  const resetForm = () => { setForm({ name: "", type: "aerolinea", contact_name: "", phone: "", email: "", city: "", commission_type: "percentage", commission_rate: 0, payment_terms: "", tax_id: "", notes: "", status: "active" }); setEditing(null); setShowForm(false); };
  const handleEdit = (item: any) => { setEditing(item); setForm({ ...item }); setShowForm(true); };
  const handleDelete = async (id: number) => { if (!confirm("Eliminar proveedor?")) return; await deleteSupplier({ data: { token: getAdminToken(), id: id } }); load(); };
  const handleSave = async (e: React.FormEvent) => { e.preventDefault(); setSaving(true); try { if (editing) await updateSupplier({ data: { token: getAdminToken(), ...form, id: editing.id } }); else await createSupplier({ data: { token: getAdminToken(), ...form } }); resetForm(); load(); } finally { setSaving(false); } };

  const typeLabels: Record<string, string> = { aerolinea: "Aerolinea", hotel: "Hotel", transporte: "Transporte", guia: "Guia", restaurante: "Restaurante", seguro: "Seguro", otro: "Otro" };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold">Proveedores ({items.length})</h2>
        <button onClick={() => { resetForm(); setShowForm(true); }} className="rounded-xl bg-amber px-4 py-2 text-sm font-semibold text-bg-navy">+ Nuevo Proveedor</button>
      </div>
      {showForm && (
        <div className="mb-6 rounded-2xl border border-border-light bg-bg-card p-6">
          <h3 className="mb-4 text-lg font-bold">{editing ? "Editar Proveedor" : "Nuevo Proveedor"}</h3>
          <form onSubmit={handleSave} className="grid gap-4 md:grid-cols-3">
            <div className="md:col-span-2"><label className="block text-sm font-medium text-text-secondary">Nombre *</label><input value={form.name} onChange={e => setForm({...form, name: e.target.value})} required className="mt-1 w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2" /></div>
            <div><label className="block text-sm font-medium text-text-secondary">Tipo</label>
              <select value={form.type} onChange={e => setForm({...form, type: e.target.value})} className="mt-1 w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2 text-sm">
                {Object.entries(typeLabels).map(([k,v]) => <option key={k} value={k}>{v}</option>)}
              </select></div>
            <div><label className="block text-sm font-medium text-text-secondary">Contacto</label><input value={form.contact_name} onChange={e => setForm({...form, contact_name: e.target.value})} className="mt-1 w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2" /></div>
            <div><label className="block text-sm font-medium text-text-secondary">Telefono</label><input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="mt-1 w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2" /></div>
            <div><label className="block text-sm font-medium text-text-secondary">Email</label><input value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="mt-1 w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2" /></div>
            <div><label className="block text-sm font-medium text-text-secondary">Ciudad</label><input value={form.city} onChange={e => setForm({...form, city: e.target.value})} className="mt-1 w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2" /></div>
            <div><label className="block text-sm font-medium text-text-secondary">Comision</label>
              <select value={form.commission_type} onChange={e => setForm({...form, commission_type: e.target.value})} className="mt-1 w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2 text-sm">
                <option value="percentage">Porcentaje (%)</option><option value="fixed">Fijo (S/)</option>
              </select></div>
            <div><label className="block text-sm font-medium text-text-secondary">Tasa Comision</label><input type="number" step="0.1" value={form.commission_rate} onChange={e => setForm({...form, commission_rate: parseFloat(e.target.value) || 0})} className="mt-1 w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2" /></div>
            <div><label className="block text-sm font-medium text-text-secondary">Terminos Pago</label><input value={form.payment_terms} onChange={e => setForm({...form, payment_terms: e.target.value})} className="mt-1 w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2" /></div>
            <div><label className="block text-sm font-medium text-text-secondary">RUC</label><input value={form.tax_id} onChange={e => setForm({...form, tax_id: e.target.value})} className="mt-1 w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2" /></div>
            <div><label className="block text-sm font-medium text-text-secondary">Estado</label>
              <select value={form.status} onChange={e => setForm({...form, status: e.target.value})} className="mt-1 w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2 text-sm">
                <option value="active">Activo</option><option value="inactive">Inactivo</option><option value="suspended">Suspendido</option>
              </select></div>
            <div className="md:col-span-3"><label className="block text-sm font-medium text-text-secondary">Notas</label><textarea value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} rows={2} className="mt-1 w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2" /></div>
            <div className="md:col-span-3 flex gap-3 justify-end">
              <button type="button" onClick={resetForm} className="rounded-lg border border-border-light px-4 py-2 text-sm">Cancelar</button>
              <button type="submit" disabled={saving} className="rounded-lg bg-amber px-6 py-2 text-sm font-semibold text-bg-navy disabled:opacity-50">{saving ? "Guardando..." : (editing ? "Guardar" : "Crear")}</button>
            </div>
          </form>
        </div>
      )}
      {loading ? <div className="flex justify-center py-20"><div className="h-6 w-6 animate-spin rounded-full border-2 border-amber/30 border-t-amber" /></div> : (
        <div className="overflow-hidden rounded-2xl border border-border-light bg-bg-card">
          <table className="w-full text-left text-sm">
            <thead className="bg-bg-surface border-b border-border-light">
              <tr><th className="px-4 py-3 font-medium text-text-secondary">Nombre</th><th className="px-4 py-3 font-medium text-text-secondary">Tipo</th><th className="px-4 py-3 font-medium text-text-secondary">Contacto</th><th className="px-4 py-3 font-medium text-text-secondary">Telefono</th><th className="px-4 py-3 font-medium text-text-secondary">Comision</th><th className="px-4 py-3 font-medium text-text-secondary">Estado</th><th className="px-4 py-3 font-medium text-text-secondary text-right">Acciones</th></tr>
            </thead>
            <tbody>
              {items.map((s) => (
                <tr key={s.id} className="border-b border-border-light last:border-b-0">
                  <td className="px-4 py-3 font-medium">{s.name}</td>
                  <td className="px-4 py-3"><span className="rounded-full bg-amber/10 px-2 py-0.5 text-xs text-amber">{typeLabels[s.type] || s.type}</span></td>
                  <td className="px-4 py-3 text-text-secondary text-xs">{s.contact_name || "-"}</td>
                  <td className="px-4 py-3 text-text-secondary text-xs">{s.phone || "-"}</td>
                  <td className="px-4 py-3 text-text-secondary text-xs">{s.commission_rate}{s.commission_type === 'percentage' ? '%' : ' S/'}</td>
                  <td className="px-4 py-3"><span className={`rounded-full px-2 py-0.5 text-xs ${s.status === 'active' ? 'bg-green-500/10 text-green-400' : s.status === 'inactive' ? 'bg-red-500/10 text-red-400' : 'bg-amber/10 text-amber'}`}>{s.status}</span></td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => handleEdit(s)} className="text-amber hover:underline mr-2 text-xs">Editar</button>
                    <button onClick={() => handleDelete(s.id)} className="text-red-400 hover:underline text-xs">Eliminar</button>
                  </td>
                </tr>
              ))}
              {items.length === 0 && <tr><td colSpan={7} className="px-4 py-8 text-center text-text-muted">No hay proveedores</td></tr>}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// ITINERARIES MODULE
// ═══════════════════════════════════════════════════════════════════
function ItinerariesModule() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [detail, setDetail] = useState<any>(null);
  const [activities, setActivities] = useState<any[]>([]);
  const [actForm, setActForm] = useState<any>({ itinerary_id: 0, day_number: 1, date: "", time: "", activity_type: "", title: "", description: "", location: "", supplier_name: "", amount: 0 });
  const [showActForm, setShowActForm] = useState(false);
  const [form, setForm] = useState<any>({ name: "", customer_name: "", start_date: "", end_date: "", destination: "", pax_count: 1, total_amount: 0, currency: "PEN", status: "borrador", notes: "" });

  const load = () => { setLoading(true); getItineraries({ data: { token: getAdminToken() } }).then((r: any) => { if (r.ok) setItems(r.data); setLoading(false); }); };
  useEffect(() => { load(); }, []);

  const resetForm = () => { setForm({ name: "", customer_name: "", start_date: "", end_date: "", destination: "", pax_count: 1, total_amount: 0, currency: "PEN", status: "borrador", notes: "" }); setEditing(null); setShowForm(false); };
  const handleEdit = (item: any) => { setEditing(item); setForm({ ...item }); setShowForm(true); };
  const handleDelete = async (id: number) => { if (!confirm("Eliminar itinerario?")) return; await deleteItinerary({ data: { token: getAdminToken(), id: id } }); load(); };
  const handleSave = async (e: React.FormEvent) => { e.preventDefault(); setSaving(true); try { if (editing) await updateItinerary({ data: { token: getAdminToken(), ...form, id: editing.id } }); else await createItinerary({ data: { token: getAdminToken(), ...form } }); resetForm(); load(); } finally { setSaving(false); } };
  const viewDetail = async (item: any) => { const r = await getItinerary({ data: { token: getAdminToken(), id: item.id } }); if (r.ok) { setDetail(r.data); setActivities(r.activities || []); } };
  const handleSaveAct = async () => { await createItineraryActivity({ data: { token: getAdminToken(), ...actForm, itinerary_id: detail.id } }); setShowActForm(false); viewDetail(detail); };
  const handleDeleteAct = async (id: number) => { await deleteItineraryActivity({ data: { token: getAdminToken(), id: id } }); viewDetail(detail); };

  const days = [...new Set(activities.map(a => a.day_number))].sort();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold">Itinerarios ({items.length})</h2>
        <button onClick={() => { resetForm(); setShowForm(true); }} className="rounded-xl bg-amber px-4 py-2 text-sm font-semibold text-bg-navy">+ Nuevo Itinerario</button>
      </div>
      {showForm && (
        <div className="mb-6 rounded-2xl border border-border-light bg-bg-card p-6">
          <h3 className="mb-4 text-lg font-bold">{editing ? "Editar Itinerario" : "Nuevo Itinerario"}</h3>
          <form onSubmit={handleSave} className="grid gap-4 md:grid-cols-3">
            <div className="md:col-span-2"><label className="block text-sm font-medium text-text-secondary">Nombre *</label><input value={form.name} onChange={e => setForm({...form, name: e.target.value})} required className="mt-1 w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2" /></div>
            <div><label className="block text-sm font-medium text-text-secondary">Estado</label>
              <select value={form.status} onChange={e => setForm({...form, status: e.target.value})} className="mt-1 w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2 text-sm">
                <option value="borrador">Borrador</option><option value="activo">Activo</option><option value="completado">Completado</option><option value="cancelado">Cancelado</option>
              </select></div>
            <div><label className="block text-sm font-medium text-text-secondary">Cliente</label><input value={form.customer_name} onChange={e => setForm({...form, customer_name: e.target.value})} className="mt-1 w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2" /></div>
            <div><label className="block text-sm font-medium text-text-secondary">Destino</label><input value={form.destination} onChange={e => setForm({...form, destination: e.target.value})} className="mt-1 w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2" /></div>
            <div><label className="block text-sm font-medium text-text-secondary">Inicio</label><input type="date" value={form.start_date} onChange={e => setForm({...form, start_date: e.target.value})} required className="mt-1 w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2" /></div>
            <div><label className="block text-sm font-medium text-text-secondary">Fin</label><input type="date" value={form.end_date} onChange={e => setForm({...form, end_date: e.target.value})} required className="mt-1 w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2" /></div>
            <div><label className="block text-sm font-medium text-text-secondary">Pax</label><input type="number" min={1} value={form.pax_count} onChange={e => setForm({...form, pax_count: parseInt(e.target.value) || 1})} className="mt-1 w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2" /></div>
            <div><label className="block text-sm font-medium text-text-secondary">Total (S/)</label><input type="number" step="0.01" value={form.total_amount} onChange={e => setForm({...form, total_amount: parseFloat(e.target.value) || 0})} className="mt-1 w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2" /></div>
            <div className="md:col-span-3"><label className="block text-sm font-medium text-text-secondary">Notas</label><textarea value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} rows={2} className="mt-1 w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2" /></div>
            <div className="md:col-span-3 flex gap-3 justify-end">
              <button type="button" onClick={resetForm} className="rounded-lg border border-border-light px-4 py-2 text-sm">Cancelar</button>
              <button type="submit" disabled={saving} className="rounded-lg bg-amber px-6 py-2 text-sm font-semibold text-bg-navy disabled:opacity-50">{saving ? "Guardando..." : (editing ? "Guardar" : "Crear")}</button>
            </div>
          </form>
        </div>
      )}

      {detail && (
        <div className="mb-6 rounded-2xl border border-border-light bg-bg-card p-5">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold">{detail.name}</h3>
              <p className="text-sm text-text-secondary">{detail.destination} | {detail.start_date} → {detail.end_date} | {detail.pax_count} pax | S/{Number(detail.total_amount).toFixed(2)}</p>
            </div>
            <button onClick={() => setDetail(null)} className="text-text-muted hover:text-text-primary">Cerrar</button>
          </div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-bold">Actividades</h4>
            <button onClick={() => { setActForm({ itinerary_id: detail.id, day_number: days.length+1, date: "", time: "", activity_type: "visita", title: "", description: "", location: "", supplier_name: "", amount: 0 }); setShowActForm(true); }} className="rounded-lg bg-amber/20 px-3 py-1 text-xs text-amber">+ Actividad</button>
          </div>
          {showActForm && (
            <div className="mb-4 grid gap-3 md:grid-cols-4 rounded-lg border border-border-light bg-bg-surface p-4">
              <input type="number" value={actForm.day_number} onChange={e => setActForm({...actForm, day_number: parseInt(e.target.value) || 1})} placeholder="Dia" className="rounded-lg border border-border-light bg-bg-navy px-3 py-1.5 text-xs" />
              <input type="date" value={actForm.date} onChange={e => setActForm({...actForm, date: e.target.value})} className="rounded-lg border border-border-light bg-bg-navy px-3 py-1.5 text-xs" />
              <input type="time" value={actForm.time} onChange={e => setActForm({...actForm, time: e.target.value})} className="rounded-lg border border-border-light bg-bg-navy px-3 py-1.5 text-xs" />
              <select value={actForm.activity_type} onChange={e => setActForm({...actForm, activity_type: e.target.value})} className="rounded-lg border border-border-light bg-bg-navy px-3 py-1.5 text-xs">
                <option value="visita">Visita</option><option value="traslado">Traslado</option><option value="vuelo">Vuelo</option><option value="comida">Comida</option><option value="hospedaje">Hospedaje</option><option value="tour">Tour</option><option value="actividad_libre">Libre</option><option value="taller">Taller</option>
              </select>
              <input value={actForm.title} onChange={e => setActForm({...actForm, title: e.target.value})} placeholder="Titulo *" className="rounded-lg border border-border-light bg-bg-navy px-3 py-1.5 text-xs" />
              <input value={actForm.location} onChange={e => setActForm({...actForm, location: e.target.value})} placeholder="Ubicacion" className="rounded-lg border border-border-light bg-bg-navy px-3 py-1.5 text-xs" />
              <input value={actForm.supplier_name} onChange={e => setActForm({...actForm, supplier_name: e.target.value})} placeholder="Proveedor" className="rounded-lg border border-border-light bg-bg-navy px-3 py-1.5 text-xs" />
              <input type="number" value={actForm.amount} onChange={e => setActForm({...actForm, amount: parseFloat(e.target.value) || 0})} placeholder="Monto" className="rounded-lg border border-border-light bg-bg-navy px-3 py-1.5 text-xs" />
              <div className="flex gap-2">
                <button onClick={handleSaveAct} className="rounded-lg bg-amber px-3 py-1.5 text-xs font-semibold text-bg-navy">Guardar</button>
                <button onClick={() => setShowActForm(false)} className="rounded-lg border border-border-light px-3 py-1.5 text-xs">Cancelar</button>
              </div>
            </div>
          )}
          {days.map(day => (
            <div key={day} className="mb-3">
              <h5 className="text-xs font-bold text-amber mb-2">Dia {day} — {activities.find(a => a.day_number === day)?.date || ""}</h5>
              <div className="space-y-1">
                {activities.filter(a => a.day_number === day).sort((a,b) => (a.sort_order||0) - (b.sort_order||0)).map(a => (
                  <div key={a.id} className="flex items-center justify-between rounded-lg border border-border-light bg-bg-surface px-4 py-2 text-xs">
                    <div className="flex items-center gap-3">
                      <span className="text-text-muted w-12">{a.time?.slice(0,5) || "--:--"}</span>
                      <span className="font-medium">{a.title}</span>
                      <span className="text-text-muted">{a.location || ""}</span>
                      <span className="rounded-full bg-amber/10 px-2 py-0.5 text-amber text-[10px]">{a.activity_type}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-text-secondary">S/{Number(a.amount).toFixed(0)}</span>
                      <button onClick={() => handleDeleteAct(a.id)} className="text-red-400 hover:underline">Eliminar</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          {activities.length === 0 && <p className="text-xs text-text-muted">Sin actividades registradas</p>}
        </div>
      )}

      {loading ? <div className="flex justify-center py-20"><div className="h-6 w-6 animate-spin rounded-full border-2 border-amber/30 border-t-amber" /></div> : (
        <div className="overflow-hidden rounded-2xl border border-border-light bg-bg-card">
          <table className="w-full text-left text-sm">
            <thead className="bg-bg-surface border-b border-border-light">
              <tr><th className="px-4 py-3 font-medium text-text-secondary">Nombre</th><th className="px-4 py-3 font-medium text-text-secondary">Cliente</th><th className="px-4 py-3 font-medium text-text-secondary">Destino</th><th className="px-4 py-3 font-medium text-text-secondary">Fechas</th><th className="px-4 py-3 font-medium text-text-secondary">Total</th><th className="px-4 py-3 font-medium text-text-secondary">Estado</th><th className="px-4 py-3 font-medium text-text-secondary text-right">Acciones</th></tr>
            </thead>
            <tbody>
              {items.map((i) => (
                <tr key={i.id} className="border-b border-border-light last:border-b-0 hover:bg-bg-surface/50 cursor-pointer" onClick={() => viewDetail(i)}>
                  <td className="px-4 py-3 font-medium">{i.name}</td>
                  <td className="px-4 py-3 text-text-secondary">{i.customer_name || "-"}</td>
                  <td className="px-4 py-3 text-text-secondary">{i.destination || "-"}</td>
                  <td className="px-4 py-3 text-text-secondary text-xs">{i.start_date} → {i.end_date}</td>
                  <td className="px-4 py-3 text-text-secondary">S/{Number(i.total_amount).toFixed(0)}</td>
                  <td className="px-4 py-3"><span className={`rounded-full px-2 py-0.5 text-xs ${i.status === 'activo' ? 'bg-green-500/10 text-green-400' : i.status === 'borrador' ? 'bg-amber/10 text-amber' : i.status === 'completado' ? 'bg-blue-500/10 text-blue-400' : 'bg-red-500/10 text-red-400'}`}>{i.status}</span></td>
                  <td className="px-4 py-3 text-right" onClick={e => e.stopPropagation()}>
                    <button onClick={() => handleEdit(i)} className="text-amber hover:underline mr-2 text-xs">Editar</button>
                    <button onClick={() => handleDelete(i.id)} className="text-red-400 hover:underline text-xs">Eliminar</button>
                  </td>
                </tr>
              ))}
              {items.length === 0 && <tr><td colSpan={7} className="px-4 py-8 text-center text-text-muted">No hay itinerarios</td></tr>}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// INVOICES MODULE
// ═══════════════════════════════════════════════════════════════════
function InvoicesModule() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<any>({ invoice_type: "boleta", customer_name: "", customer_document: "", customer_address: "", subtotal: 0, tax_rate: 18, total: 0, status: "emitido", payment_method: "", notes: "" });

  const load = () => { setLoading(true); getInvoices({ data: { token: getAdminToken() } }).then((r: any) => { if (r.ok) setItems(r.data); setLoading(false); }); };
  useEffect(() => { load(); }, []);

  const resetForm = () => { setForm({ invoice_type: "boleta", customer_name: "", customer_document: "", customer_address: "", subtotal: 0, tax_rate: 18, total: 0, status: "emitido", payment_method: "", notes: "" }); setEditing(null); setShowForm(false); };
  const handleEdit = (item: any) => { setEditing(item); setForm({ ...item }); setShowForm(true); };
  const handleDelete = async (id: number) => { if (!confirm("Anular comprobante?")) return; await deleteInvoice({ data: { token: getAdminToken(), id: id } }); load(); };
  const handleSave = async (e: React.FormEvent) => { e.preventDefault(); setSaving(true); try { if (editing) await updateInvoice({ data: { token: getAdminToken(), ...form, id: editing.id } }); else await createInvoice({ data: { token: getAdminToken(), ...form } }); resetForm(); load(); } finally { setSaving(false); } };
  const calcTotal = (sub: number, tax: number) => { setForm({...form, subtotal: sub, total: sub + (sub * tax / 100) }); };

  const invStatusColors: Record<string, string> = { borrador: "bg-gray-500/10 text-gray-400", emitido: "bg-blue-500/10 text-blue-400", pagado: "bg-green-500/10 text-green-400", anulado: "bg-red-500/10 text-red-400", vencido: "bg-amber/10 text-amber" };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold">Facturacion ({items.length})</h2>
        <button onClick={() => { resetForm(); setShowForm(true); }} className="rounded-xl bg-amber px-4 py-2 text-sm font-semibold text-bg-navy">+ Nuevo Comprobante</button>
      </div>
      {showForm && (
        <div className="mb-6 rounded-2xl border border-border-light bg-bg-card p-6">
          <h3 className="mb-4 text-lg font-bold">{editing ? "Editar Comprobante" : "Nuevo Comprobante"}</h3>
          <form onSubmit={handleSave} className="grid gap-4 md:grid-cols-3">
            <div><label className="block text-sm font-medium text-text-secondary">Tipo</label>
              <select value={form.invoice_type} onChange={e => setForm({...form, invoice_type: e.target.value})} className="mt-1 w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2 text-sm">
                <option value="boleta">Boleta</option><option value="factura">Factura</option><option value="recibo">Recibo</option><option value="proforma">Proforma</option>
              </select></div>
            <div><label className="block text-sm font-medium text-text-secondary">Estado</label>
              <select value={form.status} onChange={e => setForm({...form, status: e.target.value})} className="mt-1 w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2 text-sm">
                <option value="emitido">Emitido</option><option value="pagado">Pagado</option><option value="borrador">Borrador</option><option value="anulado">Anulado</option>
              </select></div>
            <div><label className="block text-sm font-medium text-text-secondary">Metodo Pago</label>
              <select value={form.payment_method} onChange={e => setForm({...form, payment_method: e.target.value})} className="mt-1 w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2 text-sm">
                <option value="">--</option><option value="efectivo">Efectivo</option><option value="transferencia">Transferencia</option><option value="tarjeta">Tarjeta</option><option value="yape">Yape</option><option value="plin">Plin</option>
              </select></div>
            <div className="md:col-span-2"><label className="block text-sm font-medium text-text-secondary">Cliente *</label><input value={form.customer_name} onChange={e => setForm({...form, customer_name: e.target.value})} required className="mt-1 w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2" /></div>
            <div><label className="block text-sm font-medium text-text-secondary">Documento</label><input value={form.customer_document} onChange={e => setForm({...form, customer_document: e.target.value})} className="mt-1 w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2" /></div>
            <div className="md:col-span-3"><label className="block text-sm font-medium text-text-secondary">Direccion</label><input value={form.customer_address} onChange={e => setForm({...form, customer_address: e.target.value})} className="mt-1 w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2" /></div>
            <div><label className="block text-sm font-medium text-text-secondary">Subtotal (S/)</label><input type="number" step="0.01" value={form.subtotal} onChange={e => calcTotal(parseFloat(e.target.value) || 0, form.tax_rate)} className="mt-1 w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2" /></div>
            <div><label className="block text-sm font-medium text-text-secondary">IGV (%)</label><input type="number" step="0.01" value={form.tax_rate} onChange={e => calcTotal(form.subtotal, parseFloat(e.target.value) || 0)} className="mt-1 w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2" /></div>
            <div><label className="block text-sm font-medium text-text-secondary">Total (S/)</label><input type="number" step="0.01" value={form.total} disabled className="mt-1 w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2 opacity-60" /></div>
            <div className="md:col-span-3 flex gap-3 justify-end">
              <button type="button" onClick={resetForm} className="rounded-lg border border-border-light px-4 py-2 text-sm">Cancelar</button>
              <button type="submit" disabled={saving} className="rounded-lg bg-amber px-6 py-2 text-sm font-semibold text-bg-navy disabled:opacity-50">{saving ? "Guardando..." : (editing ? "Guardar" : "Crear")}</button>
            </div>
          </form>
        </div>
      )}
      {loading ? <div className="flex justify-center py-20"><div className="h-6 w-6 animate-spin rounded-full border-2 border-amber/30 border-t-amber" /></div> : (
        <div className="overflow-hidden rounded-2xl border border-border-light bg-bg-card">
          <table className="w-full text-left text-sm">
            <thead className="bg-bg-surface border-b border-border-light">
              <tr><th className="px-4 py-3 font-medium text-text-secondary">Nro.</th><th className="px-4 py-3 font-medium text-text-secondary">Cliente</th><th className="px-4 py-3 font-medium text-text-secondary">Tipo</th><th className="px-4 py-3 font-medium text-text-secondary">Subtotal</th><th className="px-4 py-3 font-medium text-text-secondary">Total</th><th className="px-4 py-3 font-medium text-text-secondary">Estado</th><th className="px-4 py-3 font-medium text-text-secondary text-right">Acciones</th></tr>
            </thead>
            <tbody>
              {items.map((inv) => (
                <tr key={inv.id} className="border-b border-border-light last:border-b-0">
                  <td className="px-4 py-3 text-xs font-mono text-text-muted">{inv.invoice_number}</td>
                  <td className="px-4 py-3 font-medium">{inv.customer_name}</td>
                  <td className="px-4 py-3 text-text-secondary">{inv.invoice_type}</td>
                  <td className="px-4 py-3 text-text-secondary">S/{Number(inv.subtotal).toFixed(2)}</td>
                  <td className="px-4 py-3 font-medium">S/{Number(inv.total).toFixed(2)}</td>
                  <td className="px-4 py-3"><span className={`rounded-full px-2 py-0.5 text-xs ${invStatusColors[inv.status] || ''}`}>{inv.status}</span></td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => handleEdit(inv)} className="text-amber hover:underline mr-2 text-xs">Editar</button>
                    <button onClick={() => handleDelete(inv.id)} className="text-red-400 hover:underline text-xs">Anular</button>
                  </td>
                </tr>
              ))}
              {items.length === 0 && <tr><td colSpan={7} className="px-4 py-8 text-center text-text-muted">Sin comprobantes</td></tr>}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// EXPENSES MODULE
// ═══════════════════════════════════════════════════════════════════
function ExpensesModule() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<any>({ category: "oficina", description: "", amount: 0, currency: "PEN", expense_date: new Date().toISOString().split('T')[0], payment_method: "", notes: "" });
  const [categoryFilter, setCategoryFilter] = useState("todas");

  const load = () => { setLoading(true); getExpenses({ data: { token: getAdminToken() } }).then((r: any) => { if (r.ok) setItems(r.data); setLoading(false); }); };
  useEffect(() => { load(); }, []);

  const handleSave = async (e: React.FormEvent) => { e.preventDefault(); setSaving(true); try { await createExpense({ data: { token: getAdminToken(), ...form } }); setForm({ category: "oficina", description: "", amount: 0, currency: "PEN", expense_date: new Date().toISOString().split('T')[0], payment_method: "", notes: "" }); setShowForm(false); load(); } finally { setSaving(false); } };
  const handleDelete = async (id: number) => { if (!confirm("Eliminar gasto?")) return; await deleteExpense({ data: { token: getAdminToken(), id: id } }); load(); };

  const catLabels: Record<string, string> = { transporte: "Transporte", alojamiento: "Alojamiento", alimentacion: "Alimentacion", marketing: "Marketing", oficina: "Oficina", comisiones: "Comisiones", impuestos: "Impuestos", servicios: "Servicios", otros: "Otros" };
  const catColors: Record<string, string> = { transporte: "bg-blue-500", alojamiento: "bg-purple-500", alimentacion: "bg-orange-500", marketing: "bg-pink-500", oficina: "bg-gray-500", comisiones: "bg-green-500", impuestos: "bg-red-500", servicios: "bg-cyan-500", otros: "bg-amber" };

  const total = items.reduce((s, e) => s + Number(e.amount || 0), 0);
  const byCategory = items.reduce((acc: any, e: any) => {
    const cat = catLabels[e.category] || e.category;
    acc[cat] = (acc[cat] || 0) + Number(e.amount || 0);
    return acc;
  }, {});
  const maxCat = Math.max(...Object.values(byCategory) as number[], 1);
  const filtered = categoryFilter === "todas" ? items : items.filter(e => e.category === categoryFilter);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Gastos ({items.length}) <span className="text-base font-normal text-text-muted">| Total: S/{total.toFixed(2)}</span></h2>
        <div className="flex items-center gap-2">
          <AdminExportButton data={items} filename="gastos-bg-travel" columns={[
            { key: "id", label: "ID" }, { key: "category", label: "Categoria" },
            { key: "description", label: "Descripcion" }, { key: "amount", label: "Monto" },
            { key: "expense_date", label: "Fecha" }, { key: "payment_method", label: "Metodo" },
          ]} />
          <button onClick={() => setShowForm(!showForm)} className="rounded-xl bg-amber px-4 py-2 text-sm font-semibold text-bg-navy">+ Nuevo</button>
        </div>
      </div>

      {/* Category summary */}
      {Object.keys(byCategory).length > 0 && (
        <div className="rounded-2xl border border-border-light bg-bg-card p-5">
          <h3 className="text-sm font-bold mb-4">Resumen por Categoria</h3>
          <div className="space-y-2">
            {Object.entries(byCategory).map(([cat, amount]: [string, any]) => {
              const pct = (amount / total) * 100;
              const catKey = Object.entries(catLabels).find(([,v]) => v === cat)?.[0] || "otros";
              return (
                <div key={cat} className="flex items-center gap-3">
                  <span className="w-24 text-xs text-text-secondary">{cat}</span>
                  <div className="flex-1 h-5 rounded-lg bg-bg-surface overflow-hidden">
                    <div className={`h-full rounded-lg transition-all ${catColors[catKey] || "bg-amber"} opacity-60`} style={{ width: `${pct}%` }} />
                  </div>
                  <span className="w-16 text-right text-xs font-medium">S/{amount.toFixed(0)}</span>
                  <span className="w-10 text-right text-xs text-text-muted">{pct.toFixed(0)}%</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {showForm && (
        <div className="rounded-2xl border border-border-light bg-bg-card p-6">
          <form onSubmit={handleSave} className="grid gap-4 md:grid-cols-3">
            <div><label className="block text-sm font-medium text-text-secondary">Categoria</label>
              <select value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="mt-1 w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2 text-sm">
                {Object.entries(catLabels).map(([k,v]) => <option key={k} value={k}>{v}</option>)}
              </select></div>
            <div><label className="block text-sm font-medium text-text-secondary">Monto (S/) *</label><input type="number" step="0.01" value={form.amount} onChange={e => setForm({...form, amount: parseFloat(e.target.value) || 0})} required className="mt-1 w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2" /></div>
            <div><label className="block text-sm font-medium text-text-secondary">Fecha</label><input type="date" value={form.expense_date} onChange={e => setForm({...form, expense_date: e.target.value})} className="mt-1 w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2" /></div>
            <div className="md:col-span-3"><label className="block text-sm font-medium text-text-secondary">Descripcion *</label><input value={form.description} onChange={e => setForm({...form, description: e.target.value})} required className="mt-1 w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2" /></div>
            <div className="md:col-span-3 flex gap-3 justify-end">
              <button type="button" onClick={() => setShowForm(false)} className="rounded-lg border border-border-light px-4 py-2 text-sm">Cancelar</button>
              <button type="submit" disabled={saving} className="rounded-lg bg-amber px-6 py-2 text-sm font-semibold text-bg-navy disabled:opacity-50">{saving ? "Guardando..." : "Crear"}</button>
            </div>
          </form>
        </div>
      )}

      {loading ? <div className="flex justify-center py-20"><div className="h-6 w-6 animate-spin rounded-full border-2 border-amber/30 border-t-amber" /></div> : (
        <div className="overflow-hidden rounded-2xl border border-border-light bg-bg-card">
          <table className="w-full text-left text-sm">
            <thead className="bg-bg-surface border-b border-border-light">
              <tr><th className="px-4 py-3 font-medium text-text-secondary">Categoria</th><th className="px-4 py-3 font-medium text-text-secondary">Descripcion</th><th className="px-4 py-3 font-medium text-text-secondary">Monto</th><th className="px-4 py-3 font-medium text-text-secondary">Fecha</th><th className="px-4 py-3 font-medium text-text-secondary">Proveedor</th><th className="px-4 py-3 font-medium text-text-secondary text-right">Acciones</th></tr>
            </thead>
            <tbody>
              {filtered.map((e: any) => (
                <tr key={e.id} className="border-b border-border-light last:border-b-0">
                  <td className="px-4 py-3"><span className="rounded-full bg-amber/10 px-2 py-0.5 text-xs text-amber">{catLabels[e.category] || e.category}</span></td>
                  <td className="px-4 py-3">{e.description}</td>
                  <td className="px-4 py-3 font-medium">S/{Number(e.amount).toFixed(2)}</td>
                  <td className="px-4 py-3 text-text-secondary text-xs">{e.expense_date}</td>
                  <td className="px-4 py-3 text-text-secondary text-xs">{e.supplier_name || "-"}</td>
                  <td className="px-4 py-3 text-right"><button onClick={() => handleDelete(e.id)} className="text-red-400 hover:underline text-xs">Eliminar</button></td>
                </tr>
              ))}
              {items.length === 0 && <tr><td colSpan={6} className="px-4 py-8 text-center text-text-muted">No hay gastos registrados</td></tr>}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// COMMISSIONS MODULE
// ═══════════════════════════════════════════════════════════════════
function CommissionsModule() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<any>({ supplier_id: 0, amount: 0, currency: "PEN", status: "pendiente", notes: "" });
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [statusFilter, setStatusFilter] = useState("todas");

  const load = () => {
    setLoading(true);
    Promise.all([getCommissions({ data: { token: getAdminToken() } }), getSuppliers({ data: { token: getAdminToken() } })]).then(([cr, sr]) => {
      if (cr.ok) setItems(cr.data);
      if (sr.ok) setSuppliers(sr.data);
      setLoading(false);
    });
  };
  useEffect(() => { load(); }, []);

  const handleSave = async (e: React.FormEvent) => { e.preventDefault(); setSaving(true); try { await createCommission({ data: { token: getAdminToken(), ...form } }); setShowForm(false); load(); } finally { setSaving(false); } };
  const handlePay = async (id: number) => { await payCommission({ data: { token: getAdminToken(), id: id } }); load(); };

  const totalPending = items.filter(i => i.status === 'pendiente').reduce((s, i) => s + Number(i.amount || 0), 0);
  const totalPaid = items.filter(i => i.status === 'pagado').reduce((s, i) => s + Number(i.amount || 0), 0);
  const filtered = statusFilter === "todas" ? items : items.filter(i => i.status === statusFilter);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Comisiones ({items.length})</h2>
        <div className="flex items-center gap-2">
          <AdminExportButton data={items} filename="comisiones-bg-travel" columns={[
            { key: "supplier_name", label: "Proveedor" }, { key: "amount", label: "Monto" },
            { key: "status", label: "Estado" }, { key: "created_at", label: "Fecha" },
          ]} />
          <button onClick={() => { setShowForm(!showForm); if (suppliers.length === 0) getSuppliers({ data: { token: getAdminToken() } }).then((r: any) => { if (r.ok) setSuppliers(r.data); }); }} className="rounded-xl bg-amber px-4 py-2 text-sm font-semibold text-bg-navy">+ Nueva</button>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-border-light bg-bg-card p-4">
          <p className="text-xs text-text-muted">Pendiente</p>
          <p className="text-2xl font-bold text-amber">S/ {totalPending.toFixed(2)}</p>
          <p className="text-xs text-text-muted">{items.filter(i => i.status === 'pendiente').length} comisiones</p>
        </div>
        <div className="rounded-2xl border border-border-light bg-bg-card p-4">
          <p className="text-xs text-text-muted">Pagado</p>
          <p className="text-2xl font-bold text-green-400">S/ {totalPaid.toFixed(2)}</p>
          <p className="text-xs text-text-muted">{items.filter(i => i.status === 'pagado').length} comisiones</p>
        </div>
        <div className="rounded-2xl border border-border-light bg-bg-card p-4">
          <p className="text-xs text-text-muted">Total</p>
          <p className="text-2xl font-bold text-text-primary">S/ {(totalPending + totalPaid).toFixed(2)}</p>
          <p className="text-xs text-text-muted">{items.length} registros</p>
        </div>
      </div>

      {showForm && (
        <div className="rounded-2xl border border-border-light bg-bg-card p-6">
          <form onSubmit={handleSave} className="grid gap-4 md:grid-cols-3">
            <div><label className="block text-sm font-medium text-text-secondary">Proveedor</label>
              <select value={form.supplier_id} onChange={e => setForm({...form, supplier_id: parseInt(e.target.value) || 0})} className="mt-1 w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2 text-sm">
                <option value={0}>Seleccionar...</option>
                {suppliers.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select></div>
            <div><label className="block text-sm font-medium text-text-secondary">Monto (S/) *</label><input type="number" step="0.01" value={form.amount} onChange={e => setForm({...form, amount: parseFloat(e.target.value) || 0})} required className="mt-1 w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2" /></div>
            <div className="md:col-span-3 flex gap-3 justify-end">
              <button type="button" onClick={() => setShowForm(false)} className="rounded-lg border border-border-light px-4 py-2 text-sm">Cancelar</button>
              <button type="submit" disabled={saving} className="rounded-lg bg-amber px-6 py-2 text-sm font-semibold text-bg-navy disabled:opacity-50">{saving ? "Guardando..." : "Crear"}</button>
            </div>
          </form>
        </div>
      )}

      {loading ? <div className="flex justify-center py-20"><div className="h-6 w-6 animate-spin rounded-full border-2 border-amber/30 border-t-amber" /></div> : (
        <div className="overflow-hidden rounded-2xl border border-border-light bg-bg-card">
          <table className="w-full text-left text-sm">
            <thead className="bg-bg-surface border-b border-border-light">
              <tr><th className="px-4 py-3 font-medium text-text-secondary">Proveedor</th><th className="px-4 py-3 font-medium text-text-secondary">Monto</th><th className="px-4 py-3 font-medium text-text-secondary">Estado</th><th className="px-4 py-3 font-medium text-text-secondary">Fecha</th><th className="px-4 py-3 font-medium text-text-secondary text-right">Acciones</th></tr>
            </thead>
            <tbody>
              {filtered.map((c: any) => (
                <tr key={c.id} className="border-b border-border-light last:border-b-0">
                  <td className="px-4 py-3 font-medium">{c.supplier_name || c.supplier_id}</td>
                  <td className="px-4 py-3 text-text-secondary">S/{Number(c.amount).toFixed(2)}</td>
                  <td className="px-4 py-3"><span className={`rounded-full px-2 py-0.5 text-xs ${c.status === 'pendiente' ? 'bg-amber/10 text-amber' : 'bg-green-500/10 text-green-400'}`}>{c.status}</span></td>
                  <td className="px-4 py-3 text-text-secondary text-xs">{c.created_at ? new Date(c.created_at).toLocaleDateString("es-PE") : "-"}</td>
                  <td className="px-4 py-3 text-right">
                    {c.status === 'pendiente' && <button onClick={() => handlePay(c.id)} className="text-green-400 hover:underline text-xs">Pagar</button>}
                  </td>
                </tr>
              ))}
              {items.length === 0 && <tr><td colSpan={5} className="px-4 py-8 text-center text-text-muted">Sin comisiones registradas</td></tr>}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// EXPERIENCES MODULE (preserved from original)
// ═══════════════════════════════════════════════════════════════════
function ExperiencesModule() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ name: "", subtitle: "", description: "", image_url: "", price: "", tag: "", duration: "", featured: 0 });
  const load = () => { setLoading(true); getExperiences().then((r: any) => { if (r.ok) setItems(r.data); setLoading(false); }); };
  useEffect(() => { load(); }, []);
  const resetForm = () => { setForm({ name: "", subtitle: "", description: "", image_url: "", price: "", tag: "", duration: "", featured: 0 }); setEditing(null); setShowForm(false); };
  const handleEdit = (item: any) => { setEditing(item); setForm({ name: item.name, subtitle: item.subtitle||"", description: item.description||"", image_url: item.image_url||"", price: item.price, tag: item.tag||"", duration: item.duration||"", featured: item.featured||0 }); setShowForm(true); };
  const handleDelete = async (id: number) => { if (!confirm("Eliminar experiencia?")) return; await deleteExperience({ data: id }); load(); };
  const handleSave = async (e: React.FormEvent) => { e.preventDefault(); setSaving(true); try { if (editing) await updateExperience({ data: { id: editing.id, ...form } }); else await createExperience({ data: form }); resetForm(); load(); } finally { setSaving(false); } };
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold">Experiencias ({items.length})</h2>
        <button onClick={() => { resetForm(); setShowForm(true); }} className="rounded-xl bg-amber px-4 py-2 text-sm font-semibold text-bg-navy">+ Nueva experiencia</button>
      </div>
      {showForm && (
        <div className="mb-6 rounded-2xl border border-border-light bg-bg-card p-6">
          <h3 className="mb-4 text-lg font-bold">{editing ? "Editar experiencia" : "Nueva experiencia"}</h3>
          <form onSubmit={handleSave} className="grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2"><label className="block text-sm font-medium text-text-secondary">Nombre</label><input value={form.name} onChange={e => setForm({...form, name: e.target.value})} required className="mt-1 w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2" /></div>
            <div className="md:col-span-2"><label className="block text-sm font-medium text-text-secondary">Subtitulo</label><input value={form.subtitle} onChange={e => setForm({...form, subtitle: e.target.value})} className="mt-1 w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2" /></div>
            <div className="md:col-span-2"><label className="block text-sm font-medium text-text-secondary">Descripcion</label><textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows={3} className="mt-1 w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2" /></div>
            <div><label className="block text-sm font-medium text-text-secondary">Precio</label><input value={form.price} onChange={e => setForm({...form, price: e.target.value})} required placeholder="desde S/ 299" className="mt-1 w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2" /></div>
            <div><label className="block text-sm font-medium text-text-secondary">Categoria</label><input value={form.tag} onChange={e => setForm({...form, tag: e.target.value})} placeholder="Cultural, Aventura..." className="mt-1 w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2" /></div>
            <div><label className="block text-sm font-medium text-text-secondary">Duracion</label><input value={form.duration} onChange={e => setForm({...form, duration: e.target.value})} placeholder="2 dias / 1 noche" className="mt-1 w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2" /></div>
            <div><label className="block text-sm font-medium text-text-secondary">URL de imagen</label><input value={form.image_url} onChange={e => setForm({...form, image_url: e.target.value})} placeholder="/assets/plate-cusco.png" className="mt-1 w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2" /></div>
            <div className="flex items-center gap-2"><input type="checkbox" id="featured" checked={!!form.featured} onChange={e => setForm({...form, featured: e.target.checked ? 1 : 0})} className="h-4 w-4" /><label htmlFor="featured" className="text-sm text-text-secondary">Destacado en home</label></div>
            <div className="md:col-span-2 flex gap-3 justify-end">
              <button type="button" onClick={resetForm} className="rounded-lg border border-border-light px-4 py-2 text-sm">Cancelar</button>
              <button type="submit" disabled={saving} className="rounded-lg bg-amber px-6 py-2 text-sm font-semibold text-bg-navy disabled:opacity-50">{saving ? "Guardando..." : (editing ? "Guardar cambios" : "Crear")}</button>
            </div>
          </form>
        </div>
      )}
      {loading ? <div className="flex justify-center py-20"><div className="h-6 w-6 animate-spin rounded-full border-2 border-amber/30 border-t-amber" /></div> : (
        <div className="overflow-hidden rounded-2xl border border-border-light bg-bg-card">
          <table className="w-full text-left text-sm">
            <thead className="bg-bg-surface border-b border-border-light">
              <tr><th className="px-4 py-3 font-medium text-text-secondary">ID</th><th className="px-4 py-3 font-medium text-text-secondary">Nombre</th><th className="px-4 py-3 font-medium text-text-secondary">Precio</th><th className="px-4 py-3 font-medium text-text-secondary">Categoria</th><th className="px-4 py-3 font-medium text-text-secondary">Destacado</th><th className="px-4 py-3 font-medium text-text-secondary text-right">Acciones</th></tr>
            </thead>
            <tbody>
              {items.map((e) => (
                <tr key={e.id} className="border-b border-border-light last:border-b-0">
                  <td className="px-4 py-3 text-text-muted">{e.id}</td>
                  <td className="px-4 py-3 font-medium">{e.name}</td>
                  <td className="px-4 py-3 text-text-secondary">{e.price}</td>
                  <td className="px-4 py-3">{e.tag && <span className="rounded-full bg-amber/10 px-2 py-1 text-xs text-amber">{e.tag}</span>}</td>
                  <td className="px-4 py-3 text-text-secondary">{e.featured ? "Si" : "No"}</td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => handleEdit(e)} className="text-amber hover:underline mr-3">Editar</button>
                    <button onClick={() => handleDelete(e.id)} className="text-red-400 hover:underline">Eliminar</button>
                  </td>
                </tr>
              ))}
              {items.length === 0 && <tr><td colSpan={6} className="px-4 py-8 text-center text-text-muted">No hay experiencias</td></tr>}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// QUOTES MODULE (preserved from original)
// ═══════════════════════════════════════════════════════════════════
function QuotesModule() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const load = () => { setLoading(true); getQuotes().then((r: any) => { if (r.ok) setItems(r.data); setLoading(false); }); };
  useEffect(() => { load(); }, []);
  const handleStatus = async (id: number, status: string) => { await updateQuoteStatus({ data: { id, status } }); load(); };
  const formatDate = (d: string) => { try { return new Date(d).toLocaleString("es-PE", { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }); } catch { return d; } };
  const statusColors: Record<string, string> = { nuevo: "bg-amber/10 text-amber", contactado: "bg-blue-500/10 text-blue-400", cerrado: "bg-green-500/10 text-green-400", perdido: "bg-red-500/10 text-red-400" };
  return (
    <div>
      <div className="mb-6"><h2 className="text-xl font-bold">Cotizaciones ({items.length})</h2></div>
      {loading ? <div className="flex justify-center py-20"><div className="h-6 w-6 animate-spin rounded-full border-2 border-amber/30 border-t-amber" /></div> : (
        <div className="overflow-hidden rounded-2xl border border-border-light bg-bg-card">
          <table className="w-full text-left text-sm">
            <thead className="bg-bg-surface border-b border-border-light">
              <tr><th className="px-4 py-3 font-medium text-text-secondary">ID</th><th className="px-4 py-3 font-medium text-text-secondary">Nombre</th><th className="px-4 py-3 font-medium text-text-secondary">Destino</th><th className="px-4 py-3 font-medium text-text-secondary">WhatsApp</th><th className="px-4 py-3 font-medium text-text-secondary">Estado</th><th className="px-4 py-3 font-medium text-text-secondary">Fecha</th><th className="px-4 py-3 font-medium text-text-secondary text-right">Acciones</th></tr>
            </thead>
            <tbody>
              {items.map((q) => (
                <tr key={q.id} className="border-b border-border-light last:border-b-0">
                  <td className="px-4 py-3 text-text-muted">{q.id}</td>
                  <td className="px-4 py-3 font-medium">{q.name}</td>
                  <td className="px-4 py-3 text-text-secondary">{q.destination}</td>
                  <td className="px-4 py-3 text-text-secondary">{q.whatsapp}</td>
                  <td className="px-4 py-3"><span className={`rounded-full px-2 py-1 text-xs ${statusColors[q.status] || statusColors.nuevo}`}>{q.status || "nuevo"}</span></td>
                  <td className="px-4 py-3 text-text-secondary text-xs">{formatDate(q.created_at)}</td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <a href={`https://wa.me/51${q.whatsapp?.replace(/\\D/g, '')}`} target="_blank" className="text-green-400 hover:underline text-xs">WhatsApp</a>
                    <button onClick={() => handleStatus(q.id, "contactado")} className="text-blue-400 hover:underline text-xs">Contactado</button>
                    <button onClick={() => handleStatus(q.id, "cerrado")} className="text-green-400 hover:underline text-xs">Cerrado</button>
                  </td>
                </tr>
              ))}
              {items.length === 0 && <tr><td colSpan={7} className="px-4 py-8 text-center text-text-muted">No hay cotizaciones aun</td></tr>}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// BLOG MODULE (preserved from original)
// ═══════════════════════════════════════════════════════════════════
function BlogModule() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ title: "", slug: "", excerpt: "", content: "", image_url: "", author: "", published: 1 });
  const load = () => { setLoading(true); getAllBlogPosts().then((r: any) => { if (r.ok) setPosts(r.data); setLoading(false); }); };
  useEffect(() => { load(); }, []);
  const resetForm = () => { setForm({ title: "", slug: "", excerpt: "", content: "", image_url: "", author: "", published: 1 }); setEditing(null); setShowForm(false); };
  const handleEdit = (item: any) => { setEditing(item); setForm({ title: item.title, slug: item.slug, excerpt: item.excerpt||"", content: item.content||"", image_url: item.image_url||"", author: item.author||"", published: item.published||0 }); setShowForm(true); };
  const handleDelete = async (id: number) => { if (!confirm("Eliminar articulo?")) return; await deleteBlogPost({ data: id }); load(); };
  const handleSave = async (e: React.FormEvent) => { e.preventDefault(); setSaving(true); try { if (editing) await updateBlogPost({ data: { id: editing.id, ...form } }); else await createBlogPost({ data: form }); resetForm(); load(); } finally { setSaving(false); } };
  const formatDate = (d: string) => { try { return new Date(d).toLocaleDateString("es-PE", { year: "numeric", month: "short", day: "numeric" }); } catch { return d; } };
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold">Blog ({posts.length})</h2>
        <button onClick={() => { resetForm(); setShowForm(true); }} className="rounded-xl bg-amber px-4 py-2 text-sm font-semibold text-bg-navy">+ Nuevo articulo</button>
      </div>
      {showForm && (
        <div className="mb-6 rounded-2xl border border-border-light bg-bg-card p-6">
          <h3 className="mb-4 text-lg font-bold">{editing ? "Editar articulo" : "Nuevo articulo"}</h3>
          <form onSubmit={handleSave} className="grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2"><label className="block text-sm font-medium text-text-secondary">Titulo</label><input value={form.title} onChange={e => setForm({...form, title: e.target.value})} required className="mt-1 w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2" /></div>
            <div><label className="block text-sm font-medium text-text-secondary">Slug (URL)</label><input value={form.slug} onChange={e => setForm({...form, slug: e.target.value})} required placeholder="mi-articulo" className="mt-1 w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2" /></div>
            <div><label className="block text-sm font-medium text-text-secondary">Autor</label><input value={form.author} onChange={e => setForm({...form, author: e.target.value})} className="mt-1 w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2" /></div>
            <div className="md:col-span-2"><label className="block text-sm font-medium text-text-secondary">Extracto</label><textarea value={form.excerpt} onChange={e => setForm({...form, excerpt: e.target.value})} rows={2} className="mt-1 w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2" /></div>
            <div className="md:col-span-2"><label className="block text-sm font-medium text-text-secondary">Contenido (HTML)</label><textarea value={form.content} onChange={e => setForm({...form, content: e.target.value})} rows={8} className="mt-1 w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2 font-mono text-xs" /></div>
            <div><label className="block text-sm font-medium text-text-secondary">URL imagen</label><input value={form.image_url} onChange={e => setForm({...form, image_url: e.target.value})} className="mt-1 w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2" /></div>
            <div className="flex items-center gap-2 self-end"><input type="checkbox" id="published" checked={!!form.published} onChange={e => setForm({...form, published: e.target.checked ? 1 : 0})} className="h-4 w-4" /><label htmlFor="published" className="text-sm text-text-secondary">Publicado</label></div>
            <div className="md:col-span-2 flex gap-3 justify-end">
              <button type="button" onClick={resetForm} className="rounded-lg border border-border-light px-4 py-2 text-sm">Cancelar</button>
              <button type="submit" disabled={saving} className="rounded-lg bg-amber px-6 py-2 text-sm font-semibold text-bg-navy disabled:opacity-50">{saving ? "Guardando..." : (editing ? "Guardar" : "Crear")}</button>
            </div>
          </form>
        </div>
      )}
      {loading ? <div className="flex justify-center py-20"><div className="h-6 w-6 animate-spin rounded-full border-2 border-amber/30 border-t-amber" /></div> : (
        <div className="overflow-hidden rounded-2xl border border-border-light bg-bg-card">
          <table className="w-full text-left text-sm">
            <thead className="bg-bg-surface border-b border-border-light">
              <tr><th className="px-4 py-3 font-medium text-text-secondary">ID</th><th className="px-4 py-3 font-medium text-text-secondary">Titulo</th><th className="px-4 py-3 font-medium text-text-secondary">Slug</th><th className="px-4 py-3 font-medium text-text-secondary">Estado</th><th className="px-4 py-3 font-medium text-text-secondary">Fecha</th><th className="px-4 py-3 font-medium text-text-secondary text-right">Acciones</th></tr>
            </thead>
            <tbody>
              {posts.map((p) => (
                <tr key={p.id} className="border-b border-border-light last:border-b-0">
                  <td className="px-4 py-3 text-text-muted">{p.id}</td><td className="px-4 py-3 font-medium">{p.title}</td><td className="px-4 py-3 text-text-secondary text-xs">{p.slug}</td>
                  <td className="px-4 py-3"><span className={`rounded-full px-2 py-1 text-xs ${p.published ? "bg-green-500/10 text-green-400" : "bg-text-muted/20 text-text-muted"}`}>{p.published ? "Publicado" : "Borrador"}</span></td>
                  <td className="px-4 py-3 text-text-secondary text-xs">{formatDate(p.published_at || p.created_at)}</td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <a href={`/blog/${p.slug}`} target="_blank" className="text-text-secondary hover:underline text-xs">Ver</a>
                    <button onClick={() => handleEdit(p)} className="text-amber hover:underline text-xs">Editar</button>
                    <button onClick={() => handleDelete(p.id)} className="text-red-400 hover:underline text-xs">Eliminar</button>
                  </td>
                </tr>
              ))}
              {posts.length === 0 && <tr><td colSpan={6} className="px-4 py-8 text-center text-text-muted">No hay articulos</td></tr>}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}


