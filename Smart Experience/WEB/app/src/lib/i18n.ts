// i18n for BG Travel Peru — Spanish (default) + English
export type Lang = "es" | "en";

const translations: Record<string, { es: string; en: string }> = {
  // Navbar
  "nav.experiencias": { es: "Experiencias", en: "Experiences" },
  "nav.vuelos": { es: "Vuelos", en: "Flights" },
  "nav.hoteles": { es: "Hoteles", en: "Hotels" },
  "nav.cotizar": { es: "Cotizar", en: "Get a Quote" },
  "nav.blog": { es: "Blog", en: "Blog" },
  "nav.nosotros": { es: "Nosotros", en: "About Us" },
  "nav.mi-cuenta": { es: "Mi Cuenta", en: "My Account" },

  // Hero
  "hero.title": { es: "Descubre el Peru\na traves de experiencias\nque transforman", en: "Discover Peru\nthrough experiences\nthat transform" },
  "hero.subtitle": { es: "Viajes culturales, comerciales y de aventura disenados para vos", en: "Cultural, business and adventure travel designed for you" },
  "hero.cta": { es: "Explorar Experiencias", en: "Explore Experiences" },
  "hero.cta-cotizar": { es: "Cotizar Viaje", en: "Get a Quote" },

  // Sections
  "section.experiencias": { es: "Experiencias Destacadas", en: "Featured Experiences" },
  "section.experiencias-desc": { es: "Descubri nuestros paquetes turisticos unicos en todo el Peru", en: "Discover our unique travel packages across Peru" },
  "section.porque": { es: "Por que BG Travel?", en: "Why BG Travel?" },
  "section.contacto": { es: "Contacto", en: "Contact" },
  "section.blog": { es: "Ultimos del Blog", en: "Latest from the Blog" },

  // Features
  "feature.1.title": { es: "Experiencias Unicas", en: "Unique Experiences" },
  "feature.1.desc": { es: "Circuitos culturales, comerciales y de aventura que no encontraras en otro lado", en: "Cultural, business and adventure circuits you won't find anywhere else" },
  "feature.2.title": { es: "Atencion Personalizada", en: "Personalized Service" },
  "feature.2.desc": { es: "Asesoramiento directo por WhatsApp con respuestas en minutos", en: "Direct WhatsApp support with responses in minutes" },
  "feature.3.title": { es: "Precios Transparentes", en: "Transparent Pricing" },
  "feature.3.desc": { es: "Sin cargos ocultos. Cotizacion detallada antes de confirmar", en: "No hidden fees. Detailed quote before you confirm" },
  "feature.4.title": { es: "Cobertura Nacional", en: "National Coverage" },
  "feature.4.desc": { es: "Destinos en todo el Peru: costa, sierra y selva", en: "Destinations across Peru: coast, highlands and jungle" },

  // Footer
  "footer.desc": { es: "Tu agencia de viajes inteligente. Exploramos Peru con experiencias unicas.", en: "Your smart travel agency. Exploring Peru with unique experiences." },
  "footer.explora": { es: "Explora", en: "Explore" },
  "footer.contacto": { es: "Contacto", en: "Contact" },
  "footer.whatsapp": { es: "WhatsApp: +51 994 118 084", en: "WhatsApp: +51 994 118 084" },
  "footer.email": { es: "Email: hola@bgtravelperu.com", en: "Email: hola@bgtravelperu.com" },
  "footer.derechos": { es: "Todos los derechos reservados.", en: "All rights reserved." },

  // Flights
  "vuelos.title": { es: "Vuelos en Peru", en: "Flights in Peru" },
  "vuelos.subtitle": { es: "Encuentra los mejores precios para tus vuelos", en: "Find the best prices for your flights" },
  "vuelos.demo": { es: "Modo demostracion — Datos de vuelos reales de Google Flights. Reserva simulada con redireccion a WhatsApp.", en: "Demo mode — Real flight data from Google Flights. Simulated booking with WhatsApp redirect." },

  // Hotels
  "hoteles.title": { es: "Hoteles en Peru", en: "Hotels in Peru" },
  "hoteles.subtitle": { es: "Encuentra el alojamiento perfecto para tu viaje", en: "Find the perfect accommodation for your trip" },

  // Common
  "common.buscar": { es: "Buscar", en: "Search" },
  "common.reservar": { es: "Reservar", en: "Book Now" },
  "common.cargando": { es: "Cargando...", en: "Loading..." },
  "common.ciudad": { es: "Ciudad", en: "City" },
  "common.huespedes": { es: "Huespedes", en: "Guests" },
  "common.pasajeros": { es: "Pasajeros", en: "Passengers" },
  "common.precio": { es: "Precio", en: "Price" },
  "common.total": { es: "Total", en: "Total" },
  "common.fecha": { es: "Fecha", en: "Date" },
  "common.volver": { es: "← Volver al sitio", en: "← Back to site" },
  "common.enviar": { es: "Enviar", en: "Send" },
};

export function t(key: string, lang: Lang): string {
  return translations[key]?.[lang] || key;
}

export function useTranslation(lang: Lang) {
  return { t: (key: string) => t(key, lang), lang };
}

export function detectLang(): Lang {
  if (typeof window === "undefined") return "es";
  const stored = localStorage.getItem("bg-lang");
  if (stored === "en" || stored === "es") return stored;
  return navigator.language?.startsWith("en") ? "en" : "es";
}

export function setLang(lang: Lang) {
  if (typeof window !== "undefined") localStorage.setItem("bg-lang", lang);
}