import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { searchHotels, getHotelCities } from "../lib/api/hotels.functions";

// @ts-ignore
export const Route = createFileRoute("/hoteles")({
  component: HotelsPage,
  head: () => ({ meta: [{ title: "Hoteles — BG Travel Peru" }] }),
});

const SERVICE_LABELS: Record<string, string> = {
  wifi: "WiFi", desayuno: "Desayuno", restaurante: "Restaurante", piscina: "Piscina",
  gimnasio: "Gimnasio", bar: "Bar", spa: "Spa", estacionamiento: "Estacionamiento",
  lavanderia: "Lavanderia", "tour-desk": "Tour Desk", "room-service": "Room Service",
  calefaccion: "Calefaccion", "agua-caliente": "Agua Caliente", jardin: "Jardin",
  deportes: "Deportes",
};

function HotelsPage() {
  const [city, setCity] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [hotels, setHotels] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState<any>(null);
  const [bookingDone, setBookingDone] = useState(false);
  const [pnr, setPnr] = useState("");
  const [bookingTotal, setBookingTotal] = useState(0);
  const [bookingNights, setBookingNights] = useState(0);

  useEffect(() => {
    getHotelCities().then((r: any) => {
      if (r.ok) setCities(r.cities);
    });
  }, []);

  const handleSearch = async () => {
    if (!city) return;
    setLoading(true);
    setSearched(true);
    setSelectedHotel(null);
    setBookingDone(false);
    const r = await searchHotels({ data: { city, guests } }) as any;
    if (r.ok) setHotels(r.hotels);
    else setHotels([]);
    setLoading(false);
  };

  const handleBook = (hotel: any) => {
    setSelectedHotel(hotel);
    const nights = checkIn && checkOut ? Math.max(1, Math.round((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000)) : 1;
    const total = hotel.price_pen * nights * guests;
    const pnrGen = 'BG' + Math.random().toString(36).substring(2, 7).toUpperCase();
    setPnr(pnrGen);
    setBookingTotal(total);
    setBookingNights(nights);
    setBookingDone(true);
  };

  const cityName = cities.find(c => c.code === city.toUpperCase().slice(0, 3))?.city || city;

  const stars = (n: number) => "★".repeat(n) + "☆".repeat(5 - n);

  return (
    <div className="min-h-dvh bg-bg-navy">
      {/* Demo banner */}
      <div className="bg-amber/10 border-b border-amber/20 px-4 py-2 text-center">
        <p className="text-xs text-amber">
          Modo demostracion — Datos de hoteles reales en Peru. Reserva simulada con redireccion a WhatsApp.
        </p>
      </div>

      <div className="mx-auto max-w-5xl px-4 pt-8 pb-16">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Hoteles en Peru</h1>
          <p className="mt-2 text-text-secondary">Encuentra el alojamiento perfecto para tu viaje</p>
        </div>

        {/* Search form */}
        <div className="mb-8 rounded-2xl border border-border-light bg-bg-card p-4 sm:p-6">
          <div className="flex flex-wrap items-end gap-3">
            <div className="flex-1 min-w-[160px]">
              <label className="block text-xs font-medium text-text-secondary mb-1">Ciudad</label>
              <select value={city} onChange={e => setCity(e.target.value)} className="w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2.5 text-sm">
                <option value="">Seleccionar ciudad</option>
                {cities.map(c => <option key={c.code} value={c.code}>{c.city}</option>)}
              </select>
            </div>
            <div className="w-[150px]">
              <label className="block text-xs font-medium text-text-secondary mb-1">Check-in</label>
              <input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)} className="w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2.5 text-sm" />
            </div>
            <div className="w-[150px]">
              <label className="block text-xs font-medium text-text-secondary mb-1">Check-out</label>
              <input type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)} className="w-full rounded-lg border border-border-light bg-bg-navy px-3 py-2.5 text-sm" />
            </div>
            <div className="w-[120px]">
              <label className="block text-xs font-medium text-text-secondary mb-1">Huespedes</label>
              <div className="flex items-center gap-1">
                <button onClick={() => setGuests(Math.max(1, guests - 1))} className="flex h-9 w-9 items-center justify-center rounded-lg border border-border-light text-sm">-</button>
                <span className="w-8 text-center text-sm font-bold">{guests}</span>
                <button onClick={() => setGuests(guests + 1)} className="flex h-9 w-9 items-center justify-center rounded-lg border border-border-light text-sm">+</button>
              </div>
            </div>
            <button onClick={handleSearch} disabled={!city} className="h-10 rounded-lg bg-amber px-6 text-sm font-semibold text-bg-navy disabled:opacity-50">
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

        {!loading && searched && hotels.length === 0 && (
          <div className="rounded-2xl border border-border-light bg-bg-card p-8 text-center">
            <p className="text-text-secondary">No se encontraron hoteles en {cityName}.</p>
            <p className="text-sm text-text-muted mt-1">Prueba con otra ciudad o fecha.</p>
          </div>
        )}

        {!loading && hotels.length > 0 && (
          <div className="space-y-4">
            <p className="text-sm text-text-secondary">{hotels.length} hoteles en {cityName}</p>
            {hotels.map((h: any) => (
              <div key={h.id} className={`rounded-2xl border overflow-hidden transition-all ${
                selectedHotel?.id === h.id ? "border-amber" : "border-border-light bg-bg-card hover:border-amber/30"
              }`}>
                <div className="flex flex-col sm:flex-row">
                  {/* Image */}
                  <div className="sm:w-56 h-44 sm:h-auto overflow-hidden bg-bg-surface">
                    <img
                      src={h.image}
                      alt={h.name}
                      className="h-full w-full object-cover"
                      loading="lazy"
                      onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600"; }}
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 p-4 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-base font-bold">{h.name}</h3>
                          <p className="text-xs text-amber">{stars(h.stars)}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-amber">S/ {h.price_pen}</p>
                          <p className="text-xs text-text-muted">por noche</p>
                        </div>
                      </div>
                      <p className="text-xs text-text-secondary mt-2 line-clamp-2">{h.description}</p>

                      {/* Services */}
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {(h.services || []).map((s: string) => (
                          <span key={s} className="rounded-full bg-bg-surface border border-border-light px-2.5 py-0.5 text-[10px] text-text-secondary">
                            {SERVICE_LABELS[s] || s}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-border-light">
                      <div className="flex items-center gap-2 text-xs text-text-muted">
                        <span className="text-amber text-sm">{h.rating}</span>
                        <span>|</span>
                        <span>{h.rooms} hab.</span>
                      </div>
                      {!bookingDone || selectedHotel?.id !== h.id ? (
                        <button onClick={() => handleBook(h)} className="rounded-lg bg-amber px-4 py-1.5 text-xs font-semibold text-bg-navy hover:bg-amber/90">
                          Reservar
                        </button>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Booking confirmation */}
        {bookingDone && selectedHotel && (
          <div className="mt-6 rounded-2xl border border-green-500/30 bg-green-500/5 p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-500/10">
                <svg className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg">Reserva simulada exitosa</h3>
                <p className="text-sm text-text-secondary mt-1">{selectedHotel.name} — {cityName}</p>
                <div className="mt-3 flex flex-wrap gap-4 text-sm">
                  <div><span className="text-text-muted">PNR:</span> <span className="font-bold text-amber">{pnr}</span></div>
                  <div><span className="text-text-muted">Huespedes:</span> {guests}</div>
                  <div><span className="text-text-muted">Noches:</span> {bookingNights}</div>
                  <div><span className="text-text-muted">Total:</span> <span className="font-bold">S/ {bookingTotal.toFixed(2)}</span></div>
                </div>
                {checkIn && <p className="text-xs text-text-muted mt-1">Check-in: {checkIn} | Check-out: {checkOut || "Por definir"}</p>}
                <div className="mt-4 flex gap-3">
                  <a href={`https://wa.me/51994118084?text=${encodeURIComponent(
                    `Hola BG Travel! Quiero reservar:\n\n*Hotel:* ${selectedHotel.name}\n*Ciudad:* ${cityName}\n*Check-in:* ${checkIn || 'Por definir'}\n*Check-out:* ${checkOut || 'Por definir'}\n*Huespedes:* ${guests}\n*Noches:* ${bookingNights}\n*Total:* S/ ${bookingTotal.toFixed(2)}\n*PNR:* ${pnr}`
                  )}`} target="_blank" className="rounded-lg bg-green-600 px-4 py-2 text-xs font-semibold text-white hover:bg-green-500">
                    Confirmar por WhatsApp
                  </a>
                  <button onClick={() => { setBookingDone(false); setSelectedHotel(null); }} className="rounded-lg border border-border-light px-4 py-2 text-xs text-text-secondary">
                    Nueva busqueda
                  </button>
                </div>
                <p className="text-xs text-text-muted mt-3 italic">
                  * Demo: Reserva simulada. La integracion real mostrara disponibilidad en vivo y pago en linea.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}