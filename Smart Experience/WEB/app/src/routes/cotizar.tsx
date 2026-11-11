import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { getExperiences } from "../lib/api/experiences.functions";
import { createQuote } from "../lib/api/quotes.functions";
import { useEffect } from "react";

// @ts-ignore
export const Route = createFileRoute("/cotizar")({
  component: CotizarPage,
  head: () => ({ meta: [{ title: "Cotizar — BG Travel Peru" }] }),
});

type Step = "destino" | "detalles" | "servicios" | "contacto" | "confirmar";

const SERVICES = [
  { id: "hotel", label: "Hotel / Alojamiento", icon: "🏨" },
  { id: "vuelo", label: "Vuelo nacional", icon: "✈️" },
  { id: "transporte", label: "Transporte local", icon: "🚐" },
  { id: "guia", label: "Guia bilingue", icon: "👤" },
  { id: "comidas", label: "Comidas incluidas", icon: "🍽️" },
  { id: "seguro", label: "Seguro de viaje", icon: "🛡️" },
];

function CotizarPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("destino");
  const [experiences, setExperiences] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  const [form, setForm] = useState({
    destino: "",
    experiencia: "",
    start_date: "",
    end_date: "",
    pax: 1,
    services: [] as string[],
    name: "",
    email: "",
    phone: "",
    notes: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    getExperiences().then((r: any) => {
      if (r.ok) setExperiences(r.data || []);
      setLoading(false);
    });
  }, []);

  const validate = (s: Step): boolean => {
    const e: Record<string, string> = {};
    if (s === "destino" && !form.destino) e.destino = "Selecciona un destino";
    if (s === "detalles") {
      if (!form.start_date) e.start_date = "Indica la fecha de inicio";
      if (form.pax < 1) e.pax = "Minimo 1 pasajero";
    }
    if (s === "contacto") {
      if (!form.name.trim()) e.name = "Ingresa tu nombre";
      if (!form.phone.trim()) e.phone = "Ingresa tu WhatsApp";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = (s: Step) => {
    if (validate(step)) setStep(s);
  };

  const handleSubmit = async () => {
    setSending(true);
    try {
      const msg = `*Cotizacion BG Travel*\n\nDestino: ${form.destino}\nExperiencia: ${form.experiencia || 'Personalizada'}\nFechas: ${form.start_date} → ${form.end_date || 'Por definir'}\nPasajeros: ${form.pax}\nServicios: ${form.services.length > 0 ? form.services.join(', ') : 'Basico'}\n\n${form.notes ? `Notas: ${form.notes}` : ''}`;

      await createQuote({ data: { name: form.name, destination: form.destino, whatsapp: form.phone, message: msg } });

      // Redirect to WhatsApp with the message
      const waMsg = encodeURIComponent(`Hola BG Travel! Quiero cotizar:\n\n*Destino:* ${form.destino}\n*Experiencia:* ${form.experiencia || 'Personalizada'}\n*Fechas:* ${form.start_date} → ${form.end_date || 'Por definir'}\n*Pasajeros:* ${form.pax}\n*Servicios:* ${form.services.length > 0 ? form.services.join(', ') : 'Basico'}\n\n${form.notes ? `*Notas:* ${form.notes}` : ''}\n\n*Nombre:* ${form.name}\n*WhatsApp:* ${form.phone}`);
      window.open(`https://wa.me/51994118084?text=${waMsg}`, "_blank");
      setStep("confirmar");
    } catch {}
    setSending(false);
  };

  const toggleService = (id: string) => {
    setForm(prev => ({
      ...prev,
      services: prev.services.includes(id) ? prev.services.filter(s => s !== id) : [...prev.services, id],
    }));
  };

  if (loading) return <div className="flex min-h-dvh items-center justify-center bg-bg-navy pt-16"><div className="h-6 w-6 animate-spin rounded-full border-2 border-amber/30 border-t-amber" /></div>;

  const steps = [
    { id: "destino" as Step, label: "Destino", icon: "📍" },
    { id: "detalles" as Step, label: "Fechas", icon: "📅" },
    { id: "servicios" as Step, label: "Servicios", icon: "🎯" },
    { id: "contacto" as Step, label: "Contacto", icon: "📞" },
  ];
  const currentIdx = steps.findIndex(s => s.id === step);

  const renderDestino = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold mb-2">¿A donde quieres viajar?</h3>
        <p className="text-sm text-text-secondary mb-4">Selecciona tu destino o experiencia de interes</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {experiences.map((exp: any) => (
          <button
            key={exp.id}
            onClick={() => { setForm({ ...form, destino: exp.name, experiencia: exp.name }); next("detalles"); }}
            className={`text-left rounded-xl border p-4 transition-all hover:border-amber/50 ${
              form.destino === exp.name ? "border-amber bg-amber/5" : "border-border-light bg-bg-card"
            }`}
          >
            <p className="font-medium">{exp.name}</p>
            <p className="text-xs text-text-muted mt-1">{exp.subtitle}</p>
            <p className="text-xs text-amber mt-1">{exp.price}</p>
          </button>
        ))}
        <button
          onClick={() => { setForm({ ...form, destino: "Personalizado", experiencia: "" }); next("detalles"); }}
          className="rounded-xl border border-dashed border-border-light bg-bg-card/50 p-4 text-left transition-all hover:border-amber/50"
        >
          <p className="font-medium">Otro destino</p>
          <p className="text-xs text-text-muted mt-1">Personaliza tu viaje</p>
        </button>
      </div>
      {errors.destino && <p className="text-sm text-red-400">{errors.destino}</p>}
    </div>
  );

  const renderDetalles = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-bold">Detalles del viaje</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1">Fecha de inicio</label>
          <input type="date" value={form.start_date} onChange={e => setForm({ ...form, start_date: e.target.value })} className="w-full rounded-lg border border-border-light bg-bg-card px-4 py-2.5" />
          {errors.start_date && <p className="text-xs text-red-400 mt-1">{errors.start_date}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1">Fecha de fin (opcional)</label>
          <input type="date" value={form.end_date} onChange={e => setForm({ ...form, end_date: e.target.value })} className="w-full rounded-lg border border-border-light bg-bg-card px-4 py-2.5" />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1">Numero de pasajeros</label>
          <div className="flex items-center gap-3">
            <button onClick={() => setForm({ ...form, pax: Math.max(1, form.pax - 1) })} className="flex h-10 w-10 items-center justify-center rounded-lg border border-border-light hover:border-amber/30">-</button>
            <span className="w-10 text-center text-lg font-bold">{form.pax}</span>
            <button onClick={() => setForm({ ...form, pax: form.pax + 1 })} className="flex h-10 w-10 items-center justify-center rounded-lg border border-border-light hover:border-amber/30">+</button>
          </div>
          {errors.pax && <p className="text-xs text-red-400 mt-1">{errors.pax}</p>}
        </div>
        <div className="flex items-end">
          <p className="text-xs text-text-muted">{form.pax === 1 ? '1 pasajero' : `${form.pax} pasajeros`}</p>
        </div>
      </div>
    </div>
  );

  const renderServicios = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-bold">Servicios adicionales</h3>
      <p className="text-sm text-text-secondary">Selecciona los servicios que te gustaria incluir en tu paquete</p>
      <div className="grid gap-3 sm:grid-cols-2">
        {SERVICES.map(s => (
          <button
            key={s.id}
            onClick={() => toggleService(s.id)}
            className={`flex items-center gap-3 rounded-xl border p-4 transition-all ${
              form.services.includes(s.id) ? "border-amber bg-amber/5" : "border-border-light bg-bg-card hover:border-amber/30"
            }`}
          >
            <span className="text-xl">{s.icon}</span>
            <span className="text-sm font-medium">{s.label}</span>
            {form.services.includes(s.id) && (
              <svg className="ml-auto h-5 w-5 text-amber" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>
        ))}
      </div>
      <p className="text-xs text-text-muted">{form.services.length > 0 ? `${form.services.length} servicios seleccionados` : "Ningun servicio adicional"}</p>
    </div>
  );

  const renderContacto = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-bold">Tus datos de contacto</h3>
      <p className="text-sm text-text-secondary">Te enviaremos la cotizacion por WhatsApp en menos de 24 horas</p>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1">Nombre completo</label>
          <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Como te llamas?" className="w-full rounded-lg border border-border-light bg-bg-card px-4 py-2.5" />
          {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1">WhatsApp</label>
          <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+51 999 888 777" className="w-full rounded-lg border border-border-light bg-bg-card px-4 py-2.5" />
          {errors.phone && <p className="text-xs text-red-400 mt-1">{errors.phone}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1">Email (opcional)</label>
          <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="correo@ejemplo.com" className="w-full rounded-lg border border-border-light bg-bg-card px-4 py-2.5" />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1">Notas o requerimientos especiales</label>
          <textarea value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} rows={3} placeholder="Alguna preferencia o requisito especial?" className="w-full rounded-lg border border-border-light bg-bg-card px-4 py-2.5" />
        </div>
      </div>
    </div>
  );

  const renderConfirmar = () => (
    <div className="text-center py-8">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
        <svg className="h-8 w-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h3 className="text-xl font-bold mb-2">?Cotizacion enviada!</h3>
      <p className="text-sm text-text-secondary mb-6">Te hemos redirigido a WhatsApp para continuar con tu cotizacion. Te responderemos en menos de 24 horas.</p>
      <div className="flex flex-wrap justify-center gap-3">
        <a href="https://wa.me/51994118084" target="_blank" rel="noopener noreferrer" className="rounded-xl bg-green-600 px-6 py-3 text-sm font-semibold text-white hover:bg-green-500">
          Ir a WhatsApp
        </a>
        <a href="/experiencias" className="rounded-xl border border-border-light px-6 py-3 text-sm font-medium text-text-secondary hover:text-amber">
          Seguir viendo experiencias
        </a>
        <button onClick={() => { setStep("destino"); setForm({ destino: "", experiencia: "", start_date: "", end_date: "", pax: 1, services: [], name: "", email: "", phone: "", notes: "" }); }} className="rounded-xl border border-border-light px-6 py-3 text-sm font-medium text-text-secondary hover:text-amber">
          Nueva cotizacion
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-dvh bg-bg-navy pt-24">
      <div className="mx-auto max-w-2xl px-4 pb-16">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Cotiza tu viaje</h1>
          <p className="mt-2 text-text-secondary">Completa los pasos y te enviaremos una cotizacion personalizada</p>
        </div>

        {/* Progress bar */}
        {step !== "confirmar" && (
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {steps.map((s, i) => (
                <div key={s.id} className="flex flex-col items-center">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-all ${
                    i <= currentIdx ? "bg-amber text-bg-navy" : "bg-bg-surface text-text-muted"
                  }`}>
                    {s.icon}
                  </div>
                  <p className={`mt-1 text-xs ${i <= currentIdx ? "text-amber" : "text-text-muted"}`}>{s.label}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 h-1.5 rounded-full bg-bg-surface overflow-hidden">
              <div className="h-full rounded-full bg-amber transition-all duration-300" style={{ width: `${((currentIdx + 1) / steps.length) * 100}%` }} />
            </div>
          </div>
        )}

        {/* Content */}
        {step === "destino" && (
          <div className="rounded-2xl border border-border-light bg-bg-card p-6">
            {renderDestino()}
          </div>
        )}
        {step === "detalles" && (
          <div className="rounded-2xl border border-border-light bg-bg-card p-6">
            {renderDetalles()}
            <div className="mt-6 flex justify-between">
              <button onClick={() => setStep("destino")} className="rounded-lg border border-border-light px-4 py-2 text-sm">Atras</button>
              <button onClick={() => next("servicios")} className="rounded-lg bg-amber px-6 py-2 text-sm font-semibold text-bg-navy">Continuar</button>
            </div>
          </div>
        )}
        {step === "servicios" && (
          <div className="rounded-2xl border border-border-light bg-bg-card p-6">
            {renderServicios()}
            <div className="mt-6 flex justify-between">
              <button onClick={() => setStep("detalles")} className="rounded-lg border border-border-light px-4 py-2 text-sm">Atras</button>
              <button onClick={() => next("contacto")} className="rounded-lg bg-amber px-6 py-2 text-sm font-semibold text-bg-navy">Continuar</button>
            </div>
          </div>
        )}
        {step === "contacto" && (
          <div className="rounded-2xl border border-border-light bg-bg-card p-6">
            {renderContacto()}
            <div className="mt-6 flex justify-between">
              <button onClick={() => setStep("servicios")} className="rounded-lg border border-border-light px-4 py-2 text-sm">Atras</button>
              <button onClick={handleSubmit} disabled={sending} className="rounded-lg bg-amber px-6 py-2 text-sm font-semibold text-bg-navy disabled:opacity-50">
                {sending ? "Enviando..." : "Enviar y cotizar por WhatsApp"}
              </button>
            </div>
          </div>
        )}
        {step === "confirmar" && renderConfirmar()}
      </div>
    </div>
  );
}