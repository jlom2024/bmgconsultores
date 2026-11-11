import { useState } from "react";
import { motion } from "framer-motion";
import { usePageMeta } from "@/lib/seo";
import Navbar from "@/components/Navbar";
import FooterGlobal from "@/components/FooterGlobal";
import PrecalificacionModal from "@/components/PrecalificacionModal";
import { ShieldCheck, Sparkles, Building2, TrendingUp, Award, CheckCircle2, Briefcase } from "lucide-react";

export default function FundadoraPage() {
  const [modalOpen, setModalOpen] = useState(false);

  usePageMeta({
    title: "Blanca Gutiérrez | Socio Fundador & Directora Ejecutiva (CEO) — BMG Consultores",
    description: "Conoce a Blanca Gutiérrez, fundadora de BMG Consultores: Plataforma de Gestión Corporativa 360°, blindaje financiero y escalabilidad para organizaciones y capitales en crecimiento en el Perú.",
    path: "/fundadora",
  });

  return (
    <div className="min-h-screen bg-[#041720] text-white selection:bg-[#D6A83F]/30 selection:text-white">
      <Navbar premiumTheme />

      {/* Hero / Presentación de la Fundadora (Apple / Stripe aesthetic) */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        {/* Luces y gradientes de fondo */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#D6A83F]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-[#4E9FC2]/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-4 max-w-6xl">
          {/* Badge superior */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center md:text-left mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-[#D6A83F]/15 border border-[#D6A83F]/40 text-[#D6A83F]">
              <Sparkles size={14} /> Presidencia Ejecutiva & Dirección Estratégica
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* COLUMNA IZQUIERDA: Fotografía Corporativa de Alta Dirección */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="lg:col-span-5 relative"
            >
              <div className="sticky top-28">
                {/* Marco de lujo con sutil resplandor dorado */}
                <div
                  className="relative rounded-3xl overflow-hidden border-2 border-[#D6A83F]/40 shadow-2xl bg-[#082B3A]"
                  style={{
                    boxShadow: "0 25px 70px rgba(0,0,0,0.85), 0 0 40px rgba(214,168,63,0.2)",
                  }}
                >
                  <img
                    src="/images/blanca-gutierrez-ceo.jpg"
                    alt="Blanca Gutiérrez | Socio Fundador & Directora Ejecutiva (CEO)"
                    className="w-full h-auto object-cover object-top aspect-[3/4] transition-transform duration-700 hover:scale-[1.02]"
                  />
                  {/* Overlay gradiente suave al pie de la foto */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#082B3A] via-transparent to-transparent opacity-60" />

                  <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-[#082B3A]/85 backdrop-blur-md border border-white/10">
                    <div className="text-sm font-bold text-white tracking-wide">
                      Blanca Gutiérrez
                    </div>
                    <div className="text-xs text-[#D6A83F] font-medium mt-0.5">
                      Socio Fundador & Directora Ejecutiva (CEO)
                    </div>
                  </div>
                </div>

                {/* Métricas clave en minicard */}
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
                    <div className="text-xl font-extrabold text-[#D6A83F]">360°</div>
                    <div className="text-[11px] text-white/50 mt-0.5">Gestión Corporativa</div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
                    <div className="text-xl font-extrabold text-[#D6A83F]">2 Hubs</div>
                    <div className="text-[11px] text-white/50 mt-0.5">La Victoria & Miraflores</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* COLUMNA DERECHA: Texto Estructurado Oficial */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-7 space-y-8"
            >
              {/* Título y Cargo Oficial */}
              <div>
                <h1
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  Blanca Gutiérrez
                </h1>
                <div className="text-lg sm:text-xl text-[#D6A83F] font-semibold mt-2 tracking-wide">
                  Socio Fundador & Directora Ejecutiva (CEO)
                </div>
                <div className="w-20 h-1 bg-[#D6A83F] rounded-full mt-4" />
              </div>

              {/* Texto Biográfico Oficial en 3 párrafos íntegros */}
              <div className="space-y-6 text-white/80 leading-relaxed text-base sm:text-lg font-light">
                <p className="border-l-2 border-[#D6A83F]/50 pl-5 text-white/90">
                  "Blanca Gutiérrez es la mente estratégica y fundadora de BMG Consultores, una firma líder diseñada como una Red de Negocios Profesional de Alto Nivel y una plataforma de Gestión Corporativa 360° en el Perú. Bajo su dirección ejecutiva, el holding coordina un equipo multidisciplinario de élite que abarca desde la consultoría legal, tributaria y aduanera, hasta el desarrollo de Inteligencia Artificial y la estructuración de proyectos de inversión. Su enfoque empresarial está orientado a transformar la experiencia del mercado real en blindaje financiero y escalabilidad para organizaciones y capitales en crecimiento."
                </p>

                <p>
                  "El liderazgo de Blanca no proviene de la teoría académica tradicional, sino del campo de batalla comercial más exigente del país: el sector del retail y el comercio a gran escala. Desde muy joven, gestionó múltiples unidades comerciales, experimentando el dinamismo y los desafíos reales de emprender en el Perú. En este trayecto, procesó de primera mano las complejidades más agudas del entorno empresarial: fiscalizaciones tributarias, reestructuraciones financieras de alta volatilidad y la fragmentación de servicios profesionales. Lejos de ser un freno, asimiló estas experiencias como un activo estratégico invaluable: una maestría real en Gestión de Crisis, Optimización de Procesos y Mitigación de Riesgos."
                </p>

                <p>
                  "Al dominar estas variables, comprendió que para que un negocio escale con estándares internacionales y atraiga capitales globales de manera segura, requiere un blindaje estructural integrado de 360°, eliminando la fragmentación de proveedores aislados. Con la firme convicción de que ningún empresario debe poner en riesgo su patrimonio por falta de un respaldo integral, Blanca consolidó el ecosistema BMG. Hoy, el holding opera bajo su visión estratégica de manera dual: desde su Hub Comercial en La Victoria formaliza la fuerza del empresariado emergente, y desde su Hub Financiero en Miraflores construye el canal de confianza técnica y legal que los inversionistas internacionales exigen para desplegar sus fondos de manera segura en el país."
                </p>
              </div>

              {/* Módulo Visual: Operación Dual de Hubs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#D6A83F]/40 transition-colors">
                  <div className="flex items-center gap-2.5 text-[#D6A83F] font-bold text-sm mb-2">
                    <Building2 size={18} /> Hub Comercial · La Victoria
                  </div>
                  <p className="text-xs text-white/65 leading-relaxed">
                    Formalización ágil, regularización tributaria y protección patrimonial de la fuerza comercial emergente del país.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#4E9FC2]/40 transition-colors">
                  <div className="flex items-center gap-2.5 text-[#4E9FC2] font-bold text-sm mb-2">
                    <TrendingUp size={18} /> Hub Financiero · Miraflores
                  </div>
                  <p className="text-xs text-white/65 leading-relaxed">
                    Estructuración de holdings, canal de confianza técnica y legal para fondos de inversión y capitales internacionales.
                  </p>
                </div>
              </div>

              {/* BOTÓN DESTACADO REQUERIDO POR EL CLIENTE */}
              <div className="pt-6">
                <button
                  type="button"
                  onClick={() => setModalOpen(true)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-5 rounded-full font-bold text-black text-base uppercase tracking-wider transition-all duration-300 hover:scale-105 shadow-2xl"
                  style={{
                    backgroundColor: "var(--brand-gold, #D6A83F)",
                    boxShadow: "0 10px 40px rgba(214,168,63,0.5)",
                  }}
                >
                  <Briefcase size={20} /> Solicitar Sesión Estratégica con la CEO
                </button>
                <p className="text-xs text-white/45 mt-3">
                  Requiere validación mediante el Formulario de Precalificación Obligatorio (El Guardián Digital).
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Modal Precalificación */}
      <PrecalificacionModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

      <FooterGlobal />
    </div>
  );
}
