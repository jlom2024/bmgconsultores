import { useState } from "react";
import { motion } from "framer-motion";
import { usePageMeta } from "@/lib/seo";
import Navbar from "@/components/Navbar";
import FooterGlobal from "@/components/FooterGlobal";
import PrecalificacionModal from "@/components/PrecalificacionModal";
import { Sparkles, ShieldCheck, Briefcase, TrendingUp, Building2, Globe, CheckCircle2 } from "lucide-react";

export default function EstrategiaPremiumPage() {
  const [modalOpen, setModalOpen] = useState(false);

  usePageMeta({
    title: "Estrategia Premium & Mesa de Alta Dirección — BMG Consultores",
    description: "Mesa de consultoría estratégica y blindaje corporativo 360° para holdings, fondos de inversión internacionales y proyectos de gran escala en el Perú.",
    path: "/estrategia-premium",
  });

  return (
    <div className="min-h-screen bg-[#041720] text-white selection:bg-[#D6A83F]/30 selection:text-white">
      <Navbar premiumTheme />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 right-1/3 w-[500px] h-[500px] bg-[#D6A83F]/12 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-[#4E9FC2]/10 rounded-full blur-[130px] pointer-events-none" />

        <div className="container mx-auto px-4 max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-[#D6A83F]/15 border border-[#D6A83F]/40 text-[#D6A83F] mb-6"
          >
            <Sparkles size={14} /> Unidad de Alta Dirección & Blindaje Corporativo
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif text-white tracking-tight leading-tight mb-6"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Estrategia Premium <br />
            <span style={{ color: "var(--brand-gold, #D6A83F)" }}>Mesa Ejecutiva de Alto Nivel</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-lg text-white/70 max-w-3xl mx-auto leading-relaxed mb-10"
          >
            Diseñada para empresarios de alta facturación, fondos de inversión extranjeros y holdings empresariales que exigen blindaje patrimonial integrado, optimización tributaria compleja y estructuración de proyectos de escala internacional.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={() => setModalOpen(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4.5 rounded-full font-bold text-black text-sm uppercase tracking-wider transition-all duration-300 hover:scale-105 shadow-2xl"
              style={{
                backgroundColor: "var(--brand-gold, #D6A83F)",
                boxShadow: "0 8px 35px rgba(214,168,63,0.45)",
              }}
            >
              <Briefcase size={18} /> Solicitar Sesión Estratégica con la CEO
            </button>
          </motion.div>
        </div>
      </section>

      {/* Pilares Estratégicos */}
      <section className="py-16 border-t border-white/10 bg-[#082B3A]/40">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-white/[0.03] border border-[#D6A83F]/30 hover:border-[#D6A83F] transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-[#D6A83F]/20 flex items-center justify-center text-[#D6A83F] mb-4">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Estructuración de Holdings</h3>
              <p className="text-xs sm:text-sm text-white/65 leading-relaxed">
                Protección patrimonial, gobierno corporativo, escisiones y optimización fiscal multidivisional sin dispersión de proveedores.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-[#4E9FC2] transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-[#4E9FC2]/20 flex items-center justify-center text-[#4E9FC2] mb-4">
                <Globe size={24} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Fondeo & Capital Internacional</h3>
              <p className="text-xs sm:text-sm text-white/65 leading-relaxed">
                Canal técnico y legal desde nuestro Hub Financiero en Miraflores para el despliegue seguro de capitales de inversión extranjera en el Perú.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-[#D6A83F] transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-[#D6A83F]/20 flex items-center justify-center text-[#D6A83F] mb-4">
                <TrendingUp size={24} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Operaciones Inmobiliarias & Aduaneras</h3>
              <p className="text-xs sm:text-sm text-white/65 leading-relaxed">
                Saneamiento a gran escala, compras corporativas y cadenas logísticas globales protegidas bajo acuerdos contractuales blindados.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Protocolo de Acceso */}
      <section className="py-20 border-t border-white/10">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="p-8 sm:p-12 rounded-3xl bg-[#082B3A] border border-[#D6A83F]/35 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#D6A83F]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-[#D6A83F]/20 text-[#D6A83F] mb-4">
                El Guardián Digital · Protocolo Confidencial
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-white mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Filtro de Precalificación Obligatorio
              </h2>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed mb-6">
                Para preservar el tiempo de alta dirección y asegurar el máximo retorno de valor para proyectos calificados, todas las solicitudes son evaluadas mediante un algoritmo de 3 preguntas estratégicas antes de habilitar la agenda privada de la CEO.
              </p>

              <button
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-black text-xs uppercase tracking-wider transition-all hover:scale-105"
                style={{ backgroundColor: "var(--brand-gold, #D6A83F)" }}
              >
                <Briefcase size={16} /> Iniciar Precalificación Ahora
              </button>
            </div>
          </div>
        </div>
      </section>

      <PrecalificacionModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      <FooterGlobal />
    </div>
  );
}
