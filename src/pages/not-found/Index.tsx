import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-ivory">
      <div className="text-center max-w-md px-4">
        <h1 className="text-6xl font-bold mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--brand-navy)" }}>404</h1>
        <p className="text-xl mb-4" style={{ color: "var(--brand-navy)" }}>Página no encontrada</p>
        <p className="text-sm mb-6" style={{ color: "var(--brand-petroleum)" }}>El enlace puede haber cambiado o la página ya no existe.</p>
        <a href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-white transition-all hover:scale-105"
          style={{ backgroundColor: "var(--brand-sky)" }}>
          Volver al inicio
        </a>
      </div>
    </div>
  );
};

export default NotFound;
