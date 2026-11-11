import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef, type JSX } from "react";
import { MotionProvider } from "../components/motion";
import { Navbar } from "../components/Navbar";
import { createQuote } from "../lib/api/quotes.functions";
import { StructuredData } from "../components/StructuredData";

export const Route = createFileRoute("/")({
  component: Index,
head: () => ({
    meta: [
      { title: "BG Travel Peru — Smart Experience" },
      { name: "description", content: "Descubre Peru con BG Travel. Experiencias turisticas culturales, comerciales y de aventura. Vuelos, hoteles, paquetes y asistencia personalizada." },
      { property: "og:title", content: "BG Travel Peru — Smart Experience" },
      { property: "og:description", content: "Viajes inteligentes por Peru. Experiencias unicas, vuelos, hoteles y atencion personalizada." },
      { property: "og:url", content: "https://bgtravel.pe" },
    ],
    links: [
      { rel: "canonical", href: "https://bgtravel.pe" },
    ],
  }),
});

// ── Utility components ──────────────────────────────────────────────

function FadeInOnScroll({ children, delay = 0 }: { children: JSX.Element; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ animationDelay: `${delay}ms` }} className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
      {children}
    </div>
  );
}

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const step = Math.ceil(value / 40);
          const interval = setInterval(() => {
            start += step;
            if (start >= value) { setDisplay(value); clearInterval(interval); }
            else setDisplay(start);
          }, 30);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);
  return <span ref={ref}>{display}{suffix}</span>;
}

// ── WhatsApp Floating Button ──────────────────────────────────────

function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/51994118084?text=Hola!%20Quiero%20cotizar%20una%20experiencia"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-[0_0_30px_rgba(37,211,102,0.4)]"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="h-7 w-7">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </a>
  );
}

// ── Section 1: Hero ─────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="relative min-h-dvh overflow-hidden" data-hero-section>
      {/* Layer 1: Background */}
      <div className="absolute inset-0" data-hero-bg>
        <img
          src="/assets/hero-viajero-machupicchu.png"
          alt="Viajero en Machu Picchu"
          className="h-full w-full object-cover"
          style={{ transform: "translateZ(0)" }}
          fetchPriority="high"
          width={1537}
          height={1023}
        />
        <div className="absolute inset-0 bg-bg-navy/30 md:bg-gradient-to-r md:from-bg-navy/60 md:via-bg-navy/30 md:to-bg-navy/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-navy/90 via-bg-navy/30 to-transparent" />
      </div>

      {/* Layer 2: Mist overlay */}
      <div className="absolute inset-0 opacity-15 mix-blend-screen">
        <img src="/assets/mist-overlay.png" alt="" className="h-full w-full object-cover" aria-hidden="true" loading="lazy" decoding="async" />
      </div>

      {/* Layer 3: Textile pattern accent */}
      <div className="absolute right-0 top-0 h-64 w-64 opacity-5 md:h-96 md:w-96">
        <img src="/assets/textile-pattern.png" alt="" className="h-full w-full object-cover" aria-hidden="true" loading="lazy" decoding="async" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-dvh items-end pt-24 pb-20 md:items-center md:pt-0 md:pb-0">
        <div className="section-padding w-full">
          <div className="max-w-content">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber/30 bg-amber/10 px-4 py-1.5 text-sm text-amber">
                <span className="h-2 w-2 rounded-full bg-amber" />
                Turismo Cultural y Comercial
              </div>
              <h1 className="mt-6 text-4xl font-black leading-none tracking-tighter md:text-7xl">
                Vive el Peru que{" "}
                <span className="text-amber">no te cuentan</span>
              </h1>
              <p className="mt-4 max-w-lg text-lg leading-relaxed text-text-secondary md:text-xl" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.8)" }}>
                Experiencias turisticas culturales, comerciales y personalizadas con IA.
                Conectamos viajeros con la identidad peruana.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a href="/experiencias"
                  className="inline-flex items-center gap-2 rounded-xl bg-amber px-6 py-3 font-semibold text-bg-navy transition-all duration-300 hover:bg-amber-light hover:shadow-[0_0_30px_rgba(217,119,6,0.4)]"
                >
                  Ver experiencias
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                    <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                  </svg>
                </a>
                <a
                  href="https://wa.me/51994118084?text=Hola!%20Quiero%20cotizar%20una%20experiencia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-text-secondary/40 px-6 py-3 font-medium text-text-primary transition-all duration-300 hover:border-amber hover:text-amber"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Cotizar por WhatsApp
                </a>
              </div>

              {/* Trust metrics */}
              <div className="mt-10 flex flex-wrap gap-6 border-t border-white/10 pt-6">
                {[
                  { label: "Destinos", value: "20+", desc: "en todo el Peru" },
                  { label: "Clientes satisfechos", value: "500+", desc: "viajeros" },
                  { label: "Anos de experiencia", value: "8+", desc: "en turismo" },
                ].map((m) => (
                  <div key={m.label} className="flex flex-col">
                    <span className="text-display text-2xl font-bold text-amber">{m.value}</span>
                    <span className="text-sm text-text-muted">{m.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Scroll hint */}
      <button
        onClick={(e) => {
          e.preventDefault();
          const el = document.querySelector("#value-prop");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce cursor-pointer"
        aria-label="Scroll hacia abajo"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-6 w-6 text-text-muted">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </button>
    </section>
  );
}

// ── Section 2: Value Proposition ────────────────────────────────────

const features = [
  {
    title: "Asistente con IA",
    desc: "Chatbot inteligente que orienta al viajero segun su perfil, presupuesto, intereses y preferencias de viaje.",
    icon: "🤖",
    accent: "amber",
  },
  {
    title: "Experiencias Personalizadas",
    desc: "Paquetes turisticos unicos que integran cultura, gastronomia, textiles y comercio peruano.",
    icon: "🎯",
    accent: "amber",
  },
  {
    title: "Turismo + Comercio Gamarra",
    desc: "La unica agencia que conecta viajeros con el corazon comercial mas grande de Latinoamerica.",
    icon: "🛍️",
    accent: "amber",
  },
];

function ValueProposition() {
  return (
    <section id="value-prop" className="section-padding bg-bg-surface">
      <div className="max-w-content">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <FadeInOnScroll>
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-amber/20 bg-amber/5 px-4 py-1.5 text-sm text-amber">
                Smart Experience
              </span>
              <h2 className="mt-4 text-display text-4xl font-bold leading-tight md:text-5xl">
                Mas que una agencia,<br />una <span className="text-amber">experiencia inteligente</span>
              </h2>
              <p className="mt-4 text-lg text-text-secondary">
                Transformamos el turismo tradicional en experiencias personalizadas con tecnologia, identidad peruana y conexion comercial.
              </p>

              <div className="mt-8 space-y-5">
                {features.map((f, i) => (
                  <div key={f.title} className="flex gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-amber/10 text-2xl">
                      {f.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">{f.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-text-secondary">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <a href="/experiencias" className="mt-10 inline-flex items-center gap-2 rounded-xl bg-amber px-6 py-3 font-semibold text-bg-navy transition-all duration-300 hover:bg-amber-light hover:shadow-[0_0_30px_rgba(217,119,6,0.4)]">
                Explorar experiencias
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                  <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </FadeInOnScroll>

          <FadeInOnScroll delay={150}>
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-amber/20 to-cyan/20 blur-2xl" />
              <img
                src="/assets/og-image.png"
                alt="BG Travel Peru Smart Experience"
                className="relative rounded-2xl border border-border-light shadow-2xl shadow-black/30"
                loading="lazy"
                decoding="async"
                width={1200}
                height={675}
              />
            </div>
          </FadeInOnScroll>
        </div>
      </div>
    </section>
  );
}

// ── Section 3: Featured Experiences ─────────────────────────────────

const experiences = [
  {
    name: "Cusco Imperial",
    subtitle: "Valle Sagrado y Machu Picchu",
    image: "/assets/plate-cusco.png",
    price: "desde S/ 890",
    tag: "Cultural",
  },
  {
    name: "Tarma Natural",
    subtitle: "La Perla de los Andes",
    image: "/assets/plate-tarma.png",
    price: "desde S/ 320",
    tag: "Naturaleza",
  },
  {
    name: "Gamarra Fashion Tour",
    subtitle: "Textiles y diseno peruano",
    image: "/assets/plate-gamarra.png",
    price: "desde S/ 150",
    tag: "Comercial",
  },
  {
    name: "Lima Gastronomica",
    subtitle: "Sabores del Peru",
    image: "/assets/plate-lima-gastronomia.png",
    price: "desde S/ 280",
    tag: "Gastronomia",
  },
];

function ExperiencesSection() {
  return (
    <section className="section-padding bg-bg-navy">
      <div className="max-w-content">
        <FadeInOnScroll>
          <div className="flex items-end justify-between">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-amber/20 bg-amber/5 px-4 py-1.5 text-sm text-amber">
                Experiencias Destacadas
              </span>
              <h2 className="mt-4 text-display text-4xl font-bold md:text-5xl">
                Destinos que <span className="text-amber">inspiran</span>
              </h2>
            </div>
            <a href="/experiencias" className="hidden items-center gap-2 text-sm font-medium text-amber transition-colors hover:text-amber-light md:inline-flex">
              Ver todas
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </FadeInOnScroll>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {experiences.map((exp, i) => (
            <FadeInOnScroll key={exp.name} delay={i * 100}>
              <div className="group relative overflow-hidden rounded-2xl border border-border-light bg-bg-card transition-all duration-500 hover:border-amber/20">
                <div className="relative h-56 overflow-hidden md:h-64">
                  <img
                    src={exp.image}
                    alt={exp.name}
                    className="h-full w-full object-cover transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-navy/80 via-transparent to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full bg-amber/90 px-3 py-1 text-xs font-medium text-bg-navy">
                    {exp.tag}
                  </span>
                  <span className="absolute bottom-4 right-4 rounded-full bg-bg-navy/80 px-3 py-1 text-sm font-medium text-amber backdrop-blur-sm">
                    {exp.price}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold">{exp.name}</h3>
                  <p className="mt-1 text-sm text-text-secondary">{exp.subtitle}</p>
                  <div className="mt-4 flex items-center gap-2 text-sm font-medium text-amber transition-colors group-hover:text-amber-light">
                    Mas informacion
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 transition-transform group-hover:translate-x-1">
                      <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </FadeInOnScroll>
          ))}
        </div>

        <div className="mt-6 text-center md:hidden">
          <a href="/experiencias" className="inline-flex items-center gap-2 text-sm font-medium text-amber">
            Ver todas las experiencias
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
              <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

// ── Section 4: How It Works ─────────────────────────────────────────

const steps = [
  { num: "01", title: "Elige tu experiencia", desc: "Explora nuestros destinos y encuentra el viaje que conecta con tus intereses." },
  { num: "02", title: "Cotiza con IA", desc: "Nuestro asistente inteligente te ayuda a personalizar el paquete perfecto." },
  { num: "03", title: "Reserva simple", desc: "Confirmas por WhatsApp y nosotros nos encargamos de todo." },
  { num: "04", title: "Viaja y disfruta", desc: "Vive una experiencia unica con soporte permanente durante tu viaje." },
];

function HowItWorks() {
  return (
    <section className="section-padding bg-bg-surface">
      <div className="max-w-content">
        <FadeInOnScroll>
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber/20 bg-amber/5 px-4 py-1.5 text-sm text-amber">
              Como Funciona
            </span>
            <h2 className="mt-4 text-display text-4xl font-bold md:text-5xl">
              Tu viaje en <span className="text-amber">4 pasos</span>
            </h2>
          </div>
        </FadeInOnScroll>

        <div className="mt-16 grid gap-8 md:grid-cols-4">
          {steps.map((s, i) => (
            <FadeInOnScroll key={s.num} delay={i * 120}>
              <div className="relative text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-amber/30 bg-bg-navy text-2xl font-bold text-amber">
                  {s.num}
                </div>
                {i < steps.length - 1 && (
                  <div className="absolute left-[calc(50%+2.5rem)] top-8 hidden h-0.5 w-[calc(100%-5rem)] bg-gradient-to-r from-amber/40 to-transparent md:block" />
                )}
                <h3 className="mt-4 text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">{s.desc}</p>
              </div>
            </FadeInOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Section 5: Destinations Sticky Stack ────────────────────────────

const destinations = [
  { num: "01", name: "Cusco", tag: "Patrimonio Mundial", image: "/assets/plate-cusco.png" },
  { num: "02", name: "Tarma", tag: "Perla de los Andes", image: "/assets/plate-tarma.png" },
  { num: "03", name: "Ica", tag: "Aventura en el Desierto", image: "/assets/plate-huacachina.png" },
  { num: "04", name: "Lima", tag: "Capital Gastronomica", image: "/assets/plate-lima-gastronomia.png" },
];

function DestinationsStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const sections = el.querySelectorAll<HTMLDivElement>("[data-dest-index]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = parseInt(entry.target.getAttribute("data-dest-index") || "0");
            setActiveIndex(idx);
          }
        });
      },
      { threshold: 0.4, rootMargin: "-80px 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-bg-navy">
      <div className="section-padding pb-0">
        <div className="max-w-content">
          <FadeInOnScroll>
            <div className="mx-auto max-w-2xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-amber/20 bg-amber/5 px-4 py-1.5 text-sm text-amber">
                Destinos
              </span>
              <h2 className="mt-4 text-display text-4xl font-bold md:text-5xl">
                Explora nuestros <span className="text-amber">destinos</span>
              </h2>
            </div>
          </FadeInOnScroll>
        </div>
      </div>

      <div ref={containerRef} className="mt-10">
        {destinations.map((d, i) => (
          <div
            key={d.name}
            data-dest-index={i}
            className={`sticky top-0 min-h-dvh transition-all duration-500 ${i === activeIndex ? "opacity-100" : "opacity-70"}`}
          >
            <div className="relative h-dvh overflow-hidden">
              <img
                src={d.image}
                alt={d.name}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-navy via-bg-navy/30 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-bg-navy/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
                <div className="max-w-content">
                  <span className="text-display text-8xl font-black text-white/10 md:text-9xl">{d.num}</span>
                  <h3 className="-mt-6 text-display text-5xl font-bold text-white md:text-7xl">{d.name}</h3>
                  <p className="mt-2 text-lg text-white/70">{d.tag}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Section 6: Testimonials + Stats ─────────────────────────────────

function TestimonialsSection() {
  return (
    <section className="section-padding bg-bg-surface">
      <div className="max-w-content">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <FadeInOnScroll>
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber/10">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-amber">
                  <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C9.591 11.69 11 13.166 11 15c0 1.933-1.567 3.5-3.5 3.5-1.271 0-2.406-.62-2.917-1.179zM15.583 17.321C14.553 16.227 14 15 14 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C20.591 11.69 22 13.166 22 15c0 1.933-1.567 3.5-3.5 3.5-1.271 0-2.406-.62-2.917-1.179z"/>
                </svg>
              </div>
              <blockquote className="mt-6 text-xl leading-relaxed md:text-2xl">
                "Gracias a BG Travel descubri Tarma de una forma que jamas imagine. La atencion personalizada y el asistente con IA hicieron que cada detalle estuviera perfecto. Recomendadisimo."
              </blockquote>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber/20 text-sm font-bold text-amber">
                  MC
                </div>
                <div>
                  <p className="font-semibold">Maria Castillo</p>
                  <p className="text-sm text-text-muted">Viajera, Lima</p>
                </div>
              </div>
            </div>
          </FadeInOnScroll>

          <FadeInOnScroll delay={200}>
            <div className="grid grid-cols-2 gap-6">
              {[
                { value: 500, suffix: "+", label: "Clientes satisfechos" },
                { value: 20, suffix: "+", label: "Destinos en Peru" },
                { value: 98, suffix: "%", label: "Satisfaccion" },
                { value: 8, suffix: "+", label: "Anos de experiencia" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-border-light bg-bg-card p-6 text-center">
                  <span className="text-display text-4xl font-bold text-amber md:text-5xl">
                    <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                  </span>
                  <p className="mt-2 text-sm text-text-secondary">{stat.label}</p>
                </div>
              ))}
            </div>
          </FadeInOnScroll>
        </div>
      </div>
    </section>
  );
}

// ── Section 7: CTA + Quote Form ─────────────────────────────────────

function CTASection() {
  const [formState, setFormState] = useState({ nombre: "", destino: "", whatsapp: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.nombre || !formState.destino || !formState.whatsapp) return;
    setLoading(true);
    setFormError("");
    try {
      await createQuote({
        data: {
          name: formState.nombre,
          destination: formState.destino,
          whatsapp: formState.whatsapp,
        },
      });
    } catch (err: any) {
      // Log error but continue to WhatsApp redirect so lead is never lost
      console.error("[CTASection] createQuote error:", err?.message ?? err);
      setFormError("No pudimos registrar tu consulta, pero te redirigimos a WhatsApp.");
    }
    const msg = encodeURIComponent(
      `Hola! Soy ${formState.nombre}. Me interesa el destino: ${formState.destino}. Mi whatsapp es ${formState.whatsapp}.`
    );
    window.open(`https://wa.me/51994118084?text=${msg}`, "_blank");
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section className="section-padding bg-bg-navy">
      <div className="max-w-content">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <FadeInOnScroll>
            <div>
              <h2 className="text-display text-4xl font-bold md:text-5xl">
                Cotiza tu <span className="text-amber">experiencia</span>
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-text-secondary">
                Dejanos tus datos y te enviamos una cotizacion personalizada por WhatsApp en menos de 24 horas.
              </p>
              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber/10">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 text-amber">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm text-text-secondary">Respuesta rapida por WhatsApp</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber/10">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 text-amber">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm text-text-secondary">Cotizacion 100% personalizada</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber/10">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 text-amber">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm text-text-secondary">Sin compromiso</span>
                </div>
              </div>
            </div>
          </FadeInOnScroll>

          <FadeInOnScroll delay={150}>
            {submitted ? (
              <div className="rounded-2xl border border-amber/20 bg-bg-card p-10 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber/10">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8 text-amber">
                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="mt-4 text-xl font-bold">Consulta enviada</h3>
                <p className="mt-2 text-text-secondary">Te responderemos por WhatsApp en breve.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-border-light bg-bg-card p-8">
                <div>
                  <label htmlFor="nombre" className="block text-sm font-medium text-text-secondary">Tu nombre</label>
                  <input
                    id="nombre"
                    type="text"
                    required
                    value={formState.nombre}
                    onChange={(e) => setFormState((p) => ({ ...p, nombre: e.target.value }))}
                    className="mt-1.5 w-full rounded-xl border border-border-light bg-bg-navy px-4 py-3 text-text-primary placeholder:text-text-muted focus:border-amber/50 focus:outline-none focus:ring-1 focus:ring-amber/30"
                    placeholder="Maria Garcia"
                  />
                </div>
                <div>
                  <label htmlFor="destino" className="block text-sm font-medium text-text-secondary">Destino de interes</label>
                  <select
                    id="destino"
                    required
                    value={formState.destino}
                    onChange={(e) => setFormState((p) => ({ ...p, destino: e.target.value }))}
                    className="mt-1.5 w-full rounded-xl border border-border-light bg-bg-navy px-4 py-3 text-text-primary focus:border-amber/50 focus:outline-none focus:ring-1 focus:ring-amber/30"
                  >
                    <option value="">Selecciona un destino</option>
                    <option>Cusco - Valle Sagrado</option>
                    <option>Tarma - Junin</option>
                    <option>Gamarra Fashion Tour</option>
                    <option>Lima Gastronomica</option>
                    <option>Ica - Huacachina</option>
                    <option>Paquete Internacional</option>
                    <option>Otro / Personalizado</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="whatsapp" className="block text-sm font-medium text-text-secondary">Tu WhatsApp</label>
                  <input
                    id="whatsapp"
                    type="tel"
                    required
                    value={formState.whatsapp}
                    onChange={(e) => setFormState((p) => ({ ...p, whatsapp: e.target.value }))}
                    className="mt-1.5 w-full rounded-xl border border-border-light bg-bg-navy px-4 py-3 text-text-primary placeholder:text-text-muted focus:border-amber/50 focus:outline-none focus:ring-1 focus:ring-amber/30"
                    placeholder="+51 999 999 999"
                  />
                </div>
                {formError && (
                  <p className="rounded-lg border border-amber/30 bg-amber/10 px-4 py-2 text-sm text-amber">
                    {formError}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber px-6 py-3 font-semibold text-bg-navy transition-all duration-300 hover:bg-amber-light hover:shadow-[0_0_30px_rgba(217,119,6,0.3)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5 animate-spin">
                      <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                      <path d="M12 2a10 10 0 0 1 10 10" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  )}
                  {loading ? "Enviando..." : "Enviar consulta"}
                </button>
              </form>
            )}
          </FadeInOnScroll>
        </div>
      </div>
    </section>
  );
}

// ── Footer ──────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="border-t border-border-light bg-bg-surface py-12">
      <div className="max-w-content px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <img src="/assets/logo-bg-travel.png" alt="BG Travel" className="h-8 w-auto" loading="lazy" decoding="async" width={160} height={32} />
            <p className="mt-4 max-w-md text-sm leading-relaxed text-text-secondary">
              BG Travel Peru transforma el turismo tradicional en experiencias inteligentes, conectando viajeros con la cultura, el comercio y la identidad peruana.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-text-primary">Explorar</h4>
            <div className="mt-4 flex flex-col gap-3">
              <a href="/experiencias" className="text-sm text-text-secondary transition-colors hover:text-amber">Experiencias</a>
              <a href="/blog" className="text-sm text-text-secondary transition-colors hover:text-amber">Blog de viajes</a>
              <a href="/sobre-nosotros" className="text-sm text-text-secondary transition-colors hover:text-amber">Sobre nosotros</a>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-text-primary">Contacto</h4>
            <div className="mt-4 flex flex-col gap-3">
              <a href="https://wa.me/51994118084" target="_blank" rel="noopener noreferrer" className="text-sm text-text-secondary transition-colors hover:text-amber">WhatsApp</a>
              <a href="mailto:info@bgtravel.pe" className="text-sm text-text-secondary transition-colors hover:text-amber">info@bgtravel.pe</a>
              <span className="text-sm text-text-muted">Gamarra, La Victoria, Lima</span>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-border-light pt-6 text-center text-sm text-text-muted">
          © {new Date().getFullYear()} BG Travel Peru EIRL. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}

// ── Main Index Component ────────────────────────────────────────────

const TRAVEL_AGENCY_LD = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  "name": "BG Travel Peru",
  "url": "https://bgtravel.pe",
  "logo": "https://bgtravel.pe/assets/logo-bg-travel.png",
  "description": "Experiencias turisticas culturales, comerciales y personalizadas en Peru.",
  "telephone": "+51994118084",
  "email": "info@bgtravel.pe",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Lima",
    "addressRegion": "Lima",
    "addressCountry": "PE"
  },
  "areaServed": "PE",
  "priceRange": "$$"
});

function Index() {
  return (
    <>
      <StructuredData json={TRAVEL_AGENCY_LD} />
      <div className="dark">
        <MotionProvider>
          <WhatsAppButton />
          <Navbar />
          <main>
            <HeroSection />
            <ValueProposition />
            <ExperiencesSection />
            <HowItWorks />
            <DestinationsStack />
            <TestimonialsSection />
            <CTASection />
          </main>
          <Footer />
        </MotionProvider>
      </div>
    </>
  );
}
