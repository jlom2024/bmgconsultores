import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { getCustomerPortalBookings } from "../../lib/api/agency.functions";
import { getCustomerSession } from "../../lib/api/auth.functions";

// @ts-ignore
export const Route = createFileRoute("/mi-cuenta/")({
  component: CustomerDashboard,
  head: () => ({ meta: [{ title: "Mi Cuenta — BG Travel Peru" }] }),
});

function CustomerDashboard() {
  const navigate = useNavigate();
  const [customer, setCustomer] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("bg_customer_token");
    if (!token) { navigate({ to: "/login-cliente" as any }); return; }
    getCustomerSession({ data: token }).then((sr: any) => {
      if (!sr.ok) { navigate({ to: "/login-cliente" as any }); return; }
      setCustomer(sr.customer);
      getCustomerPortalBookings({ data: { sessionToken: token } }).then((r: any) => {
        if (r.ok) setBookings(r.data || []);
        setLoading(false);
      });
    });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("bg_customer_token");
    navigate({ to: "/" as any });
  };

  const statusColors: Record<string, string> = {
    pendiente: "bg-amber/10 text-amber",
    confirmada: "bg-green-500/10 text-green-400",
    en_curso: "bg-blue-500/10 text-blue-400",
    completada: "bg-gray-500/10 text-gray-400",
    cancelada: "bg-red-500/10 text-red-400",
  };

  const payColors: Record<string, string> = {
    pendiente: "bg-amber/10 text-amber",
    parcial: "bg-blue-500/10 text-blue-400",
    pagado: "bg-green-500/10 text-green-400",
  };

  const activeBookings = bookings.filter(b => b.status === "pendiente" || b.status === "confirmada" || b.status === "en_curso");
  const pastBookings = bookings.filter(b => b.status === "completada" || b.status === "cancelada");

  const totalSpent = bookings.filter(b => b.status !== "cancelada").reduce((s, b) => s + Number(b.total_amount || 0), 0);

  if (!customer) return null;

  return (
    <div className="min-h-dvh bg-bg-navy">
      {/* Top bar */}
      <header className="border-b border-border-light bg-bg-surface/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-content items-center justify-between px-6">
          <a href="/" className="flex items-center gap-2">
            <img src="/assets/logo-bg-travel.png" alt="BG Travel" className="h-7 w-auto" />
            <span className="text-sm font-bold text-white">BG Travel</span>
          </a>
          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-text-secondary md:inline">{customer.name}</span>
            <button onClick={handleLogout} className="rounded-lg border border-border-light px-3 py-1.5 text-xs text-text-secondary hover:border-amber/30 hover:text-amber">
              Cerrar sesion
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-content px-6 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Bienvenido, {customer.name}</h1>
          <p className="text-sm text-text-secondary">Gestiona tus reservas e itinerarios de viaje</p>
        </div>

        {/* Stats cards */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-border-light bg-bg-card p-5">
            <p className="text-xs text-text-secondary mb-1">Reservas Activas</p>
            <p className="text-2xl font-bold text-amber">{activeBookings.length}</p>
          </div>
          <div className="rounded-2xl border border-border-light bg-bg-card p-5">
            <p className="text-xs text-text-secondary mb-1">Total Reservas</p>
            <p className="text-2xl font-bold text-white">{bookings.length}</p>
          </div>
          <div className="rounded-2xl border border-border-light bg-bg-card p-5">
            <p className="text-xs text-text-secondary mb-1">Total Gastado</p>
            <p className="text-2xl font-bold text-green-400">S/ {totalSpent.toFixed(2)}</p>
          </div>
          <div className="rounded-2xl border border-border-light bg-bg-card p-5">
            <p className="text-xs text-text-secondary mb-1">Email</p>
            <p className="text-sm font-medium text-text-secondary truncate">{customer.email}</p>
          </div>
        </div>

        {/* Active bookings */}
        {activeBookings.length > 0 && (
          <section className="mb-8">
            <h2 className="mb-4 text-lg font-bold">Reservas Activas</h2>
            <div className="space-y-3">
              {activeBookings.map(b => (
                <a
                  key={b.id}
                  href={`/mi-cuenta/reserva/${b.id}`}
                  className="block cursor-pointer rounded-2xl border border-border-light bg-bg-card p-5 transition-colors hover:border-amber/30"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-text-muted">{b.booking_reference}</span>
                        <span className={`rounded-full px-2 py-0.5 text-xs ${statusColors[b.status] || ''}`}>{b.status}</span>
                      </div>
                      <h3 className="mt-1 font-medium">{b.customer_name}</h3>
                      <p className="text-xs text-text-secondary">
                        {b.booking_type === 'vuelo' ? 'Vuelo' : b.booking_type === 'hotel' ? 'Hotel' : b.booking_type === 'paquete' ? 'Paquete Turistico' : b.booking_type}
                        {b.start_date && ` — ${b.start_date}${b.end_date ? ` al ${b.end_date}` : ''}`}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-amber">S/ {Number(b.total_amount).toFixed(2)}</p>
                      <p className="text-xs text-text-secondary">
                        {b.payment_status === 'pagado' ? 'Pagado' : b.payment_status === 'parcial' ? `Pagado S/ ${Number(b.paid_amount).toFixed(2)}` : 'Pendiente'}
                      </p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Past bookings */}
        {pastBookings.length > 0 && (
          <section>
            <h2 className="mb-4 text-lg font-bold">Historial</h2>
            <div className="space-y-3">
              {pastBookings.map(b => (
                <a
                  key={b.id}
                  href={`/mi-cuenta/reserva/${b.id}`}
                  className="block cursor-pointer rounded-2xl border border-border-light bg-bg-card/50 p-5 transition-colors hover:border-border-light/50"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-text-muted">{b.booking_reference}</span>
                        <span className={`rounded-full px-2 py-0.5 text-xs ${statusColors[b.status] || ''}`}>{b.status}</span>
                      </div>
                      <p className="mt-1 text-sm text-text-secondary">{b.booking_type} — {b.start_date || ''}</p>
                    </div>
                    <p className="font-medium text-text-secondary">S/ {Number(b.total_amount).toFixed(2)}</p>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Empty state */}
        {bookings.length === 0 && !loading && (
          <div className="rounded-2xl border border-border-light bg-bg-card p-12 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber/10">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-medium">Sin reservas aun</h3>
            <p className="text-sm text-text-secondary">Cuando reserves un viaje con BG Travel, aparecera aqui.</p>
            <a href="/experiencias" className="mt-4 inline-block rounded-xl bg-amber px-6 py-2.5 text-sm font-semibold text-bg-navy">
              Ver Experiencias
            </a>
          </div>
        )}

        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-amber/30 border-t-amber" />
          </div>
        )}
      </main>
    </div>
  );
}

