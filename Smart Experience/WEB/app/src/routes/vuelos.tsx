import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { searchFlights, getAirports } from "../lib/api/flights.functions";

// @ts-ignore
export const Route = createFileRoute("/vuelos")({
  component: FlightsPage,
  head: () => ({ meta: [{ title: "Vuelos — BG Travel Peru" }] }),
});

const AIRLINES_MAP: Record<string, string> = {
  "Sky Airline": "H8", "JetSMART": "JA", "LATAM": "LA",
  "Star Peru": "2I", "Air Europa": "UX", "Iberia": "IB",
  "American Airlines": "AA", "Delta": "DL",
};

function FlightsPage() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [flights, setFlights] = useState<any[]>([]);
  const [airports, setAirports] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState<any>(null);
  const [pax, setPax] = useState(1);
  const [bookingDone, setBookingDone] = useState(false);
  const [pnr, setPnr] = useState("");

  useEffect(() => {
    getAirports().then((r: any) => {
      if (r.ok) setAirports(r.airports);
    });
  }, []);

  const swapOrigDest = () => {
    const tmp = origin; setOrigin(destination); setDestination(tmp);
  };

  const handleSearch = async () => {
    if (!origin || !destination) return;
    setLoading(true);
    setSearched(true);
    setSelectedFlight(null);
    setBookingDone(false);
    const r = await searchFlights({ data: { origin, destination, date } }) as any;
    if (r.ok) setFlights(r.flights);
    else setFlights([]);
    setLoading(false);
  };

  const handleBook = async (flight: any) => {
    setSelectedFlight(flight);
    // Simulate booking
    const pnrGen = 'BG' + Math.random().toString(36).substring(2, 7).toUpperCase();
    setPnr(pnrGen);
    setBookingDone(true);
  };

  const formatTime = (t: string) => t?.slice(0, 5) || '';
  const formatPrice = (n: number) => `S/ ${n.toFixed(2)}`;

  return (
    <div className="min-h-dvh bg-bg-navy">
      {/* Demo banner */}
      <div className="bg-amber/10 border-b border-amber/20 px-4 py-2 text-center">
        <p className="text-xs text-amber">
          Modo demostracion — Datos de vuelos obtenidos de Google Flights (Agosto 2026).
          <span className="hidden sm:inline"> Integracion en tiempo real via Amadeus AQC proximamente.</span>
        </p>
      </div>

      <div className="mx-auto max-w-5xl px-4 pt-8 pb-16">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Vuelos en Peru</h1>
          <p className="mt-2 text-text-secondary">Busca y compara vuelos nacionales e internacionales</p>
        </div>

        {/* Search form */}
        <div className="mb-8 rounded-2xl border border-border-light bg-bg-card p-4 sm:p-6">
          <div className="flex flex-wrap items-end gap-3">
            <div className="flex-1 min-w-[140px]">
              <label className="block text-xs font-medium text-text-secondary mb-1">Origen</label>
              <select value={origin} onChange={e => setOrigin(e.target.value)} className="w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2.5 text-sm">
                <option value="">Seleccionar</option>
                {airports.map(a => <option key={a.code} value={a.code}>{a.city} ({a.code})</option>)}
              </select>
            </div>
            <button onClick={swapOrigDest} className="flex h-10 w-10 items-center justify-center rounded-lg border border-border-light hover:border-amber/30 mb-0.5">
              <svg className="h-4 w-4 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
            </button>
            <div className="flex-1 min-w-[140px]">
              <label className="block text-xs font-medium text-text-secondary mb-1">Destino</label>
              <select value={destination} onChange={e => setDestination(e.target.value)} className="w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2.5 text-sm">
                <option value="">Seleccionar</option>
                {airports.map(a => <option key={a.code} value={a.code}>{a.city} ({a.code})</option>)}
              </select>
            </div>
            <div className="w-[140px]">
              <label className="block text-xs font-medium text-text-secondary mb-1">Fecha</label>
              <input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2.5 text-sm" />
            </div>
            <div className="w-[100px]">
              <label className="block text-xs font-medium text-text-secondary mb-1">Pasajeros</label>
              <div className="flex items-center gap-1">
                <button onClick={() => setPax(Math.max(1, pax - 1))} className="flex h-9 w-9 items-center justify-center rounded-lg border border-border-light text-sm">-</button>
                <span className="w-8 text-center text-sm font-bold">{pax}</span>
                <button onClick={() => setPax(pax + 1)} className="flex h-9 w-9 items-center justify-center rounded-lg border border-border-light text-sm">+</button>
              </div>
            </div>
            <button onClick={handleSearch} disabled={!origin || !destination} className="h-10 rounded-lg bg-amber px-6 text-sm font-semibold text-bg-navy disabled:opacity-50">
              {loading ? "Buscando..." : "Buscar"}
            </button>
          </div>
        </div>

        {/* Results */}
        {loading && (
          <div className="flex justify-center py-16">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-amber/30 border-t-amber" />
          </div>
        )}

        {!loading && searched && flights.length === 0 && (
          <div className="rounded-2xl border border-border-light bg-bg-card p-8 text-center">
            <p className="text-text-secondary">No se encontraron vuelos para esta ruta.</p>
            <p className="text-sm text-text-muted mt-1">Intent con otro origen o destino.</p>
          </div>
        )}

        {!loading && flights.length > 0 && (
          <div className="space-y-3">
            <p className="text-sm text-text-secondary">{flights.length} vuelos encontrados</p>
            {flights.map((f: any) => (
              <div key={f.id} className={`rounded-2xl border p-4 transition-all ${
                selectedFlight?.id === f.id ? "border-amber bg-amber/5" : "border-border-light bg-bg-card hover:border-amber/30"
              }`}>
                <div className="flex flex-wrap items-center justify-between gap-4">
                  {/* Airline + Flight number */}
                  <div className="flex items-center gap-3 min-w-[120px]">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber/10 text-sm font-bold text-amber">
                      {f.airline?.charAt(0) || '?'}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{f.airline}</p>
                      <p className="text-xs text-text-muted">{f.flight_number}</p>
                    </div>
                  </div>

                  {/* Origin -> Destination */}
                  <div className="flex items-center gap-3 text-center">
                    <div>
                      <p className="text-lg font-bold">{formatTime(f.departure_time)}</p>
                      <p className="text-xs text-text-muted">{f.origin_code}</p>
                    </div>
                    <div className="flex flex-col items-center px-2">
                      <span className="text-xs text-text-muted">{f.duration_minutes} min</span>
                      <div className="relative w-20">
                        <div className="h-px bg-border-light" />
                        <svg className="absolute -right-1 -top-1.5 h-3 w-3 text-amber" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-[10px] text-green-400">{f.stops === 0 ? 'Directo' : `${f.stops} escala${f.stops > 1 ? 's' : ''}`}</span>
                    </div>
                    <div>
                      <p className="text-lg font-bold">{formatTime(f.arrival_time)}</p>
                      <p className="text-xs text-text-muted">{f.destination_code}</p>
                    </div>
                  </div>

                  {/* Price + Book */}
                  <div className="text-right">
                    <p className="text-xl font-bold text-amber">{formatPrice(f.price_pen)}</p>
                    <p className="text-xs text-text-muted">USD {f.price_usd?.toFixed(0) || ''}</p>
                    {!bookingDone || selectedFlight?.id !== f.id ? (
                      <button onClick={() => handleBook(f)} className="mt-1 rounded-lg bg-amber px-4 py-1.5 text-xs font-semibold text-bg-navy hover:bg-amber/90">
                        Reservar
                      </button>
                    ) : null}
                  </div>
                </div>

                {/* Seats info */}
                <div className="mt-2 flex items-center gap-2 text-xs text-text-muted">
                  <span>{f.seats_available} asientos disponibles</span>
                  {f.seats_available < 10 && <span className="text-amber">— Ultimos asientos!</span>}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Booking confirmation */}
        {bookingDone && selectedFlight && (
          <div className="mt-6 rounded-2xl border border-green-500/30 bg-green-500/5 p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10">
                <svg className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg">Reserva simulada exitosa</h3>
                <p className="text-sm text-text-secondary mt-1">
                  Vuelo {selectedFlight.airline} {selectedFlight.flight_number} — {selectedFlight.origin_code} a {selectedFlight.destination_code}
                </p>
                <div className="mt-3 flex flex-wrap gap-4 text-sm">
                  <div><span className="text-text-muted">PNR:</span> <span className="font-bold text-amber">{pnr}</span></div>
                  <div><span className="text-text-muted">Pasajeros:</span> {pax}</div>
                  <div><span className="text-text-muted">Total:</span> <span className="font-bold">S/ {(selectedFlight.price_pen * pax).toFixed(2)}</span></div>
                </div>
                <div className="mt-4 flex gap-3">
                  <a href="https://wa.me/51994118084" target="_blank" className="rounded-lg bg-green-600 px-4 py-2 text-xs font-semibold text-white hover:bg-green-500">
                    Confirmar por WhatsApp
                  </a>
                  <button onClick={() => { setBookingDone(false); setSelectedFlight(null); }} className="rounded-lg border border-border-light px-4 py-2 text-xs text-text-secondary">
                    Nueva busqueda
                  </button>
                </div>
                <p className="text-xs text-text-muted mt-3 italic">
                  * Demo: Esta es una reserva simulada. La integracion real con Amadeus AQC permitira emision de e-tickets y pago en linea.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}