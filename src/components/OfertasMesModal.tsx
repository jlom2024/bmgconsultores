import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, MessageCircle, Sparkles, Tag, Flame } from "lucide-react";

export interface FlyerItem {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  whatsappMsg: string;
}

export const FLYERS_DATA: FlyerItem[] = [
  {
    id: 1,
    title: "Tu Marca en el Siguiente Nivel",
    subtitle: "Diseño + Tecnología + IA — Promo Especial -10%",
    image: "/flyers/01_Portada_BMG_KREO.png",
    whatsappMsg: "Hola Jorge, quiero información sobre las ofertas del mes y la Promo Especial -10% de BMG x KREO IA Studio.",
  },
  {
    id: 2,
    title: "Flyers que Venden",
    subtitle: "Diseño profesional y creativo desde S/ 90",
    image: "/flyers/02_Flyers_que_venden.png",
    whatsappMsg: "Hola Jorge, me interesa cotizar la oferta de Flyers que Venden (desde S/ 90) de las ofertas del mes.",
  },
  {
    id: 3,
    title: "Brochures que Impactan",
    subtitle: "Presenta tu empresa de forma profesional (desde S/ 290)",
    image: "/flyers/03_Brochures.png",
    whatsappMsg: "Hola Jorge, me interesa cotizar la oferta de Brochures que Impactan de las ofertas del mes.",
  },
  {
    id: 4,
    title: "Branding que te Diferencia",
    subtitle: "Identidad sólida y memorable (Express S/ 390 · Corp S/ 690)",
    image: "/flyers/04_Branding.png",
    whatsappMsg: "Hola Jorge, me interesa cotizar la oferta de Branding que te Diferencia de las ofertas del mes.",
  },
  {
    id: 5,
    title: "Website Simple — Tu Negocio Online",
    subtitle: "Landing / One-page moderna y efectiva a S/ 590",
    image: "/flyers/05_Website_Simple.png",
    whatsappMsg: "Hola Jorge, me interesa cotizar la oferta de Website Simple (S/ 590) de las ofertas del mes.",
  },
  {
    id: 6,
    title: "Website Pro — Más que una Web",
    subtitle: "Presencia digital multipágina profesional a S/ 890",
    image: "/flyers/06_Website_Pro.png",
    whatsappMsg: "Hola Jorge, me interesa cotizar la oferta de Website Pro (S/ 890) de las ofertas del mes.",
  },
  {
    id: 7,
    title: "Website + Chatbot IA",
    subtitle: "Atención inteligente 24/7 para tu negocio a S/ 1,190",
    image: "/flyers/07_Website_Chatbot_IA.png",
    whatsappMsg: "Hola Jorge, me interesa cotizar la oferta de Website + Chatbot IA (S/ 1,190) de las ofertas del mes.",
  },
  {
    id: 8,
    title: "Website + IA + Dashboard",
    subtitle: "Solución integral Todo en Uno a S/ 1,690",
    image: "/flyers/08_Website_IA_Dashboard.png",
    whatsappMsg: "Hola Jorge, me interesa cotizar la oferta de Website + IA + Dashboard (S/ 1,690) de las ofertas del mes.",
  },
  {
    id: 9,
    title: "Videos UGC IA — Historias que Venden",
    subtitle: "Contenido audiovisual dinámico y persuasivo (desde S/ 180)",
    image: "/flyers/09_Videos_UGC_IA.png",
    whatsappMsg: "Hola Jorge, me interesa cotizar la oferta de Videos UGC IA (desde S/ 180) de las ofertas del mes.",
  },
  {
    id: 10,
    title: "Pack Lanzamiento Digital",
    subtitle: "Todo lo que necesitas para empezar a vender a S/ 1,490",
    image: "/flyers/10_Pack_Lanzamiento_Digital.png",
    whatsappMsg: "Hola Jorge, me interesa cotizar el Pack Lanzamiento Digital (S/ 1,490) de las ofertas del mes.",
  },
];

export default function OfertasMesModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const total = FLYERS_DATA.length;
  const currentFlyer = FLYERS_DATA[currentIndex];

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  }, [total]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  }, [total]);

  // Teclado: Escape para cerrar, Flechas para navegar
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handlePrev, handleNext]);

  // Bloqueo de scroll cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Gestos táctiles (swipe)
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    setTouchStartX(null);
  };

  const waUrl = `https://wa.me/51994118084?text=${encodeURIComponent(currentFlyer.whatsappMsg)}`;

  return (
    <>
      {/* ========================================================
          BOTÓN FLOTANTE: Centro Inferior
          No interfiere con WhatsApp (izq) ni Lemon Slice (der)
          ======================================================== */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
        <motion.button
          onClick={() => setIsOpen(true)}
          initial={{ y: 60, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ delay: 1, type: "spring", stiffness: 220, damping: 20 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          aria-label="Ver ofertas del mes"
          className="group relative flex items-center gap-2.5 px-5 py-3 rounded-full shadow-2xl cursor-pointer transition-all duration-300 border border-[#D6A83F]/70 text-white"
          style={{
            background: "linear-gradient(135deg, rgba(8,43,58,0.95) 0%, rgba(13,30,42,0.95) 100%)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.6), 0 0 25px rgba(214,168,63,0.35)",
            backdropFilter: "blur(12px)",
          }}
        >
          {/* Resplandor pulsante sutil */}
          <span className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-[#D6A83F] via-[#F59E0B] to-[#4E9FC2] opacity-40 blur-sm group-hover:opacity-75 transition-opacity duration-500 animate-pulse -z-10" />

          {/* Badge fuego / promo */}
          <span className="flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-tr from-[#D6A83F] to-[#F59E0B] text-black shadow-md">
            <Flame size={16} className="animate-bounce" />
          </span>

          {/* Texto principal */}
          <div className="flex flex-col items-start leading-tight">
            <div className="flex items-center gap-1.5">
              <span className="text-xs sm:text-sm font-bold tracking-wide text-white uppercase" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Ofertas del Mes
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-extrabold uppercase rounded bg-[#D6A83F] text-black tracking-wider">
                -10%
              </span>
            </div>
            <span className="text-[10px] text-white/70 font-medium hidden sm:inline">
              10 promociones exclusivas
            </span>
          </div>

          <Sparkles size={15} className="text-[#D6A83F] ml-1 opacity-80 group-hover:rotate-12 transition-transform" />
        </motion.button>
      </div>

      {/* ========================================================
          POPUP MODAL + CARRUSEL DE FLYERS
          ======================================================== */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[10000] flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md"
            onClick={() => setIsOpen(false)}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-lg md:max-w-xl max-h-[96vh] rounded-3xl overflow-hidden flex flex-col border border-[#D6A83F]/40 shadow-[0_20px_60px_rgba(0,0,0,0.85)] text-white"
              style={{
                background: "linear-gradient(180deg, #092330 0%, #05141d 100%)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header del modal */}
              <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-white/10 bg-black/30 backdrop-blur-sm z-20">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#D6A83F]/20 flex items-center justify-center text-[#D6A83F]">
                    <Tag size={13} />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-white tracking-wide" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                      BMG × KREO IA STUDIO
                    </h3>
                    <p className="text-[10px] text-[#D6A83F] font-semibold">
                      Catálogo de Ofertas · {currentIndex + 1} de {total}
                    </p>
                  </div>
                </div>

                {/* Botón cerrar */}
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Cerrar modal de ofertas"
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white/80 hover:text-white bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Contenedor central del carrusel */}
              <div
                className="relative flex-1 flex items-center justify-center overflow-hidden p-2 sm:p-4 select-none"
                style={{ minHeight: "360px", maxHeight: "68vh" }}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                {/* Flecha Anterior */}
                <button
                  onClick={handlePrev}
                  aria-label="Flyer anterior"
                  className="absolute left-2 sm:left-4 z-30 w-10 h-10 rounded-full flex items-center justify-center bg-black/60 hover:bg-[#D6A83F] text-white hover:text-black border border-white/20 transition-all duration-200 cursor-pointer shadow-lg hover:scale-110 active:scale-95"
                >
                  <ChevronLeft size={22} />
                </button>

                {/* Imagen del flyer actual con animación */}
                <div className="w-full h-full flex items-center justify-center relative">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentFlyer.id}
                      initial={{ opacity: 0, x: 25 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -25 }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                      className="w-full h-full flex items-center justify-center"
                    >
                      <img
                        src={currentFlyer.image}
                        alt={currentFlyer.title}
                        className="max-h-[60vh] sm:max-h-[64vh] w-auto max-w-full object-contain rounded-2xl shadow-2xl drop-shadow-[0_15px_30px_rgba(0,0,0,0.85)] border border-white/10"
                        loading="eager"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Flecha Siguiente */}
                <button
                  onClick={handleNext}
                  aria-label="Siguiente flyer"
                  className="absolute right-2 sm:right-4 z-30 w-10 h-10 rounded-full flex items-center justify-center bg-black/60 hover:bg-[#D6A83F] text-white hover:text-black border border-white/20 transition-all duration-200 cursor-pointer shadow-lg hover:scale-110 active:scale-95"
                >
                  <ChevronRight size={22} />
                </button>
              </div>

              {/* Indicadores de diapositivas (Dots interactivos) */}
              <div className="flex items-center justify-center gap-1.5 py-1.5 px-4 bg-black/20">
                {FLYERS_DATA.map((flyer, index) => (
                  <button
                    key={flyer.id}
                    onClick={() => setCurrentIndex(index)}
                    aria-label={`Ir al flyer ${index + 1}: ${flyer.title}`}
                    className={`transition-all duration-300 rounded-full cursor-pointer ${
                      index === currentIndex
                        ? "w-6 h-2 bg-[#D6A83F] shadow-[0_0_8px_#D6A83F]"
                        : "w-2 h-2 bg-white/30 hover:bg-white/60"
                    }`}
                  />
                ))}
              </div>

              {/* Footer con CTA directo a WhatsApp */}
              <div className="px-4 sm:px-6 py-3.5 border-t border-white/10 bg-black/40 flex flex-col sm:flex-row items-center justify-between gap-3 z-20">
                <div className="text-center sm:text-left">
                  <p className="text-xs font-bold text-white line-clamp-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    {currentFlyer.title}
                  </p>
                  <p className="text-[11px] text-[#D6A83F] line-clamp-1">
                    {currentFlyer.subtitle}
                  </p>
                </div>

                <a
                  href={waUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm text-black transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg whitespace-nowrap cursor-pointer"
                  style={{
                    backgroundColor: "var(--brand-gold, #D6A83F)",
                    boxShadow: "0 4px 20px rgba(214,168,63,0.45)",
                  }}
                >
                  <MessageCircle size={16} />
                  Cotizar esta oferta
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
