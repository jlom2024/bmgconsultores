import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X, Sparkles, Building2, User } from "lucide-react";
import { services } from "@/data/services";
import PrecalificacionModal from "./PrecalificacionModal";

interface NavbarProps {
  travelTheme?: boolean;
  premiumTheme?: boolean;
}

export default function Navbar({ premiumTheme = false }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [corpDropdownOpen, setCorpDropdownOpen] = useState(false);
  const [modalPrecalificacionOpen, setModalPrecalificacionOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavQuienesSomos = () => {
    setMenuOpen(false);
    setCorpDropdownOpen(false);
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

  const handleNavFundadora = () => {
    setMenuOpen(false);
    setCorpDropdownOpen(false);
    navigate("/fundadora");
  };

  const navBg = scrolled
    ? "bg-[#082B3A]/90 backdrop-blur-xl border-b border-[#D6A83F]/25 shadow-xl shadow-black/30"
    : premiumTheme
    ? "bg-[#082B3A]/60 backdrop-blur-md border-b border-white/10"
    : "bg-background/90 backdrop-blur-md border-b border-primary/30 shadow-lg shadow-black/20";

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
        <div className="container mx-auto px-4 flex items-center justify-between h-16">
          {/* Logo Principal al costado */}
          <div className="flex items-center gap-3">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                navigate("/");
              }}
              className="flex items-center gap-2 hover:opacity-85 transition-opacity"
              aria-label="BMG Consultores Inicio"
            >
              <img
                src="/logos/bmg_clean.png?v=6"
                alt="BMG Consultores"
                className="h-10 sm:h-12 w-auto object-contain"
                style={{
                  filter:
                    "grayscale(1) brightness(0) invert(72%) sepia(60%) saturate(600%) hue-rotate(6deg) brightness(95%) contrast(88%)",
                }}
              />
            </a>
          </div>

          {/* MENÚ SUPERIOR DE ESCRITORIO (Texto limpio, minimalista, sin siglas BG ni iconos) */}
          <div className="hidden xl:flex items-center gap-1.5">
            {/* Botón desplegable Corporativo */}
            <div
              className="relative"
              onMouseEnter={() => setCorpDropdownOpen(true)}
              onMouseLeave={() => setCorpDropdownOpen(false)}
            >
              <button
                type="button"
                onClick={() => setCorpDropdownOpen(!corpDropdownOpen)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 ${
                  corpDropdownOpen || location.pathname === "/fundadora"
                    ? "text-[#D6A83F] bg-white/10"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                Corporativo
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${corpDropdownOpen ? "rotate-180 text-[#D6A83F]" : "text-white/60"}`}
                />
              </button>

              <AnimatePresence>
                {corpDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.96 }}
                    transition={{ duration: 0.18 }}
                    className="absolute left-0 mt-1 w-52 py-2 rounded-2xl bg-[#082B3A] border border-[#D6A83F]/35 shadow-2xl shadow-black/60 backdrop-blur-2xl z-50"
                  >
                    <button
                      type="button"
                      onClick={handleNavQuienesSomos}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs text-left font-medium text-white/85 hover:text-white hover:bg-white/10 transition-colors"
                    >
                      <Building2 size={15} className="text-[#D6A83F]" />
                      Quiénes Somos
                    </button>
                    <button
                      type="button"
                      onClick={handleNavFundadora}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs text-left font-medium text-white/85 hover:text-white hover:bg-white/10 transition-colors border-t border-white/5"
                    >
                      <User size={15} className="text-[#D6A83F]" />
                      Nuestra Fundadora
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Las 9 pestañas comerciales en orden estratégico */}
            {services.map((s) => {
              const isActive = location.pathname === `/${s.id}`;
              const label = s.menuName || s.name;
              return (
                <button
                  key={s.id}
                  onClick={() => navigate(`/${s.id}`)}
                  className={`px-2.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 ${
                    isActive
                      ? "text-[#D6A83F] bg-white/15 shadow-sm"
                      : "text-white/75 hover:text-white hover:bg-white/10"
                  }`}
                  title={label}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* LADO DERECHO: 10. Estrategia Premium (Botón destacado) + Mobile trigger */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setModalPrecalificacionOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-black transition-all duration-300 hover:scale-105"
              style={{
                backgroundColor: "var(--brand-gold, #D6A83F)",
                boxShadow: "0 4px 18px rgba(214,168,63,0.45)",
              }}
            >
              <Sparkles size={14} /> Estrategia Premium
            </button>

            {/* Mobile menu toggle */}
            <button
              className="xl:hidden text-white p-2 hover:bg-white/10 rounded-xl transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Abrir menú"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* MOBILE DRAWER */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="xl:hidden bg-[#082B3A]/98 border-t border-white/10 overflow-hidden"
            >
              <div className="p-4 space-y-3">
                {/* Botón Destacado Mobile */}
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    setModalPrecalificacionOpen(true);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-black transition-all"
                  style={{
                    backgroundColor: "var(--brand-gold, #D6A83F)",
                    boxShadow: "0 4px 16px rgba(214,168,63,0.35)",
                  }}
                >
                  <Sparkles size={15} /> Estrategia Premium
                </button>

                {/* Sección Corporativo */}
                <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 space-y-1">
                  <div className="text-[11px] font-bold uppercase tracking-widest text-[#D6A83F] px-2 py-1">
                    Corporativo
                  </div>
                  <button
                    onClick={handleNavQuienesSomos}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm text-white/90 hover:bg-white/10 transition-colors"
                  >
                    Quiénes Somos
                  </button>
                  <button
                    onClick={handleNavFundadora}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm text-white/90 hover:bg-white/10 transition-colors"
                  >
                    Nuestra Fundadora
                  </button>
                </div>

                {/* 9 Divisiones comerciales */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {services.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => {
                        navigate(`/${s.id}`);
                        setMenuOpen(false);
                      }}
                      className="text-left px-3 py-2.5 rounded-xl text-sm font-medium text-white/85 hover:text-white hover:bg-white/10 transition-colors"
                    >
                      {s.menuName || s.name}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Modal Precalificación (El Guardián Digital) */}
      <PrecalificacionModal
        isOpen={modalPrecalificacionOpen}
        onClose={() => setModalPrecalificacionOpen(false)}
      />
    </>
  );
}
