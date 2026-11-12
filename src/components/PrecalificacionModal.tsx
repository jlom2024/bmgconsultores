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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-2xl bg-[#082B3A] border border-[#D6A83F]/40 rounded-3xl p-6 sm:p-8 text-white shadow-2xl overflow-hidden my-8"
        style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.8), 0 0 30px rgba(214,168,63,0.15)" }}
      >
        {/* Glow de fondo */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#D6A83F]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#4E9FC2]/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

        {/* Barra superior de retorno / cerrar */}
        <div className="flex items-center justify-between mb-4 relative z-10">
          <button
            type="button"
            onClick={handleReturnToLanding}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-white/80 bg-white/5 hover:bg-white/15 hover:text-white border border-white/15 transition-all cursor-pointer"
          >
            <ArrowLeft size={14} /> Volver a la landing
          </button>
          <button
            type="button"
            onClick={handleReturnToLanding}
            className="p-1.5 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Cerrar y volver a la landing"
          >
            <X size={20} />
          </button>
        </div>

        {/* Encabezado */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-[#D6A83F]/15 border border-[#D6A83F]/35 text-[#D6A83F] mb-2">
            <ShieldCheck size={14} /> Filtro de Agenda Privada · Alta Dirección
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold font-serif text-white tracking-wide" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Solicitar Sesión Estratégica con la CEO
          </h3>
          <p className="text-xs sm:text-sm text-white/60 mt-1">
            Formulario de precalificación confidencial para asignación directa de agenda y consultoría de alto nivel.
          </p>
        </div>

        {/* PASO 1: PREGUNTAS ESTRATÉGICAS */}
        {step === "questions" && (
          <form onSubmit={handleNextToContact} className="space-y-6">
            {/* Pregunta 1 */}
            <div className="space-y-2">
              <label className="block text-xs sm:text-sm font-semibold text-white/90">
                1. ¿Cuál es el volumen de facturación mensual o el capital estimado de tu proyecto?
              </label>
              <div className="grid grid-cols-1 gap-2">
                {[
                  { id: "menos_20k", label: "Menos de S/ 20,000 mensuales." },
                  { id: "20k_100k", label: "Entre S/ 20,000 y S/ 100,000 mensuales." },
                  { id: "mas_100k", label: "Más de S/ 100,000 / Fondos de Inversión Internacionales." },
                ].map((opt) => (
                  <label
                    key={opt.id}
                    className={`flex items-center gap-3 p-3.5 rounded-xl border text-xs sm:text-sm cursor-pointer transition-all ${
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
            <div className="space-y-2">
              <label className="block text-xs sm:text-sm font-semibold text-white/90">
                2. ¿Cuál es la naturaleza principal de tu consulta de alto nivel?
              </label>
              <div className="grid grid-cols-1 gap-2">
                {[
                  { id: "holdings", label: "Estructuración de Holdings u Optimización Fiscal Compleja." },
                  { id: "importacion", label: "Proyectos de Importación / Cadenas de Suministro Globales." },
                  { id: "inmobiliaria", label: "Inversiones Inmobiliarias, Saneamiento a gran escala o Fondeo Extranjero." },
                  { id: "operativa", label: "Consultas operativas (Constitución básica, contabilidad mensual mype)." },
                ].map((opt) => (
                  <label
                    key={opt.id}
                    className={`flex items-center gap-3 p-3.5 rounded-xl border text-xs sm:text-sm cursor-pointer transition-all ${
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
            <div className="space-y-2">
              <label className="block text-xs sm:text-sm font-semibold text-white/90">
                3. ¿Cuál es tu presupuesto asignado para la implementación de esta solución estratégica?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  { id: "pyme", label: "Presupuesto de entrada / PYME." },
                  { id: "corporativo", label: "Presupuesto Corporativo / Inversor de Capital." },
                ].map((opt) => (
                  <label
                    key={opt.id}
                    className={`flex items-center gap-3 p-3.5 rounded-xl border text-xs sm:text-sm cursor-pointer transition-all ${
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

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={handleReturnToLanding}
                className="order-2 sm:order-1 sm:w-2/5 flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl border border-white/20 text-xs sm:text-sm font-semibold text-white/75 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <ArrowLeft size={15} /> Volver a la landing
              </button>
              <button
                type="submit"
                disabled={!facturacion || !naturaleza || !presupuesto}
                className="order-1 sm:order-2 sm:w-3/5 flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl font-bold text-black text-sm uppercase tracking-wider transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.01] cursor-pointer"
                style={{
                  backgroundColor: "var(--brand-gold, #D6A83F)",
                  boxShadow: "0 4px 20px rgba(214,168,63,0.35)",
                }}
              >
                Continuar <ArrowRight size={16} />
              </button>
            </div>
          </form>
        )}

        {/* PASO 2: DATOS DE CONTACTO */}
        {step === "contact" && (
          <form onSubmit={handleProcessLead} className="space-y-4">
            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-white/70 mb-2">
              Ingresa tus datos corporativos para canalizar el análisis de tu proyecto con el equipo correspondiente.
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-white/60 mb-1">Nombre y Apellidos *</label>
              <div className="relative">
                <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  required
                  type="text"
                  placeholder="Ej. Carlos Mendoza"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 text-sm focus:border-[#D6A83F] focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-white/60 mb-1">Empresa / Fondo / Proyecto</label>
              <div className="relative">
                <Building2 size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type="text"
                  placeholder="Ej. Grupo Inmobiliario Sur / Proyecto Expansión"
                  value={empresa}
                  onChange={(e) => setEmpresa(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 text-sm focus:border-[#D6A83F] focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs uppercase tracking-widest text-white/60 mb-1">WhatsApp / Móvil *</label>
                <div className="relative">
                  <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
                  <input
                    required
                    type="tel"
                    placeholder="+51 987 654 321"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 text-sm focus:border-[#D6A83F] focus:outline-none transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-white/60 mb-1">Correo Electrónico</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
                  <input
                    type="email"
                    placeholder="contacto@empresa.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 text-sm focus:border-[#D6A83F] focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-3">
              <button
                type="button"
                onClick={() => setStep("questions")}
                className="w-1/3 py-3 px-4 rounded-xl border border-white/20 text-xs text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              >
                Volver
              </button>
              <button
                type="submit"
                className="w-2/3 flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold text-black text-sm uppercase tracking-wider transition-all hover:scale-[1.01]"
                style={{
                  backgroundColor: "var(--brand-gold, #D6A83F)",
                  boxShadow: "0 4px 20px rgba(214,168,63,0.35)",
                }}
              >
                Evaluar y Enviar Solicitud <Sparkles size={16} />
              </button>
            </div>
          </form>
        )}

        {/* PASO: EVALUACIÓN EN MILISEGUNDOS */}
        {step === "evaluating" && (
          <div className="py-16 text-center space-y-4">
            <div className="w-14 h-14 mx-auto border-4 border-[#D6A83F]/30 border-t-[#D6A83F] rounded-full animate-spin" />
            <h4 className="text-xl font-serif font-bold text-white">Validando Perfil Corporativo...</h4>
            <p className="text-xs text-white/60 max-w-sm mx-auto">
              El Guardián Digital está procesando los parámetros estratégicos para la asignación óptima de mesa y agenda.
            </p>
          </div>
        )}

        {/* PASO 3: RESULTADO CONDICIONAL (IF / ELSE) */}
        {step === "result" && (
          <div>
            {isQualified ? (
              /* CASO A: LEAD CALIFICADO PREMIUM */
              <div className="space-y-6 text-center py-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#D6A83F]/20 border border-[#D6A83F] flex items-center justify-center text-[#D6A83F] shadow-lg shadow-[#D6A83F]/20">
                  <Sparkles size={32} />
                </div>

                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-[#D6A83F]/20 text-[#D6A83F] border border-[#D6A83F]/40 mb-2">
                    👑 Lead Premium Calificado · Acceso Directo
                  </div>
                  <h4 className="text-2xl sm:text-3xl font-bold font-serif text-white" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    Perfil Aprobado para Sesión Estratégica
                  </h4>
                  <p className="text-xs sm:text-sm text-white/70 max-w-lg mx-auto mt-2 leading-relaxed">
                    Tu requerimiento califica para la agenda privada de alta dirección con <strong>Blanca Gutiérrez, CEO de BMG Consultores</strong>. Tu solicitud activa de inmediato el canal preferencial de holding y fondeo corporativo.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.04] border border-[#D6A83F]/30 text-left space-y-2 text-xs sm:text-sm">
                  <div className="flex items-center gap-2 text-[#D6A83F] font-semibold">
                    <CheckCircle2 size={16} /> Parámetros estratégicos verificados:
                  </div>
                  <p className="text-white/80 pl-6">
                    • Enfoque de alta rentabilidad, estructuración patrimonial o fondeo internacional.
                  </p>
                  <p className="text-white/80 pl-6">
                    • Asignación prioritaria con notificación push al despacho ejecutivo.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <a
                    href={ceoWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 py-4 px-6 rounded-2xl font-bold text-black text-sm uppercase tracking-wider transition-all hover:scale-[1.02] shadow-xl"
                    style={{
                      backgroundColor: "var(--brand-gold, #D6A83F)",
                      boxShadow: "0 8px 30px rgba(214,168,63,0.45)",
                    }}
                  >
                    💼 Abrir Agenda Privada con la CEO
                  </a>
                  <button
                    onClick={handleReturnToLanding}
                    className="sm:w-1/3 flex items-center justify-center gap-1.5 py-4 px-4 rounded-2xl border border-white/20 text-xs font-semibold text-white/75 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <ArrowLeft size={14} /> Volver a la landing
                  </button>
                </div>
              </div>
            ) : (
              /* CASO B: LEAD OPERATIVO ESTÁNDAR */
              <div className="space-y-6 text-center py-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#4E9FC2]/20 border border-[#4E9FC2] flex items-center justify-center text-[#4E9FC2] shadow-lg shadow-[#4E9FC2]/20">
                  <Clock size={32} />
                </div>

                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-[#4E9FC2]/20 text-[#4E9FC2] border border-[#4E9FC2]/40 mb-2">
                    Mesa de Entrada Centralizada BMG
                  </div>
                  <h4 className="text-2xl sm:text-3xl font-bold font-serif text-white" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    Requerimiento Registrado Exitosamente
                  </h4>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/15 text-left text-xs sm:text-sm text-white/85 leading-relaxed">
                  <p className="italic">
                    «Gracias por tu información. Tu perfil ha sido asignado a nuestra Mesa de Entrada Centralizada. Un consultor senior de nuestro equipo se comunicará contigo vía WhatsApp en los próximos 15 minutos para atender tu requerimiento corporativo».
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <a
                    href={frontDeskWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 py-4 px-6 rounded-2xl font-bold text-foreground text-sm uppercase tracking-wider transition-all hover:scale-[1.02] shadow-xl"
                    style={{
                      backgroundColor: "var(--brand-sky, #4E9FC2)",
                      boxShadow: "0 8px 30px rgba(78,159,194,0.4)",
                    }}
                  >
                    <MessageSquare size={16} /> Conectar con Consultor Senior por WhatsApp
                  </a>
                  <button
                    onClick={handleReturnToLanding}
                    className="sm:w-1/3 flex items-center justify-center gap-1.5 py-4 px-4 rounded-2xl border border-white/20 text-xs font-semibold text-white/75 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <ArrowLeft size={14} /> Volver a la landing
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
