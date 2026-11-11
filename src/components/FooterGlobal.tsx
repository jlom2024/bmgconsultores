import { useNavigate, useLocation } from "react-router-dom";
import { MapPin, Mail, Phone, Sparkles } from "lucide-react";
import { services } from "@/data/services";

interface FooterGlobalProps {
  travelTheme?: boolean;
}

export default function FooterGlobal({ travelTheme = false }: FooterGlobalProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const mapsGpsUrl =
    "https://maps.google.com/?q=Av.+Agust%C3%ADn+Gamarra+1132%2C+Segundo+Piso%2C+Oficina+226%2C+Galer%C3%ADa+Brisas%2C+La+Victoria%2C+Lima";

  const handleNavQuienesSomos = () => {
    if (location.pathname === "/") {
      const el = document.getElementById("quienes-somos");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    navigate("/#quienes-somos");
    setTimeout(() => {
      const el = document.getElementById("quienes-somos");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 150);
  };

  return (
    <footer
      className="border-t py-14 text-white"
      style={
        travelTheme
          ? { background: "var(--brand-navy, #082B3A)", borderColor: "rgba(214,168,63,0.2)" }
          : { background: "#041720", borderColor: "rgba(255,255,255,0.08)" }
      }
    >
      <div className="container mx-auto px-4">
        {/* Bloque Superior: Sedes Duales (Hub Comercial La Victoria + Hub Financiero Miraflores) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 sm:p-8 rounded-3xl bg-white/[0.02] border border-white/10 mb-12">
          {/* Sede Comercial */}
          <div className="flex items-start gap-4">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 text-black shadow-lg"
              style={{ backgroundColor: "var(--brand-gold, #D6A83F)" }}
            >
              <MapPin size={22} />
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-widest font-bold text-[#D6A83F] mb-1">
                Hub Comercial — La Victoria
              </div>
              <a
                href={mapsGpsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#D6A83F] font-semibold text-sm leading-snug transition-colors block"
              >
                Av. Agustín Gamarra 1132, Segundo Piso, Of. 226 (Galería Brisas), La Victoria, Lima.
              </a>
              <p className="text-white/45 text-xs mt-1">
                Atención presencial en Gamarra y formalización de empresas emergentes.
              </p>
            </div>
          </div>

          {/* Sede Financiera */}
          <div className="flex items-start gap-4">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 text-black shadow-lg"
              style={{ backgroundColor: "var(--brand-sky, #4E9FC2)" }}
            >
              <Sparkles size={22} />
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-widest font-bold text-[#4E9FC2] mb-1">
                Hub Financiero & Corporativo — Miraflores
              </div>
              <div className="text-white font-semibold text-sm leading-snug">
                Centro Empresarial Miraflores, Lima.
              </div>
              <p className="text-white/45 text-xs mt-1">
                Mesa de holdings, blindaje legal, inversiones corporativas y fondeo internacional.
              </p>
            </div>
          </div>
        </div>

        {/* Bloque Central: Navegación Institucional y Divisiones */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-white/10">
          {/* Columna Marca */}
          <div className="space-y-4">
            <img
              src="/logos/bmg_clean.png?v=6"
              alt="BMG Consultores"
              className="h-12 w-auto object-contain"
              style={{
                filter:
                  "grayscale(1) brightness(0) invert(72%) sepia(60%) saturate(600%) hue-rotate(6deg) brightness(95%) contrast(88%)",
              }}
            />
            <p className="text-xs text-white/60 leading-relaxed">
              Gestión Corporativa 360° y Red de Negocios Profesional de Alto Nivel. Blindaje patrimonial, formalización y escala empresarial en el Perú.
            </p>
          </div>

          {/* Columna Institucional (con Quiénes Somos duplicado) */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-widest text-[#D6A83F]">
              Corporativo
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={handleNavQuienesSomos}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Quiénes Somos
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate("/fundadora")}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Nuestra Fundadora (CEO)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate("/estrategia-premium")}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Estrategia Premium & Holdings
                </button>
              </li>
            </ul>
          </div>

          {/* Columna Divisiones 1-5 */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-widest text-[#D6A83F]">
              Divisiones I
            </div>
            <ul className="space-y-2 text-xs">
              {services.slice(0, 5).map((s) => (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => navigate(`/${s.id}`)}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {s.menuName || s.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna Divisiones 6-9 */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-widest text-[#D6A83F]">
              Divisiones II
            </div>
            <ul className="space-y-2 text-xs">
              {services.slice(5).map((s) => (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => navigate(`/${s.id}`)}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {s.menuName || s.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Barra Inferior */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <div>
            © 2025 BMG Consultores. Todos los derechos reservados.
            <span className="mx-2">·</span>
            Design by:{" "}
            <a
              href="https://kreoia.site"
              target="_blank"
              rel="noreferrer"
              className="text-[#D6A83F] hover:underline"
            >
              KREO IA Studio
            </a>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={handleNavQuienesSomos}
              className="hover:text-white/80 transition-colors"
            >
              Quiénes Somos
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={() => navigate("/privacidad")}
              className="hover:text-white/80 transition-colors"
            >
              Política de privacidad
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={() => navigate("/terminos")}
              className="hover:text-white/80 transition-colors"
            >
              Términos y condiciones
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
