import { createFileRoute, useNavigate, useParams } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { getCustomerPortalBookingDetail, getCustomerPortalItinerary } from "../../lib/api/agency.functions";
import { getCustomerSession } from "../../lib/api/auth.functions";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

// @ts-ignore
export const Route = createFileRoute("/mi-cuenta/reserva/$id")({
  component: BookingDetailPage,
  head: () => ({ meta: [{ title: "Detalle de Reserva — BG Travel Peru" }] }),
});

function BookingDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams({ from: "/mi-cuenta/reserva/$id" as any });
  const [customer, setCustomer] = useState<any>(null);
  const [booking, setBooking] = useState<any>(null);
  const [items, setItems] = useState<any[]>([]);
  const [itineraries, setItineraries] = useState<any[]>([]);
  const [selectedItinerary, setSelectedItinerary] = useState<any>(null);
  const [itineraryActivities, setItineraryActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [downloading, setDownloading] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const token = localStorage.getItem("bg_customer_token");
    if (!token) { navigate({ to: "/login-cliente" as any }); return; }
    getCustomerSession({ data: token }).then((sr: any) => {
      if (!sr.ok) { navigate({ to: "/login-cliente" as any }); return; }
      setCustomer(sr.customer);
      getCustomerPortalBookingDetail({ data: { sessionToken: token, booking_id: parseInt(id) } }).then((r: any) => {
        if (!r.ok) { setError(r.error || "Error al cargar"); setLoading(false); return; }
        setBooking(r.booking);
        setItems(r.items || []);
        setItineraries(r.itineraries || []);
        setLoading(false);
      });
    });
  }, [id]);

  const loadItinerary = async (itId: number) => {
    const token = localStorage.getItem("bg_customer_token") || "";
    const r = await getCustomerPortalItinerary({ data: { sessionToken: token, id: itId } }) as any;
    if (r.ok) {
      setSelectedItinerary(r.itinerary);
      setItineraryActivities(r.activities || []);
    }
  };

  const handlePrint = () => window.print();

  const handleDownloadPDF = async () => {
    if (!printRef.current || !booking) return;
    setDownloading(true);

    try {
      const canvas = await html2canvas(printRef.current, {
        scale: 2,
        backgroundColor: "#ffffff",
        logging: false,
        useCORS: true,
        width: printRef.current.scrollWidth,
        height: printRef.current.scrollHeight,
        windowWidth: printRef.current.scrollWidth,
        windowHeight: printRef.current.scrollHeight,
      });

      const imgData = canvas.toDataURL("image/jpeg", 0.95);
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = 210;
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      let heightLeft = pdfHeight;
      let position = 0;
      const pageHeight = 297;

      pdf.addImage(imgData, "JPEG", 0, position, pdfWidth, pdfHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, "JPEG", 0, position, pdfWidth, pdfHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`itinerario-${booking.booking_reference || booking.id}.pdf`);
    } catch (err) {
      console.error("PDF error:", err);
      // fallback to print
      window.print();
    }
    setDownloading(false);
  };

  const statusColors: Record<string, string> = {
    pendiente: "bg-amber/10 text-amber", confirmada: "bg-green-500/10 text-green-400",
    en_curso: "bg-blue-500/10 text-blue-400", completada: "bg-gray-500/10 text-gray-400",
    cancelada: "bg-red-500/10 text-red-400",
  };
  const payColors: Record<string, string> = {
    pendiente: "bg-amber/10 text-amber", parcial: "bg-blue-500/10 text-blue-400",
    pagado: "bg-green-500/10 text-green-400",
  };

  const statusLabel: Record<string, string> = {
    pendiente: "Pendiente", confirmada: "Confirmada", en_curso: "En Curso", completada: "Completada", cancelada: "Cancelada",
  };
  const payLabel: Record<string, string> = {
    pendiente: "Pendiente", parcial: "Pago Parcial", pagado: "Pagado",
  };

  if (loading) return <div className="flex min-h-dvh items-center justify-center bg-bg-navy"><div className="h-6 w-6 animate-spin rounded-full border-2 border-amber/30 border-t-amber" /></div>;
  if (error) return <div className="flex min-h-dvh flex-col items-center justify-center bg-bg-navy gap-4"><p className="text-red-400">{error}</p><a href="/mi-cuenta" className="text-amber hover:underline">Volver a mi cuenta</a></div>;
  if (!booking) return null;

  return (
    <div className="min-h-dvh bg-white">
      {/* Top bar — hidden on print */}
      <header className="no-print border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <img src="/assets/logo-bg-travel.png" alt="BG Travel" className="h-7 w-auto" />
            <span className="text-sm font-bold text-gray-900">BG Travel Peru</span>
          </div>
          <div className="flex items-center gap-2">
            <a href="/mi-cuenta" className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-50">← Mis reservas</a>
            <button onClick={handleDownloadPDF} disabled={downloading} className="rounded-lg bg-amber px-4 py-1.5 text-xs font-semibold text-white hover:bg-amber/90 disabled:opacity-50">
              {downloading ? "Generando PDF..." : "Descargar PDF"}
            </button>
            <button onClick={handlePrint} className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-50">Imprimir</button>
          </div>
        </div>
      </header>

      {/* Print styles */}
      <style>{`
        @media print {
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; background: white !important; }
          .no-print { display: none !important; }
          @page { margin: 15mm; }
        }
      `}</style>

      {/* Document content */}
      <div className="mx-auto max-w-4xl px-6 py-8" ref={printRef}>
        {/* Document header */}
        <div className="mb-8 border-b-2 border-amber pb-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <img src="/assets/logo-bg-travel.png" alt="BG Travel" className="h-10 w-auto" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">BG Travel Peru</h1>
                <p className="text-sm text-gray-500">Smart Experience — Itinerario de Viaje</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">Emision: {new Date().toLocaleDateString("es-PE")}</p>
              <p className="text-lg font-bold text-amber">{booking.booking_reference}</p>
            </div>
          </div>
        </div>

        {/* Client info */}
        <div className="mb-6">
          <h2 className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-400">Datos del Cliente</h2>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
            <div><span className="text-gray-500">Nombre:</span> <span className="font-medium text-gray-900">{booking.customer_name}</span></div>
            {booking.customer_document && <div><span className="text-gray-500">Documento:</span> <span className="font-medium text-gray-900">{booking.customer_document}</span></div>}
            {booking.customer_email && <div><span className="text-gray-500">Email:</span> <span className="font-medium text-gray-900">{booking.customer_email}</span></div>}
            {booking.customer_phone && <div><span className="text-gray-500">Telefono:</span> <span className="font-medium text-gray-900">{booking.customer_phone}</span></div>}
          </div>
        </div>

        {/* Booking info */}
        <div className="mb-6">
          <h2 className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-400">Detalle de la Reserva</h2>
          <table className="w-full text-sm">
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="py-2 text-gray-500 w-40">Referencia</td>
                <td className="py-2 font-medium text-gray-900">{booking.booking_reference}</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-2 text-gray-500">Estado</td>
                <td className="py-2 font-medium">{statusLabel[booking.status] || booking.status}</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-2 text-gray-500">Tipo</td>
                <td className="py-2 font-medium capitalize text-gray-900">{booking.booking_type === 'paquete' ? 'Paquete Turistico' : booking.booking_type === 'vuelo' ? 'Vuelo' : booking.booking_type === 'hotel' ? 'Hotel' : booking.booking_type === 'combinado' ? 'Paquete Combinado' : booking.booking_type}</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-2 text-gray-500">Pasajeros</td>
                <td className="py-2 font-medium text-gray-900">{booking.pax_count} {booking.pax_count === 1 ? 'pasajero' : 'pasajeros'}</td>
              </tr>
              {booking.start_date && <tr className="border-b border-gray-100">
                <td className="py-2 text-gray-500">Fecha de inicio</td>
                <td className="py-2 font-medium text-gray-900">{new Date(booking.start_date).toLocaleDateString("es-PE")}</td>
              </tr>}
              {booking.end_date && <tr className="border-b border-gray-100">
                <td className="py-2 text-gray-500">Fecha de fin</td>
                <td className="py-2 font-medium text-gray-900">{new Date(booking.end_date).toLocaleDateString("es-PE")}</td>
              </tr>}
              {booking.notes && <tr className="border-b border-gray-100">
                <td className="py-2 text-gray-500">Notas</td>
                <td className="py-2 text-gray-700">{booking.notes}</td>
              </tr>}
            </tbody>
          </table>
        </div>

        {/* Services */}
        {items.length > 0 && (
          <div className="mb-6">
            <h2 className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-400">Servicios Incluidos</h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="py-2 text-left text-xs font-medium text-gray-500 w-8">#</th>
                  <th className="py-2 text-left text-xs font-medium text-gray-500">Servicio</th>
                  <th className="py-2 text-right text-xs font-medium text-gray-500">Importe</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, idx) => (
                  <tr key={item.id} className="border-b border-gray-100">
                    <td className="py-2 text-xs text-gray-400">{idx + 1}</td>
                    <td className="py-2">
                      <p className="font-medium text-gray-900">{item.description}</p>
                      {item.supplier_name && <p className="text-xs text-gray-500">{item.supplier_name}{item.date ? ` | ${item.date}` : ''}</p>}
                    </td>
                    <td className="py-2 text-right font-medium text-gray-900">S/ {Number(item.total_price || item.unit_price).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-gray-300">
                  <td colSpan={2} className="py-2 text-right font-bold text-gray-700">Total</td>
                  <td className="py-2 text-right font-bold text-lg text-amber">S/ {Number(booking.total_amount).toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}

        {/* Itineraries */}
        {itineraries.length > 0 && (
          <div className="mb-6">
            <h2 className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-400">Itinerarios de Viaje</h2>
            {itineraries.map(it => {
              // Load activities for each itinerary on print
              return (
                <div key={it.id} className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-bold text-gray-900">{it.name}</h3>
                    <p className="text-xs text-gray-500">{it.start_date} → {it.end_date}</p>
                  </div>
                  <p className="text-xs text-gray-500 mb-2">{it.destination || ''} {it.description ? `| ${it.description}` : ''}</p>
                </div>
              );
            })}
          </div>
        )}

        {/* Payment info */}
        <div className="mb-6">
          <h2 className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-400">Informacion de Pago</h2>
          <table className="w-full text-sm">
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="py-2 text-gray-500 w-40">Estado de pago</td>
                <td className="py-2 font-medium">{payLabel[booking.payment_status] || booking.payment_status}</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-2 text-gray-500">Metodo de pago</td>
                <td className="py-2 font-medium capitalize text-gray-900">{booking.payment_method || 'No registrado'}</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-2 text-gray-500">Total</td>
                <td className="py-2 font-bold text-lg text-gray-900">S/ {Number(booking.total_amount).toFixed(2)}</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-2 text-gray-500">Pagado</td>
                <td className="py-2 font-bold text-green-700">S/ {Number(booking.paid_amount).toFixed(2)}</td>
              </tr>
              {Number(booking.total_amount) - Number(booking.paid_amount) > 0 && (
                <tr className="border-b border-gray-100">
                  <td className="py-2 text-gray-500">Saldo pendiente</td>
                  <td className="py-2 font-bold text-amber-700">S/ {(Number(booking.total_amount) - Number(booking.paid_amount)).toFixed(2)}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="border-t-2 border-gray-200 pt-6 mt-8">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <div className="flex items-center gap-4">
              <span>BG Travel Peru EIRL</span>
              <span>La Molina, Lima</span>
              <span>RUC: Pendiente</span>
            </div>
            <div className="flex items-center gap-4">
              <span>WhatsApp: +51 994 118 084</span>
              <span>info@bgtravel.pe</span>
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp contact — hidden on print */}
      <div className="no-print mx-auto max-w-4xl px-6 pb-8">
        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
          <h2 className="mb-4 text-sm font-bold text-gray-900">¿Necesitas ayuda?</h2>
          <div className="flex flex-wrap gap-3">
            <a href="https://wa.me/51994118084" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-xl bg-green-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-500">
              WhatsApp +51 994 118 084
            </a>
            <a href="/mi-cuenta" className="flex items-center gap-2 rounded-xl border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100">
              Volver a mi cuenta
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
