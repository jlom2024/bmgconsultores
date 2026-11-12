import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Sparkles, ShieldCheck, ArrowRight, Building2 } from "lucide-react";

interface ScrollExperienceSectionProps {
  onPrecalificar?: () => void;
  onExplore?: () => void;
}

export default function ScrollExperienceSection({
  onPrecalificar,
  onExplore,
}: ScrollExperienceSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoDuration, setVideoDuration] = useState<number>(10);
  const [isVideoReady, setIsVideoReady] = useState<boolean>(false);

  // Progreso de scroll de la sección (0 a 1)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Suavizado cinemático con resorte
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    restDelta: 0.001,
  });

  // Metadatos y duración del video
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const handleLoadedMetadata = () => {
      if (v.duration && !isNaN(v.duration)) {
        setVideoDuration(v.duration);
        setIsVideoReady(true);
      }
    };

    if (v.readyState >= 1 && v.duration) {
      handleLoadedMetadata();
    } else {
      v.addEventListener("loadedmetadata", handleLoadedMetadata);
      return () => v.removeEventListener("loadedmetadata", handleLoadedMetadata);
    }
  }, []);

  // Scrubbing continuo sincronizado con requestAnimationFrame
  useEffect(() => {
    let animationFrameId: number;
    const video = videoRef.current;
    if (!video) return;

    const unsubscribe = smoothProgress.on("change", (p) => {
      if (!video || !videoDuration) return;

      animationFrameId = requestAnimationFrame(() => {
        // Enlace no-lineal para acelerar y modernizar el giro:
        // Aceleramos la transición central para que el giro se sienta dinámico
        const clamped = Math.max(0, Math.min(1, p));
        const targetTime = clamped * videoDuration;

        if (Math.abs(video.currentTime - targetTime) > 0.04) {
          video.currentTime = targetTime;
        }
      });
    });

    return () => {
      unsubscribe();
      cancelAnimationFrame(animationFrameId);
    };
  }, [smoothProgress, videoDuration]);

  // Transformaciones visuales para modernizar el giro (perspectiva 3D, escala, viñeta)
  // El giro en el video ocurre entre 0.35 y 0.70
  const videoScale = useTransform(smoothProgress, [0, 0.45, 0.7, 1], [1, 1.05, 1.03, 1]);
  const videoRotateY = useTransform(smoothProgress, [0.3, 0.55, 0.75], ["0deg", "-2.5deg", "0deg"]);
  const glowOpacity = useTransform(smoothProgress, [0.4, 0.7, 1], [0, 0.35, 0.6]);

  // Transiciones de los 3 bloques de texto (Cards narrativas)
  const step1Opacity = useTransform(smoothProgress, [0, 0.12, 0.28, 0.36], [0, 1, 1, 0]);
  const step1Y = useTransform(smoothProgress, [0, 0.12, 0.28, 0.36], [20, 0, 0, -20]);

  const step2Opacity = useTransform(smoothProgress, [0.36, 0.46, 0.62, 0.70], [0, 1, 1, 0]);
  const step2Y = useTransform(smoothProgress, [0.36, 0.46, 0.62, 0.70], [20, 0, 0, -20]);

  const step3Opacity = useTransform(smoothProgress, [0.72, 0.82, 1], [0, 1, 1]);
  const step3Y = useTransform(smoothProgress, [0.72, 0.82, 1], [25, 0, 0]);

  return (
    <section
      ref={containerRef}
      className="relative h-[250vh] bg-[#041720] text-white"
    >
      {/* Contenedor Sticky que permanece fijo en pantalla mientras dura el scroll */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Capa de video con transformaciones 3D */}
        <motion.div
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{
            scale: videoScale,
            rotateY: videoRotateY,
            perspective: 1000,
          }}
        >
          <video
            ref={videoRef}
            src="/videos/bmg-experience.mp4"
            poster="/images/bmg-experience-poster.jpg"
            preload="auto"
            muted
            playsInline
            className="w-full h-full object-cover"
          />

          {/* Gradientes oscuros para legibilidad de tipografía premium */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#041720] via-transparent to-[#041720]/75 pointer-events-none" />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(circle at center, transparent 30%, rgba(4,23,32,0.4) 75%, rgba(4,23,32,0.85) 100%)",
            }}
          />
        </motion.div>

        {/* Destello de luz dorada durante y después del giro hacia el logo */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: glowOpacity,
            background:
              "radial-gradient(circle at 62% 42%, rgba(214,168,63,0.35) 0%, rgba(78,159,194,0.15) 35%, transparent 70%)",
          }}
        />

        {/* Indicador superior sutil de Scrollytelling */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[11px] text-white/70">
          <Sparkles size={12} className="text-[#D6A83F]" />
          <span>Experiencia BMG · Desliza para explorar</span>
        </div>

        {/* FASE 1: ENTORNO CORPORATIVO Y MESA OPERATIVA (0% a 35%) */}
        <motion.div
          style={{ opacity: step1Opacity, y: step1Y }}
          className="absolute z-20 left-4 sm:left-8 md:left-16 max-w-lg px-4 pointer-events-none"
        >
          <div className="p-6 md:p-7 rounded-2xl bg-[#082B3A]/90 backdrop-blur-2xl border border-white/15 shadow-2xl shadow-black/80">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-[#4E9FC2]/20 border border-[#4E9FC2]/40 text-[#4E9FC2] mb-3">
              <Building2 size={13} /> Ecosistema Multidisciplinario
            </div>
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif leading-tight text-white drop-shadow"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Gestión Integral y Respaldo Profesional
            </h2>
            <p className="mt-2.5 text-xs sm:text-sm text-white/80 leading-relaxed">
              Un equipo dedicado de especialistas en contabilidad, legal, IA y comercio exterior trabajando coordinadamente para tu empresa.
            </p>
          </div>
        </motion.div>

        {/* FASE 2: EL GIRO ESTRATÉGICO MODERNO (36% a 70%) */}
        <motion.div
          style={{ opacity: step2Opacity, y: step2Y }}
          className="absolute z-20 right-4 sm:right-8 md:right-16 max-w-lg px-4 pointer-events-none"
        >
          <div className="p-6 md:p-7 rounded-2xl bg-[#082B3A]/90 backdrop-blur-2xl border border-[#D6A83F]/30 shadow-2xl shadow-black/80 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-[#D6A83F]/20 border border-[#D6A83F]/40 text-[#D6A83F] mb-3">
              <Sparkles size={13} /> De la Operación a la Alta Dirección
            </div>
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif leading-tight text-white drop-shadow"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              El Viraje Hacia la Estrategia Patrimonial
            </h2>
            <p className="mt-2.5 text-xs sm:text-sm text-white/80 leading-relaxed">
              Superamos la consultoría tradicional: diseñamos arquitectura fiscal, protección societaria y apertura a fondos corporativos.
            </p>
          </div>
        </motion.div>

        {/* FASE 3: LLEGADA AL LOGO BMG (72% a 100%) */}
        {/* Ubicado en el tercio inferior para DEJAR BRILLAR EL LOGO 3D DORADO DEL VIDEO SIN COLISIONES NI SUPERPOSICIÓN */}
        <motion.div
          style={{ opacity: step3Opacity, y: step3Y }}
          className="absolute z-20 bottom-6 sm:bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 w-[92%] max-w-2xl px-2 sm:px-4 pointer-events-auto"
        >
          <div className="p-5 sm:p-6 rounded-2xl bg-[#082B3A]/92 backdrop-blur-2xl border border-[#D6A83F]/35 shadow-2xl shadow-black/90 text-center flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-widest bg-[#D6A83F]/15 border border-[#D6A83F]/40 text-[#D6A83F] mb-2">
              <ShieldCheck size={13} /> Solidez y Trayectoria Institucional
            </div>

            <p className="text-sm sm:text-base md:text-lg text-white font-medium leading-snug max-w-lg">
              Tu aliado estratégico en gestión corporativa 360°, alta dirección y expansión empresarial.
            </p>

            <p className="text-xs text-white/60 mt-1 max-w-md hidden sm:block">
              Más de una década acompañando el crecimiento y patrimonio de nuestros clientes en el Perú.
            </p>

            {/* Botones de acción con contraste máximo */}
            <div className="flex flex-wrap items-center justify-center gap-3 mt-4 w-full">
              {onPrecalificar && (
                <button
                  type="button"
                  onClick={onPrecalificar}
                  className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs font-bold uppercase tracking-wider text-black transition-all hover:scale-105 shadow-xl cursor-pointer"
                  style={{
                    backgroundColor: "var(--brand-gold, #D6A83F)",
                    boxShadow: "0 4px 20px rgba(214,168,63,0.45)",
                  }}
                >
                  <Sparkles size={14} /> Solicitar Sesión con la CEO <ArrowRight size={14} />
                </button>
              )}
              {onExplore && (
                <button
                  type="button"
                  onClick={onExplore}
                  className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs font-semibold text-white/90 hover:text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all cursor-pointer backdrop-blur-sm"
                >
                  Conocer las 9 Divisiones
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
