import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldCheck, CheckCircle2, ArrowRight, ArrowLeft, Clock, MessageSquare, Sparkles, Building2, User, Phone, Mail } from "lucide-react";

interface PrecalificacionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PrecalificacionModal({ isOpen, onClose }: PrecalificacionModalProps) {
  const navigate = useNavigate();
  const [step, setStep] = useState<"questions" | "contact" | "evaluating" | "result">("questions");

  const handleReturnToLanding = () => {
    onClose();
    navigate("/");
  };

  // Respuestas del formulario
  const [facturacion, setFacturacion] = useState<string>("");
  const [naturaleza, setNaturaleza] = useState<string>("");
  const [presupuesto, setPresupuesto] = useState<string>("");

  // Datos de contacto
  const [nombre, setNombre] = useState<string>("");
  const [empresa, setEmpresa] = useState<string>("");
  const [telefono, setTelefono] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  // Resultado
  const [isQualified, setIsQualified] = useState<boolean>(false);

  // Reset al abrir
  useEffect(() => {
    if (isOpen) {
      setStep("questions");
      setFacturacion("");
      setNaturaleza("");
      setPresupuesto("");
      setNombre("");
      setEmpresa("");
      setTelefono("");
      setEmail("");
      setIsQualified(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleNextToContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!facturacion || !naturaleza || !presupuesto) return;
    setStep("contact");
  };

  const handleProcessLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim() || !telefono.trim()) return;

    setStep("evaluating");

    // Lógica inteligente de evaluación (IF / ELSE):
    // CASO A: LEAD CALIFICADO PREMIUM
    // Criterios: facturación alta (>100k) o media (20k-100k con proyecto complejo), naturaleza de alto nivel (NO operativa), y presupuesto corporativo.
    const esAltaFacturacion = facturacion === "mas_100k" || facturacion === "20k_100k";
    const esProyectoComplejo = naturaleza === "holdings" || naturaleza === "importacion" || naturaleza === "inmobiliaria";
    const esPresupuestoCorporativo = presupuesto === "corporativo";
    const esOperativo = naturaleza === "operativa" || presupuesto === "pyme" || facturacion === "menos_20k";

    const califica = !esOperativo && esAltaFacturacion && esProyectoComplejo && esPresupuestoCorporativo;

    setTimeout(() => {
      setIsQualified(califica);
      setStep("result");
    }, 1200);
  };

  // Enlace para el Caso A: Alerta push a la CEO sin exponer datos sensibles del lead en público
  const pushTextCEO = encodeURIComponent("🔥 LEAD PREMIUM CALIFICADO: Un cliente corporativo ha agendado una cita directa contigo para inversión/holding.");
  const ceoWhatsAppUrl = `https://wa.me/51994118084?text=${pushTextCEO}`;

  // Enlace para el Caso B: Front desk centralizado
  const frontDeskText = encodeURIComponent(`Hola, completé el formulario de precalificación en la web de BMG Consultores.\nNombre: ${nombre || "Interesado"}\nEmpresa: ${empresa || "Consulta corporativa"}\nSolicito atención con un consultor senior.`);
  const frontDeskWhatsAppUrl = `https://wa.me/51994118084?text=${frontDeskText}`;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.25 }}
        className="relative w-full max-w-xl max-h-[88vh] flex flex-col bg-[#082B3A] border border-[#D6A83F]/40 rounded-2xl text-white shadow-2xl overflow-hidden my-auto"
        style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.8), 0 0 30px rgba(214,168,63,0.15)" }}
      >
        {/* Glow de fondo */}
        <div className="absolute top-0 right-0 w-60 h-60 bg-[#D6A83F]/10 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16" />
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-[#4E9FC2]/10 rounded-full blur-3xl pointer-events-none -ml-16 -mb-16" />

        {/* CABECERA FIJA (Nunca se pierde en pantallas pequeñas) */}
        <div className="px-5 pt-3.5 pb-2.5 border-b border-white/10 shrink-0 relative z-10 bg-[#082B3A]/95">
          <div className="flex items-center justify-between mb-1.5">
            <button
              type="button"
              onClick={handleReturnToLanding}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-white/80 bg-white/5 hover:bg-white/15 hover:text-white border border-white/15 transition-all cursor-pointer"
            >
              <ArrowLeft size={13} /> Volver a la landing
            </button>
            <button
              type="button"
              onClick={handleReturnToLanding}
              className="p-1 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Cerrar y volver a la landing"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-[#D6A83F]/15 border border-[#D6A83F]/35 text-[#D6A83F]">
              <ShieldCheck size={12} /> Alta Dirección
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-serif text-white tracking-wide" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Solicitar Sesión Estratégica con la CEO
          </h3>
          <p className="text-[11px] sm:text-xs text-white/60 mt-0.5">
            Filtro de confidencialidad para asignación directa de agenda corporativa.
          </p>
        </div>

        {/* PASO 1: PREGUNTAS ESTRATÉGICAS */}
        {step === "questions" && (
          <form onSubmit={handleNextToContact} className="flex flex-col flex-1 min-h-0 overflow-hidden">
            {/* Cuerpo desplazable de preguntas */}
            <div className="flex-1 overflow-y-auto px-5 py-3 space-y-3.5 text-xs sm:text-sm overscroll-contain">
              {/* Pregunta 1 */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-white/90">
                  1. ¿Cuál es el volumen de facturación mensual o capital de tu proyecto?
                </label>
                <div className="grid grid-cols-1 gap-1.5">
                  {[
                    { id: "menos_20k", label: "Menos de S/ 20,000 mensuales." },
                    { id: "20k_100k", label: "Entre S/ 20,000 y S/ 100,000 mensuales." },
                    { id: "mas_100k", label: "Más de S/ 100,000 / Fondos de Inversión Internacionales." },
                  ].map((opt) => (
                    <label
                      key={opt.id}
                      className={`flex items-center gap-2.5 p-2 rounded-xl border text-xs cursor-pointer transition-all ${
                        facturacion === opt.id
                          ? "bg-[#D6A83F]/20 border-[#D6A83F] text-white shadow-sm"
                          : "bg-white/[0.03] border-white/10 text-white/75 hover:bg-white/[0.07]"
                      }`}
                    >
                      <input
                        type="radio"
                        name="facturacion"
                        value={opt.id}
                        checked={facturacion === opt.id}
                        onChange={(e) => setFacturacion(e.target.value)}
                        className="accent-[#D6A83F]"
                        required
                      />
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Pregunta 2 */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-white/90">
                  2. ¿Cuál es la naturaleza principal de tu consulta?
                </label>
                <div className="grid grid-cols-1 gap-1.5">
                  {[
                    { id: "holdings", label: "Estructuración de Holdings u Optimización Fiscal Compleja." },
                    { id: "importacion", label: "Proyectos de Importación / Cadenas de Suministro Globales." },
                    { id: "inmobiliaria", label: "Inversiones Inmobiliarias, Saneamiento o Fondeo Extranjero." },
                    { id: "operativa", label: "Consultas operativas (Constitución básica, contabilidad mensual)." },
                  ].map((opt) => (
                    <label
                      key={opt.id}
                      className={`flex items-center gap-2.5 p-2 rounded-xl border text-xs cursor-pointer transition-all ${
                        naturaleza === opt.id
                          ? "bg-[#D6A83F]/20 border-[#D6A83F] text-white shadow-sm"
                          : "bg-white/[0.03] border-white/10 text-white/75 hover:bg-white/[0.07]"
                      }`}
                    >
                      <input
                        type="radio"
                        name="naturaleza"
                        value={opt.id}
                        checked={naturaleza === opt.id}
                        onChange={(e) => setNaturaleza(e.target.value)}
                        className="accent-[#D6A83F]"
                        required
                      />
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Pregunta 3 */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-white/90">
                  3. ¿Cuál es tu presupuesto asignado para esta solución estratégica?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {[
                    { id: "pyme", label: "Presupuesto de entrada / PYME." },
                    { id: "corporativo", label: "Presupuesto Corporativo / Inversor." },
                  ].map((opt) => (
                    <label
                      key={opt.id}
                      className={`flex items-center gap-2.5 p-2 rounded-xl border text-xs cursor-pointer transition-all ${
                        presupuesto === opt.id
                          ? "bg-[#D6A83F]/20 border-[#D6A83F] text-white shadow-sm"
                          : "bg-white/[0.03] border-white/10 text-white/75 hover:bg-white/[0.07]"
                      }`}
                    >
                      <input
                        type="radio"
                        name="presupuesto"
                        value={opt.id}
                        checked={presupuesto === opt.id}
                        onChange={(e) => setPresupuesto(e.target.value)}
                        className="accent-[#D6A83F]"
                        required
                      />
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* PIE DE ACCIONES FIJO (Siempre visible, nunca se pierde) */}
            <div className="px-5 py-3 border-t border-white/10 shrink-0 bg-[#082B3A]/95 flex flex-col sm:flex-row gap-2.5">
              <button
                type="button"
                onClick={handleReturnToLanding}
                className="order-2 sm:order-1 sm:w-2/5 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-white/20 text-xs font-semibold text-white/75 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <ArrowLeft size={14} /> Volver a la landing
              </button>
              <button
                type="submit"
                disabled={!facturacion || !naturaleza || !presupuesto}
                className="order-1 sm:order-2 sm:w-3/5 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-bold text-black text-xs uppercase tracking-wider transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.01] cursor-pointer"
                style={{
                  backgroundColor: "var(--brand-gold, #D6A83F)",
                  boxShadow: "0 4px 16px rgba(214,168,63,0.35)",
                }}
              >
                Continuar a Contacto <ArrowRight size={15} />
              </button>
            </div>
          </form>
        )}

        {/* PASO 2: DATOS DE CONTACTO */}
        {step === "contact" && (
          <form onSubmit={handleProcessLead} className="flex flex-col flex-1 min-h-0 overflow-hidden">
            <div className="flex-1 overflow-y-auto px-5 py-3 space-y-2.5 text-xs sm:text-sm overscroll-contain">
              <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-white/70">
                Ingresa tus datos corporativos para canalizar el análisis de tu proyecto con el equipo correspondiente.
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-widest text-white/60 mb-1">Nombre y Apellidos *</label>
                <div className="relative">
                  <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                  <input
                    required
                    type="text"
                    placeholder="Ej. Carlos Mendoza"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 text-xs focus:border-[#D6A83F] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-widest text-white/60 mb-1">Empresa / Fondo / Proyecto</label>
                <div className="relative">
                  <Building2 size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                  <input
                    type="text"
                    placeholder="Ej. Grupo Inmobiliario Sur / Proyecto Expansión"
                    value={empresa}
                    onChange={(e) => setEmpresa(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 text-xs focus:border-[#D6A83F] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-white/60 mb-1">WhatsApp / Móvil *</label>
                  <div className="relative">
                    <Phone size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                    <input
                      required
                      type="tel"
                      placeholder="+51 987 654 321"
                      value={telefono}
                      onChange={(e) => setTelefono(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 text-xs focus:border-[#D6A83F] focus:outline-none transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-white/60 mb-1">Correo Electrónico</label>
                  <div className="relative">
                    <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                    <input
                      type="email"
                      placeholder="contacto@empresa.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 text-xs focus:border-[#D6A83F] focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* PIE DE ACCIONES FIJO */}
            <div className="px-5 py-3 border-t border-white/10 shrink-0 bg-[#082B3A]/95 flex gap-2.5">
              <button
                type="button"
                onClick={() => setStep("questions")}
                className="w-1/3 py-2.5 px-3 rounded-xl border border-white/20 text-xs font-semibold text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                ← Volver
              </button>
              <button
                type="submit"
                className="w-2/3 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-bold text-black text-xs uppercase tracking-wider transition-all hover:scale-[1.01] cursor-pointer"
                style={{
                  backgroundColor: "var(--brand-gold, #D6A83F)",
                  boxShadow: "0 4px 16px rgba(214,168,63,0.35)",
                }}
              >
                Evaluar Solicitud <Sparkles size={14} />
              </button>
            </div>
          </form>
        )}

        {/* PASO: EVALUACIÓN EN MILISEGUNDOS */}
        {step === "evaluating" && (
          <div className="py-12 text-center space-y-3 px-5">
            <div className="w-12 h-12 mx-auto border-4 border-[#D6A83F]/30 border-t-[#D6A83F] rounded-full animate-spin" />
            <h4 className="text-lg font-serif font-bold text-white">Validando Perfil Corporativo...</h4>
            <p className="text-xs text-white/60 max-w-sm mx-auto">
              El Guardián Digital está procesando los parámetros estratégicos para la asignación óptima de mesa y agenda.
            </p>
          </div>
        )}

        {/* PASO 3: RESULTADO CONDICIONAL (IF / ELSE) */}
        {step === "result" && (
          <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
            {isQualified ? (
              /* CASO A: LEAD CALIFICADO PREMIUM */
              <div className="flex flex-col flex-1 min-h-0">
                <div className="flex-1 overflow-y-auto px-5 py-3 space-y-3 text-center">
                  <div className="w-12 h-12 mx-auto rounded-full bg-[#D6A83F]/20 border border-[#D6A83F] flex items-center justify-center text-[#D6A83F] shadow-md shadow-[#D6A83F]/20">
                    <Sparkles size={24} />
                  </div>

                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-[#D6A83F]/20 text-[#D6A83F] border border-[#D6A83F]/40 mb-1">
                      👑 Lead Premium Calificado · Acceso Directo
                    </div>
                    <h4 className="text-xl font-bold font-serif text-white" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                      Perfil Aprobado para Sesión Estratégica
                    </h4>
                    <p className="text-xs text-white/70 max-w-md mx-auto mt-1 leading-relaxed">
                      Tu requerimiento califica para la agenda privada con <strong>Blanca Gutiérrez, CEO de BMG Consultores</strong>. Tu solicitud activa de inmediato el canal preferencial de holding y fondeo corporativo.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-white/[0.04] border border-[#D6A83F]/30 text-left space-y-1.5 text-xs">
                    <div className="flex items-center gap-1.5 text-[#D6A83F] font-semibold">
                      <CheckCircle2 size={14} /> Parámetros verificados:
                    </div>
                    <p className="text-white/80 pl-5">
                      • Enfoque de alta rentabilidad, estructuración patrimonial o fondeo internacional.
                    </p>
                    <p className="text-white/80 pl-5">
                      • Notificación push prioritaria directa al despacho ejecutivo.
                    </p>
                  </div>
                </div>

                <div className="px-5 py-3 border-t border-white/10 shrink-0 bg-[#082B3A]/95 flex flex-col sm:flex-row gap-2.5">
                  <a
                    href={ceoWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-black text-xs uppercase tracking-wider transition-all hover:scale-[1.01] shadow-lg"
                    style={{
                      backgroundColor: "var(--brand-gold, #D6A83F)",
                      boxShadow: "0 4px 18px rgba(214,168,63,0.35)",
                    }}
                  >
                    💼 Abrir Agenda Privada con la CEO
                  </a>
                  <button
                    onClick={handleReturnToLanding}
                    className="sm:w-1/3 flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl border border-white/20 text-xs font-semibold text-white/75 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <ArrowLeft size={13} /> Volver a la landing
                  </button>
                </div>
              </div>
            ) : (
              /* CASO B: LEAD OPERATIVO ESTÁNDAR */
              <div className="flex flex-col flex-1 min-h-0">
                <div className="flex-1 overflow-y-auto px-5 py-3 space-y-3 text-center">
                  <div className="w-12 h-12 mx-auto rounded-full bg-[#4E9FC2]/20 border border-[#4E9FC2] flex items-center justify-center text-[#4E9FC2] shadow-md shadow-[#4E9FC2]/20">
                    <Clock size={24} />
                  </div>

                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-[#4E9FC2]/20 text-[#4E9FC2] border border-[#4E9FC2]/40 mb-1">
                      Mesa de Entrada Centralizada BMG
                    </div>
                    <h4 className="text-xl font-bold font-serif text-white" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                      Requerimiento Registrado Exitosamente
                    </h4>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/15 text-left text-xs text-white/85 leading-relaxed">
                    <p className="italic">
                      «Gracias por tu información. Tu perfil ha sido asignado a nuestra Mesa de Entrada Centralizada. Un consultor senior se comunicará contigo vía WhatsApp en los próximos 15 minutos para atender tu requerimiento».
                    </p>
                  </div>
                </div>

                <div className="px-5 py-3 border-t border-white/10 shrink-0 bg-[#082B3A]/95 flex flex-col sm:flex-row gap-2.5">
                  <a
                    href={frontDeskWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-foreground text-xs uppercase tracking-wider transition-all hover:scale-[1.01] shadow-lg"
                    style={{
                      backgroundColor: "var(--brand-sky, #4E9FC2)",
                      boxShadow: "0 4px 18px rgba(78,159,194,0.35)",
                    }}
                  >
                    <MessageSquare size={14} /> Conectar con Consultor por WhatsApp
                  </a>
                  <button
                    onClick={handleReturnToLanding}
                    className="sm:w-1/3 flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl border border-white/20 text-xs font-semibold text-white/75 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <ArrowLeft size={13} /> Volver a la landing
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}
