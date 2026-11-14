import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { services, Service, ServiceAdvisor } from "@/data/services";
import { usePageMeta } from "@/lib/seo";
import { Mail, Menu, X, ChevronLeft, ChevronDown, MessageCircle, Phone, Star, MapPin } from "lucide-react";
import OfertasMesModal from "@/components/OfertasMesModal";
import Navbar from "@/components/Navbar";



/* ======================================================
   FAQ ITEM — dark theme (otros servicios)
   ====================================================== */
const FaqItemDark = ({ q, a, color }: { q: string; a: string; color: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border rounded-2xl overflow-hidden transition-all duration-300"
      style={{ borderColor: open ? color + "60" : "rgba(255,255,255,0.1)", backgroundColor: open ? color + "0A" : "transparent" }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left gap-4"
      >
        <span className="font-semibold text-foreground text-sm leading-snug">{q}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <ChevronDown size={18} style={{ color }} />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-4 text-muted-foreground text-sm leading-relaxed border-t border-white/10 pt-3">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ======================================================
   FAQ ITEM — light/cream theme (travel)
   ====================================================== */
const FaqItemLight = ({ q, a }: { q: string; a: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border-b transition-all duration-300"
      style={{ borderColor: open ? "var(--brand-gold)60" : "var(--brand-navy)20" }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left gap-4"
      >
        <span className="font-semibold text-[#082B3A] text-base leading-snug">{q}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <ChevronDown size={18} className="text-[#D6A83F] flex-shrink-0" />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pb-5 text-[#082B3A]/70 text-sm leading-relaxed">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ======================================================
   TRAVEL PAGE — layout premium tipo Aracari
   ====================================================== */
const TravelPage = ({ service }: { service: Service }) => {
  const navigate = useNavigate();

  const destinations = [
    {
      name: "Machu Picchu",
      subtitle: "La Ciudad Perdida de los Incas",
      desc: "Una de las Siete Maravillas del Mundo moderno. Circuitos de 1 a 4 días con guías especializados, tren de lujo y lodge en Aguas Calientes.",
      img: "/images/travel_machu_2.jpeg",
      tag: "Patrimonio UNESCO",
    },
    {
      name: "Cusco Imperial",
      subtitle: "El ombligo del mundo Inca",
      desc: "Arquitectura milenaria, mercados andinos, Valle Sagrado y la majestuosa Plaza de Armas. Experiencias culturales inmersivas con comunidades quechuas.",
      img: "/images/travel_cusco_1.jpeg",
      tag: "Cultura & Historia",
    },
    {
      name: "Amazonas",
      subtitle: "El pulmón del planeta",
      desc: "Expediciones en el río Amazonas, avistamiento de delfines rosados, canopy, pesca de pirañas y noches de glamping en la selva profunda.",
      img: "/images/travel_amazon_1.jpeg",
      tag: "Naturaleza & Aventura",
    },
    {
      name: "Lima Gourmet",
      subtitle: "La capital gastronómica de América",
      desc: "Tours culinarios por Miraflores, Barranco y el Centro Histórico. Cenas en los mejores restaurantes del mundo y clases de cocina peruana.",
      img: "/images/travel_lima_1.jpeg",
      tag: "Gastronomía",
    },
  ];

  const travelStyles = [
    {
      emoji: "🏔️",
      name: "Aventura & Trekking",
      desc: "Caminatas al Salkantay, Choquequirao, Colca y la Cordillera Blanca. Para espíritus exploradores.",
    },
    {
      emoji: "💑",
      name: "Luna de Miel",
      desc: "Escapadas románticas a Paracas, Ica, Machu Picchu y Puno. Hoteles boutique y cenas privadas con vista al Cusco.",
    },
    {
      emoji: "🏢",
      name: "Corporativo",
      desc: "Viajes de incentivo, convenciones y team-building en destinos exclusivos. Logística total para grupos de 10 a 500 personas.",
    },
    {
      emoji: "🍽️",
      name: "Gastronomía",
      desc: "Rutas culinarias con chefs reconocidos, mercados locales, destilería de pisco y maridaje de productos andinos y amazónicos.",
    },
  ];

  const testimonials = [
    {
      name: "Carolina Vargas",
      origin: "Bogotá, Colombia",
      date: "Enero 2026",
      text: "BG Travel organizó nuestra luna de miel en el Cusco y Machu Picchu de manera impecable. Cada detalle estuvo cuidado: desde el tren Belmond hasta el lodge en Aguas Calientes. ¡Una experiencia que jamás olvidaremos!",
      stars: 5,
    },
    {
      name: "James & Patricia Howard",
      origin: "Londres, Reino Unido",
      date: "Marzo 2026",
      text: "We booked a 10-day Peru circuit through BG Travel and it exceeded all expectations. Our guide was knowledgeable, the hotels were superb, and the Amazon experience was absolutely transformative.",
      stars: 5,
    },
    {
      name: "Empresa Minera Cerro Azul",
      origin: "Lima, Perú",
      date: "Octubre 2025",
      text: "Gestionaron el viaje de incentivos para 80 colaboradores a Punta Cana. Vuelos, hotel 5 estrellas y actividades grupales todo coordinado sin ningún problema. Los volvemos a contratar sin dudar.",
      stars: 5,
    },
  ];

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Montserrat', sans-serif" }}>

      {/* ── 1. HERO FULLSCREEN ── */}
      <section className="relative min-h-screen flex flex-col justify-end" style={{ minHeight: "100svh" }}>
        <div className="absolute inset-0 z-0">
          <img
            src="/images/travel_machu_1.jpeg"
            alt="Machu Picchu"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.75) 100%)" }} />
        </div>

        <div className="relative z-10 container mx-auto px-6 pb-16 pt-32">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-white/30 text-white/80 text-sm tracking-widest uppercase"
            style={{ backdropFilter: "blur(8px)", background: "rgba(255,255,255,0.1)" }}
          >
            ✈️ <span>BG Travel — Tu agencia de confianza</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35 }}
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold italic text-white mb-6 leading-none max-w-4xl"
            style={{ fontFamily: "'Cormorant Garamond', serif", textShadow: "0 4px 32px rgba(0,0,0,0.4)" }}
          >
            Viaja al alma<br />del Perú y el mundo
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-lg sm:text-xl text-white/75 mb-10 max-w-lg font-light tracking-wide"
          >
            Experiencias únicas diseñadas para ti — desde Machu Picchu hasta el mundo
          </motion.p>

          {/* CTA */}
          <motion.a
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.65 }}
            href="https://wa.me/51994118084?text=Hola, me interesa cotizar un viaje con BG Travel"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-[#082B3A] text-base transition-all hover:scale-105 hover:shadow-2xl"
            style={{ backgroundColor: "var(--brand-gold)", boxShadow: "0 8px 32px rgba(214,168,63,0.45)" }}
          >
            <MessageCircle size={20} /> Cotizar mi viaje
          </motion.a>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="relative z-10 w-full"
          style={{ background: "rgba(8,43,58,0.80)", backdropFilter: "blur(12px)", borderTop: "1px solid rgba(214,168,63,0.3)" }}
        >
          <div className="container mx-auto px-6 py-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { value: "500+", label: "Destinos" },
              { value: "98%", label: "Satisfechos" },
              { value: "10+", label: "Años de experiencia" },
              { value: "24/7", label: "Soporte dedicado" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center">
                <span className="text-2xl font-extrabold text-[#D6A83F]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{s.value}</span>
                <span className="text-white/60 text-xs tracking-wide mt-0.5">{s.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── 2. DESTINOS ESTRELLA ── */}
      <section className="py-24" style={{ background: "var(--brand-ivory)" }}>
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="w-1 h-10 rounded-full" style={{ backgroundColor: "var(--brand-gold)" }} />
              <p className="text-[#D6A83F] text-sm font-bold tracking-[0.2em] uppercase">Destinos seleccionados</p>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold italic text-[#082B3A] ml-6 leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Nuestros Destinos Estrella
            </h2>
            <p className="text-[#082B3A]/60 mt-3 ml-6 max-w-xl text-sm leading-relaxed">
              Cada destino elegido por su riqueza cultural, paisajística y experiencial. Diseñamos el itinerario perfecto para ti.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {destinations.map((dest, i) => (
              <motion.div
                key={dest.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="relative overflow-hidden rounded-2xl group cursor-pointer"
                style={{ height: "360px" }}
              >
                <img
                  src={dest.img}
                  alt={dest.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(8,43,58,0.88) 0%, rgba(8,43,58,0.2) 55%, transparent 100%)" }} />
                {/* Gold left bar */}
                <div className="absolute bottom-0 left-0 w-1 h-full" style={{ background: "linear-gradient(to top, var(--brand-gold), transparent)" }} />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="inline-block text-[#D6A83F] text-xs font-bold tracking-widest uppercase mb-2 px-3 py-1 rounded-full" style={{ background: "rgba(214,168,63,0.15)", border: "1px solid rgba(214,168,63,0.4)" }}>
                    {dest.tag}
                  </span>
                  <h3 className="text-2xl font-bold italic text-white mb-1 leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    {dest.name}
                  </h3>
                  <p className="text-white/60 text-xs mb-2">{dest.subtitle}</p>
                  <p className="text-white/80 text-sm leading-relaxed line-clamp-2 group-hover:line-clamp-none transition-all duration-500">
                    {dest.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. ESTILOS DE VIAJE ── */}
      <section className="py-24" style={{ background: "#FFFFFF" }}>
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="w-1 h-10 rounded-full" style={{ backgroundColor: "var(--brand-gold)" }} />
              <p className="text-[#D6A83F] text-sm font-bold tracking-[0.2em] uppercase">Tu forma de viajar</p>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold italic text-[#082B3A] ml-6 leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Estilos de Viaje
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {travelStyles.map((style, i) => (
              <motion.div
                key={style.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group p-8 rounded-2xl border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
                style={{ borderColor: "var(--brand-navy)15", background: "var(--brand-ivory)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "var(--brand-gold)60"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "var(--brand-navy)15"; }}
              >
                <div className="text-5xl mb-5">{style.emoji}</div>
                <h3 className="text-lg font-bold text-[#082B3A] mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  {style.name}
                </h3>
                <p className="text-[#082B3A]/60 text-sm leading-relaxed">{style.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. POR QUÉ BG TRAVEL ── */}
      <section className="py-24" style={{ background: "var(--brand-ivory)" }}>
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-[#D6A83F] text-sm font-bold tracking-[0.2em] uppercase mb-3">La diferencia BG Travel</p>
            <h2 className="text-4xl lg:text-5xl font-bold italic text-[#082B3A] leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Por qué elegirnos
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🎯",
                title: "100% Personalizado",
                text: "Cada itinerario es único, diseñado alrededor de tus intereses, ritmo y presupuesto. No vendemos paquetes estándar — construimos experiencias a tu medida.",
              },
              {
                icon: "🌿",
                title: "Turismo con Propósito",
                text: "Trabajamos con comunidades locales, operadores certificados y alojamientos responsables. Viajar bien también significa viajar de forma ética y sostenible.",
              },
              {
                icon: "🗺️",
                title: "Expertos Locales",
                text: "Nuestro equipo conoce el Perú palmo a palmo. Guías bilingües certificados, alianzas con los mejores lodges y acceso a experiencias fuera del circuito masivo.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="relative p-8 rounded-2xl bg-white shadow-md"
                style={{ borderTop: "4px solid var(--brand-gold)" }}
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-[#082B3A] mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  {item.title}
                </h3>
                <p className="text-[#082B3A]/65 text-sm leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. GALERÍA INMERSIVA ── */}
      <section className="py-6 px-4 md:px-6" style={{ background: "#FFFFFF" }}>
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-3 gap-3"
            style={{ height: "clamp(280px, 45vw, 500px)" }}
          >
            {/* Large left */}
            <div className="col-span-2 rounded-2xl overflow-hidden relative group">
              <img
                src="/images/travel_honeymoon_1.jpeg"
                alt="Luna de Miel"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-4 left-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white font-bold italic text-lg" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Experiencias románticas</p>
              </div>
            </div>
            {/* Right column */}
            <div className="flex flex-col gap-3">
              <div className="flex-1 rounded-2xl overflow-hidden relative group">
                <img
                  src="/images/travel_amazon_2.jpeg"
                  alt="Amazonas"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white font-bold italic text-sm" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Amazonas</p>
                </div>
              </div>
              <div className="flex-1 rounded-2xl overflow-hidden relative group">
                <img
                  src="/images/travel_machu_2.jpeg"
                  alt="Machu Picchu"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white font-bold italic text-sm" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Machu Picchu</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 6. QUÉ INCLUYE (Features) ── */}
      <section className="py-24" style={{ background: "var(--brand-ivory)" }}>
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="w-1 h-10 rounded-full" style={{ backgroundColor: "var(--brand-gold)" }} />
              <p className="text-[#D6A83F] text-sm font-bold tracking-[0.2em] uppercase">Servicios completos</p>
            </div>
            <h2 className="text-4xl font-bold italic text-[#082B3A] ml-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              ¿Qué incluye BG Travel?
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {service.features.map((feat, i) => (
              <motion.div
                key={feat}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="flex items-start gap-3 p-5 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
                style={{ borderLeft: "3px solid var(--brand-gold)" }}
              >
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-white text-xs font-bold"
                  style={{ backgroundColor: "var(--brand-navy)" }}
                >
                  {i + 1}
                </div>
                <p className="text-[#082B3A] text-sm font-medium leading-snug">{feat}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. TESTIMONIALES ── */}
      <section className="py-24" style={{ background: "var(--brand-navy)" }}>
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-[#D6A83F] text-sm font-bold tracking-[0.2em] uppercase mb-3">Nuestros viajeros hablan</p>
            <h2 className="text-4xl lg:text-5xl font-bold italic text-white" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Experiencias reales
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="p-8 rounded-2xl"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(214,168,63,0.25)" }}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.stars }).map((_, si) => (
                    <Star key={si} size={14} fill="#D6A83F" className="text-[#D6A83F]" />
                  ))}
                </div>
                <p className="text-white/80 text-sm leading-relaxed mb-6 italic">"{t.text}"</p>
                <div className="flex items-center gap-3 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.12)" }}>
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-[#082B3A] font-bold text-sm"
                    style={{ backgroundColor: "var(--brand-gold)" }}
                  >
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-white text-sm font-bold">{t.name}</p>
                    <p className="text-white/40 text-xs">{t.origin} · {t.date}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. FAQs ── */}
      {service.faqs && service.faqs.length > 0 && (
        <section className="py-24" style={{ background: "#FFFFFF" }}>
          <div className="container mx-auto px-6 max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="w-1 h-10 rounded-full" style={{ backgroundColor: "var(--brand-gold)" }} />
                <p className="text-[#D6A83F] text-sm font-bold tracking-[0.2em] uppercase">Respondemos tus dudas</p>
              </div>
              <h2 className="text-4xl font-bold italic text-[#082B3A] ml-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Preguntas frecuentes
              </h2>
            </motion.div>
            <div>
              {service.faqs.map((faq) => (
                <FaqItemLight key={faq.q} q={faq.q} a={faq.a} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 9. CTA FINAL CONVERSACIONAL ── */}
      <section className="py-28 text-center" style={{ background: "var(--brand-ivory)" }}>
        <div className="container mx-auto px-6 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-[#D6A83F] text-sm font-bold tracking-[0.2em] uppercase mb-4">¿Listo para partir?</p>
            <h2
              className="text-4xl lg:text-5xl font-bold italic text-[#082B3A] mb-6 leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Cuéntanos tu viaje ideal.
            </h2>
            <p className="text-[#082B3A]/65 text-base leading-relaxed mb-10">
              Nuestro equipo lo diseña para ti, desde la primera consulta hasta el regreso. Sin costos ocultos, sin complicaciones.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://wa.me/51994118084?text=Hola, me interesa cotizar un viaje con BG Travel"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 px-10 py-4 rounded-full font-bold text-[#082B3A] text-base transition-all hover:scale-105 hover:shadow-2xl"
                style={{ backgroundColor: "var(--brand-gold)", boxShadow: "0 8px 32px rgba(214,168,63,0.35)" }}
              >
                <MessageCircle size={20} /> Iniciar mi viaje →
              </a>
              {service.email && (
                <a
                  href={`mailto:${service.email}`}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-[#082B3A] bg-[#082B3A]/10 hover:bg-[#082B3A]/15 border border-[#082B3A]/25 transition-all hover:scale-105 text-base"
                >
                  <Mail size={18} className="text-[#082B3A]" /> {service.email}
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

/* ======================================================
   ADVISOR SECTION — Componente Compartido
   ====================================================== */
const AdvisorSection = ({
  advisor,
  color,
  email,
}: {
  advisor: ServiceAdvisor;
  color: string;
  email?: string;
}) => {
  const whatsappMessage = encodeURIComponent(
    advisor.whatsappMessage ?? `Hola, quiero una asesoría con ${advisor.name}.`
  );
  const initials = advisor.name
    .split(" ")
    .filter((word) => word.length > 0 && word[0] === word[0].toUpperCase())
    .slice(0, 2)
    .map((word) => word[0])
    .join("");

  return (
    <section className="py-24" style={{ background: "var(--background)", borderTop: `1px solid ${color}25` }}>
      <div className="container mx-auto px-6 grid md:grid-cols-[auto_1fr] gap-10 items-center max-w-5xl">
        <div
          className="relative w-64 h-64 rounded-full overflow-hidden border-4 mx-auto"
          style={{ borderColor: `${color}60`, boxShadow: `0 16px 48px ${color}25` }}
        >
          <div
            className="absolute inset-0 flex items-center justify-center text-5xl font-extrabold text-white"
            style={{ background: `linear-gradient(135deg, ${color}, var(--brand-navy))` }}
          >
            {initials}
          </div>
          {advisor.image && (
            <img
              src={advisor.image}
              alt={`${advisor.name} — asesor`}
              className="relative z-10 w-full h-full object-cover"
              style={{ objectPosition: advisor.imagePosition || "center 20%" }}
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />
          )}
        </div>
        <div>
          <p className="text-xs font-bold tracking-[0.2em] uppercase mb-3" style={{ color }}>
            {advisor.tag ?? "Tu asesor"}
          </p>
          <h2 className="text-4xl font-bold text-foreground" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            {advisor.name}
          </h2>
          <p className="text-sm text-muted-foreground mt-2">{advisor.role}</p>
          <p className="text-muted-foreground text-sm leading-relaxed mt-5">{advisor.bio}</p>

          {((advisor.experience && advisor.experience.length > 0) || (advisor.education && advisor.education.length > 0)) && (
            <div className="mt-6 pt-5 border-t border-white/10 space-y-4">
              {advisor.experience && advisor.experience.length > 0 && (
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color }}>
                    Experiencia Profesional
                  </p>
                  <ul className="space-y-1.5 text-xs text-muted-foreground">
                    {advisor.experience.map((exp, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: color }} />
                        <span>{exp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {advisor.education && advisor.education.length > 0 && (
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color }}>
                    Formación Académica y Especialización
                  </p>
                  <ul className="space-y-1.5 text-xs text-muted-foreground">
                    {advisor.education.map((edu, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: color }} />
                        <span>{edu}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href={`https://wa.me/51994118084?text=${whatsappMessage}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-black transition-all hover:scale-105 shadow-md"
              style={{ backgroundColor: color }}
            >
              <MessageCircle size={18} /> Escribirle por WhatsApp
            </a>
            {email && (
              <a
                href={`mailto:${email}`}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-semibold text-white/90 bg-white/5 hover:bg-white/10 border border-white/20 transition-all hover:scale-105 text-sm"
              >
                <Mail size={16} style={{ color }} /> {email}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};


/* ======================================================
   CONTABLE PAGE — BMG Dark · Gold · Quantum-inspired
   ====================================================== */
const ContablePage = ({ service }: { service: Service }) => {
  const GOLD = "var(--brand-gold)";
  const GOLD_HEX = "var(--brand-gold)";
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const pillars = [
    {
      icon: "🛡️",
      num: "01",
      title: "Cero multas SUNAT",
      text: "Gestionamos tus declaraciones mensuales y anuales con exactitud milimétrica. Libros electrónicos PLE, PDT 621 y 601 siempre al día. Tu empresa protegida ante cualquier fiscalización.",
    },
    {
      icon: "📊",
      num: "02",
      title: "Visibilidad financiera total",
      text: "Estados financieros claros: Balance General, Estado de Resultados y Flujo de Caja mensuales. Toma decisiones con datos reales, no con suposiciones.",
    },
    {
      icon: "⚡",
      num: "03",
      title: "Respuesta en 24 horas",
      text: "¿Una consulta urgente de SUNAT? ¿Un error en planilla? Nuestro equipo de contadores certificados responde en menos de 24 horas. Siempre disponibles cuando más nos necesitas.",
    },
  ];

  const process = [
    { step: "1", title: "Diagnóstico gratuito", desc: "Revisamos tu situación tributaria y contable actual sin costo. Identificamos riesgos y oportunidades de optimización." },
    { step: "2", title: "Plan personalizado", desc: "Diseñamos el esquema contable ideal para tu régimen: Nuevo RUS, RER, MYPE Tributario o General." },
    { step: "3", title: "Gestión continua", desc: "Manejamos tu contabilidad completa cada mes: declaraciones, planillas, libros electrónicos y reportes gerenciales." },
    { step: "4", title: "Reportes & alertas", desc: "Recibes reportes financieros mensuales y alertas proactivas ante cambios normativos o vencimientos importantes." },
  ];

  const testimonials = [
    {
      name: "Roberto Quispe",
      role: "Gerente General — Importadora Andina SAC",
      date: "Febrero 2026",
      text: "Llevábamos 2 años con contingencias tributarias que ningún contador anterior pudo resolver. BG Contable las identificó en el primer mes y las regularizó sin multas. Increíble.",
      stars: 5,
    },
    {
      name: "Mariela Torres",
      role: "Socia — Estudio Jurídico Torres & Asociados",
      date: "Diciembre 2025",
      text: "Por fin tenemos estados financieros que podemos entender y usar para tomar decisiones. El reporte mensual es claro, puntual y nos ha ayudado a crecer un 30% este año.",
      stars: 5,
    },
    {
      name: "Carlos Mendoza",
      role: "Fundador — Constructora Mendoza e Hijos",
      date: "Marzo 2026",
      text: "Pasamos de pagar S/ 2,800/mes en contabilidad con errores constantes a pagar S/ 900 con BG Contable y cero observaciones de SUNAT. La mejor inversión que hemos hecho.",
      stars: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-background" style={{ fontFamily: "'Montserrat', sans-serif" }}>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col justify-end" style={{ minHeight: "100svh" }}>
        <div className="absolute inset-0 z-0">
          <img src={service.images[0]} alt="BG Contable" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(8,43,58,0.35) 0%, rgba(8,43,58,0.62) 55%, rgba(8,43,58,0.88) 100%)" }} />
        </div>
        <div className="relative z-10 container mx-auto px-6 pb-16 pt-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border text-xs font-bold uppercase tracking-widest"
            style={{ borderColor: GOLD_HEX + "60", color: GOLD_HEX, background: "rgba(214,168,63,0.10)", backdropFilter: "blur(8px)" }}
          >
            📊 BG Contable — Expertos tributarios
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.35 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-none max-w-3xl"
            style={{ fontFamily: "'Cormorant Garamond', serif", textShadow: "0 4px 32px rgba(0,0,0,0.5)" }}
          >
            Tu contabilidad,<br /><span style={{ color: GOLD_HEX }}>sin errores,</span><br />sin multas.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5 }}
            className="text-lg text-white/80 mb-6 max-w-xl font-light tracking-wide leading-relaxed"
          >
            Regularizamos y gestionamos tu contabilidad de forma impecable. Evita nuevas contingencias con SUNAT y mantén tu negocio al día con total tranquilidad.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.55 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border mb-8 text-xs sm:text-sm font-semibold tracking-wide"
            style={{ borderColor: `${GOLD_HEX}60`, background: "rgba(214,168,63,0.12)", color: "#FFFFFF" }}
          >
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: GOLD_HEX }} />
            <span>TU DECLARACION MENSUAL PDT 601 Y 621 DESDE 150 SOLES</span>
          </motion.div>
          <div>
            <motion.a
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.65 }}
              href="https://wa.me/51994118084?text=Hola, me interesa el servicio de BG Contable. Quisiera solicitar un diagnóstico de salud tributaria."
              target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-black text-base transition-all hover:scale-105 hover:shadow-2xl"
              style={{ backgroundColor: GOLD_HEX, boxShadow: `0 8px 32px ${GOLD_HEX}55` }}
            >
              <MessageCircle size={20} /> Solicitar diagnóstico de salud tributaria
            </motion.a>
          </div>
        </div>
        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.8 }}
          className="relative z-10 w-full"
          style={{ background: "rgba(8,43,58,0.82)", backdropFilter: "blur(12px)", borderTop: `1px solid ${GOLD_HEX}40` }}
        >
          <div className="container mx-auto px-6 py-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {service.stats.map((s) => (
              <div key={s.label} className="flex flex-col items-center">
                <span className="text-2xl font-extrabold" style={{ color: GOLD_HEX, fontFamily: "'Cormorant Garamond', serif" }}>{s.value}</span>
                <span className="text-white/55 text-xs tracking-wide mt-0.5">{s.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── FEATURES GRID ── */}
      <section className="py-24" style={{ background: "var(--background)" }}>
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-1 h-10 rounded-full" style={{ backgroundColor: GOLD_HEX }} />
              <p className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: GOLD_HEX }}>Servicios completos</p>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground ml-6 leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              ¿Qué incluye BG Contable?
            </h2>
            <p className="text-muted-foreground mt-3 ml-6 max-w-xl text-sm leading-relaxed">
              Un ecosistema contable completo para que nunca más tengas que preocuparte por SUNAT.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {service.features.map((feat, i) => (
              <motion.div
                key={feat}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                className="flex items-start gap-3.5 p-5 rounded-2xl border transition-all hover:scale-[1.02] hover:shadow-lg"
                style={{ background: "rgba(10, 47, 63, 0.45)", borderColor: `${GOLD_HEX}30` }}
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-black text-xs font-bold shadow-md" style={{ backgroundColor: GOLD_HEX }}>
                  {i + 1}
                </div>
                <p className="text-foreground text-sm font-medium leading-snug pt-1">{feat}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALERÍA ── */}
      <section className="py-6 px-4 md:px-6" style={{ background: "var(--background)" }}>
        <div className="container mx-auto">
          <div className="grid grid-cols-3 gap-3" style={{ height: "clamp(260px,42vw,460px)" }}>
            <div className="col-span-2 rounded-2xl overflow-hidden relative group">
              <img src={service.images[0]} alt="BG Contable" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: `linear-gradient(to top, ${GOLD_HEX}55, transparent)` }} />
              <div className="absolute bottom-4 left-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white font-bold text-base" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Contabilidad estratégica</p>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              {[service.images[1], service.images[2]].map((img, idx) => (
                <div key={idx} className="flex-1 rounded-2xl overflow-hidden relative group">
                  <img src={img} alt={`Contable ${idx + 2}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "linear-gradient(to top,rgba(0,0,0,0.55),transparent)" }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PILARES DE VALOR ── */}
      <section className="py-24" style={{ background: "rgba(255,255,255,0.03)" }}>
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <p className="text-xs font-bold tracking-[0.2em] uppercase mb-3" style={{ color: GOLD_HEX }}>La diferencia BG Contable</p>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Por qué elegirnos
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((p, i) => (
              <motion.div
                key={p.num}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.15 }}
                className="relative p-8 rounded-2xl border"
                style={{ borderColor: `${GOLD_HEX}30`, background: `linear-gradient(135deg, ${GOLD_HEX}0A, transparent)` }}
              >
                <div className="text-5xl font-extrabold mb-2 opacity-15 select-none" style={{ color: GOLD_HEX, fontFamily: "'Cormorant Garamond', serif" }}>{p.num}</div>
                <div className="text-3xl mb-3 -mt-6">{p.icon}</div>
                <h3 className="text-xl font-bold text-foreground mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{p.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{p.text}</p>
                <div className="absolute top-0 left-0 w-full h-1 rounded-t-2xl" style={{ background: `linear-gradient(to right, ${GOLD_HEX}, transparent)` }} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESO ── */}
      <section className="py-24" style={{ background: "var(--background)" }}>
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-14">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-1 h-10 rounded-full" style={{ backgroundColor: GOLD_HEX }} />
              <p className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: GOLD_HEX }}>Así trabajamos</p>
            </div>
            <h2 className="text-4xl font-bold text-foreground ml-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Nuestro proceso</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative p-7 rounded-2xl border group hover:border-opacity-60 transition-all"
                style={{ borderColor: `${GOLD_HEX}25`, background: `${GOLD_HEX}06` }}
              >
                <div className="text-4xl font-black mb-4 leading-none" style={{ color: GOLD_HEX, fontFamily: "'Cormorant Garamond', serif", opacity: 0.35 }}>{item.step}</div>
                <h4 className="text-base font-bold text-foreground mb-2">{item.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALES ── */}
      <section className="py-24" style={{ background: "rgba(214,168,63,0.04)", borderTop: `1px solid ${GOLD_HEX}20` }}>
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <p className="text-xs font-bold tracking-[0.2em] uppercase mb-3" style={{ color: GOLD_HEX }}>Nuestros clientes hablan</p>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Resultados reales</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.15 }}
                className="p-8 rounded-2xl border"
                style={{ background: `${GOLD_HEX}07`, border: `1px solid ${GOLD_HEX}25` }}
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.stars }).map((_, si) => (<Star key={si} size={14} fill={GOLD_HEX} style={{ color: GOLD_HEX }} />))}
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6 italic">"{t.text}"</p>
                <div className="flex items-center gap-3 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.10)" }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-black font-bold text-sm flex-shrink-0" style={{ backgroundColor: GOLD_HEX }}>
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-foreground text-sm font-bold">{t.name}</p>
                    <p className="text-muted-foreground text-xs">{t.role} · {t.date}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ASESOR / CONTADOR ── */}
      {service.advisor && <AdvisorSection advisor={service.advisor} color={GOLD_HEX} email={service.email} />}

      {/* ── FAQs ── */}
      {service.faqs?.length > 0 && (
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6 max-w-3xl">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-1 h-10 rounded-full" style={{ backgroundColor: GOLD_HEX }} />
                <p className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: GOLD_HEX }}>Resolvemos tus dudas</p>
              </div>
              <h2 className="text-4xl font-bold text-foreground ml-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Preguntas frecuentes</h2>
            </motion.div>
            <div className="space-y-3">
              {service.faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={faq.q}
                    className="border rounded-2xl overflow-hidden transition-all duration-300"
                    style={{
                      borderColor: isOpen ? GOLD_HEX + "60" : "rgba(255,255,255,0.1)",
                      backgroundColor: isOpen ? GOLD_HEX + "0A" : "transparent",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between px-5 py-4 text-left gap-4 cursor-pointer"
                    >
                      <span className="font-semibold text-foreground text-sm leading-snug">{faq.q}</span>
                      <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>
                        <ChevronDown size={18} style={{ color: GOLD_HEX }} />
                      </motion.div>
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-4 text-muted-foreground text-sm leading-relaxed border-t border-white/10 pt-3">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA FINAL ── */}
      <section className="py-28 text-center" style={{ background: `linear-gradient(135deg, ${GOLD_HEX}12, transparent 60%)`, borderTop: `1px solid ${GOLD_HEX}25` }}>
        <div className="container mx-auto px-6 max-w-2xl">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <p className="text-xs font-bold tracking-[0.2em] uppercase mb-4" style={{ color: GOLD_HEX }}>¿Listo para proteger tu empresa?</p>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Diagnóstico de<br />salud tributaria <span style={{ color: GOLD_HEX }}>especializado.</span>
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed mb-10">
              Revisamos tu situación contable y tributaria actual en 30 minutos. Sin compromisos, con soluciones reales.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://wa.me/51994118084?text=Hola, quiero solicitar el diagnóstico de salud tributaria de BG Contable"
                target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-3 px-10 py-4 rounded-full font-bold text-black text-base transition-all hover:scale-105 hover:shadow-2xl"
                style={{ backgroundColor: GOLD_HEX, boxShadow: `0 8px 32px ${GOLD_HEX}45` }}
              >
                <MessageCircle size={20} /> Quiero mi diagnóstico →
              </a>
              {service.email && (
                <a
                  href={`mailto:${service.email}`}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white bg-white/10 hover:bg-white/20 border border-white/25 transition-all hover:scale-105 text-base"
                >
                  <Mail size={18} style={{ color: GOLD_HEX }} /> {service.email}
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

/* ======================================================
   FINANZAS PAGE — BMG Dark · Gold · MBS-inspired
   ====================================================== */
const FinanzasPage = ({ service }: { service: Service }) => {
  const GOLD_HEX = "var(--brand-gold)";

  const pillars = [
    {
      icon: "📈",
      num: "01",
      title: "Diagnóstico en 48 horas",
      text: "Analizamos la salud financiera de tu empresa en tiempo récord: liquidez, rentabilidad, solvencia y eficiencia. Identificamos riesgos ocultos y oportunidades de mejora con datos concretos.",
    },
    {
      icon: "🏦",
      num: "02",
      title: "Acceso real al financiamiento",
      text: "Preparamos el expediente financiero completo y negociamos directamente con bancos, COFIDE y fondos de inversión. Tasas competitivas, plazos adecuados y garantías optimizadas para tu empresa.",
    },
    {
      icon: "🎯",
      num: "03",
      title: "Estrategia financiera a largo plazo",
      text: "No solo resolvemos el presente: diseñamos la hoja de ruta financiera de tu empresa para los próximos 3-5 años. Planificación, proyecciones, KPIs financieros y metas alcanzables.",
    },
  ];

  const services_list = [
    { icon: "📊", label: "Análisis EBITDA & ratios" },
    { icon: "💰", label: "Flujo de caja proyectado" },
    { icon: "🔍", label: "Due diligence financiero" },
    { icon: "🏗️", label: "Evaluación de proyectos TIR/VAN" },
    { icon: "🔄", label: "Reestructuración de deudas" },
    { icon: "📋", label: "Presupuesto estratégico anual" },
    { icon: "🤝", label: "Fusiones y adquisiciones" },
    { icon: "📉", label: "Valorización de empresas" },
  ];

  const testimonials = [
    {
      name: "Ing. Luis Herrera",
      role: "CEO — Grupo Constructor Herrera SAC",
      date: "Enero 2026",
      text: "BG Finanzas nos ayudó a reestructurar S/ 1.2 millones en deuda bancaria, reduciendo nuestra tasa promedio del 18% al 11%. En 6 meses recuperamos la liquidez que necesitábamos para crecer.",
      stars: 5,
    },
    {
      name: "Dra. Sandra Campos",
      role: "Directora — Clínica Campos Salud",
      date: "Noviembre 2025",
      text: "Necesitábamos financiamiento para expandir la clínica y habíamos sido rechazados dos veces. BG Finanzas preparó nuestro expediente, negociaron con tres bancos y conseguimos el crédito en 3 semanas.",
      stars: 5,
    },
    {
      name: "Familia Vásquez",
      role: "Propietarios — Agropecuaria Valle Verde",
      date: "Abril 2026",
      text: "Por primera vez en 15 años tenemos un presupuesto financiero real, estados financieros mensuales y sabemos exactamente cuánto vale nuestra empresa. Eso no tiene precio.",
      stars: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-background" style={{ fontFamily: "'Montserrat', sans-serif" }}>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col justify-end" style={{ minHeight: "100svh" }}>
        <div className="absolute inset-0 z-0">
          <img src="/images/emprendedor.jpeg" alt="BG Finanzas" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(8,43,58,0.30) 0%, rgba(8,43,58,0.58) 50%, rgba(8,43,58,0.90) 100%)" }} />
        </div>
        <div className="relative z-10 container mx-auto px-6 pb-16 pt-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border text-xs font-bold uppercase tracking-widest"
            style={{ borderColor: GOLD_HEX + "60", color: GOLD_HEX, background: "rgba(214,168,63,0.10)", backdropFilter: "blur(8px)" }}
          >
            💹 BG Finanzas — Consultoría financiera estratégica
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.35 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-none max-w-4xl"
            style={{ fontFamily: "'Cormorant Garamond', serif", textShadow: "0 4px 32px rgba(0,0,0,0.5)" }}
          >
            Decisiones financieras<br /><span style={{ color: GOLD_HEX }}>que transforman</span><br />tu empresa.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5 }}
            className="text-lg text-white/70 mb-10 max-w-lg font-light tracking-wide"
          >
            Análisis financiero profundo, acceso a financiamiento real y estrategia de crecimiento sostenible para tu negocio.
          </motion.p>
          <motion.a
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.65 }}
            href="https://wa.me/51994118084?text=Hola, me interesa el servicio de BG Finanzas. Quiero un diagnóstico financiero gratuito."
            target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-black text-base transition-all hover:scale-105 hover:shadow-2xl"
            style={{ backgroundColor: GOLD_HEX, boxShadow: `0 8px 32px ${GOLD_HEX}55` }}
          >
            <MessageCircle size={20} /> Diagnóstico financiero gratis
          </motion.a>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.8 }}
          className="relative z-10 w-full"
          style={{ background: "rgba(8,43,58,0.82)", backdropFilter: "blur(12px)", borderTop: `1px solid ${GOLD_HEX}40` }}
        >
          <div className="container mx-auto px-6 py-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {service.stats.map((s) => (
              <div key={s.label} className="flex flex-col items-center">
                <span className="text-2xl font-extrabold" style={{ color: GOLD_HEX, fontFamily: "'Cormorant Garamond', serif" }}>{s.value}</span>
                <span className="text-white/55 text-xs tracking-wide mt-0.5 leading-tight px-1">{s.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── SERVICIOS GRID ── */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-1 h-10 rounded-full" style={{ backgroundColor: GOLD_HEX }} />
              <p className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: GOLD_HEX }}>Alcance del servicio</p>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground ml-6 leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              ¿Qué incluye BG Finanzas?
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {service.features.map((feat, i) => (
              <motion.div
                key={feat}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.07 }}
                className="flex items-start gap-3 p-5 rounded-2xl border transition-all hover:scale-[1.02] hover:shadow-lg"
                style={{ background: `${GOLD_HEX}0A`, borderColor: `${GOLD_HEX}30` }}
              >
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-black text-xs font-bold" style={{ backgroundColor: GOLD_HEX }}>
                  {i + 1}
                </div>
                <p className="text-foreground text-sm font-medium leading-snug">{feat}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALERÍA ── */}
      <section className="py-6 px-4 md:px-6 bg-background">
        <div className="container mx-auto">
          <div className="grid grid-cols-3 gap-3" style={{ height: "clamp(260px,42vw,460px)" }}>
            <div className="col-span-2 rounded-2xl overflow-hidden relative group">
              <img src="/images/emprendedor.jpeg" alt="BG Finanzas" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: `linear-gradient(to top, ${GOLD_HEX}55, transparent)` }} />
              <div className="absolute bottom-4 left-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white font-bold text-base" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Consultoría financiera estratégica</p>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              {[service.images[1], service.images[2]].map((img, idx) => (
                <div key={idx} className="flex-1 rounded-2xl overflow-hidden relative group">
                  <img src={img} alt={`Finanzas ${idx + 2}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "linear-gradient(to top,rgba(0,0,0,0.55),transparent)" }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PILARES DE VALOR ── */}
      <section className="py-24" style={{ background: "rgba(214,168,63,0.03)", borderTop: `1px solid ${GOLD_HEX}18` }}>
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <p className="text-xs font-bold tracking-[0.2em] uppercase mb-3" style={{ color: GOLD_HEX }}>La diferencia BG Finanzas</p>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Por qué elegirnos</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((p, i) => (
              <motion.div
                key={p.num}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.15 }}
                className="relative p-8 rounded-2xl border"
                style={{ borderColor: `${GOLD_HEX}30`, background: `linear-gradient(135deg, ${GOLD_HEX}0A, transparent)` }}
              >
                <div className="text-5xl font-extrabold mb-2 opacity-15 select-none" style={{ color: GOLD_HEX, fontFamily: "'Cormorant Garamond', serif" }}>{p.num}</div>
                <div className="text-3xl mb-3 -mt-6">{p.icon}</div>
                <h3 className="text-xl font-bold text-foreground mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{p.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{p.text}</p>
                <div className="absolute top-0 left-0 w-full h-1 rounded-t-2xl" style={{ background: `linear-gradient(to right, ${GOLD_HEX}, transparent)` }} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ÍCONOS SERVICIOS ── */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Áreas de consultoría financiera</h2>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {services_list.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }}
                className="flex flex-col items-center gap-3 p-6 rounded-2xl border text-center transition-all hover:scale-[1.03]"
                style={{ borderColor: `${GOLD_HEX}25`, background: `${GOLD_HEX}06` }}
              >
                <span className="text-3xl">{item.icon}</span>
                <span className="text-foreground text-xs font-semibold leading-tight">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALES ── */}
      <section className="py-24" style={{ background: "rgba(214,168,63,0.04)", borderTop: `1px solid ${GOLD_HEX}20` }}>
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <p className="text-xs font-bold tracking-[0.2em] uppercase mb-3" style={{ color: GOLD_HEX }}>Casos de éxito</p>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Resultados que hablan</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.15 }}
                className="p-8 rounded-2xl border"
                style={{ background: `${GOLD_HEX}07`, border: `1px solid ${GOLD_HEX}25` }}
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.stars }).map((_, si) => (<Star key={si} size={14} fill={GOLD_HEX} style={{ color: GOLD_HEX }} />))}
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6 italic">"{t.text}"</p>
                <div className="flex items-center gap-3 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.10)" }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-black font-bold text-sm flex-shrink-0" style={{ backgroundColor: GOLD_HEX }}>
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-foreground text-sm font-bold">{t.name}</p>
                    <p className="text-muted-foreground text-xs">{t.role} · {t.date}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQs ── */}
      {service.faqs?.length > 0 && (
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6 max-w-3xl">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-1 h-10 rounded-full" style={{ backgroundColor: GOLD_HEX }} />
                <p className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: GOLD_HEX }}>Resolvemos tus dudas</p>
              </div>
              <h2 className="text-4xl font-bold text-foreground ml-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Preguntas frecuentes</h2>
            </motion.div>
            <div className="space-y-3">
              {service.faqs.map((faq) => (<FaqItemDark key={faq.q} q={faq.q} a={faq.a} color={GOLD_HEX} />))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA FINAL ── */}
      <section className="py-28 text-center" style={{ background: `linear-gradient(135deg, ${GOLD_HEX}12, transparent 60%)`, borderTop: `1px solid ${GOLD_HEX}25` }}>
        <div className="container mx-auto px-6 max-w-2xl">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <p className="text-xs font-bold tracking-[0.2em] uppercase mb-4" style={{ color: GOLD_HEX }}>¿Tu empresa necesita claridad financiera?</p>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Diagnóstico financiero<br /><span style={{ color: GOLD_HEX }}>en 48 horas.</span>
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed mb-10">
              Analizamos la salud financiera de tu empresa y te entregamos un plan de acción concreto. Sin costo, sin compromiso.
            </p>
            <a
              href="https://wa.me/51994118084?text=Hola, quiero el diagnóstico financiero gratuito de BG Finanzas"
              target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-3 px-10 py-4 rounded-full font-bold text-black text-base transition-all hover:scale-105 hover:shadow-2xl"
              style={{ backgroundColor: GOLD_HEX, boxShadow: `0 8px 32px ${GOLD_HEX}45` }}
            >
              <MessageCircle size={20} /> Quiero mi diagnóstico →
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};


/* ======================================================
   EMPRENDEDOR PAGE — BMG Dark · Orange · ASEP-inspired
   ====================================================== */

const EmprendedorPage = ({ service }: { service: Service }) => {
  const GOLD_HEX = "var(--brand-gold)";
  const ORANGE = "var(--brand-sky)";
  const process = [
    { step: "1", icon: "💡", title: "Validamos tu idea", desc: "Aterrizamos tu propuesta de valor, público objetivo, costos y primera ruta comercial para confirmar que el negocio puede crecer." },
    { step: "2", icon: "🏢", title: "Constituimos tu empresa", desc: "Elegimos la estructura correcta — S.A.C., S.A., S.A.A., S.C.R.L., E.I.R.L. o persona natural con negocio — y gestionamos nombre, minuta, notaría y SUNARP." },
    { step: "3", icon: "🧾", title: "Te inscribimos en SUNAT", desc: "Obtenemos RUC, Clave SOL, régimen tributario, facturación electrónica y primeros lineamientos contables para operar formalmente." },
    { step: "4", icon: "🤝", title: "Te acompañamos 90 días", desc: "Ordenamos precios, procesos, impuestos, ventas y gestión inicial para que el negocio no se quede solo después de formalizarse." },
  ];
  const impact = [
    "75% de empresas cierra en 3 años sin asesoría",
    "95% son MYPES en Perú",
    "BG Emprendedor rompe esa estadística",
  ];
  const testimonials = [
    { name: "María Fernanda Ríos", business: "Cafetería artesanal — Surco", result: "Constituyó su SAC en 18 días", text: "Llegué con una idea y muchas dudas. BG Emprendedor ordenó mis costos, mi RUC y mis primeros permisos. Hoy vendo con factura y atiendo empresas." },
    { name: "Jorge Huamán", business: "Servicios eléctricos — Villa El Salvador", result: "Formalizó y ganó sus primeros contratos", text: "Antes trabajaba informal. En 30 días tenía empresa, cuenta bancaria y propuesta comercial. Ahora puedo cotizar a clientes grandes." },
    { name: "Claudia Paredes", business: "Tienda online de cosmética", result: "Activó facturación electrónica y precios rentables", text: "Me ayudaron a entender impuestos, margen y canales de venta. La mentoría de 90 días fue clave para no perderme." },
  ];
  const wa = "https://wa.me/51994118084?text=Hola, quiero asesoría para formalizar mi negocio con BG Emprendedor";
  return (
    <div className="min-h-screen bg-background" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      {/* @section: hero-emprendedor */}
      <section className="relative min-h-screen flex flex-col justify-end" style={{ minHeight: "100svh" }}>
        <div className="absolute inset-0 z-0">
          <img src={service.images[0]} alt="Emprendedora peruana" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(8,43,58,0.30) 0%, rgba(8,43,58,0.62) 55%, rgba(8,43,58,0.88) 100%)" }} />
        </div>
        <div className="relative z-10 container mx-auto px-6 pb-16 pt-32">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border text-xs font-bold uppercase tracking-widest" style={{ borderColor: ORANGE + "70", color: ORANGE, background: "rgba(78,159,194,0.14)", backdropFilter: "blur(8px)" }}>🚀 BG Emprendedor</motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.35 }} className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-6 leading-none max-w-4xl" style={{ fontFamily: "'Cormorant Garamond', serif", textShadow: "0 4px 32px rgba(0,0,0,0.55)" }}>Del sueño<br />al negocio:<br /><span style={{ color: ORANGE }}>hazlo realidad.</span></motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5 }} className="text-lg sm:text-xl text-white/70 mb-10 max-w-xl font-light tracking-wide">Potencia tu negocio con asesoría experta, red de contactos y herramientas probadas.</motion.p>
          <motion.a initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.65 }} href={wa} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-black text-base transition-all hover:scale-105 hover:shadow-2xl" style={{ backgroundColor: GOLD_HEX, boxShadow: `0 8px 32px ${GOLD_HEX}55` }}><MessageCircle size={20} /> Primera consulta sin costo</motion.a>
        </div>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.8 }} className="relative z-10 w-full" style={{ background: "rgba(8,43,58,0.82)", backdropFilter: "blur(12px)", borderTop: `1px solid ${GOLD_HEX}40` }}>
          <div className="container mx-auto px-6 py-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">{service.stats.map((s) => (<div key={s.label} className="flex flex-col items-center"><span className="text-2xl font-extrabold" style={{ color: GOLD_HEX, fontFamily: "'Cormorant Garamond', serif" }}>{s.value}</span><span className="text-white/55 text-xs tracking-wide mt-0.5 leading-tight px-1">{s.label}</span></div>))}</div>
        </motion.div>
      </section>

      {/* @section: mission-emprendedor */}
      <section className="py-24" style={{ background: "rgba(78,159,194,0.06)", borderTop: `1px solid ${ORANGE}20` }}>
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="max-w-4xl mx-auto text-center">
            <p className="text-xs font-bold tracking-[0.2em] uppercase mb-4" style={{ color: GOLD_HEX }}>Misión emprendedora BMG</p>
            <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Hagamos del Perú el mejor país para emprender</h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-10">BG Emprendedor existe para que ningún negocio peruano se quede pequeño por falta de guía. Convertimos la energía del emprendedor MYPE en empresas formales, ordenadas y listas para vender, contratar, facturar y crecer con visión.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">{impact.map((item, i) => (<motion.div key={item} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="p-6 rounded-2xl border text-center" style={{ borderColor: GOLD_HEX + "30", background: GOLD_HEX + "0A" }}><p className="text-foreground font-bold leading-snug">{item}</p></motion.div>))}</div>
        </div>
      </section>

      {/* @section: features-emprendedor */}
      <section className="py-24" style={{ background: "var(--background)" }}><div className="container mx-auto px-6"><motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12"><div className="flex items-center gap-4 mb-3"><div className="w-1 h-10 rounded-full" style={{ backgroundColor: GOLD_HEX }} /><p className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: GOLD_HEX }}>Herramientas para emprender</p></div><h2 className="text-4xl lg:text-5xl font-bold text-foreground ml-6 leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>¿Qué incluye BG Emprendedor?</h2></motion.div><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">{service.features.map((feat, i) => (<motion.div key={feat} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.07 }} className="flex items-start gap-3 p-5 rounded-2xl border transition-all hover:scale-[1.02] hover:shadow-lg" style={{ background: `${GOLD_HEX}0A`, borderColor: `${GOLD_HEX}30` }}><div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-black text-xs font-bold" style={{ backgroundColor: GOLD_HEX }}>{i + 1}</div><p className="text-foreground text-sm font-medium leading-snug">{feat}</p></motion.div>))}</div></div></section>

      {/* @section: proceso-emprendedor */}
      <section className="py-24" style={{ background: "rgba(255,255,255,0.02)" }}><div className="container mx-auto px-6"><motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-14"><div className="flex items-center gap-4 mb-3"><div className="w-1 h-10 rounded-full" style={{ backgroundColor: GOLD_HEX }} /><p className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: GOLD_HEX }}>Ruta emprendedora</p></div><h2 className="text-4xl lg:text-5xl font-bold text-foreground ml-6 leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>De idea a empresa en 4 pasos</h2></motion.div><div className="grid grid-cols-1 md:grid-cols-2 gap-6">{process.map((p, i) => (<motion.div key={p.step} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="relative p-8 rounded-2xl border overflow-hidden" style={{ borderColor: `${GOLD_HEX}30`, background: `linear-gradient(135deg, ${GOLD_HEX}0A, transparent)` }}><div className="absolute -right-2 -top-8 text-8xl font-extrabold select-none" style={{ color: ORANGE, opacity: 0.15, fontFamily: "'Cormorant Garamond', serif" }}>{p.step}</div><div className="text-4xl mb-4">{p.icon}</div><h3 className="text-2xl font-bold text-foreground mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{p.title}</h3><p className="text-muted-foreground text-sm leading-relaxed max-w-xl">{p.desc}</p></motion.div>))}</div></div></section>

      {/* @section: galeria-emprendedor */}
      <section className="py-6 px-4 md:px-6" style={{ background: "var(--background)" }}><div className="container mx-auto"><motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="grid grid-cols-3 gap-3" style={{ height: "clamp(260px,42vw,460px)" }}><div className="col-span-2 rounded-2xl overflow-hidden relative group"><img src={service.images[0]} alt="Emprendimiento peruano" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" /><div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: `linear-gradient(to top, ${GOLD_HEX}55, transparent)` }} /></div><div className="flex flex-col gap-3"><div className="flex-1 rounded-2xl overflow-hidden"><img src={service.images[1]} alt="Mentoría emprendedora" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" /></div><div className="flex-1 rounded-2xl overflow-hidden"><img src={service.images[2]} alt="Negocio formalizado" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" /></div></div></motion.div></div></section>

      {/* @section: testimonios-emprendedor */}
      <section className="py-24" style={{ background: "rgba(214,168,63,0.04)", borderTop: `1px solid ${GOLD_HEX}20` }}><div className="container mx-auto px-6"><motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16"><p className="text-xs font-bold tracking-[0.2em] uppercase mb-3" style={{ color: GOLD_HEX }}>Historias emprendedoras</p><h2 className="text-4xl lg:text-5xl font-bold text-foreground" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Resultados que inspiran</h2></motion.div><div className="grid grid-cols-1 md:grid-cols-3 gap-6">{testimonials.map((t, i) => (<motion.div key={t.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.15 }} className="p-8 rounded-2xl border" style={{ background: `${GOLD_HEX}07`, border: `1px solid ${GOLD_HEX}25` }}><div className="flex gap-1 mb-4">{Array.from({ length: 5 }).map((_, si) => (<Star key={si} size={14} fill={GOLD_HEX} style={{ color: GOLD_HEX }} />))}</div><p className="text-muted-foreground text-sm leading-relaxed mb-5 italic">&quot;{t.text}&quot;</p><p className="font-bold text-foreground text-sm">{t.name}</p><p className="text-muted-foreground text-xs mt-1">{t.business}</p><p className="mt-4 text-xs font-bold rounded-full inline-flex px-3 py-1" style={{ background: GOLD_HEX + "18", color: GOLD_HEX }}>{t.result}</p></motion.div>))}</div></div></section>

      {/* @section: asesor-emprendedor */}
      {service.advisor && <AdvisorSection advisor={service.advisor} color={GOLD_HEX} email={service.email} />}

      {/* @section: faqs-emprendedor */}
      {service.faqs?.length > 0 && (<section className="py-24 bg-background"><div className="container mx-auto px-6 max-w-3xl"><motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12"><div className="flex items-center gap-4 mb-3"><div className="w-1 h-10 rounded-full" style={{ backgroundColor: GOLD_HEX }} /><p className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: GOLD_HEX }}>Resolvemos tus dudas</p></div><h2 className="text-4xl font-bold text-foreground ml-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Preguntas frecuentes</h2></motion.div><div className="space-y-3">{service.faqs.map((faq) => (<FaqItemDark key={faq.q} q={faq.q} a={faq.a} color={GOLD_HEX} />))}</div></div></section>)}
      {/* @section: cta-final-emprendedor */}
      <section className="py-28 text-center" style={{ background: `linear-gradient(135deg, ${GOLD_HEX}12, transparent 60%)`, borderTop: `1px solid ${GOLD_HEX}25` }}><div className="container mx-auto px-6 max-w-2xl"><motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}><p className="text-xs font-bold tracking-[0.2em] uppercase mb-4" style={{ color: GOLD_HEX }}>Primera consulta sin costo</p><h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Formaliza tu negocio<br /><span style={{ color: GOLD_HEX }}>sin caminar solo.</span></h2><p className="text-muted-foreground text-base leading-relaxed mb-10">Cuéntanos en qué etapa estás y te damos una ruta clara para constituir, ordenar y empezar a crecer.</p><div className="flex flex-wrap items-center justify-center gap-4"><a href={wa} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 px-10 py-4 rounded-full font-bold text-black text-base transition-all hover:scale-105 hover:shadow-2xl" style={{ backgroundColor: GOLD_HEX, boxShadow: `0 8px 32px ${GOLD_HEX}45` }}><MessageCircle size={20} /> Primera consulta sin costo →</a>{service.email && (<a href={`mailto:${service.email}`} className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white bg-white/10 hover:bg-white/20 border border-white/25 transition-all hover:scale-105 text-base"><Mail size={18} style={{ color: GOLD_HEX }} /> {service.email}</a>)}</div></motion.div></div></section>
    </div>
  );
};

/* ======================================================
   IA PAGE — BMG Dark · Gold · KREO-inspired
   ====================================================== */
const IAPage = ({ service }: { service: Service }) => {
  const GOLD_HEX = "var(--brand-gold)";
  const ORANGE = "var(--brand-sky)";
  const wa = "https://wa.me/51994118084?text=Hola, quiero un diagnóstico IA gratuito para mi empresa con BG Desarrollo IA";
  const solutions = [
    { icon: "🎬", title: "Producción Audiovisual IA", desc: "Videos, voces, música, piezas publicitarias y contenido generativo para campañas más rápidas y memorables.", img: "/images/publicidad2_2.jpeg" },
    { icon: "🤖", title: "Agentes & Automatización", desc: "Asistentes IA para WhatsApp, web y CRM que responden, califican leads y ejecutan tareas 24/7.", img: "/images/publicidad.jpeg" },
    { icon: "💻", title: "Software & SaaS IA", desc: "Aplicaciones internas, dashboards, flujos con API y productos SaaS potenciados con modelos de IA.", img: "/images/publicidad2_4.jpeg" },
  ];
  const testimonials = [
    { name: "Innova Retail Perú", role: "E-commerce", result: "Atención 24/7 y 38% menos consultas manuales", text: "El agente IA filtró preguntas repetitivas, capturó leads y elevó la velocidad de respuesta del equipo comercial." },
    { name: "Grupo Andes Servicios", role: "Operaciones", result: "Reportes automáticos cada mañana", text: "Automatizamos tareas de seguimiento con Make y n8n. El equipo recuperó horas semanales sin perder control." },
    { name: "Marca Local 360", role: "Marketing", result: "Contenido audiovisual 3x más rápido", text: "Pasamos de producir piezas sueltas a un flujo completo de video, voz y copies asistidos por IA." },
  ];
  return (
    <div className="min-h-screen bg-background" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      {/* @section: hero-ia */}
      <section className="relative min-h-screen flex flex-col justify-end overflow-hidden" style={{ minHeight: "100svh" }}>
        <div className="absolute inset-0 z-0">
          <img src={service.images[0]} alt="BG Desarrollo IA" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(8,43,58,0.35) 0%, rgba(8,43,58,0.62) 55%, rgba(8,43,58,0.88) 100%)" }} />
        </div>
        <div className="relative z-10 container mx-auto px-6 pb-16 pt-32">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border text-xs font-bold uppercase tracking-widest" style={{ borderColor: ORANGE + "70", color: ORANGE, background: "rgba(78,159,194,0.10)", backdropFilter: "blur(8px)" }}>🤖 IA Empresarial</motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.35 }} className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-none max-w-3xl" style={{ fontFamily: "'Cormorant Garamond', serif", textShadow: "0 4px 32px rgba(0,0,0,0.5)" }}>Automatiza tu empresa.<br />Escala con<br /><span style={{ color: ORANGE }}>Inteligencia Artificial</span></motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5 }} className="text-lg text-white/85 mb-9 max-w-xl leading-relaxed font-light tracking-wide">Soluciones IA concretas para reducir costos, acelerar procesos y convertir tu conocimiento empresarial en agentes, automatizaciones y software medible.</motion.p>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.65 }} className="flex flex-wrap gap-4">
            <a href={wa} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-black transition-all hover:scale-105 hover:shadow-2xl" style={{ backgroundColor: GOLD_HEX, boxShadow: `0 8px 32px ${GOLD_HEX}55` }}><MessageCircle size={20} /> Diagnóstico IA gratis</a>
            <a href="#soluciones-ia" className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-white border border-white/20 hover:border-white/50 hover:bg-white/10 transition-all">Ver casos de uso</a>
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.8 }} className="relative z-10 w-full" style={{ background: "rgba(8,43,58,0.82)", backdropFilter: "blur(12px)", borderTop: `1px solid ${GOLD_HEX}40` }}>
          <div className="container mx-auto px-6 py-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {service.stats.map((s) => (<div key={s.label} className="flex flex-col items-center"><span className="text-2xl font-extrabold" style={{ color: GOLD_HEX, fontFamily: "'Cormorant Garamond', serif" }}>{s.value}</span><span className="text-white/55 text-xs tracking-wide mt-0.5 leading-tight px-1">{s.label}</span></div>))}
          </div>
        </motion.div>
      </section>

      {/* @section: features-ia */}
      <section className="py-24" style={{ background: "var(--background)" }}><div className="container mx-auto px-6"><motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12"><div className="flex items-center gap-4 mb-3"><div className="w-1 h-10 rounded-full" style={{ backgroundColor: GOLD_HEX }} /><p className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: GOLD_HEX }}>Capacidades IA</p></div><h2 className="text-4xl lg:text-5xl font-bold text-foreground ml-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Automatización aplicada a resultados</h2></motion.div><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">{service.features.map((feat, i) => (<motion.div key={feat} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.07 }} className="flex items-start gap-3 p-5 rounded-2xl border transition-all hover:scale-[1.02] hover:shadow-lg" style={{ background: `${GOLD_HEX}0A`, borderColor: `${GOLD_HEX}30` }}><div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-black text-xs font-bold" style={{ backgroundColor: GOLD_HEX }}>{i + 1}</div><p className="text-foreground text-sm font-medium leading-snug">{feat}</p></motion.div>))}</div></div></section>
      {/* @section: soluciones-ia */}
      <section id="soluciones-ia" className="py-24" style={{ background: "rgba(78,159,194,0.06)", borderTop: `1px solid ${ORANGE}20` }}><div className="container mx-auto px-6"><motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16"><p className="text-xs font-bold tracking-[0.2em] uppercase mb-3" style={{ color: GOLD_HEX }}>Creatividad Híbrida en Acción</p><h2 className="text-4xl lg:text-6xl font-bold text-foreground" style={{ fontFamily: "'Cormorant Garamond', serif" }}>IA que transforma tu negocio</h2></motion.div><div className="grid grid-cols-1 lg:grid-cols-3 gap-6">{solutions.map((s, i) => (<motion.div key={s.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.12 }} className="group rounded-3xl overflow-hidden border" style={{ borderColor: GOLD_HEX + "30", background: GOLD_HEX + "0A" }}><div className="h-72 overflow-hidden relative"><img src={s.img} alt={s.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" /><div className="absolute inset-0" style={{ background: `linear-gradient(to top, rgba(0,0,0,0.84), ${ORANGE}22, transparent)` }} /></div><div className="p-7"><div className="text-4xl mb-4">{s.icon}</div><h3 className="text-2xl font-bold text-foreground mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{s.title}</h3><p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p></div></motion.div>))}</div></div></section>
      {/* @section: galeria-ia */}
      <section className="py-6 px-4 md:px-6" style={{ background: "var(--background)" }}><div className="container mx-auto"><motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="grid grid-cols-3 gap-3" style={{ height: "clamp(260px,42vw,460px)" }}><div className="col-span-2 rounded-2xl overflow-hidden relative group"><img src={service.images[0]} alt="Automatización IA" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" /><div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: `linear-gradient(to top, ${GOLD_HEX}55, transparent)` }} /></div><div className="flex flex-col gap-3"><div className="flex-1 rounded-2xl overflow-hidden"><img src={service.images[1]} alt="Producción IA" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" /></div><div className="flex-1 rounded-2xl overflow-hidden"><img src={service.images[2]} alt="Software IA" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" /></div></div></motion.div></div></section>
      {/* @section: testimonios-ia */}
      <section className="py-24" style={{ background: "rgba(214,168,63,0.04)", borderTop: `1px solid ${GOLD_HEX}20` }}><div className="container mx-auto px-6"><motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16"><p className="text-xs font-bold tracking-[0.2em] uppercase mb-3" style={{ color: GOLD_HEX }}>Empresas aumentadas con IA</p><h2 className="text-4xl lg:text-5xl font-bold text-foreground" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Casos de adopción inteligente</h2></motion.div><div className="grid grid-cols-1 md:grid-cols-3 gap-6">{testimonials.map((t, i) => (<motion.div key={t.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.15 }} className="p-8 rounded-2xl border" style={{ background: `${GOLD_HEX}07`, border: `1px solid ${GOLD_HEX}25` }}><div className="flex gap-1 mb-4">{Array.from({ length: 5 }).map((_, si) => (<Star key={si} size={14} fill={GOLD_HEX} style={{ color: GOLD_HEX }} />))}</div><p className="text-muted-foreground text-sm leading-relaxed mb-5 italic">&quot;{t.text}&quot;</p><p className="font-bold text-foreground text-sm">{t.name}</p><p className="text-muted-foreground text-xs mt-1">{t.role}</p><p className="mt-4 text-xs font-bold rounded-full inline-flex px-3 py-1" style={{ background: GOLD_HEX + "18", color: GOLD_HEX }}>{t.result}</p></motion.div>))}</div></div></section>
      {service.advisor && <AdvisorSection advisor={service.advisor} color={GOLD_HEX} email={service.email} />}

      {/* @section: faqs-ia */}
      {service.faqs?.length > 0 && (<section className="py-24 bg-background"><div className="container mx-auto px-6 max-w-3xl"><motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12"><div className="flex items-center gap-4 mb-3"><div className="w-1 h-10 rounded-full" style={{ backgroundColor: GOLD_HEX }} /><p className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: GOLD_HEX }}>Resolvemos tus dudas</p></div><h2 className="text-4xl font-bold text-foreground ml-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Preguntas frecuentes</h2></motion.div><div className="space-y-3">{service.faqs.map((faq) => (<FaqItemDark key={faq.q} q={faq.q} a={faq.a} color={GOLD_HEX} />))}</div></div></section>)}
      {/* @section: cta-final-ia */}
      <section className="py-28 text-center" style={{ background: `linear-gradient(135deg, ${GOLD_HEX}12, transparent 60%)`, borderTop: `1px solid ${GOLD_HEX}25` }}><div className="container mx-auto px-6 max-w-2xl"><motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}><p className="text-xs font-bold tracking-[0.2em] uppercase mb-4" style={{ color: GOLD_HEX }}>Diagnóstico IA gratuito</p><h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Detectemos qué proceso<br /><span style={{ color: GOLD_HEX }}>puede automatizarse primero.</span></h2><p className="text-muted-foreground text-base leading-relaxed mb-10">Revisamos tu operación y te proponemos una hoja de ruta IA con impacto rápido, medible y escalable.</p><div className="flex flex-wrap items-center justify-center gap-4"><a href={wa} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 px-10 py-4 rounded-full font-bold text-black text-base transition-all hover:scale-105 hover:shadow-2xl" style={{ backgroundColor: GOLD_HEX, boxShadow: `0 8px 32px ${GOLD_HEX}45` }}><MessageCircle size={20} /> Diagnóstico IA gratuito →</a>{service.email && (<a href={`mailto:${service.email}`} className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white bg-white/10 hover:bg-white/20 border border-white/25 transition-all hover:scale-105 text-base"><Mail size={18} style={{ color: GOLD_HEX }} /> {service.email}</a>)}</div></motion.div></div></section>
      <OfertasMesModal />
    </div>

  );
};

/* ======================================================
   SERVICE DETAIL FULL — dark theme (otros servicios)
   ====================================================== */
const ServiceDetailFull = ({ service }: { service: Service }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      key={service.id}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="py-16"
    >
      <div className="container mx-auto px-4">

        {/* Back button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-sm font-semibold mb-10 transition-all hover:gap-3"
          style={{ color: service.color }}
        >
          <ChevronLeft size={16} /> Volver al inicio
        </motion.button>

        {/* HEADER ROW: Logo + tagline + description + stats */}
        <div className="flex flex-col lg:flex-row gap-10 items-start mb-14">
          <div className="flex-1">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="mb-5"
            >
              <div
                className="inline-block w-20 h-20 rounded-2xl overflow-hidden shadow-2xl border-2"
                style={{ borderColor: service.color, boxShadow: `0 8px 40px ${service.color}60` }}
              >
                <img src={service.logo} alt={service.name} className="w-full h-full object-cover service-logo-tint" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
              style={{ backgroundColor: service.color + "25", color: service.color, border: `1px solid ${service.color}50` }}
            >
              {service.icon} {service.name}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl lg:text-4xl font-bold text-foreground mb-4"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {service.tagline}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="text-base text-muted-foreground leading-relaxed mb-4"
            >
              {service.description}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28 }}
              className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-xl"
            >
              {service.longDescription}
            </motion.p>

            <div className="flex flex-wrap items-center gap-3">
              <motion.a
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                href={`https://wa.me/51994118084?text=Hola, me interesa el servicio de ${service.name}. ${service.cta}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-bold text-foreground transition-all hover:scale-105 hover:shadow-xl"
                style={{ backgroundColor: service.color, boxShadow: `0 6px 24px ${service.color}50` }}
              >
                <MessageCircle size={18} /> {service.cta}
              </motion.a>
              {service.email && (
                <a
                  href={`mailto:${service.email}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white/90 bg-white/5 hover:bg-white/10 border border-white/20 transition-all hover:scale-105 text-sm"
                >
                  <Mail size={16} style={{ color: service.color }} /> {service.email}
                </a>
              )}
            </div>
          </div>

          {/* Stats grid 2x2 */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:w-80 w-full"
          >
            <div className="grid grid-cols-2 gap-4">
              {service.stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.07 }}
                  className="flex flex-col items-center justify-center p-5 rounded-2xl border text-center"
                  style={{
                    borderColor: service.color + "40",
                    background: `linear-gradient(135deg, ${service.color}15, ${service.color}05)`,
                    boxShadow: `0 4px 20px ${service.color}15`,
                  }}
                >
                  <div className="text-2xl font-extrabold mb-1" style={{ color: service.color }}>
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground font-medium leading-tight text-center">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* GALLERY */}
        {service.images && service.images.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-3 gap-3 mb-14 isolate"
            style={{ height: "300px" }}
          >
            <div
              className="col-span-2 rounded-3xl overflow-hidden relative shadow-2xl"
              style={{ boxShadow: `0 16px 50px ${service.color}30`, minHeight: 0 }}
            >
              <img
                src={service.images[0]}
                alt={`${service.name} principal`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                style={{ display: "block" }}
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: `linear-gradient(to top, ${service.color}50, transparent 60%)` }}
              />
              <div className="absolute bottom-3 left-4">
                <span
                  className="px-3 py-1 rounded-full text-xs font-bold text-white"
                  style={{ backgroundColor: service.color }}
                >
                  {service.name}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-3" style={{ minHeight: 0 }}>
              {service.images.slice(1, 3).map((img, idx) => (
                <div
                  key={idx}
                  className="flex-1 rounded-2xl overflow-hidden shadow-lg"
                  style={{ boxShadow: `0 8px 24px ${service.color}20`, minHeight: 0 }}
                >
                  <img
                    src={img}
                    alt={`${service.name} ${idx + 2}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    style={{ display: "block" }}
                  />
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* FEATURES GRID */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mb-14"
        >
          <h3
            className="text-xl font-bold text-foreground mb-6"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            ¿Qué incluye {service.name}?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {service.features.map((feat, i) => (
              <motion.div
                key={feat}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.06 }}
                className="flex items-start gap-3 p-4 rounded-2xl border transition-all hover:scale-[1.02] hover:shadow-lg"
                style={{
                  backgroundColor: service.color + "0D",
                  borderColor: service.color + "35",
                  boxShadow: `0 2px 16px ${service.color}10`,
                }}
              >
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-white text-xs font-bold"
                  style={{ backgroundColor: service.color }}
                >
                  {i + 1}
                </div>
                <p className="text-foreground text-sm font-medium leading-snug">{feat}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQs */}
        {service.faqs && service.faqs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="mb-10"
          >
            <h3
              className="text-xl font-bold text-foreground mb-6"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Preguntas frecuentes
            </h3>
            <div className="space-y-3 max-w-3xl">
              {service.faqs.map((faq) => (
                <FaqItemDark key={faq.q} q={faq.q} a={faq.a} color={service.color} />
              ))}
            </div>
          </motion.div>
        )}

        {/* CTA BOTTOM BANNER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="rounded-3xl p-8 text-center"
          style={{
            background: `linear-gradient(135deg, ${service.color}20, ${service.color}08)`,
            border: `1px solid ${service.color}40`,
          }}
        >
          <div className="text-3xl mb-2">{service.icon}</div>
          <h4
            className="text-2xl font-bold text-foreground mb-2"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            ¿Listo para comenzar?
          </h4>
          <p className="text-muted-foreground mb-5 text-sm">
            Nuestro equipo de expertos está listo para ayudarte. Contáctanos y recibe asesoría sin costo.
          </p>
          <a
            href={`https://wa.me/51994118084?text=Hola! Quiero información sobre ${service.name}. ${service.cta}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-white text-base transition-all hover:scale-105 hover:shadow-xl"
            style={{ backgroundColor: service.color, boxShadow: `0 8px 28px ${service.color}50` }}
          >
            <MessageCircle size={18} /> {service.cta}
          </a>
        </motion.div>

      </div>
    </motion.div>
  );
};

/* ======================================================
   FOOTER BMG
   ====================================================== */
const Footer = ({ travelTheme = false }: { travelTheme?: boolean }) => {
  const navigate = useNavigate();
  const mapsGpsUrl = "https://maps.google.com/?q=Av.+Agust%C3%ADn+Gamarra+1132%2C+Segundo+Piso%2C+Oficina+226%2C+Galer%C3%ADa+Brisas%2C+La+Victoria%2C+Lima";

  return (
    <footer
      className="py-10 border-t"
      style={
        travelTheme
          ? { background: "var(--brand-navy)", borderColor: "rgba(214,168,63,0.2)" }
          : { background: "var(--background)", borderColor: "rgba(255,255,255,0.1)" }
      }
    >
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
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <img src="/logos/bmg_clean.png?v=5" alt="BMG" className="h-10 w-auto object-contain" />
          <div className="flex flex-col sm:flex-row items-center gap-3 text-xs pl-0 sm:pl-3 sm:border-l sm:border-white/15">
            <a
              href="mailto:gestion@bmgconsultores.site"
              className="flex items-center gap-1.5 text-white/70 hover:text-[#D6A83F] transition-colors"
            >
              <Mail size={13} className="text-[#D6A83F]" /> gestion@bmgconsultores.site
            </a>
            <span className="hidden sm:inline text-white/20">·</span>
            <a
              href="https://wa.me/51994118084"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-white/70 hover:text-[#4E9FC2] transition-colors"
            >
              <Phone size={13} className="text-[#4E9FC2]" /> +51 994 118 084
            </a>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          {services.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => navigate(`/${s.id}`)}
              className="text-white/50 text-xs hover:text-[#D6A83F] cursor-pointer transition-colors"
            >
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
          navigate("/#quienes-somos");
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

/* ======================================================
   WHATSAPP FAB
   ====================================================== */
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
    <motion.div
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ repeat: Infinity, duration: 2, repeatDelay: 3 }}
    >
      <MessageCircle size={26} fill="white" />
    </motion.div>
  </motion.a>
);

/* ======================================================
   GESTORES PAGE — BMG Dark · Gold · Robles-Ibazeta-inspired
   ====================================================== */
const LobbyPage = ({ service }: { service: Service }) => {
  const GOLD_HEX = "var(--brand-gold)";

  const etapas = [
    {
      icon: "📋",
      num: "01",
      title: "Inscripción en el RNP",
      desc: "Gestionamos tu inscripción o renovación en el Registro Nacional de Proveedores del OSCE para bienes, servicios y ejecución de obras. Sin RNP, no puedes participar: lo resolvemos en 5–15 días hábiles.",
    },
    {
      icon: "🤝",
      num: "02",
      title: "Contratos Asociativos / Consorcios",
      desc: "Formamos consorcios estratégicos entre empresas para cumplir requisitos de experiencia en las bases. Redactamos el contrato de consorcio, acuerdos internos y toda la documentación societaria necesaria.",
    },
    {
      icon: "📊",
      num: "03",
      title: "Consultoría en Proceso de Selección",
      desc: "Revisamos bases integradas, identificamos impedimentos, preparamos propuestas técnicas y económicas ganadoras, y te acompañamos en cada etapa: convocatoria, consultas, absoluciones y buena pro.",
    },
    {
      icon: "⚖️",
      num: "04",
      title: "Solución de Controversias",
      desc: "Representamos al cliente en conciliaciones y arbitrajes ante el Tribunal de Contrataciones del Estado. Gestionamos apelaciones, adicionales, ampliaciones de plazo, penalidades e incumplimientos.",
    },
  ];

  const pillars = [
    {
      icon: "🏆",
      num: "01",
      title: "80% de tasa de adjudicación",
      text: "Hemos gestionado más de 300 procesos en el SEACE con un 80% de adjudicaciones exitosas. Nuestro equipo conoce las bases, los pliegos y las estrategias que marcan la diferencia entre ganar y quedar fuera.",
    },
    {
      icon: "🔍",
      num: "02",
      title: "Monitoreo diario del SEACE",
      text: "Rastreamos diariamente el SEACE para alertarte de nuevas convocatorias que encajen con el perfil de tu empresa. No te pierdas ninguna oportunidad por falta de información o tiempos mal gestionados.",
    },
    {
      icon: "📜",
      num: "03",
      title: "Expertos en Ley N.° 30225",
      text: "Conocemos la Ley de Contrataciones del Estado y su reglamento al detalle. Minimizamos riesgos legales, garantizamos el cumplimiento normativo y te protegemos ante cualquier fiscalización o controversia.",
    },
  ];

  const process = [
    { step: "1", title: "Diagnóstico gratuito", desc: "Evaluamos el perfil de tu empresa, tu RNP, experiencia acumulada y las categorías donde tienes mayor potencial de adjudicación." },
    { step: "2", title: "Selección de procesos", desc: "Identificamos en el SEACE los procesos más competitivos para tu empresa según tu sector, capacidad técnica y económica." },
    { step: "3", title: "Elaboración de propuesta", desc: "Preparamos toda la documentación: oferta técnica, oferta económica, acreditaciones, cartas fianza y garantías requeridas." },
    { step: "4", title: "Ejecución y seguimiento", desc: "Acompañamos la ejecución del contrato: adicionales, ampliaciones, penalidades y liquidación final. Contigo de inicio a fin." },
  ];

  const testimonials = [
    {
      name: "Empresa Constructora Horizonte SAC",
      role: "Lima, Perú",
      date: "Enero 2026",
      text: "Nunca habíamos participado en licitaciones del Estado. BG Gestores nos inscribió en el RNP, identificó 3 procesos viables y ganamos la primera buena pro en menos de 60 días. El Estado ahora es nuestro mejor cliente.",
      stars: 5,
    },
    {
      name: "Distribuidora Andina del Perú EIRL",
      role: "Arequipa, Perú",
      date: "Febrero 2026",
      text: "Habíamos perdido dos licitaciones por errores en la propuesta técnica. Con BG Gestores cambiamos la estrategia y ganamos el proceso de suministro al municipio distrital por S/ 850,000. Inversión que se pagó sola.",
      stars: 5,
    },
    {
      name: "Consorcio TecnoVial",
      role: "Lima — Cusco",
      date: "Marzo 2026",
      text: "BG Gestores formó el consorcio entre dos empresas, gestionó todos los contratos asociativos y preparó la propuesta para una obra vial. Adjudicamos por S/ 3.2 millones. Su dominio de la Ley 30225 es impresionante.",
      stars: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-background" style={{ fontFamily: "'Montserrat', sans-serif" }}>

      {/* @section: hero */}
      <section className="relative min-h-screen flex flex-col justify-end" style={{ minHeight: "100svh" }}>
        <div className="absolute inset-0 z-0">
          <img src={service.images[0]} alt="BG Gestores" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(8,43,58,0.30) 0%, rgba(8,43,58,0.60) 55%, rgba(8,43,58,0.90) 100%)" }} />
        </div>
        <div className="relative z-10 container mx-auto px-6 pb-16 pt-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border text-xs font-bold uppercase tracking-widest"
            style={{ borderColor: GOLD_HEX + "60", color: GOLD_HEX, background: "rgba(214,168,63,0.10)", backdropFilter: "blur(8px)" }}
          >
            🏛️ BG Gestores — Contrataciones con el Estado
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.35 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-none max-w-3xl"
            style={{ fontFamily: "'Cormorant Garamond', serif", textShadow: "0 4px 32px rgba(0,0,0,0.5)" }}
          >
            El Estado es<br /><span style={{ color: GOLD_HEX }}>tu mejor cliente.</span><br />Nosotros te llevamos.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5 }}
            className="text-lg text-white/70 mb-10 max-w-lg font-light tracking-wide"
          >
            Especialistas en contrataciones públicas que te guían desde la inscripción en el RNP hasta la adjudicación de la buena pro y ejecución contractual.
          </motion.p>
          <motion.a
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.65 }}
            href="https://wa.me/51994118084?text=Hola, quiero saber cómo licitar con el Estado. Me interesa BG Gestores."
            target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-black text-base transition-all hover:scale-105 hover:shadow-2xl"
            style={{ backgroundColor: GOLD_HEX, boxShadow: `0 8px 32px ${GOLD_HEX}55` }}
          >
            <MessageCircle size={20} /> Quiero licitar con el Estado
          </motion.a>
        </div>
        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.8 }}
          className="relative z-10 w-full"
          style={{ background: "rgba(8,43,58,0.82)", backdropFilter: "blur(12px)", borderTop: `1px solid ${GOLD_HEX}40` }}
        >
          <div className="container mx-auto px-6 py-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {service.stats.map((s) => (
              <div key={s.label} className="flex flex-col items-center">
                <span className="text-2xl font-extrabold" style={{ color: GOLD_HEX, fontFamily: "'Cormorant Garamond', serif" }}>{s.value}</span>
                <span className="text-white/55 text-xs tracking-wide mt-0.5 leading-tight px-1">{s.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* @section: features */}
      <section className="py-24" style={{ background: "var(--background)" }}>
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-1 h-10 rounded-full" style={{ backgroundColor: GOLD_HEX }} />
              <p className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: GOLD_HEX }}>Servicios completos SEACE</p>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground ml-6 leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              ¿Qué incluye BG Gestores?
            </h2>
            <p className="text-muted-foreground mt-3 ml-6 max-w-xl text-sm leading-relaxed">
              Cubrimos todo el ciclo de contratación pública: desde el RNP y la búsqueda de oportunidades hasta la ejecución del contrato y la resolución de controversias.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {service.features.map((feat, i) => (
              <motion.div
                key={feat}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.07 }}
                className="flex items-start gap-3 p-5 rounded-2xl border transition-all hover:scale-[1.02] hover:shadow-lg"
                style={{ background: `${GOLD_HEX}0A`, borderColor: `${GOLD_HEX}30` }}
              >
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-black text-xs font-bold" style={{ backgroundColor: GOLD_HEX }}>
                  {i + 1}
                </div>
                <p className="text-foreground text-sm font-medium leading-snug">{feat}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* @section: etapas */}
      <section className="py-24" style={{ background: "rgba(255,255,255,0.02)" }}>
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-14">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-1 h-10 rounded-full" style={{ backgroundColor: GOLD_HEX }} />
              <p className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: GOLD_HEX }}>Etapas de contratación</p>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground ml-6 leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Te acompañamos en cada etapa
            </h2>
            <p className="text-muted-foreground mt-3 ml-6 max-w-xl text-sm leading-relaxed">
              Desde la preparación del proveedor hasta la ejecución del contrato y liquidación. Un socio estratégico en todo el ciclo.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {etapas.map((e, i) => (
              <motion.div
                key={e.num}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative p-8 rounded-2xl border"
                style={{ borderColor: `${GOLD_HEX}30`, background: `linear-gradient(135deg, ${GOLD_HEX}0A, transparent)` }}
              >
                <div className="absolute top-0 left-0 w-full h-1 rounded-t-2xl" style={{ background: `linear-gradient(to right, ${GOLD_HEX}, transparent)` }} />
                <div className="flex items-start gap-5">
                  <div className="text-4xl flex-shrink-0 mt-1">{e.icon}</div>
                  <div>
                    <div className="text-xs font-bold tracking-widest mb-1" style={{ color: GOLD_HEX }}>{e.num}</div>
                    <h3 className="text-lg font-bold text-foreground mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{e.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{e.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* @section: galeria */}
      <section className="py-6 px-4 md:px-6" style={{ background: "var(--background)" }}>
        <div className="container mx-auto">
          <div className="grid grid-cols-3 gap-3" style={{ height: "clamp(260px,42vw,460px)" }}>
            <div className="col-span-2 rounded-2xl overflow-hidden relative group">
              <img src={service.images[0]} alt="BG Gestores" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: `linear-gradient(to top, ${GOLD_HEX}55, transparent)` }} />
              <div className="absolute bottom-4 left-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white font-bold text-base" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Contrataciones con el Estado</p>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              {[service.images[1], service.images[2]].map((img, idx) => (
                <div key={idx} className="flex-1 rounded-2xl overflow-hidden relative group">
                  <img src={img} alt={`Lobby ${idx + 2}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "linear-gradient(to top,rgba(0,0,0,0.55),transparent)" }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* @section: pilares */}
      <section className="py-24" style={{ background: "rgba(255,255,255,0.03)" }}>
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <p className="text-xs font-bold tracking-[0.2em] uppercase mb-3" style={{ color: GOLD_HEX }}>La diferencia BG Gestores</p>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Por qué elegirnos
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((p, i) => (
              <motion.div
                key={p.num}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.15 }}
                className="relative p-8 rounded-2xl border"
                style={{ borderColor: `${GOLD_HEX}30`, background: `linear-gradient(135deg, ${GOLD_HEX}0A, transparent)` }}
              >
                <div className="text-5xl font-extrabold mb-2 opacity-15 select-none" style={{ color: GOLD_HEX, fontFamily: "'Cormorant Garamond', serif" }}>{p.num}</div>
                <div className="text-3xl mb-3 -mt-6">{p.icon}</div>
                <h3 className="text-xl font-bold text-foreground mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{p.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{p.text}</p>
                <div className="absolute top-0 left-0 w-full h-1 rounded-t-2xl" style={{ background: `linear-gradient(to right, ${GOLD_HEX}, transparent)` }} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* @section: proceso */}
      <section className="py-24" style={{ background: "var(--background)" }}>
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-14">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-1 h-10 rounded-full" style={{ backgroundColor: GOLD_HEX }} />
              <p className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: GOLD_HEX }}>Así trabajamos</p>
            </div>
            <h2 className="text-4xl font-bold text-foreground ml-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Nuestro proceso</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative p-7 rounded-2xl border"
                style={{ borderColor: `${GOLD_HEX}25`, background: `${GOLD_HEX}06` }}
              >
                <div className="text-4xl font-black mb-4 leading-none" style={{ color: GOLD_HEX, fontFamily: "'Cormorant Garamond', serif", opacity: 0.35 }}>{item.step}</div>
                <h4 className="text-base font-bold text-foreground mb-2">{item.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* @section: testimonios */}
      <section className="py-24" style={{ background: "rgba(214,168,63,0.04)", borderTop: `1px solid ${GOLD_HEX}20` }}>
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <p className="text-xs font-bold tracking-[0.2em] uppercase mb-3" style={{ color: GOLD_HEX }}>Empresas que ya licitaron</p>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Resultados reales</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.15 }}
                className="p-8 rounded-2xl"
                style={{ background: `${GOLD_HEX}07`, border: `1px solid ${GOLD_HEX}25` }}
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.stars }).map((_, si) => (<Star key={si} size={14} fill={GOLD_HEX} style={{ color: GOLD_HEX }} />))}
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6 italic">"{t.text}"</p>
                <div className="flex items-center gap-3 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.10)" }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-black font-bold text-sm flex-shrink-0" style={{ backgroundColor: GOLD_HEX }}>
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-foreground text-sm font-bold">{t.name}</p>
                    <p className="text-muted-foreground text-xs">{t.role} · {t.date}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* @section: asesor-legal */}
      {service.advisor && <AdvisorSection advisor={service.advisor} color={GOLD_HEX} email={service.email} />}

      {/* @section: faqs */}
      {service.faqs?.length > 0 && (
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6 max-w-3xl">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-1 h-10 rounded-full" style={{ backgroundColor: GOLD_HEX }} />
                <p className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: GOLD_HEX }}>Resolvemos tus dudas</p>
              </div>
              <h2 className="text-4xl font-bold text-foreground ml-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Preguntas frecuentes</h2>
            </motion.div>
            <div className="space-y-3">
              {service.faqs.map((faq) => (<FaqItemDark key={faq.q} q={faq.q} a={faq.a} color={GOLD_HEX} />))}
            </div>
          </div>
        </section>
      )}

      {/* @section: cta-final */}
      <section className="py-28 text-center" style={{ background: `linear-gradient(135deg, ${GOLD_HEX}12, transparent 60%)`, borderTop: `1px solid ${GOLD_HEX}25` }}>
        <div className="container mx-auto px-6 max-w-2xl">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <p className="text-xs font-bold tracking-[0.2em] uppercase mb-4" style={{ color: GOLD_HEX }}>¿Tu empresa lista para licitar?</p>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              El Estado peruano<br />puede ser tu <span style={{ color: GOLD_HEX }}>mejor cliente.</span>
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed mb-10">
              Diagnóstico gratuito de tu perfil como proveedor del Estado. Identificamos en qué procesos tienes mayores probabilidades de adjudicación — sin costo, sin compromiso.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://wa.me/51994118084?text=Hola, quiero el diagnóstico gratuito para licitar con el Estado con BG Gestores"
                target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-3 px-10 py-4 rounded-full font-bold text-black text-base transition-all hover:scale-105 hover:shadow-2xl"
                style={{ backgroundColor: GOLD_HEX, boxShadow: `0 8px 32px ${GOLD_HEX}45` }}
              >
                <MessageCircle size={20} /> Diagnóstico gratuito →
              </a>
              {service.email && (
                <a
                  href={`mailto:${service.email}`}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white bg-white/10 hover:bg-white/20 border border-white/25 transition-all hover:scale-105 text-base"
                >
                  <Mail size={18} style={{ color: GOLD_HEX }} /> {service.email}
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

/* ======================================================
   JURIDICO PAGE — BMG Dark · Gold · Lexy-inspired
   ====================================================== */
const JuridicoPage = ({ service }: { service: Service }) => {
  const GOLD_HEX = "var(--brand-gold)";

  const areas = [
    { icon: "🏢", title: "Derecho Corporativo", desc: "Constitución, fusiones, adquisiciones, disolución y reestructuración de empresas. Protegemos tu patrimonio societario en cada etapa." },
    { icon: "👥", title: "Derecho Laboral", desc: "Contratos de trabajo, desvinculaciones, conciliaciones y defensa ante demandas. Cumplimiento normativo y cero contingencias laborales." },
    { icon: "📝", title: "Contratos Comerciales", desc: "Redacción y revisión de contratos de compraventa, prestación de servicios, arrendamiento, franquicia y todos los acuerdos que rigen tu operación." },
    { icon: "⚖️", title: "Arbitraje y Litigios", desc: "Representación ante el Poder Judicial, Tribunal de OSCE, Indecopi y organismos reguladores. Estrategia jurídica orientada a resultados concretos." },
    { icon: "🔖", title: "Propiedad Intelectual", desc: "Registro de marcas, patentes, derechos de autor y denominaciones de origen ante Indecopi. Protegemos el activo más valioso de tu empresa." },
    { icon: "🛡️", title: "Compliance Corporativo", desc: "Prevención de lavado de activos (SAGRILAFT), protección de datos personales (Ley 29733) y gobierno corporativo para empresas de todos los tamaños." },
    { icon: "🌐", title: "Comercio Exterior", desc: "Asesoría en importaciones, exportaciones, regímenes aduaneros, drawback y contratos internacionales bajo normativa INCOTERMS vigente." },
  ];

  const pillars = [
    {
      icon: "🎯",
      num: "01",
      title: "Prevención antes que litigio",
      text: "Como Lexy, nuestra filosofía es anticiparnos a los riesgos legales antes de que se conviertan en problemas. Auditamos contratos, procesos y relaciones comerciales para blindar tu empresa de forma preventiva.",
    },
    {
      icon: "🤝",
      num: "02",
      title: "Equipo multidisciplinario",
      text: "Más de 15 abogados especializados en derecho corporativo, laboral, tributario, comercial y propiedad intelectual. Una cobertura legal completa bajo un solo proveedor de confianza.",
    },
    {
      icon: "⚡",
      num: "03",
      title: "Respuesta en 48 horas",
      text: "Cada consulta recibe una respuesta inicial en menos de 48 horas. Sabemos que en los negocios el tiempo es dinero: actuamos con la urgencia que tu empresa necesita.",
    },
  ];

  const process = [
    { step: "1", title: "Consulta gratuita", desc: "30 minutos sin costo para conocer tu caso, evaluar riesgos y orientarte sobre los pasos a seguir. Sin compromisos." },
    { step: "2", title: "Diagnóstico legal", desc: "Análisis profundo de contratos, relaciones laborales, situación corporativa y exposición regulatoria de tu empresa." },
    { step: "3", title: "Estrategia jurídica", desc: "Plan de acción claro con prioridades, plazos y presupuesto definido. Sin letra pequeña, sin sorpresas." },
    { step: "4", title: "Acompañamiento continuo", desc: "Tu empresa siempre respaldada: alertas de cambios normativos, contratos actualizados y defensa proactiva." },
  ];

  const testimonials = [
    {
      name: "Rodrigo Salinas",
      role: "CEO — Constructora Salinas & Vega SAC",
      date: "Febrero 2026",
      text: "Un trabajador nos demandó por despido arbitrario y BG Jurídico manejó todo el proceso con total profesionalismo. Llegamos a una conciliación favorable sin llegar a juicio. En 6 semanas el caso cerrado.",
      stars: 5,
    },
    {
      name: "Empresa Textil Andina EIRL",
      role: "Lima, Perú",
      date: "Enero 2026",
      text: "Registramos nuestra marca ante Indecopi con BG Jurídico y el proceso fue impecable: búsqueda de anterioridad, solicitud y seguimiento sin ningún contratiempo. Ahora tenemos el certificado y dormimos tranquilos.",
      stars: 5,
    },
    {
      name: "Patricia Medina",
      role: "Socia Fundadora — PM Importaciones",
      date: "Marzo 2026",
      text: "Necesitábamos revisar 12 contratos con proveedores internacionales antes de firmar. BG Jurídico los analizó en 72 horas, identificó cláusulas riesgosas y negoció condiciones mucho más favorables para nosotros.",
      stars: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-background" style={{ fontFamily: "'Montserrat', sans-serif" }}>

      {/* @section: hero */}
      <section className="relative min-h-screen flex flex-col justify-end" style={{ minHeight: "100svh" }}>
        <div className="absolute inset-0 z-0">
          <img src={service.images[0]} alt="BG Jurídico" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(8,43,58,0.30) 0%, rgba(8,43,58,0.60) 55%, rgba(8,43,58,0.90) 100%)" }} />
        </div>
        <div className="relative z-10 container mx-auto px-6 pb-16 pt-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border text-xs font-bold uppercase tracking-widest"
            style={{ borderColor: GOLD_HEX + "60", color: GOLD_HEX, background: "rgba(214,168,63,0.10)", backdropFilter: "blur(8px)" }}
          >
            ⚖️ BG Jurídico — Protección legal empresarial
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.35 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-none max-w-3xl"
            style={{ fontFamily: "'Cormorant Garamond', serif", textShadow: "0 4px 32px rgba(0,0,0,0.5)" }}
          >
            Tu empresa protegida,<br /><span style={{ color: GOLD_HEX }}>sin riesgos legales,</span><br />sin sorpresas.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5 }}
            className="text-lg text-white/70 mb-10 max-w-lg font-light tracking-wide"
          >
            Abogados especializados que anticipan riesgos, protegen contratos y defienden tus intereses ante cualquier instancia legal.
          </motion.p>
          <motion.a
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.65 }}
            href="https://wa.me/51994118084?text=Hola, quiero agendar una consulta legal gratuita con BG Jurídico."
            target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-black text-base transition-all hover:scale-105 hover:shadow-2xl"
            style={{ backgroundColor: GOLD_HEX, boxShadow: `0 8px 32px ${GOLD_HEX}55` }}
          >
            <MessageCircle size={20} /> Consulta legal gratuita
          </motion.a>
        </div>
        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.8 }}
          className="relative z-10 w-full"
          style={{ background: "rgba(8,43,58,0.82)", backdropFilter: "blur(12px)", borderTop: `1px solid ${GOLD_HEX}40` }}
        >
          <div className="container mx-auto px-6 py-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {service.stats.map((s) => (
              <div key={s.label} className="flex flex-col items-center">
                <span className="text-2xl font-extrabold" style={{ color: GOLD_HEX, fontFamily: "'Cormorant Garamond', serif" }}>{s.value}</span>
                <span className="text-white/55 text-xs tracking-wide mt-0.5 leading-tight px-1">{s.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* @section: areas-practica */}
      <section className="py-24" style={{ background: "var(--background)" }}>
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-1 h-10 rounded-full" style={{ backgroundColor: GOLD_HEX }} />
              <p className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: GOLD_HEX }}>Cobertura legal completa</p>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground ml-6 leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Áreas de práctica
            </h2>
            <p className="text-muted-foreground mt-3 ml-6 max-w-xl text-sm leading-relaxed">
              Un equipo multidisciplinario que cubre todas las aristas legales de tu empresa — desde la constitución hasta la resolución de conflictos.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {service.features.map((feat, i) => (
              <motion.div
                key={feat}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.07 }}
                className="flex items-start gap-3 p-5 rounded-2xl border transition-all hover:scale-[1.02] hover:shadow-lg"
                style={{ background: `${GOLD_HEX}0A`, borderColor: `${GOLD_HEX}30` }}
              >
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-black text-xs font-bold" style={{ backgroundColor: GOLD_HEX }}>
                  {i + 1}
                </div>
                <p className="text-foreground text-sm font-medium leading-snug">{feat}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* @section: areas-especializadas */}
      <section className="py-24" style={{ background: "rgba(255,255,255,0.02)" }}>
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-14">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-1 h-10 rounded-full" style={{ backgroundColor: GOLD_HEX }} />
              <p className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: GOLD_HEX }}>Especialidades jurídicas</p>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground ml-6 leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Nuestras áreas de especialización
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {areas.map((area, i) => (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group p-7 rounded-2xl border transition-all duration-300 hover:scale-[1.02] hover:shadow-xl cursor-default"
                style={{ borderColor: `${GOLD_HEX}22`, background: `${GOLD_HEX}06` }}
              >
                <div className="text-4xl mb-4">{area.icon}</div>
                <h3 className="text-base font-bold text-foreground mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{area.title}</h3>
                <p className="text-muted-foreground text-xs leading-relaxed">{area.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* @section: galeria */}
      <section className="py-6 px-4 md:px-6" style={{ background: "var(--background)" }}>
        <div className="container mx-auto">
          <div className="grid grid-cols-3 gap-3" style={{ height: "clamp(260px,42vw,460px)" }}>
            <div className="col-span-2 rounded-2xl overflow-hidden relative group">
              <img src={service.images[0]} alt="BG Jurídico" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: `linear-gradient(to top, ${GOLD_HEX}55, transparent)` }} />
              <div className="absolute bottom-4 left-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white font-bold text-base" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Asesoría jurídica estratégica</p>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              {[service.images[1], service.images[2]].map((img, idx) => (
                <div key={idx} className="flex-1 rounded-2xl overflow-hidden relative group">
                  <img src={img} alt={`Jurídico ${idx + 2}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "linear-gradient(to top,rgba(0,0,0,0.55),transparent)" }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* @section: pilares */}
      <section className="py-24" style={{ background: "rgba(255,255,255,0.03)" }}>
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <p className="text-xs font-bold tracking-[0.2em] uppercase mb-3" style={{ color: GOLD_HEX }}>La diferencia BG Jurídico</p>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Por qué elegirnos
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((p, i) => (
              <motion.div
                key={p.num}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.15 }}
                className="relative p-8 rounded-2xl border"
                style={{ borderColor: `${GOLD_HEX}30`, background: `linear-gradient(135deg, ${GOLD_HEX}0A, transparent)` }}
              >
                <div className="text-5xl font-extrabold mb-2 opacity-15 select-none" style={{ color: GOLD_HEX, fontFamily: "'Cormorant Garamond', serif" }}>{p.num}</div>
                <div className="text-3xl mb-3 -mt-6">{p.icon}</div>
                <h3 className="text-xl font-bold text-foreground mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{p.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{p.text}</p>
                <div className="absolute top-0 left-0 w-full h-1 rounded-t-2xl" style={{ background: `linear-gradient(to right, ${GOLD_HEX}, transparent)` }} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* @section: proceso */}
      <section className="py-24" style={{ background: "var(--background)" }}>
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-14">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-1 h-10 rounded-full" style={{ backgroundColor: GOLD_HEX }} />
              <p className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: GOLD_HEX }}>Así trabajamos</p>
            </div>
            <h2 className="text-4xl font-bold text-foreground ml-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Nuestro proceso</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative p-7 rounded-2xl border"
                style={{ borderColor: `${GOLD_HEX}25`, background: `${GOLD_HEX}06` }}
              >
                <div className="text-4xl font-black mb-4 leading-none" style={{ color: GOLD_HEX, fontFamily: "'Cormorant Garamond', serif", opacity: 0.35 }}>{item.step}</div>
                <h4 className="text-base font-bold text-foreground mb-2">{item.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* @section: testimonios */}
      <section className="py-24" style={{ background: "rgba(214,168,63,0.04)", borderTop: `1px solid ${GOLD_HEX}20` }}>
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <p className="text-xs font-bold tracking-[0.2em] uppercase mb-3" style={{ color: GOLD_HEX }}>Nuestros clientes hablan</p>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Casos resueltos favorablemente</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.15 }}
                className="p-8 rounded-2xl"
                style={{ background: `${GOLD_HEX}07`, border: `1px solid ${GOLD_HEX}25` }}
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.stars }).map((_, si) => (<Star key={si} size={14} fill={GOLD_HEX} style={{ color: GOLD_HEX }} />))}
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6 italic">"{t.text}"</p>
                <div className="flex items-center gap-3 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.10)" }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-black font-bold text-sm flex-shrink-0" style={{ backgroundColor: GOLD_HEX }}>
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-foreground text-sm font-bold">{t.name}</p>
                    <p className="text-muted-foreground text-xs">{t.role} · {t.date}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* @section: faqs */}
      {service.faqs?.length > 0 && (
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6 max-w-3xl">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-1 h-10 rounded-full" style={{ backgroundColor: GOLD_HEX }} />
                <p className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: GOLD_HEX }}>Resolvemos tus dudas</p>
              </div>
              <h2 className="text-4xl font-bold text-foreground ml-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Preguntas frecuentes</h2>
            </motion.div>
            <div className="space-y-3">
              {service.faqs.map((faq) => (<FaqItemDark key={faq.q} q={faq.q} a={faq.a} color={GOLD_HEX} />))}
            </div>
          </div>
        </section>
      )}

      {/* @section: cta-final */}
      <section className="py-28 text-center" style={{ background: `linear-gradient(135deg, ${GOLD_HEX}12, transparent 60%)`, borderTop: `1px solid ${GOLD_HEX}25` }}>
        <div className="container mx-auto px-6 max-w-2xl">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <p className="text-xs font-bold tracking-[0.2em] uppercase mb-4" style={{ color: GOLD_HEX }}>¿Listo para blindar tu empresa?</p>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Primera consulta legal<br /><span style={{ color: GOLD_HEX }}>completamente gratis.</span>
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed mb-10">
              30 minutos con un abogado especializado para evaluar tu caso y trazarte el camino legal más seguro. Sin compromisos, con soluciones reales.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://wa.me/51994118084?text=Hola, quiero agendar mi consulta legal gratuita con BG Jurídico"
                target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-3 px-10 py-4 rounded-full font-bold text-black text-base transition-all hover:scale-105 hover:shadow-2xl"
                style={{ backgroundColor: GOLD_HEX, boxShadow: `0 8px 32px ${GOLD_HEX}45` }}
              >
                <MessageCircle size={20} /> Agendar consulta gratis →
              </a>
              {service.email && (
                <a
                  href={`mailto:${service.email}`}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white bg-white/10 hover:bg-white/20 border border-white/25 transition-all hover:scale-105 text-base"
                >
                  <Mail size={18} style={{ color: GOLD_HEX }} /> {service.email}
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

/* ======================================================
   INMOBILIARIO PAGE — BMG Dark · Violet · Definitive
   ====================================================== */
const InmobiliarioPage = ({ service }: { service: Service }) => {
  const GOLD = "var(--brand-gold)";
  const ACCENT = "var(--brand-sky)";
  const consultationUrl = `https://wa.me/51994118084?text=${encodeURIComponent(`Hola, quiero una consulta gratuita con ${service.name}`)}`;

  const pilares = [
    { num: "01", emoji: "🔍", title: "Due Diligence Riguroso", desc: "Validamos cada inmueble en SUNARP antes de firmar: partida registral, titularidad, cargas, hipotecas, embargos, licencias y riesgos ocultos." },
    { num: "02", emoji: "⚖️", title: "Respaldo Legal Total", desc: "Contratos blindados y sin letra pequeña. Revisamos minutas, arrendamientos, separación, compraventa, garantías y condiciones notariales." },
    { num: "03", emoji: "📈", title: "Inversión Inteligente", desc: "Estructuramos financiamiento, comparamos escenarios de rentabilidad y optimizamos impuestos para que la operación sea segura y rentable." }
  ];

  const testimonios = [
    { nombre: "Carlos Quispe Mamani", cargo: "Comprador · Lima", texto: "Compré mi departamento en San Isidro completamente seguro. BG revisó el título en SUNARP y detectó una hipoteca que el vendedor no mencionó. Ahorramos S/ 45,000 de problemas.", fecha: "Marzo 2025" },
    { nombre: "Inversiones Rojas SAC", cargo: "Empresa · Miraflores", texto: "Vendimos 3 locales comerciales en 60 días. BG nos estructuró los contratos, optimizó el IGV y cerró las operaciones sin contratiempos.", fecha: "Enero 2025" },
    { nombre: "Patricia Velasco", cargo: "Inversora · Surco", texto: "Primera vez invirtiendo en planos. BG revisó cada cláusula con la constructora y negoció condiciones que yo jamás hubiera conseguido sola.", fecha: "Abril 2025" }
  ];

  return (
    <div className="min-h-screen bg-background" style={{ fontFamily: "'Montserrat', sans-serif" }}>

      {/* HERO */}
      <section style={{ position: 'relative', height: '100svh', minHeight: 680 }}>
        <img src={service.images[0]} alt={service.name} style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom, rgba(8,43,58,0.60) 0%, rgba(8,43,58,0.92) 100%)' }} />
        <div style={{ position:'relative', zIndex:10, height:'100%', display:'flex', flexDirection:'column', justifyContent:'center', padding:'3rem clamp(1.25rem, 5vw, 4rem) 10rem' }}>
          <motion.span
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
            style={{ display:'inline-flex', alignItems:'center', gap:8, background:`${ACCENT}22`, border:`1px solid ${ACCENT}55`, color:ACCENT, borderRadius:999, padding:'6px 16px', fontSize:12, fontWeight:600, letterSpacing:'0.1em', textTransform:'uppercase', width:'fit-content', marginBottom:24 }}
          >
            🏢 {service.name}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.35 }}
            style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:'clamp(2.5rem,5vw,4rem)', fontWeight:700, color:'white', lineHeight:1.1, marginBottom:16 }}
          >
            Saneamiento y construcción,<br />
            <span style={{ color: ACCENT }}>con respaldo integral.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5 }}
            style={{ color:'rgba(255,255,255,0.7)', fontSize:'1.1rem', fontWeight:300, maxWidth:480, marginBottom:32 }}
          >
            {service.description}
          </motion.p>
          <motion.a
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.65 }}
            href={consultationUrl} target="_blank" rel="noopener noreferrer"
            style={{ display:'inline-flex', alignItems:'center', gap:8, background:ACCENT, color:'white', borderRadius:999, padding:'14px 28px', fontWeight:600, fontSize:'1rem', textDecoration:'none', width:'fit-content' }}
          >
            💬 {service.cta}
          </motion.a>
        </div>
        {/* STATS BAR */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.8 }}
          style={{ position:'absolute', bottom:0, left:0, right:0, background:'rgba(8,43,58,0.82)', backdropFilter:'blur(12px)', borderTop:`1px solid ${GOLD}40`, display:'grid', gridTemplateColumns:'repeat(4,1fr)', padding:'20px 2rem' }}
        >
          {service.stats.map((s, i) => (
            <div key={i} style={{ textAlign:'center' }}>
              <div style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:'1.8rem', fontWeight:700, color:GOLD, lineHeight:1 }}>{s.value}</div>
              <div style={{ color:'rgba(255,255,255,0.55)', fontSize:'0.75rem', marginTop:4, lineHeight:1.3, padding:'0 4px' }}>{s.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* FEATURES */}
      <section style={{ padding:'5rem clamp(1.25rem, 5vw, 4rem)', background:'var(--background)' }}>
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:16 }}>
            <div style={{ width:4, height:40, borderRadius:4, background:GOLD }} />
            <span style={{ color:GOLD, fontSize:12, fontWeight:600, letterSpacing:'0.15em', textTransform:'uppercase' }}>SERVICIOS COMPLETOS</span>
          </div>
          <h2 style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:'clamp(2rem,3.5vw,3rem)', fontWeight:700, color:'var(--foreground)', marginBottom:'2.5rem' }}>
            ¿Qué incluye {service.name}?
          </h2>
        </motion.div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(min(100%, 260px), 1fr))', gap:16 }}>
          {service.features.map((feat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.07 }}
              style={{ background:`${GOLD}0A`, border:`1px solid ${GOLD}30`, borderRadius:16, padding:'1.5rem' }}
            >
              <span style={{ display:'inline-flex', alignItems:'center', justifyContent:'center', width:32, height:32, borderRadius:999, background:GOLD, color:'black', fontWeight:700, fontSize:14, marginBottom:12 }}>{i+1}</span>
              <p style={{ color:'var(--foreground)', fontSize:'0.9rem', lineHeight:1.5 }}>{feat}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PILARES */}
      <section style={{ padding:'5rem clamp(1.25rem, 5vw, 4rem)', background:`rgba(124,92,191,0.06)`, borderTop:`1px solid rgba(124,92,191,0.20)` }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ textAlign:'center', marginBottom:'3rem' }}>
          <span style={{ color:GOLD, fontSize:12, fontWeight:600, letterSpacing:'0.15em', textTransform:'uppercase' }}>PILARES DE VALOR</span>
          <h2 style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:'clamp(2rem,3.5vw,3rem)', fontWeight:700, color:'var(--foreground)', marginTop:8 }}>
            Seguridad inmobiliaria premium
          </h2>
        </motion.div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(min(100%, 300px), 1fr))', gap:24 }}>
          {pilares.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.15 }}
              style={{ position:'relative', background:`${GOLD}0A`, border:`1px solid ${GOLD}30`, borderRadius:16, padding:'2rem', overflow:'hidden' }}
            >
              <div style={{ position:'absolute', top:12, right:16, fontFamily:"'Cormorant Garamond', serif", fontSize:'5rem', fontWeight:700, color:GOLD, opacity:0.15, lineHeight:1 }}>{p.num}</div>
              <div style={{ fontSize:'2.5rem', marginBottom:12 }}>{p.emoji}</div>
              <h3 style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:'1.4rem', fontWeight:700, color:'var(--foreground)', marginBottom:8 }}>{p.title}</h3>
              <p style={{ color:'var(--muted-foreground)', fontSize:'0.9rem', lineHeight:1.6 }}>{p.desc}</p>
              <div style={{ position:'absolute', top:0, left:0, right:0, height:4, borderRadius:'16px 16px 0 0', background:`linear-gradient(to right, ${ACCENT}, transparent)` }} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* GALERÍA */}
      <section style={{ padding:'5rem clamp(1.25rem, 5vw, 4rem)', background:'var(--background)' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap:12, height:'clamp(260px,42vw,460px)', overflow:'hidden', borderRadius:16 }}
        >
          <div style={{ position:'relative', overflow:'hidden', borderRadius:12 }}>
            <img src={service.images[0]} alt={service.name} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(8,43,58,0.7) 0%, transparent 60%)' }} />
            <span style={{ position:'absolute', bottom:16, left:16, fontFamily:"'Cormorant Garamond', serif", fontStyle:'italic', color:'white', fontSize:'1.1rem' }}>{service.name}</span>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
            {[service.images[1], service.images[2]].map((src, i) => (
              <div key={i} style={{ flex:1, overflow:'hidden', borderRadius:12 }}>
                <img src={src} alt={`${service.name} ${i + 2}`} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* TESTIMONIOS */}
      <section style={{ padding:'5rem clamp(1.25rem, 5vw, 4rem)', background:`${GOLD}04`, borderTop:`1px solid ${GOLD}20` }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ textAlign:'center', marginBottom:'3rem' }}>
          <span style={{ color:GOLD, fontSize:12, fontWeight:600, letterSpacing:'0.15em', textTransform:'uppercase' }}>CLIENTES QUE INVIRTIERON CON SEGURIDAD</span>
          <h2 style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:'clamp(2rem,3.5vw,3rem)', fontWeight:700, color:'var(--foreground)', marginTop:8 }}>Historias reales</h2>
        </motion.div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(min(100%, 280px), 1fr))', gap:24 }}>
          {testimonios.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.15 }}
              style={{ background:`${GOLD}07`, border:`1px solid ${GOLD}25`, borderRadius:16, padding:'2rem' }}
            >
              <div style={{ display:'flex', gap:4, marginBottom:16 }}>
                {[...Array(5)].map((_, j) => <span key={j} style={{ color:GOLD, fontSize:16 }}>★</span>)}
              </div>
              <p style={{ color:'var(--muted-foreground)', fontStyle:'italic', lineHeight:1.7, marginBottom:20 }}>"{t.texto}"</p>
              <div style={{ borderTop:'1px solid rgba(255,255,255,0.10)', paddingTop:16, display:'flex', alignItems:'center', gap:12 }}>
                <div style={{ width:40, height:40, borderRadius:999, background:GOLD, display:'flex', alignItems:'center', justifyContent:'center', color:'black', fontWeight:700, fontSize:16 }}>
                  {t.nombre[0]}
                </div>
                <div>
                  <div style={{ color:'var(--foreground)', fontWeight:600, fontSize:'0.9rem' }}>{t.nombre}</div>
                  <div style={{ color:'var(--muted-foreground)', fontSize:'0.8rem' }}>{t.cargo} · {t.fecha}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <section style={{ padding:'5rem clamp(1.25rem, 5vw, 4rem)', background:'var(--background)' }}>
        <div style={{ maxWidth:768, margin:'0 auto' }}>
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <span style={{ color:GOLD, fontSize:12, fontWeight:600, letterSpacing:'0.15em', textTransform:'uppercase' }}>PREGUNTAS FRECUENTES</span>
            <h2 style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:'clamp(2rem,3.5vw,3rem)', fontWeight:700, color:'var(--foreground)', marginTop:8, marginBottom:'2rem' }}>
              Todo lo que necesitas saber
            </h2>
          </motion.div>
          <div className="space-y-3">
            {service.faqs.map((faq, i) => (
              <FaqItemDark key={i} q={faq.q} a={faq.a} color={ACCENT} />
            ))}
          </div>
        </div>
      </section>

      {/* ASESOR */}
      <section style={{ padding:'5rem clamp(1.25rem, 5vw, 4rem)', background:'var(--background)', borderTop:`1px solid ${GOLD}25` }}>
        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-10 items-center" style={{ maxWidth:1000, margin:'0 auto' }}>
          <motion.img initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
            src={service.advisor?.image ?? "/images/asesor-elvis.jpg"} alt={`${service.advisor?.name ?? "Elvis E. Briceño Rivadeneyra"} — asesor de ${service.name}`}
            style={{ width:210, height:210, borderRadius:'50%', objectFit:'cover', objectPosition:'top', boxShadow:'0 12px 40px rgba(0,0,0,0.35)' }} />
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <span style={{ color:GOLD, fontSize:12, fontWeight:600, letterSpacing:'0.15em', textTransform:'uppercase' }}>TU ASESOR</span>
            <h2 style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:'clamp(2rem,3.5vw,3rem)', fontWeight:700, color:'var(--foreground)', marginTop:8 }}>
              {service.advisor?.name ?? "Elvis E. Briceño Rivadeneyra"}
            </h2>
            <p style={{ color:'var(--muted-foreground)', marginTop:4, fontSize:'0.9rem' }}>
              {service.advisor?.role ?? "Magíster en Planificación Urbana, Sostenibilidad y Cambio Climático (Universidad Politécnica de Cataluña) · Arquitecto urbanista · Geógrafo"}
            </p>
            <p style={{ color:'var(--muted-foreground)', marginTop:16, lineHeight:1.7, fontSize:'0.95rem' }}>
              {service.advisor?.bio ?? "Especialista GIS y Arquitecto-Urbanista colegiado; evaluador de riesgos y desastres certificado por CENEPRED y verificador catastral. Con 13 años de experiencia en saneamiento físico legal."}
            </p>
            <div style={{ display:'flex', flexWrap:'wrap', alignItems:'center', gap:12, marginTop:22 }}>
              <a href={`https://wa.me/51994118084?text=${encodeURIComponent(service.advisor?.whatsappMessage ?? `Hola, quiero una asesoría con el arquitecto de ${service.name}`)}`}
                target="_blank" rel="noopener noreferrer"
                style={{ display:'inline-flex', alignItems:'center', gap:8, background:ACCENT, color:'#fff', borderRadius:999, padding:'12px 28px', fontWeight:700, fontSize:'0.95rem', textDecoration:'none' }}>
                <MessageCircle size={18} /> Escribirle por WhatsApp
              </a>
              {service.email && (
                <a
                  href={`mailto:${service.email}`}
                  style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(255,255,255,0.06)', color:'rgba(255,255,255,0.9)', border:'1px solid rgba(255,255,255,0.2)', borderRadius:999, padding:'12px 24px', fontWeight:600, fontSize:'0.9rem', textDecoration:'none' }}
                >
                  <Mail size={16} style={{ color: GOLD }} /> {service.email}
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section style={{ padding:'5rem clamp(1.25rem, 5vw, 4rem)', background:`linear-gradient(135deg, ${GOLD}12 0%, transparent 100%)`, borderTop:`1px solid ${GOLD}25`, textAlign:'center' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <span style={{ color:GOLD, fontSize:12, fontWeight:600, letterSpacing:'0.15em', textTransform:'uppercase' }}>¿LISTO PARA DAR EL SIGUIENTE PASO?</span>
          <h2 style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:'clamp(2rem,3.5vw,3.5rem)', fontWeight:700, color:'var(--foreground)', marginTop:8, marginBottom:16 }}>
            Asesoría para tu proyecto{' '}
            <span style={{ color: ACCENT }}>sin costo.</span>
          </h2>
          <p style={{ color:'var(--muted-foreground)', maxWidth:480, margin:'0 auto 32px' }}>
            Nuestro equipo evalúa tu propiedad o proyecto y te orienta sobre los siguientes pasos. Primera consulta gratuita.
          </p>
          <div style={{ display:'flex', flexWrap:'wrap', alignItems:'center', justifyContent:'center', gap:12 }}>
            <a href={consultationUrl}
              target="_blank" rel="noopener noreferrer"
              style={{ display:'inline-flex', alignItems:'center', gap:8, background:ACCENT, color:'white', borderRadius:999, padding:'16px 36px', fontWeight:700, fontSize:'1rem', textDecoration:'none' }}>
              💬 Quiero mi consulta gratis
            </a>
            {service.email && (
              <a
                href={`mailto:${service.email}`}
                style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(255,255,255,0.06)', color:'white', border:'1px solid rgba(255,255,255,0.25)', borderRadius:999, padding:'16px 28px', fontWeight:600, fontSize:'0.95rem', textDecoration:'none' }}
              >
                <Mail size={18} style={{ color: GOLD }} /> {service.email}
              </a>
            )}
          </div>
        </motion.div>
      </section>

    </div>
  );
};

/* ======================================================
   SERVICE PAGE (export)
   ====================================================== */
const SegurosPage = ({ service }: { service: Service }) => {
  const GOLD_HEX = "var(--brand-gold)";
  const WA = "51994118084";
  const waLink = (msg: string) => `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;

  const differences = [
    { icon: "🛡️", title: "Análisis de riesgos real", text: "Nos sumergimos en tus operaciones para detectar cada vulnerabilidad familiar y empresarial: incendios, robos, desastres naturales y cambios económicos. Nada queda al azar." },
    { icon: "🏛️", title: "Respaldo nacional e internacional", text: "Trabajamos con aseguradoras de gran respaldo y estructuramos coberturas a la medida de tu familia y tu negocio, contemplando la demanda y los factores económicos." },
    { icon: "🎓", title: "Asesor certificado", text: "Giancarlo Rengifo, asesor profesional en seguros y finanzas, te acompaña de principio a fin: diagnóstico, cotización comparada y emisión sin letra pequeña." },
  ];

  const proceso = [
    { step: "01", title: "Diagnóstico de riesgos", desc: "Evaluamos tu situación familiar y empresarial para dimensionar exactamente las coberturas que necesitas." },
    { step: "02", title: "Cotización comparada", desc: "Comparamos aseguradoras de respaldo y diseñamos el plan óptimo en cobertura y precio." },
    { step: "03", title: "Emisión y acompañamiento", desc: "Tu protección se activa sin trámites largos y el asesor se queda contigo durante toda la vigencia." },
  ];

  const testimonios = [
    { name: "Familias y empresas peruanas", role: "Más de 80 años en el sector familiar", text: "Más de 80 años de experiencia en el sector familiar y 30 en el empresarial respaldan cada recomendación. Protegemos lo que construiste con años de esfuerzo." },
    { name: "Protección de punta a punta", role: "Coberturas Vida Ley, SCTR, patrimoniales e ingeniería", text: "Desde el seguro obligatorio para tu personal hasta la protección de tus instalaciones, operaciones y proyectos de ingeniería: tu operación completa queda blindada." },
  ];

  return (
    <div className="min-h-screen bg-background" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col justify-end" style={{ minHeight: "100svh" }}>
        <div className="absolute inset-0 z-0">
          <img src="/images/seguros_hero.jpg" alt="BG Seguros" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(8,43,58,0.35) 0%, rgba(8,43,58,0.62) 55%, rgba(8,43,58,0.88) 100%)" }} />
        </div>
        <div className="relative z-10 container mx-auto px-6 pb-16 pt-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border text-xs font-bold uppercase tracking-widest"
            style={{ borderColor: GOLD_HEX + "60", color: GOLD_HEX, background: "rgba(214,168,63,0.10)", backdropFilter: "blur(8px)" }}
          >
            🛡️ BG Seguros — Protección que respalda
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.35 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-none max-w-3xl"
            style={{ fontFamily: "'Cormorant Garamond', serif", textShadow: "0 4px 32px rgba(0,0,0,0.5)" }}
          >
            Protege tu familia <br />y tu empresa,<br /><span style={{ color: GOLD_HEX }}>sin sorpresas.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5 }}
            className="text-lg text-white/70 mb-10 max-w-lg font-light tracking-wide"
          >
            {service.description}
          </motion.p>
          <motion.a
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.65 }}
            href={waLink("Hola, me interesa el servicio de BG Seguros. Quisiera una asesoría de seguros gratuita.")}
            target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-black text-base transition-all hover:scale-105 hover:shadow-2xl"
            style={{ backgroundColor: GOLD_HEX, boxShadow: `0 8px 32px ${GOLD_HEX}55` }}
          >
            <MessageCircle size={20} /> Asesoría de seguros gratis
          </motion.a>
        </div>
        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.8 }}
          className="relative z-10 w-full"
          style={{ background: "rgba(8,43,58,0.82)", backdropFilter: "blur(12px)", borderTop: `1px solid ${GOLD_HEX}40` }}
        >
          <div className="container mx-auto px-6 py-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {service.stats.map((s) => (
              <div key={s.label} className="flex flex-col items-center">
                <span className="text-2xl font-extrabold" style={{ color: GOLD_HEX, fontFamily: "'Cormorant Garamond', serif" }}>{s.value}</span>
                <span className="text-white/55 text-xs tracking-wide mt-0.5">{s.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── FEATURES GRID ── */}
      <section className="py-24" style={{ background: "var(--background)" }}>
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-1 h-10 rounded-full" style={{ backgroundColor: GOLD_HEX }} />
              <p className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: GOLD_HEX }}>Servicios completos</p>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground ml-6 leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              ¿Qué incluye BG Seguros?
            </h2>
            <p className="text-muted-foreground mt-3 ml-6 max-w-xl text-sm leading-relaxed">
              Seguros personales y empresariales con análisis de riesgos personalizado y un asesor certificado.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {service.features.map((feat, i) => (
              <motion.div
                key={feat}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.07 }}
                className="flex items-start gap-3 p-5 rounded-2xl border transition-all hover:scale-[1.02] hover:shadow-lg"
                style={{ borderColor: GOLD_HEX + "22", background: "rgba(214,168,63,0.03)" }}
              >
                <span className="text-xl mt-0.5">🛡️</span>
                <span className="text-sm text-foreground/90 leading-relaxed">{feat}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALERÍA ── */}
      <section className="py-24" style={{ background: "rgba(255,255,255,0.03)" }}>
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-6">
          <motion.img initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            src={service.images[1]} alt="BG Seguros — asesoría empresarial" className="w-full h-72 object-cover rounded-2xl shadow-lg" />
          <motion.img initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }}
            src={service.images[2]} alt="BG Seguros — acuerdos de protección" className="w-full h-72 object-cover rounded-2xl shadow-lg" />
        </div>
      </section>

      {/* ── LA DIFERENCIA ── */}
      <section className="py-24" style={{ background: "var(--background)" }}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-bold tracking-[0.2em] uppercase mb-3" style={{ color: GOLD_HEX }}>La diferencia BG Seguros</p>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Protección pensada, no vendida
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {differences.map((p, i) => (
              <motion.div key={p.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-7 rounded-2xl border transition-all hover:-translate-y-1" style={{ borderColor: GOLD_HEX + "25", background: "rgba(214,168,63,0.04)" }}>
                <span className="text-3xl">{p.icon}</span>
                <h3 className="text-lg font-bold text-foreground mt-4">{p.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mt-2">{p.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESO ── */}
      <section className="py-24" style={{ background: "rgba(255,255,255,0.03)" }}>
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-1 h-10 rounded-full" style={{ backgroundColor: GOLD_HEX }} />
            <div>
              <p className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: GOLD_HEX }}>Así trabajamos</p>
              <h2 className="text-4xl font-bold text-foreground" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Nuestro proceso</h2>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {proceso.map((item) => (
              <motion.div key={item.step} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: Number(item.step) * 0.1 }}
                className="relative p-7 rounded-2xl border" style={{ borderColor: GOLD_HEX + "22", background: "rgba(214,168,63,0.03)" }}>
                <span className="text-4xl font-extrabold" style={{ color: GOLD_HEX + "35", fontFamily: "'Cormorant Garamond', serif" }}>{item.step}</span>
                <h3 className="text-lg font-bold text-foreground mt-3">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mt-2">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ASESOR ── */}
      <section className="py-24" style={{ background: "var(--background)" }}>
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          <motion.img initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
            src={service.advisor?.image ?? "/images/asesor-giancarlo.jpg"} alt={`${service.advisor?.name ?? "Giancarlo Rengifo"} — asesor BG Seguros`} className="w-72 h-72 rounded-full object-cover shadow-lg mx-auto" style={{ objectPosition: "top" }} />
          <div>
            <p className="text-xs font-bold tracking-[0.2em] uppercase mb-3" style={{ color: GOLD_HEX }}>Tu asesor</p>
            <h2 className="text-4xl font-bold text-foreground" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{service.advisor?.name ?? "Giancarlo Rengifo"}</h2>
            <p className="text-sm text-muted-foreground mt-1">{service.advisor?.role ?? "Asesor profesional de seguros y finanzas personales"}</p>
            <p className="text-muted-foreground text-sm leading-relaxed mt-5">
              {service.advisor?.bio ?? "Administrador de Negocios Internacionales de la URP, con especialidades en Administración y Gestión de Portafolios en IE University (España)."}
            </p>
            <blockquote className="mt-5 italic text-muted-foreground border-l-4 pl-4" style={{ borderColor: GOLD_HEX }}>
              «Si he visto más lejos es porque me he apoyado en los hombros de gigantes»
            </blockquote>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href={waLink(service.advisor?.whatsappMessage ?? "Hola Giancarlo, quiero una asesoría de BG Seguros.")} target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-black transition-all hover:scale-105"
                style={{ backgroundColor: GOLD_HEX }}>
                <MessageCircle size={18} /> Escribirle por WhatsApp
              </a>
              {service.email && (
                <a
                  href={`mailto:${service.email}`}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-semibold text-white/90 bg-white/5 hover:bg-white/10 border border-white/20 transition-all hover:scale-105 text-sm"
                >
                  <Mail size={16} style={{ color: GOLD_HEX }} /> {service.email}
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── EXPERIENCIA / TESTIMONIOS ── */}
      <section className="py-24" style={{ background: "rgba(214,168,63,0.04)", borderTop: `1px solid ${GOLD_HEX}20` }}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-bold tracking-[0.2em] uppercase mb-3" style={{ color: GOLD_HEX }}>Respaldo garantizado</p>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Experiencia que protege</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {testimonios.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-8 rounded-2xl border" style={{ borderColor: GOLD_HEX + "18", background: "var(--background)" }}>
                <div className="flex gap-1 mb-4" style={{ color: GOLD_HEX }}>{"★★★★★"}</div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6 italic">"{t.text}"</p>
                <p className="text-foreground text-sm font-bold">{t.name}</p>
                <p className="text-muted-foreground text-xs">{t.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQS ── */}
      {service.faqs?.length > 0 && (
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6 max-w-3xl">
            <div className="flex items-center gap-4 mb-12">
              <div className="w-1 h-10 rounded-full" style={{ backgroundColor: GOLD_HEX }} />
              <div>
                <p className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: GOLD_HEX }}>Resolvemos tus dudas</p>
                <h2 className="text-4xl font-bold text-foreground" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Preguntas frecuentes</h2>
              </div>
            </div>
            <div className="space-y-3">
              {service.faqs.map((faq) => (<FaqItemDark key={faq.q} q={faq.q} a={faq.a} color={GOLD_HEX} />))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA FINAL ── */}
      <section className="py-28 text-center" style={{ background: `linear-gradient(135deg, ${GOLD_HEX}12, transparent 60%)`, borderTop: `1px solid ${GOLD_HEX}25` }}>
        <div className="container mx-auto px-6">
          <p className="text-xs font-bold tracking-[0.2em] uppercase mb-4" style={{ color: GOLD_HEX }}>¿Listo para proteger lo que importa?</p>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Tu tranquilidad financiera <span style={{ color: GOLD_HEX }}>es nuestra prioridad</span>
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed mb-10">Recibe un análisis de riesgos gratuito y una cotización con un asesor certificado.</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href={waLink("Hola, quiero la asesoría de BG Seguros.")} target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-black text-base transition-all hover:scale-105"
              style={{ backgroundColor: GOLD_HEX, boxShadow: `0 8px 32px ${GOLD_HEX}55` }}>
              <MessageCircle size={20} /> Cotiza tu seguro gratis
            </a>
            {service.email && (
              <a
                href={`mailto:${service.email}`}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white bg-white/10 hover:bg-white/20 border border-white/25 transition-all hover:scale-105 text-base"
              >
                <Mail size={18} style={{ color: GOLD_HEX }} /> {service.email}
              </a>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

/* ======================================================
   COMERCIO EXTERIOR — página premium con hero propio
   ====================================================== */
const ComercioExteriorPage = ({ service }: { service: Service }) => {
  const GOLD_HEX = "var(--brand-gold)";
  const wa = (msg: string) => `https://wa.me/51994118084?text=${encodeURIComponent(msg)}`;

  const process = [
    { step: "1", title: "Diagnóstico aduanero", desc: "Revisamos tu operación, partidas arancelarias, proveedores y régimen aplicable para detectar riesgos y oportunidades." },
    { step: "2", title: "Estructuración", desc: "Definimos INCOTERMS, contratos internacionales, permisos sectoriales y la carpeta documental antes del embarque." },
    { step: "3", title: "Gestión ante SUNAT", desc: "Acompañamos la nacionalización o exportación, valoración aduanera y trámites de Drawback." },
    { step: "4", title: "Blindaje continuo", desc: "Auditoría preventiva y defensa técnica ante fiscalizaciones posteriores o ajustes de valor." },
  ];

  return (
    <div className="min-h-screen bg-background" style={{ fontFamily: "'Montserrat', sans-serif" }}>

      {/* @section: hero */}
      <section className="relative min-h-screen flex flex-col justify-end" style={{ minHeight: "100svh" }}>
        <div className="absolute inset-0 z-0">
          <img src={service.images[0]} alt="Comercio Exterior — BMG Consultores" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(8,43,58,0.30) 0%, rgba(8,43,58,0.60) 55%, rgba(8,43,58,0.92) 100%)" }} />
        </div>
        <div className="relative z-10 container mx-auto px-6 pb-16 pt-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border text-xs font-bold uppercase tracking-widest"
            style={{ borderColor: "rgba(214,168,63,0.6)", color: GOLD_HEX, background: "rgba(214,168,63,0.10)", backdropFilter: "blur(8px)" }}
          >
            Comercio Exterior — Blindaje aduanero global
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.35 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-none max-w-3xl"
            style={{ fontFamily: "'Cormorant Garamond', serif", textShadow: "0 4px 32px rgba(0,0,0,0.5)" }}
          >
            Importa y exporta<br /><span style={{ color: GOLD_HEX }}>sin multas aduaneras,</span><br />sin demoras.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5 }}
            className="text-lg text-white/75 mb-10 max-w-xl font-light tracking-wide"
          >
            {service.description}
          </motion.p>
          <motion.a
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.65 }}
            href={wa("Hola, quiero asesoría de la División Comercio Exterior de BMG Consultores.")}
            target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-black text-base transition-all hover:scale-105 hover:shadow-2xl"
            style={{ backgroundColor: GOLD_HEX, boxShadow: "0 8px 32px rgba(214,168,63,0.35)" }}
          >
            <MessageCircle size={20} /> {service.cta}
          </motion.a>
        </div>
        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.8 }}
          className="relative z-10 w-full"
          style={{ background: "rgba(8,43,58,0.82)", backdropFilter: "blur(12px)", borderTop: "1px solid rgba(214,168,63,0.25)" }}
        >
          <div className="container mx-auto px-6 py-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {service.stats.map((s) => (
              <div key={s.label} className="flex flex-col items-center min-w-0">
                <span className="text-xl md:text-2xl font-extrabold leading-tight break-words" style={{ color: GOLD_HEX, fontFamily: "'Cormorant Garamond', serif" }}>{s.value}</span>
                <span className="text-white/55 text-xs tracking-wide mt-0.5 leading-tight px-1">{s.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* @section: servicios */}
      <section className="py-24" style={{ background: "var(--background)" }}>
        <div className="container mx-auto px-6">
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-1 h-10 rounded-full" style={{ backgroundColor: GOLD_HEX }} />
              <p className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: GOLD_HEX }}>Cobertura integral</p>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground ml-6 leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              ¿Qué incluye Comercio Exterior?
            </h2>
            <p className="text-muted-foreground mt-3 ml-6 max-w-3xl text-sm leading-relaxed">{service.longDescription}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {service.features.map((feat, i) => (
              <motion.div
                key={feat}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.07 }}
                className="flex items-start gap-3 p-5 rounded-2xl border transition-all hover:scale-[1.02] hover:shadow-lg"
                style={{ background: "rgba(214,168,63,0.04)", borderColor: "rgba(214,168,63,0.19)" }}
              >
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-black text-xs font-bold" style={{ backgroundColor: GOLD_HEX }}>
                  {i + 1}
                </div>
                <p className="text-foreground text-sm font-medium leading-snug">{feat}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* @section: proceso */}
      <section className="py-24" style={{ background: "rgba(255,255,255,0.02)" }}>
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-foreground mb-12 text-center" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Cómo trabajamos tu operación
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((p) => (
              <div key={p.step} className="p-6 rounded-2xl border" style={{ borderColor: "rgba(214,168,63,0.19)", background: "rgba(10,47,63,0.45)" }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-black mb-4" style={{ backgroundColor: GOLD_HEX }}>{p.step}</div>
                <h3 className="text-lg font-bold text-foreground mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* @section: faqs */}
      {service.faqs?.length > 0 && (
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6 max-w-3xl">
            <h2 className="text-4xl font-bold text-foreground mb-10" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Preguntas frecuentes</h2>
            <div className="space-y-3">
              {service.faqs.map((faq) => (<FaqItemDark key={faq.q} q={faq.q} a={faq.a} color={GOLD_HEX} />))}
            </div>
          </div>
        </section>
      )}

      {/* @section: cta-final */}
      <section className="py-28 text-center" style={{ background: "linear-gradient(135deg, rgba(214,168,63,0.07), transparent 60%)", borderTop: "1px solid rgba(214,168,63,0.15)" }}>
        <div className="container mx-auto px-6">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Tu próxima operación, <span style={{ color: GOLD_HEX }}>sin riesgos aduaneros</span>
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <a href={wa("Hola, quiero evaluar mi operación de comercio exterior con BMG Consultores.")} target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-black text-base transition-all hover:scale-105"
              style={{ backgroundColor: GOLD_HEX }}>
              <MessageCircle size={20} /> Hablar con un especialista aduanero
            </a>
            {service.email && (
              <a
                href={`mailto:${service.email}`}
                className="inline-flex items-center gap-2 px-7 py-4 rounded-full font-bold text-white bg-white/10 hover:bg-white/20 border border-white/25 transition-all hover:scale-105 text-base"
              >
                <Mail size={18} style={{ color: GOLD_HEX }} /> {service.email}
              </a>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default function ServicePage({ serviceId }: { serviceId: string }) {
  const service = services.find((s) => s.id === serviceId) ?? services[0];
  const isTravel = serviceId === "travel";
  const isContable = serviceId === "contable";
  const isEmprendedor = serviceId === "emprendedor";
  const isLegal = serviceId === "legal";
  const isLobby = serviceId === "lobby";
  const isInmobiliario = serviceId === "inmobiliario";
  const isSeguros = serviceId === "seguros";
  const isIA = serviceId === "ia";
  const isComercioExterior = serviceId === "comercio-exterior";
  const isPremium = isTravel || isContable || isEmprendedor || isLegal || isLobby || isInmobiliario || isIA || isSeguros || isComercioExterior;

  usePageMeta({
    title: `${service.name} — ${service.tagline}`,
    description: service.description,
    path: `/${service.id}`,
    faqs: service.faqs,
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

  const renderContent = () => {
    if (isTravel) return <><TravelPage service={service} /><Footer travelTheme /></>;
    if (isContable) return <><div className="pt-16"><ContablePage service={service} /></div><Footer /></>;
    if (isEmprendedor) return <><div className="pt-16"><EmprendedorPage service={service} /></div><Footer /></>;
    if (isLegal) return <><div className="pt-16"><JuridicoPage service={service} /></div><Footer /></>;
    if (isLobby) return <><div className="pt-16"><LobbyPage service={service} /></div><Footer /></>;
    if (isIA) return <><div className="pt-16"><IAPage service={service} /></div><Footer /></>;
    if (isInmobiliario) return <><div className="pt-16"><InmobiliarioPage service={service} /></div><Footer /></>;
    if (isSeguros) return <><div className="pt-16"><SegurosPage service={service} /></div><Footer /></>;
    if (isComercioExterior) return <><ComercioExteriorPage service={service} /><Footer /></>;
    return <><div className="pt-16"><ServiceDetailFull service={service} /></div><Footer /></>;
  };

  return (
    <div className={isPremium ? "min-h-screen" : "min-h-screen bg-background"}>
      <Navbar travelTheme={isTravel} premiumTheme={isPremium} />
      {renderContent()}
      <WhatsAppFab />
    </div>
  );
}
