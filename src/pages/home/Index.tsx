import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { services } from "@/data/services";
import { usePageMeta } from "@/lib/seo";
import { Mail, Menu, X, ChevronRight, Send, MessageCircle, MapPin, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import ScrollExperienceSection from "@/components/ScrollExperienceSection";
import PrecalificacionModal from "@/components/PrecalificacionModal";



/* ========= HERO ========= */
const Hero = ({ onExplore }: { onExplore: () => void }) => {
  const navigate = useNavigate();
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src="/images/hero.jpeg" alt="Hero" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/75 to-background/85" />
      </div>

      <div className="absolute top-0 right-0 w-96 h-96 opacity-5 pointer-events-none"
        style={{ background: "radial-gradient(circle, var(--brand-sky), transparent 70%)" }} />

      <div className="relative container mx-auto px-4 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-6 text-foreground"
            style={{ backgroundColor: "var(--brand-sky)", boxShadow: "0 4px 20px rgba(78,159,194,0.4)" }}
          >
            <span>✦</span> Consultoría Multiplataforma
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="mb-6"
          >
            <img
              src="/logos/bmg_clean.png?v=5"
              alt="BMG Consultores"
              className="w-auto max-h-36 md:max-h-48 object-contain"
              style={{ filter: "grayscale(1) brightness(0) invert(72%) sepia(60%) saturate(600%) hue-rotate(6deg) brightness(95%) contrast(88%)" }}
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="text-xl md:text-2xl text-white/80 mb-4 leading-relaxed"
          >
            Gestión Corporativa 360° y Red de Negocios Profesional de Alto Nivel.
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="text-white/60 text-lg mb-10 max-w-xl"
          >
            Planteamos soluciones integrales para proteger tu empresa, mientras creamos oportunidades únicas de expansión e internacionalización.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <button
              onClick={onExplore}
              className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-foreground text-lg transition-all hover:scale-105 hover:shadow-xl"
              style={{ background: "linear-gradient(135deg, var(--brand-sky), var(--brand-sky))", boxShadow: "0 8px 30px rgba(78,159,194,0.4)" }}
            >
              Explorar Servicios <ChevronRight size={20} />
            </button>
            <a
              href="https://wa.me/51994118084"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white text-lg transition-all hover:scale-105 border-2 border-white/30 hover:border-white/60 hover:bg-white/10"
            >
              <MessageCircle size={20} /> WhatsApp
            </a>
          </motion.div>
        </motion.div>

        {/* Service logo grid bottom */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="absolute bottom-10 right-4 md:right-10 hidden md:flex gap-3"
        >
          {services.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9 + i * 0.08 }}
              className="relative group"
            >
              <div
                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 rounded-lg text-xs font-bold whitespace-nowrap pointer-events-none
                           opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0
                           transition-all duration-200 z-50"
                style={{ backgroundColor: s.color, color: "#ffffff", textShadow: "0 1px 3px rgba(0,0,0,0.5)", boxShadow: `0 4px 14px ${s.color}70` }}
              >
                {s.name}
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0"
                  style={{ borderLeft: "5px solid transparent", borderRight: "5px solid transparent", borderTop: `5px solid ${s.color}` }}
                />
              </div>
              <div
                className="w-12 h-12 rounded-full overflow-hidden border-2 transition-all duration-200 hover:scale-125 hover:z-10 cursor-pointer relative"
                style={{ borderColor: s.color }}
                role="button"
                tabIndex={0}
                onClick={() => navigate(`/${s.id}`)}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") navigate(`/${s.id}`); }}
              >
                <img src={s.logo} alt={s.name} className="w-full h-full object-cover pointer-events-none service-logo-tint" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

/* ========= ABOUT / CORPORATE SECTION ========= */
const AboutSection = () => (
  <section id="quienes-somos" className="py-24 overflow-hidden scroll-mt-16" style={{ background: "linear-gradient(160deg, #082B3A, #041720 60%, #0C3748)" }}>
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Texto corporativo */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
            style={{ backgroundColor: "rgba(78,159,194,0.18)", border: "1px solid rgba(78,159,194,0.45)", color: "var(--brand-gold)" }}
          >
            ✦ Quiénes somos
          </div>

          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            BMG Consultores —<br />
            <span style={{ color: "var(--brand-gold)" }}>Tu aliado de negocios</span>
          </h2>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              Somos una consultora peruana multiplataforma con más de 10 años de trayectoria, especializada en acompañar a emprendedores, PYMES y empresas consolidadas en cada etapa de su desarrollo. Nuestra propuesta de valor es única: ofrecemos bajo una sola marca un ecosistema completo de servicios profesionales que cubre desde la constitución de tu empresa hasta la conquista de contratos con el Estado.
            </p>
            <p>
              Con sede en Perú y presencia en todo el territorio nacional, hemos trabajado con más de 500 clientes satisfechos en rubros tan diversos como turismo, retail, construcción, tecnología y servicios profesionales. Creemos que el acceso a asesoría de calidad no debe ser exclusivo de las grandes empresas: cada emprendedor merece el mismo nivel de excelencia.
            </p>
            <p>
              Nuestro equipo está conformado por contadores, abogados, especialistas en desarrollo IA y automatización, expertos en contrataciones públicas, especialistas en comercio exterior y asesores de movilidad estratégica internacional que trabajan de manera integrada para ofrecerte soluciones 360°. No somos solo asesores; somos socios estratégicos comprometidos con tus resultados.
            </p>
            <p>
              En BMG Consultores entendemos que cada negocio es diferente. Por eso, cada plan de trabajo es completamente personalizado, con metas claras, cronogramas definidos y reportes transparentes que te permiten medir el impacto real de nuestra gestión.
            </p>
          </div>
        </motion.div>

        {/* Imágenes + stats */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="flex flex-col gap-5"
        >
          <div className="grid grid-cols-2 gap-4" style={{ height: "320px" }}>
            <div className="rounded-3xl overflow-hidden shadow-2xl" style={{ boxShadow: "0 20px 60px rgba(78,159,194,0.25)" }}>
              <img src="/images/hero.jpeg" alt="BMG Consultores" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="rounded-3xl overflow-hidden shadow-xl">
              <img src="/images/emprendedor.jpeg" alt="BG Emprendedor" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
          </div>

          {/* Stats globales en orden: [500+ Clientes] | [10+ Años] | [9 Divisiones] | [2 Sedes] */}
          <div className="grid grid-cols-4 gap-3">
            {[
              { value: "500+", label: "Clientes" },
              { value: "10+", label: "Años" },
              { value: "9", label: "Divisiones" },
              { value: "2", label: "Sedes" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.08 }}
                className="text-center p-4 rounded-2xl"
                style={{ backgroundColor: "rgba(78,159,194,0.12)", border: "1px solid rgba(78,159,194,0.3)" }}
              >
                <div className="text-2xl font-extrabold" style={{ color: "var(--brand-gold)" }}>{stat.value}</div>
                <div className="text-white/50 text-xs mt-1 leading-tight">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

/* ========= SERVICE DETAIL SECTION (alternating) ========= */
const ServiceDetailSection = ({ service, index }: { service: typeof services[0]; index: number }) => {
  const navigate = useNavigate();
  const isEven = index % 2 === 0; // par → imagen derecha; impar → imagen izquierda

  const textBlock = (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="flex flex-col justify-center"
    >
      {/* Logo + badge */}
      <div className="flex items-center gap-4 mb-6">
        <div
          className="w-16 h-16 rounded-2xl overflow-hidden border-2 shadow-xl flex-shrink-0"
          style={{ borderColor: service.color + "80", boxShadow: `0 8px 28px ${service.color}40` }}
        >
          <img src={service.logo} alt={service.name} className="w-full h-full object-cover service-logo-tint" />
        </div>
        <div>
          <div
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-1"
            style={{ backgroundColor: service.color + "22", color: service.color, border: `1px solid ${service.color}50` }}
          >
            {service.icon} {service.name}
          </div>
          <p className="text-white/40 text-xs">Servicio BMG</p>
        </div>
      </div>

      <h3
        className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        {service.tagline}
      </h3>

      <p className="text-white/65 leading-relaxed mb-6">
        {service.description}
      </p>

      {/* Features */}
      <ul className="space-y-2.5 mb-7">
        {service.features.slice(0, 3).map((feat) => (
          <li key={feat} className="flex items-start gap-2.5 text-sm text-white/70">
            <CheckCircle2 size={16} className="flex-shrink-0 mt-0.5" style={{ color: service.color }} />
            <span>{feat}</span>
          </li>
        ))}
      </ul>

      {/* Stats pequeños */}
      <div className="flex gap-4 mb-8">
        {service.stats.slice(0, 2).map((stat) => (
          <div
            key={stat.label}
            className="px-4 py-2.5 rounded-xl text-center"
            style={{ backgroundColor: service.color + "18", border: `1px solid ${service.color}35` }}
          >
            <div className="text-lg font-extrabold" style={{ color: service.color }}>{stat.value}</div>
            <div className="text-white/45 text-xs mt-0.5">{stat.label}</div>
          </div>
        ))}
      </div>

      <button
        onClick={() => navigate(`/${service.id}`)}
        className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-foreground text-sm transition-all hover:scale-105 hover:shadow-xl self-start"
        style={{
          background: `linear-gradient(135deg, ${service.color}, ${service.colorDark})`,
          boxShadow: `0 6px 24px ${service.color}50`,
        }}
      >
        Ver detalles completos <ChevronRight size={18} />
      </button>
    </motion.div>
  );

  const imageBlock = (
    <motion.div
      initial={{ opacity: 0, x: isEven ? 30 : -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.15 }}
      className="relative"
    >
      <div
        className="rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]"
        style={{ boxShadow: `0 24px 70px ${service.color}35` }}
      >
        <img
          src={service.images[0]}
          alt={service.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: `linear-gradient(to top, ${service.color}55 0%, transparent 55%)` }}
        />
      </div>
      {/* Floating badge */}
      <div
        className="absolute -bottom-4 -left-4 px-4 py-2 rounded-2xl text-sm font-bold shadow-xl"
        style={{ backgroundColor: service.color, color: "#111" }}
      >
        {service.icon} {service.cta}
      </div>
    </motion.div>
  );

  return (
    <section
      className="py-20 overflow-hidden"
      style={{
        background: isEven
          ? "linear-gradient(170deg, #051D26, #0A2F3F)"
          : "linear-gradient(170deg, #0A2F3F, #06212C)",
      }}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Mobile: texto siempre arriba */}
          <div className="lg:hidden">{textBlock}</div>
          <div className="lg:hidden">{imageBlock}</div>

          {/* Desktop: alternar */}
          {isEven ? (
            <>
              <div className="hidden lg:block">{textBlock}</div>
              <div className="hidden lg:block">{imageBlock}</div>
            </>
          ) : (
            <>
              <div className="hidden lg:block">{imageBlock}</div>
              <div className="hidden lg:block">{textBlock}</div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

/* ========= SERVICES CARDS SECTION ========= */
const ServicesSection = () => {
  const navigate = useNavigate();
  return (
    <section id="servicios" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4 text-primary"
            style={{ backgroundColor: "rgba(78,159,194,0.15)", border: "1px solid rgba(78,159,194,0.4)" }}
          >
            ✦ Nuestros Servicios
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Soluciones para cada necesidad
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Un ecosistema completo de servicios profesionales bajo una sola marca de confianza.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer rounded-3xl overflow-hidden border transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl"
              style={{
                borderColor: s.color + "40",
                backgroundColor: "var(--brand-petroleum)",
                boxShadow: `0 4px 24px ${s.color}15`,
              }}
              onClick={() => navigate(`/${s.id}`)}
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={s.images[0]}
                  alt={s.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: `linear-gradient(to top, ${s.color}CC, transparent 50%)` }}
                />
                <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
                  <div
                    className="w-12 h-12 shrink-0 rounded-xl overflow-hidden border-2 bg-white shadow-lg"
                    style={{ borderColor: s.color }}
                  >
                    <img src={s.logo} alt={s.name} className="w-full h-full object-cover service-logo-tint" />
                  </div>
                  <div>
                    <div className="text-white font-bold text-lg leading-tight">{s.name}</div>
                    <div className="text-white/70 text-xs mt-0.5">{s.icon}</div>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <p className={`text-muted-foreground text-sm leading-relaxed mb-4 ${s.id === "inmobiliario" ? "" : "line-clamp-2"}`}>{s.tagline}</p>
                <div className="flex items-center justify-between">
                  <button
                    className="flex items-center gap-1.5 text-sm font-semibold transition-all group-hover:gap-2.5"
                    style={{ color: s.color }}
                    onClick={(e) => { e.stopPropagation(); navigate(`/${s.id}`); }}
                  >
                    Ver más <ChevronRight size={16} />
                  </button>
                  <div className="flex gap-2">
                    {s.stats.slice(0, 2).map((st) => (
                      <span
                        key={st.label}
                        className="text-xs px-2 py-0.5 rounded-full font-bold"
                        style={{ backgroundColor: s.color + "20", color: s.color }}
                      >
                        {st.value}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ========= WHY BMG ========= */
const WhyBmg = () => (
  <section className="py-20 bg-background">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4 text-primary"
          style={{ backgroundColor: "rgba(78,159,194,0.15)", border: "1px solid rgba(78,159,194,0.4)" }}>
          ✦ ¿Por qué elegirnos?
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-foreground" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          La ventaja BMG
        </h2>
        <p className="text-muted-foreground text-lg mt-4 max-w-xl mx-auto">
          Más de una década acompañando a empresas y emprendedores peruanos hacia el éxito.
        </p>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: "🏆", title: "Experiencia comprobada", desc: "Más de 10 años de trayectoria en consultoría empresarial en el mercado peruano, con cientos de clientes satisfechos." },
          { icon: "🔗", title: "Servicios integrados", desc: "Un solo proveedor para todas tus necesidades: viajes, emprendimiento, contabilidad, derecho, desarrollo IA y contrataciones con el Estado." },
          { icon: "🤝", title: "Atención personalizada", desc: "Asesores dedicados que entienden tu negocio y diseñan estrategias a medida de tus objetivos específicos." },
          { icon: "📋", title: "Resultados medibles", desc: "Metas claras, KPIs definidos y reportes transparentes. Tu éxito es nuestro éxito." },
        ].map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="p-6 rounded-2xl border border-primary/20 bg-card hover:border-primary/50 hover:scale-[1.02] transition-all cursor-default"
            style={{ boxShadow: "0 4px 24px rgba(78,159,194,0.08)" }}
          >
            <div className="text-4xl mb-4">{item.icon}</div>
            <h3 className="font-bold text-foreground text-lg mb-2">{item.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

/* ========= CÓMO TRABAJAMOS ========= */
const HowWeWork = () => (
  <section className="py-20 bg-muted/20">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4 text-primary"
          style={{ backgroundColor: "rgba(78,159,194,0.15)", border: "1px solid rgba(78,159,194,0.4)" }}>
          ✦ Nuestro Proceso
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Cómo trabajamos
        </h2>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          Un proceso claro, transparente y orientado a resultados desde el primer contacto.
        </p>
      </motion.div>

      <div className="relative max-w-4xl mx-auto">
        <div className="hidden md:block absolute top-10 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-0.5"
          style={{ background: "linear-gradient(90deg, rgba(78,159,194,0.3), var(--brand-sky), rgba(78,159,194,0.3))" }} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { step: "01", icon: "💬", title: "Consulta inicial", desc: "Analizamos tu situación actual, objetivos y necesidades. Esta primera reunión es completamente gratuita y sin compromisos." },
            { step: "02", icon: "🎯", title: "Estrategia personalizada", desc: "Diseñamos un plan de acción específico para tu caso, con cronograma, responsables y métricas de éxito claras." },
            { step: "03", icon: "🚀", title: "Ejecución y seguimiento", desc: "Implementamos la estrategia con acompañamiento continuo, reportes de avance y ajustes en tiempo real." },
          ].map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="flex flex-col items-center text-center"
            >
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center text-2xl mb-5 border-2 relative z-10"
                style={{ backgroundColor: "rgba(78,159,194,0.15)", borderColor: "var(--brand-sky)", boxShadow: "0 4px 20px rgba(78,159,194,0.3)" }}
              >
                {step.icon}
              </div>
              <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "var(--brand-sky)" }}>Paso {step.step}</div>
              <h3 className="text-xl font-bold text-foreground mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

/* ========= CONTACT ========= */
const Contact = () => {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", service: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const waMsg = encodeURIComponent(
      `Hola BMG Consultores! Soy ${form.name}.\nEmail: ${form.email}\nServicio: ${form.service}\n\n${form.message}`
    );
    window.open(`https://wa.me/51994118084?text=${waMsg}`, "_blank");
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: "", email: "", service: "", message: "" });
  };

  return (
    <section id="contact" className="py-20" style={{ background: "linear-gradient(135deg, #082B3A, #051D26)" }}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4 text-primary"
            style={{ backgroundColor: "rgba(78,159,194,0.2)", border: "1px solid rgba(78,159,194,0.5)" }}>
            ✦ Contáctanos
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            ¿Listo para empezar?
          </h2>
          <p className="text-white/60 text-lg">Escríbenos y un asesor te contactará a la brevedad.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-2 space-y-6">
            {[
              { icon: <Mail size={20} />, label: "Email", value: "info@bgconsultores.site", href: "mailto:info@bgconsultores.site" },
              { icon: <MessageCircle size={20} />, label: "WhatsApp", value: "+51 994 118 084", href: "https://wa.me/51994118084" },
              { icon: <MapPin size={20} />, label: "Ubicación", value: "Av. Agustín Gamarra 1132, 2do Piso Of. 226 (Galería Brisas), La Victoria", href: "https://maps.google.com/?q=Av.+Agust%C3%ADn+Gamarra+1132%2C+Segundo+Piso%2C+Oficina+226%2C+Galer%C3%ADa+Brisas%2C+La+Victoria%2C+Lima" },
            ].map((item) => (
              <a key={item.label} href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all hover:border-primary/50 group">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-foreground"
                  style={{ backgroundColor: "var(--brand-sky)", boxShadow: "0 4px 12px rgba(78,159,194,0.4)" }}>
                  {item.icon}
                </div>
                <div>
                  <div className="text-white/50 text-xs uppercase tracking-widest">{item.label}</div>
                  <div className="text-white font-semibold font-mono text-sm">{item.value}</div>
                </div>
              </a>
            ))}
            <div className="pt-4">
              <p className="text-white/40 text-xs uppercase tracking-widest mb-3">Nuestros servicios</p>
              <div className="flex flex-wrap gap-2">
                {services.map((s) => (
                  <a key={s.id} href={`/${s.id}`}
                    className="w-10 h-10 rounded-xl overflow-hidden border transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary"
                    style={{ borderColor: s.color + "60" }} title={s.name} aria-label={s.name}>
                    <img src={s.logo} alt={s.name} className="w-full h-full object-cover service-logo-tint" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="p-8 rounded-3xl border border-white/10 space-y-5" style={{ backgroundColor: "#0C3748" }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/60 text-xs uppercase tracking-widest mb-1.5">Nombre *</label>
                  <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Tu nombre completo"
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder-white/30 focus:border-primary focus:outline-none transition-colors text-sm" />
                </div>
                <div>
                  <label className="block text-white/60 text-xs uppercase tracking-widest mb-1.5">Email *</label>
                  <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="tu@email.com"
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder-white/30 focus:border-primary focus:outline-none transition-colors text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-white/60 text-xs uppercase tracking-widest mb-1.5">Servicio</label>
                <select value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white focus:border-primary focus:outline-none transition-colors text-sm appearance-none">
                  <option value="" className="bg-gray-900">Seleccionar...</option>
                  {services.map((s) => (
                    <option key={s.id} value={s.name} className="bg-gray-900">{s.icon} {s.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-white/60 text-xs uppercase tracking-widest mb-1.5">Mensaje *</label>
                <textarea required rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="¿En qué podemos ayudarte?"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder-white/30 focus:border-primary focus:outline-none transition-colors text-sm resize-none" />
              </div>
              <button type="submit"
                className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-foreground text-base transition-all hover:scale-[1.02] hover:shadow-xl"
                style={{ background: "linear-gradient(135deg, var(--brand-sky), var(--brand-sky))", boxShadow: "0 6px 24px rgba(78,159,194,0.4)" }}>
                {sent ? "✅ ¡Mensaje enviado!" : <><Send size={18} /> Enviar mensaje</>}
              </button>
              <p className="text-center text-white/30 text-xs">
                También puedes escribirnos a{" "}
                <a href="mailto:info@bgconsultores.site" className="text-primary hover:underline">info@bgconsultores.site</a>
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* ========= FOOTER ========= */
const Footer = () => {
  const navigate = useNavigate();
  const mapsGpsUrl = "https://maps.google.com/?q=Av.+Agust%C3%ADn+Gamarra+1132%2C+Segundo+Piso%2C+Oficina+226%2C+Galer%C3%ADa+Brisas%2C+La+Victoria%2C+Lima";

  return (
    <footer className="py-10 bg-background border-t border-white/10">
      {/* Bloque Institucional & Geolocalización */}
      <div className="container mx-auto px-4 pb-8 mb-8 border-b border-white/10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 rounded-2xl bg-white/[0.03] border border-white/10">
          <div className="flex items-start gap-4 text-left">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-black shadow-lg"
              style={{ backgroundColor: "var(--brand-gold)" }}
            >
              <MapPin size={22} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest font-bold text-white/50 mb-1">
                Sede Central — Lima
              </p>
              <a
                href={mapsGpsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#D6A83F] font-medium text-sm sm:text-base leading-snug transition-colors block"
                title="Abrir en GPS"
              >
                Av. Agustín Gamarra 1132, Segundo Piso, Oficina 226 (Galería Brisas), La Victoria, Lima.
              </a>
              <p className="text-white/40 text-xs mt-1">
                Atención presencial en Gamarra y virtual a nivel nacional
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <a
              href={mapsGpsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-black transition-all hover:scale-105 shadow-md w-full sm:w-auto"
              style={{ backgroundColor: "var(--brand-gold)" }}
            >
              <MapPin size={16} /> Ver ubicación en mapa
            </a>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img src="/logos/bmg_clean.png?v=5" alt="BMG" className="h-10 w-auto object-contain" />
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          {services.map((s) => (
            <button key={s.id} type="button" onClick={() => navigate(`/${s.id}`)}
              className="text-white/50 text-xs hover:text-[#D6A83F] cursor-pointer transition-colors">
              {s.name}
            </button>
          ))}
        </div>
        <div className="text-white/30 text-xs text-center">
          © 2025 BMG Consultores. Todos los derechos reservados.
          <span className="mx-1.5">·</span>
          Design by:{" "}
          <a href="https://kreoia.site" target="_blank" rel="noreferrer" className="hover:text-white/60 transition-colors">
            KREO IA Studio
          </a>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-4 flex flex-wrap justify-center gap-4 text-xs">
        <button type="button" onClick={() => {
          const el = document.getElementById("quienes-somos");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }} className="text-white/50 hover:text-[#D6A83F] cursor-pointer transition-colors font-medium">
          Quiénes Somos
        </button>
        <span className="text-white/20">·</span>
        <button type="button" onClick={() => navigate("/fundadora")}
          className="text-white/50 hover:text-[#D6A83F] cursor-pointer transition-colors font-medium">
          Nuestra Fundadora
        </button>
        <span className="text-white/20">·</span>
        <button type="button" onClick={() => navigate("/estrategia-premium")}
          className="text-white/50 hover:text-[#D6A83F] cursor-pointer transition-colors font-medium">
          Estrategia Premium
        </button>
        <span className="text-white/20">·</span>
        <button type="button" onClick={() => navigate("/privacidad")}
          className="text-white/35 hover:text-white/70 cursor-pointer transition-colors">
          Política de privacidad
        </button>
        <span className="text-white/20">·</span>
        <button type="button" onClick={() => navigate("/terminos")}
          className="text-white/35 hover:text-white/70 cursor-pointer transition-colors">
          Términos y condiciones
        </button>
      </div>
    </footer>
  );
};

/* ========= WHATSAPP FAB ========= */
const WhatsAppFab = () => (
  <motion.a
    href="https://wa.me/51994118084"
    target="_blank"
    rel="noreferrer"
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
    className="fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full flex items-center justify-center text-white shadow-2xl cursor-pointer hover:scale-110 transition-transform"
    style={{ backgroundColor: "var(--brand-sky)", boxShadow: "0 8px 30px rgba(78,159,194,0.5)" }}
    title="Chat en WhatsApp"
  >
    <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2, repeatDelay: 3 }}>
      <MessageCircle size={26} fill="white" />
    </motion.div>
  </motion.a>
);

/* ========= HOME PAGE ========= */
export default function Home() {
  const servicesRef = useRef<HTMLDivElement>(null);
  const [modalPrecalificacionOpen, setModalPrecalificacionOpen] = useState<boolean>(false);

  usePageMeta({
    title: "BMG Consultores — Consultoría Multiplataforma Perú",
    description: "BMG Consultores: servicios integrales de consultoría en viajes, emprendimiento, contabilidad, asesoría jurídica, IA, contrataciones con el Estado e inmobiliaria en Perú.",
    path: "/",
  });

  // Inyectar Lemon Slice AI Widget dinámicamente
  useEffect(() => {
    if (document.getElementById("lemon-slice-script")) return;
    const widget = document.createElement("lemon-slice-widget");
    widget.setAttribute("agent-id", "agent_690a61c320876551");
    widget.setAttribute("custom-minimized-width", "144");
    widget.setAttribute("custom-minimized-height", "216");
    widget.setAttribute("custom-active-width", "252");
    widget.setAttribute("custom-active-height", "377");
    widget.setAttribute("show-minimize-button", "true");
    widget.setAttribute("initial-state", "minimized");
    widget.style.cssText = "position:fixed!important;bottom:1.5rem!important;right:1.5rem!important;left:auto!important;top:auto!important;z-index:9999!important;max-width:260px!important;max-height:400px!important;";
    document.body.appendChild(widget);
    const script = document.createElement("script");
    script.id = "lemon-slice-script";
    script.type = "module";
    script.src = "https://unpkg.com/@lemonsliceai/lemon-slice-widget";
    document.body.appendChild(script);
  }, []);

  const scrollToServices = () => {
    servicesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero onExplore={scrollToServices} />

      {/* Scroll Work: Experiencia Cinemática BMG Consultores */}
      <ScrollExperienceSection
        onPrecalificar={() => setModalPrecalificacionOpen(true)}
        onExplore={scrollToServices}
      />

      {/* Sección corporativa */}
      <AboutSection />

      {/* Una sección detallada por servicio */}
      {services.map((service, index) => (
        <ServiceDetailSection key={service.id} service={service} index={index} />
      ))}

      {/* Cards grid */}
      <div ref={servicesRef}>
        <ServicesSection />
      </div>

      <WhyBmg />
      <HowWeWork />
      <Contact />
      <Footer />
      <WhatsAppFab />

      {/* Modal Precalificación desde el Scroll Work */}
      <PrecalificacionModal
        isOpen={modalPrecalificacionOpen}
        onClose={() => setModalPrecalificacionOpen(false)}
      />
    </div>
  );
}
