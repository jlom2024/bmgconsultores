// Travel Assistant — AI-powered chatbot for BG Travel
import { createServerFn } from "@tanstack/react-start";
import { bindings } from "../bindings.server";

const KNOWLEDGE_BASE = {
  destinations: {
    cusco: {
      name: "Cusco",
      keywords: ["cusco", "cuzco", "machu picchu", "valle sagrado", "ollantaytambo", "pisac", "sacsayhuaman", "inka", "inca"],
      info: "Cusco es la capital historica del Peru, ubicada a 3,400 msnm. Fue la capital del Imperio Inca y hoy es el principal destino turistico del pais. Combina arquitectura inca y colonial.",
      tips: "Aclimatate 2 dias antes de hacer caminatas. Toma mate de coca para el soroche (mal de altura). Usa bloqueador solar, la radiacion en los Andes es intensa.",
      mejorEpoca: "Mayo a septiembre (temporada seca). Abril y octubre son meses de transicion con menos turistas.",
      platos: ["Cuy al horno", "Chairo (sopa tradicional)", "Rocoto relleno", "Chicha de jora"],
    },
    tarma: {
      name: "Tarma",
      keywords: ["tarma", "tarm", "perla", "andes", "junin", "huagapo", "carpapata"],
      info: "Tarma, conocida como 'La Perla de los Andes', esta ubicada en la region Junin a 3,050 msnm. Es famosa por sus paisajes verdes, miradores naturales y clima primaveral durante todo el ano.",
      tips: "Lleva ropa de abrigo, las noches son frias. Visita el mercado central los domingos. Prueba el punch de miel y los helados artesanales.",
      mejorEpoca: "Todo el ano, pero especialmente de abril a noviembre (temporada seca). El clima es templado todo el ano, con temperaturas entre 12°C y 22°C.",
      platos: ["Pachamanca", "Cuy colorado", "Papa rellena tarmeña", "Punch de miel"],
    },
    gamarra: {
      name: "Gamarra Fashion Tour",
      keywords: ["gamarra", "moda", "textil", "ropa", "comercial", "fashion", "diseño", "diseno"],
      info: "Gamarra es el emporio comercial textil mas grande de Latinoamerica, ubicado en el distrito de La Victoria, Lima. Con mas de 20,000 tiendas, es el corazon de la moda peruana. Ofrece ropa de algodon peruano, alpaca y disenos unicos a precios de fabrica.",
      tips: "Lleva efectivo, muchos puestos solo trabajan en efectivo. Visita entre semana (lunes a viernes) para mejor atencion. Los precios son mejores comprando al por mayor.",
      mejorEpoca: "Todo el ano. Las temporadas de mayor variedad son marzo-abril (coleccion otono-invierno) y setiembre-octubre (coleccion primavera-verano).",
      platos: [],
    },
    lima: {
      name: "Lima Gastronomica",
      keywords: ["lima", "gastronomia", "comida", "ceviche", "causa", "lomo saltado", "pisco", "miraflores", "barranco"],
      info: "Lima es la capital gastronomica de America Latina. Su cocina fusiona influencias precolombinas, africanas, espanolas, chinas y japonesas. La ciudad alberga algunos de los mejores restaurantes del mundo, ademas de mercados tradicionales llenos de sabor.",
      tips: "Prueba el ceviche en el almuerzo (no en la cena, los pescados son mas frescos al mediodia). Visita el Mercado de Surquillo y el Barrio Chino. Reserva en restaurantes top con semanas de anticipacion.",
      mejorEpoca: "Todo el ano. Lima tiene clima templado todo el ano (18-28°C). El verano (enero-marzo) es ideal para playas y mariscos. El invierno (junio-setiembre) es perfecto para explorar la ciudad sin calor.",
      platos: ["Ceviche clasico", "Causa limeña", "Lomo saltado", "Anticuchos", "Suspiro limeño"],
    },
    ica: {
      name: "Ica y Huacachina",
      keywords: ["ica", "huacachina", "huacachin", "desierto", "dunas", "pisco", "bodega", "vino", "nazca", "oasis"],
      info: "Ica es la region del vino y el pisco en Peru. Su principal atractivo es Huacachina, un oasis natural en medio del desierto rodeado de dunas de arena. Es el destino ideal para aventura, deportes de arena y degustacion de vinos y piscos.",
      tips: "Lleva bloqueador solar y gorro, el sol en el desierto es extremo. El sandboarding y los paseos en arenero (tubulares) son imperdibles. Las bodegas abren de martes a domingo.",
      mejorEpoca: "Todo el ano, pero especialmente de diciembre a abril (verano) para disfrutar mas del oasis. La temperatura en verano llega a 35°C.",
      platos: ["Tejas y chocotejas", "Carapulcra", "Papa seca", "Pisco sour"],
    },
    internacional: {
      name: "Paquete Internacional",
      keywords: ["internacional", "exterior", "viaje", "mundo", "extranjero", "europa", "asia", "usa", "eeuu"],
      info: "BG Travel ofrece paquetes internacionales a diversos destinos alrededor del mundo, con asistencia personalizada, guias bilingues y experiencias culturales unicas. Consulta con nuestro equipo para disenar el viaje de tus suenos.",
      tips: "Verifica los requisitos de visa con al menos 3 meses de anticipacion. Revisa las vacunas requeridas para tu destino. Contrata un seguro de viaje internacional.",
      mejorEpoca: "Depende del destino. Consulta con nuestro equipo para recomendarte la mejor epoca segun tu destino de interes.",
      platos: [],
    },
    naturepunk: {
      name: "Nature Punk",
      keywords: ["nature punk", "naturepunk", "sonido", "sonora", "inmersivo", "silent concert", "concierto", "bioacustica", "soundhealing", "soundwalk", "sama", "andes"],
      info: "Nature Punk es un estudio de exploracion sonora peruano que ofrece experiencias inmersivas en el Valle Sagrado. Usa audifonos 8D inalambricos SAMA para crear conciertos silent, soundwalks con biofeedback vegetal y sesiones de narracion musical andina en vivo.",
      tips: "No necesitas experiencia musical previa. Las experiencias duran entre 20 minutos y 2 horas. Ideal para cerrar un dia de exploracion en el Valle Sagrado. Combinalo con tu visita a Ollantaytambo o Pisac.",
      mejorEpoca: "Todo el ano, las experiencias son indoor y outdoor. La mejor experiencia es al atardecer.",
      platos: [],
    },
  },
  faq: [
    { q: ["visa", "visado", "necesito visa", "requisitos entrada", "documentos"], r: "Los ciudadanos de la mayoria de paises de America del Sur no necesitan visa para ingresar a Peru. Ciudadanos de EE.UU., Canada, la Union Europea, Australia y Japon pueden ingresar sin visa por hasta 183 dias. Siempre verifica los requisitos actualizados con la embajada peruana de tu pais." },
    { q: ["mejor epoca", "mejor fecha", "cuando ir", "clima", "temporada"], r: "La mejor epoca para visitar Peru depende de la region:\n- Costa (Lima, Paracas, Ica): Todo el ano. Verano (dic-mar) para playa, invierno (jun-sep) para ciudad.\n- Sierra (Cusco, Tarma, Valle Sagrado): Mayo a septiembre (temporada seca, cielos despejados).\n- Selva: Mayo a octubre (temporada seca, menos lluvias)." },
    { q: ["altura", "soroche", "mal de altura", "altitud", "aclimatacion", "oxigeno", "mountain sickness"], r: "El soroche (mal de altura) es comun en ciudades como Cusco (3,400m). Recomendaciones:\n1. Llega a Cusco 2 dias antes de cualquier caminata\n2. Toma mate de coca (natural y efectivo)\n3. Evita alcohol y comidas pesadas los primeros dias\n4. Camina despacio, hidratate constantemente\n5. Si los sintomas son severos, baja a menor altitud" },
    { q: ["seguridad", "es seguro", "peligroso", "robo", "estafa"], r: "Peru es generalmente seguro para turistas, especialmente en las zonas turisticas. Recomendaciones:\n- Usa taxis oficiales o apps (Uber, Didi)\n- No muestres objetos de valor en zonas concurridas\n- En Cusco, contrata guias oficiales para Machu Picchu\n- En Lima, evita el Centro Historico de noche\n- BG Travel te asesora en cada paso" },
    { q: ["presupuesto", "cuanto cuesta", "precio", "costo", "barato", "economico"], r: "Los precios de los paquetes BG Travel:\n- Cusco Imperial: desde S/ 890 (4 dias)\n- Tarma Natural: desde S/ 320 (2 dias)\n- Gamarra Fashion Tour: desde S/ 150 (1 dia)\n- Lima Gastronomica: desde S/ 280 (2 dias)\n- Ica y Huacachina: desde S/ 350 (2 dias)\n- Nature Punk: consultar (desde 50 min)\nTodos incluyen guia, transporte y experiencias unicas." },
    { q: ["como reservar", "reserva", "booking", "compra", "pago", "contratar"], r: "Reservar con BG Travel es simple:\n1. Elige tu experiencia en bgtravel.pe/experiencias\n2. Haz clic en 'Cotizar por WhatsApp'\n3. Te respondemos en menos de 24 horas\n4. Confirmas y te enviamos tu itinerario\n5. Viajas con soporte permanente" },
    { q: ["transporte", "vuelo", "avion", "bus", "como llegar", "movilidad"], r: "BG Travel puede incluir transporte en tus paquetes:\n- Vuelos: coordinamos con Latam, Sky o JetSmart\n- Bus: servicios Cruz del Sur o Civa para rutas terrestres\n- Traslados locales: taxi o van privada\nTodo se coordina segun tu itinerario y presupuesto." },
    { q: ["hotel", "hospedaje", "alojamiento", "donde dormir", "hotel"], r: "Trabajamos con hoteles seleccionados segun tu presupuesto:\n- Económico: hostales y hoteles 3 estrellas\n- Estandar: hoteles 4 estrellas con desayuno incluido\n- Premium: hoteles 5 estrellas y boutiques\nTe recomendamos segun tu destino y preferencias." },
    { q: ["comida", "restaurante", "vegetariano", "vegano", "dieta", "alergia"], r: "Peru tiene una de las gastronomias mas diversas del mundo. Recomendamos:\n- Prueba platos tipicos de cada region\n- Hay opciones vegetarianas y veganas en la mayoria de restaurantes turisticos\n- Informa a tu guia si tienes alergias o restricciones alimenticias\n- BG Travel puede incluir experiencias gastronomicas en tu paquete" },
    { q: ["idioma", "ingles", "español", "guia", "bilingue"], r: "Los guias de BG Travel son bilingues (espanol-ingles). Podemos coordinar guias en otros idiomas (frances, portugues, aleman) con anticipacion." },
    { q: ["seguro", "seguro de viaje", "asistencia", "emergencia", "medico"], r: "Recomendamos contratar un seguro de viaje internacional. BG Travel puede incluir seguro basico en tus paquetes. Para emergencias, tenemos una linea de atencion 24/7." },
    { q: ["facebook", "instagram", "redes", "tiktok", "reseñas", "reviews"], r: "Siguenos en redes:\n- Instagram: @bgtravelperu\n- Facebook: BG Travel Peru\n- TikTok: @bgtravelperu\n- WhatsApp: +51 994 118 084" },
    { q: ["gamarra", "comprar", "ropa", "textil", "fabricas"], r: "El Gamarra Fashion Tour es unico en el mercado. Incluye:\n- Recorrido por el emporio comercial de Gamarra\n- Visita a fabricas y talleres de diseno\n- Asesoria de compras con guia experto\n- Precios de fabrica en algodon peruano y alpaca\n- Ideal para emprendedores de moda y compradores" },
    { q: ["machu picchu", "mp", "ciudadela", "inca", "ruinas"], r: "Machu Picchu es la joya de Peru. Informacion util:\n- Altitud: 2,430 msnm (menor que Cusco, se respira mejor)\n- Boletos: se agotan con semanas de anticipacion\n- Huayna Picchu: solo 400 personas/dia, reserva con 2 meses\n- Mejor horario: 6:00 am (menos gente, luz espectacular)\n- Incluido en nuestro paquete Cusco Imperial" },
    { q: ["contacto", "telefono", "whatsapp", "email", "donde estan", "ubicacion"], r: "Puedes contactarnos:\n- WhatsApp: +51 994 118 084\n- Email: info@bgtravel.pe\n- Web: bgtravel.pe\n- Horario: Lun-Sab 9:00 a 19:00\n- Ubicacion: La Molina, Lima, Peru" },
  ],
  welcome: "¡Hola! Soy el asistente virtual de BG Travel Peru. Puedo ayudarte con:\n\n1. Recomendarte experiencias segun tus intereses\n2. Informacion sobre destinos (Cusco, Tarma, Lima, Ica, Gamarra)\n3. Consejos de viaje (clima, altura, presupuesto)\n4. Precios y paquetes disponibles\n5. Informacion sobre Nature Punk (experiencias sonoras)\n\n¿En que puedo ayudarte?",
  fallback: "No tengo informacion especifica sobre eso. Te recomiendo:\n\n1. Visitar nuestras experiencias en bgtravel.pe/experiencias\n2. Consultarnos por WhatsApp al +51 994 118 084\n3. Preguntarme de otra forma o sobre otro destino\n\n¿Quieres que te ayude con algo mas?",
};

export const travelAssistantChat = createServerFn({ method: "POST" })
  .validator((x: any) => x)
  .handler(async ({ data }) => {
    const msg = (data.message || "").toLowerCase().trim();
    if (!msg) return { ok: true, response: KNOWLEDGE_BASE.welcome, type: "welcome" };

    // Load experiences from DB for pricing/recommendations
    let experiences: any[] = [];
    try {
      const db = bindings().DB;
      if (db) {
        const rows = await db.prepare("SELECT name, subtitle, price, tag, duration FROM experiences WHERE featured = 1 ORDER BY id").all();
        experiences = (rows.results as any[]) || [];
      }
    } catch {}

    // Check for greeting
    const greetings = ["hola", "buenas", "hey", "buenos dias", "buenas tardes", "buenas noches", "hi", "hello", "ayuda", "help"];
    if (greetings.some(g => msg.includes(g) || msg === g)) {
      return { ok: true, response: KNOWLEDGE_BASE.welcome, type: "greeting" };
    }

    // Check for destination recommendations
    const recommendKeywords = ["recomienda", "recomiendame", "recomendar", "sugiere", "sugerencia", "que me recomiendas", "que hacer", "cual me recomiendas", "mejor", "recomendacion"];
    const isRecommendation = recommendKeywords.some(k => msg.includes(k));

    if (isRecommendation && !Object.values(KNOWLEDGE_BASE.destinations).some(d => d.keywords.some(k => msg.includes(k)))) {
      // General recommendation
      let rec = "Segun tus intereses, te recomiendo:\n\n";
      const allDestinations = [
        { name: "Cusco Imperial", desc: "Cultura, historia y Machu Picchu", from: "S/ 890" },
        { name: "Tarma Natural", desc: "Naturaleza y paisajes verdes", from: "S/ 320" },
        { name: "Gamarra Fashion Tour", desc: "Textiles y moda peruana", from: "S/ 150" },
        { name: "Lima Gastronomica", desc: "Gastronomia y sabores", from: "S/ 280" },
        { name: "Ica y Huacachina", desc: "Aventura y desierto", from: "S/ 350" },
        { name: "Nature Punk", desc: "Experiencias sonoras inmersivas", from: "Consultar" },
      ];

      // Filter by keywords
      if (msg.includes("aventur") || msg.includes("deporte") || msg.includes("extremo")) {
        rec += "🌟 Para aventura:\n- Ica y Huacachina (dunas, sandboarding, arenero)\n- Cusco Imperial (caminatas, montañas)\n\n";
      }
      if (msg.includes("cult") || msg.includes("historia") || msg.includes("histori") || msg.includes("inca") || msg.includes("arqueolog")) {
        rec += "🏛️ Para cultura e historia:\n- Cusco Imperial (Machu Picchu, Valle Sagrado)\n\n";
      }
      if (msg.includes("comida") || msg.includes("gastrono") || msg.includes("cocina") || msg.includes("comer") || msg.includes("restaurante")) {
        rec += "🍽️ Para gastronomia:\n- Lima Gastronomica (ceviche, causa, mercados)\n\n";
      }
      if (msg.includes("moda") || msg.includes("ropa") || msg.includes("textil") || msg.includes("compr") || msg.includes("negocio") || msg.includes("comercial")) {
        rec += "🛍️ Para moda y compras:\n- Gamarra Fashion Tour (textiles, fabricas)\n\n";
      }
      if (msg.includes("natur") || msg.includes("paisaje") || msg.includes("verde") || msg.includes("campo") || msg.includes("relaj")) {
        rec += "🌿 Para naturaleza y relajacion:\n- Tarma Natural (paisajes, aire puro)\n- Nature Punk (sonido, meditacion)\n\n";
      }
      if (msg.includes("sonido") || msg.includes("musica") || msg.includes("concierto") || msg.includes("inmersivo")) {
        rec += "🎵 Para experiencias sonoras:\n- Nature Punk (conciertos silent, bioacustica)\n\n";
      }

      rec += "¿Quieres mas informacion sobre alguno en particular?";
      return { ok: true, response: rec, type: "recommendation" };
    }

    // Check destination-specific queries
    for (const [key, dest] of Object.entries(KNOWLEDGE_BASE.destinations)) {
      if (dest.keywords.some(k => msg.includes(k))) {
        let response = `**${dest.name}**\n\n${dest.info}\n\n`;

        if (msg.includes("tip") || msg.includes("consejo") || msg.includes("recomendacion") || msg.includes("recomienda")) {
          response += `**Consejos:** ${dest.tips}\n\n`;
        }
        if (msg.includes("mejor epoca") || msg.includes("mejor fecha") || msg.includes("clima") || msg.includes("cuando ir") || msg.includes("temporada")) {
          response += `**Mejor epoca:** ${dest.mejorEpoca}\n\n`;
        }
        if (dest.platos.length > 0 && (msg.includes("comida") || msg.includes("plato") || msg.includes("comer") || msg.includes("gastrono"))) {
          response += `**Platos tipicos:** ${dest.platos.join(", ")}\n\n`;
        }
        if (msg.includes("precio") || msg.includes("costo") || msg.includes("cuanto") || msg.includes("presupuesto") || msg.includes("pago")) {
          const exp = experiences.find((e: any) => e.name.toLowerCase().includes(key));
          response += exp ? `**Precio:** ${exp.price} | Duracion: ${exp.duration || 'Consultar'}\n\n` : "**Precio:** Consultar con nuestro equipo\n\n";
        }

        response += "¿Quieres saber algo mas? Puedo contarte sobre precios, clima, tips de viaje o como reservar.";
        return { ok: true, response, type: "destination" };
      }
    }

    // Check FAQ
    for (const faq of KNOWLEDGE_BASE.faq) {
      if (faq.q.some(q => msg.includes(q))) {
        return { ok: true, response: faq.r, type: "faq" };
      }
    }

    // Check for pricing
    if (msg.includes("precio") || msg.includes("cuanto cuesta") || msg.includes("costo") || msg.includes("precios")) {
      let response = "**Precios de nuestros paquetes:**\n\n";
      if (experiences.length > 0) {
        experiences.forEach((e: any) => {
          response += `- ${e.name}: ${e.price} (${e.duration || 'Consultar'})\n`;
        });
      } else {
        response += "- Cusco Imperial: desde S/ 890 (4 dias)\n- Tarma Natural: desde S/ 320 (2 dias)\n- Gamarra Fashion Tour: desde S/ 150 (1 dia)\n- Lima Gastronomica: desde S/ 280 (2 dias)\n- Ica y Huacachina: desde S/ 350 (2 dias)\n- Nature Punk: Consultar\n";
      }
      response += "\n¿Quieres mas informacion sobre algun paquete en particular?";
      return { ok: true, response, type: "pricing" };
    }

    // Fallback
    return { ok: true, response: KNOWLEDGE_BASE.fallback, type: "fallback" };
  });