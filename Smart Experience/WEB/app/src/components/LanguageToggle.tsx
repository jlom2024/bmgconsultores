import { useState, useEffect } from "react";
import type { Lang } from "../lib/i18n";
import { setLang } from "../lib/i18n";

export function LanguageToggle() {
  const [lang, setLangState] = useState<Lang>("es");

  useEffect(() => {
    const stored = (typeof localStorage !== "undefined" ? localStorage.getItem("bg-lang") : null) as Lang | null;
    setLangState(stored || "es");
  }, []);

  const toggle = () => {
    const next: Lang = lang === "es" ? "en" : "es";
    setLangState(next);
    setLang(next);
    // Reload to apply translations (simple approach)
    window.location.reload();
  };

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-1 rounded-lg border border-border-light px-2.5 py-1.5 text-xs font-medium text-white/80 hover:border-amber/30 hover:text-amber transition-colors"
      aria-label="Toggle language"
    >
      <span className={lang === "es" ? "text-amber" : "text-white/60"}>ES</span>
      <span className="text-white/30">/</span>
      <span className={lang === "en" ? "text-amber" : "text-white/60"}>EN</span>
    </button>
  );
}