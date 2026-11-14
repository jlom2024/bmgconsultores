export interface ServiceFaq {
  q: string;
  a: string;
}

export interface ServiceAdvisor {
  name: string;
  role: string;
  bio: string;
  image?: string;
  imagePosition?: string;
  whatsappMessage?: string;
  tag?: string;
  experience?: string[];
  education?: string[];
}

export interface Service {
  id: string;
  name: string;
  menuName?: string;
  logo: string;
  tagline: string;
  description: string;
  longDescription: string;
  features: string[];
  stats: { value: string; label: string }[];
  images: string[];
  faqs: ServiceFaq[];
  advisor?: ServiceAdvisor;
  color: string;
  colorDark: string;
  icon: string;
  cta: string;
  email?: string;
}

export const services: Service[] = [
  {
    id: "emprendedor",
    name: "Emprendedor",
    menuName: "Emprendedor",
    logo: "/logos/bg_emprendedor.png",
    tagline: "Del sueño al negocio: formaliza, valida y escala",
    description:
      "Acompañamiento integral para emprendedores peruanos: validación de idea, constitución de empresa, inscripción en SUNAT, régimen tributario y primeros 90 días de gestión.",
    longDescription:
      "Emprender en el Perú exige más que una buena idea: requiere formalización correcta, claridad tributaria, estrategia comercial y acompañamiento real en los primeros meses. En Emprendedor ayudamos a transformar negocios informales, proyectos familiares y nuevas MYPES en empresas listas para vender, facturar y crecer. Inspirados por el ecosistema emprendedor peruano, combinamos asesoría legal, contable, financiera y comercial para que el emprendedor no camine solo. Validamos tu idea, constituimos tu empresa, te inscribimos en SUNAT, elegimos el régimen tributario adecuado y te acompañamos durante 90 días para ordenar costos, precios, marca, procesos y canales de venta.",
    features: [
      "Validación de idea de negocio y propuesta de valor",
      "Constitución de empresa: S.A.C., S.A., S.A.A., S.C.R.L., E.I.R.L. o persona natural con negocio",
      "Inscripción en SUNAT, RUC, Clave SOL y elección de régimen tributario",
      "Diseño de plan de negocio básico con costos, precios y punto de equilibrio",
      "Asesoría para licencias municipales y permisos según rubro",
      "Implementación de facturación electrónica y primeros procesos administrativos",
      "Mentoría comercial: oferta, canales, pitch, ventas y atención al cliente",
      "Acompañamiento 90 días para ordenar gestión, impuestos y crecimiento"
    ],
    stats: [
      { value: "30 días", label: "Para formalizar" },
      { value: "S/ 400", label: "Desde constitución" },
      { value: "95%", label: "MYPES en Perú" },
      { value: "50K+", label: "Empresas 2025" }
    ],
    images: [
      "/images/emprendedor.jpeg",
      "/images/emprendedor2_2.jpeg",
      "/images/emprendedor2_1.jpeg",
    ],
    faqs: [
      {
        q: "¿Cuánto demora formalizar mi negocio?",
        a: "Un proceso estándar puede tomar entre 15 y 30 días, dependiendo del tipo de empresa, disponibilidad de nombre, notaría, SUNARP y permisos municipales. Nosotros coordinamos cada paso para reducir demoras y evitar errores desde el inicio.",
      },
      {
        q: "¿Me conviene crear una S.A.C., S.A., S.C.R.L., E.I.R.L. o empezar como persona natural con negocio?",
        a: "Depende de tu rubro, nivel de riesgo, socios, facturación esperada y objetivos de crecimiento. En la primera consulta evaluamos tu caso y te recomendamos la estructura más conveniente para operar, facturar y proteger tu patrimonio.",
      },
      {
        q: "¿Incluyen acompañamiento después de constituir la empresa?",
        a: "Sí. Incluye acompañamiento inicial para tus primeros 90 días: facturación, impuestos, costos, precios, procesos administrativos y orientación comercial para que no te quedes solo después de recibir tu RUC.",
      }
    ],
    advisor: {
      name: "Germán Rubens Battistini Salcedo",
      role: "Magister en Gestión del Talento Humano · Licenciado en Administración de Empresas · Asesoría a emprendedores",
      bio: "Magister en Gestión del Talento Humano y Licenciado en Administración de Empresas, especializado en brindar asesoría a emprendedores y pequeñas empresas en gestión empresarial, organización, talento humano y desarrollo de negocios. Acompaño a emprendedores en la toma de decisiones, mejora de procesos y planificación, brindándoles herramientas prácticas para ordenar, fortalecer y hacer crecer sus negocios.",
      image: "/images/asesor-german.jpeg",
      whatsappMessage: "Hola Germán, quiero una asesoría con la División Emprendedor.",
    },
    color: "#4E9FC2",
    colorDark: "#124E68",
    icon: "🚀",
    cta: "Primera consulta sin costo",
    email: "emprendedor@bmgconsultores.site",
  },
  {
    id: "contable",
    name: "Contabilidad",
    menuName: "Contabilidad",
    logo: "/logos/bg_contable.png",
    tagline: "Tu contabilidad sin errores, sin multas",
    description:
      "Regularizamos y gestionamos tu contabilidad de forma impecable. Evita nuevas contingencias con SUNAT y mantén tu negocio al día con total tranquilidad.",
    longDescription:
      "La correcta gestión contable y tributaria es la columna vertebral de cualquier empresa exitosa en el Perú. Las multas de SUNAT por declaraciones fuera de plazo pueden llegar al 50% del impuesto omitido, y los errores en libros contables pueden generar contingencias millonarias. En Contabilidad, nuestros contadores certificados manejan la contabilidad completa de empresas de todos los tamaños: desde el Nuevo RUS hasta el Régimen General. Trabajamos con software contable certificado por SUNAT (CONCAR, Defontana, QuickBooks) y gestionamos libros electrónicos (PLE), declaraciones mensuales (PDT 621, PDT 601), planillas electrónicas y estados financieros anuales. Somos tu escudo ante cualquier fiscalización.",
    features: [
      "Contabilidad general, analítica y de costos para todo régimen.",
      "Declaraciones mensuales y anuales ante SUNAT (PDT 621, 601).",
      "Gestión de planillas, AFP, CTS y beneficios sociales.",
      "Libros electrónicos (PLE) y facturación electrónica OSE/SOL.",
      "Auditoría preventiva y de fiscalización.",
      "Asesoría en regímenes: Nuevo RUS, RER, MYPE Tributario y General.",
      "Estados financieros: balance general, EGP y flujo de caja.",
      "Representación ante SUNAT por fiscalizaciones y gestiones de cobranzas coactivas.",
      "Fraccionamiento de deuda por IGV, renta y multas.",
      "Declaraciones mensuales y anuales: Régimen de cuarta y quinta categoría.",
      "Declaración mensual de régimen de primera categoría.",
      "Declaración impuesto a los activos netos (ITAN).",
    ],
    stats: [
      { value: "Desde S/ 150", label: "Tu declaración mensual PDT 601 y 621" },
      { value: "0", label: "Multas con nuestros clientes" },
      { value: "4", label: "Regímenes tributarios" },
      { value: "100%", label: "Libros electrónicos" },
    ],
    images: [
      "/images/contable.jpeg",
      "/images/contable2_1.jpeg",
      "/images/contable2_4.jpeg",
    ],
    faqs: [
      {
        q: "¿Qué documentos necesito entregar para que lleven mi contabilidad?",
        a: "Básicamente tus comprobantes de venta (facturas, boletas), comprobantes de compra, extractos bancarios y planilla de personal. Podemos trabajar en formato físico o digital según tu comodidad. Nos adaptamos a tu operación.",
      },
      {
        q: "¿Pueden hacer mi declaración anual del Impuesto a la Renta?",
        a: "Sí, preparamos y presentamos la Declaración Jurada Anual (Renta Anual) para personas naturales con negocio y personas jurídicas. Revisamos si tienes saldo a favor o impuesto por pagar y buscamos las deducciones aplicables para minimizar tu carga tributaria.",
      },
      {
        q: "¿Atienden empresas en todo el Perú o solo en Lima?",
        a: "Atendemos a nivel nacional gracias a nuestra plataforma digital. Todo el intercambio de documentación, estados financieros y comunicaciones se realiza online de manera segura. También contamos con atención presencial para clientes en Lima.",
      },
      {
        q: "¿Qué pasa si me olvidé de declarar mi PDT este mes?",
        a: "La no presentación oportuna ante SUNAT genera una infracción tributaria sancionada con multa (Art. 176 num. 1 del Código Tributario). Sin embargo, si subsanas voluntariamente antes de cualquier notificación o requerimiento de SUNAT, accedes al Régimen de Gradualidad con rebajas de hasta el 90% o 100% de la sanción según tu régimen. En BMG regularizamos tu declaración de inmediato para protegerte y minimizar costos.",
      },
      {
        q: "Estoy en el Nuevo RUS, ¿ustedes me pueden llevar la contabilidad?",
        a: "Sí. Aunque el Nuevo RUS no requiere libros contables y se abona con cuota fija en el banco (S/ 20 o S/ 50), supervisamos que tus compras y ventas no superen los topes permitidos (S/ 8,000 mensuales o S/ 96,000 anuales) para evitar que SUNAT te reclasifique de oficio al Régimen General con multas acumuladas. Además, evaluamos cuándo te conviene migrar al RER o MYPE Tributario para emitir facturas y expandir tus ventas.",
      },
      {
        q: "¿Qué documentos necesito para que constituyan mi empresa en un solo acto?",
        a: "Solo requieres copias de DNI de los socios, definir 3 a 5 opciones de nombres para la reserva preferencial en SUNARP, precisar el objeto social y fijar el capital inicial (en efectivo o aporte de bienes muebles). En BMG Consultores coordinamos la elaboración del acto constitutivo (minuta), la firma en notaría y la inscripción registral en un solo acto y tiempo récord, entregándote tu RUC activo y Clave SOL sin complicaciones.",
      },
      {
        q: "¿Mi tarifa de \"tu PDT desde 150\" incluye los libros electrónicos?",
        a: "La tarifa base desde S/ 150 cubre la liquidación y presentación puntual de tus declaraciones mensuales obligatorias ante SUNAT (PDT 621 IGV/Renta y PDT 601 PLAME para microempresas sin contingencias complejas). Para la generación y validación de Libros Electrónicos (PLE / SIRE) o negocios con mayor volumen transaccional y personal, realizamos una propuesta a medida con total transparencia y sin cobros ocultos.",
      },
    ],
    advisor: {
      name: "Pedro Alberto Reyes Caballero",
      role: "Contador Público Colegiado (CPC N° 63979) · Especialista en Gestión Contable, Tributaria, Laboral y Planillas",
      bio: "Contador Público Colegiado con Número 63979, con sólida experiencia en gestión contable, tributaria, laboral y de planillas en corporaciones y organizaciones de alta exigencia. Especialista en la correcta determinación de obligaciones fiscales (SUNAT), gestión de beneficios sociales, control interno y atención de auditorías e inspecciones (SUNAFIL). Perfil analítico y ordenado, orientado a garantizar la eficiencia financiera y el estricto cumplimiento normativo.",
      image: "/images/asesor-pedro-reyes.png",
      imagePosition: "center 20%",
      whatsappMessage: "Hola Pedro, quiero una asesoría contable y tributaria con BMG Contable.",
      tag: "Tu contador",
      experience: [
        "BBVA BANCO CONTINENTAL | Jefe de Nómina, Administración (2010 - 2022)",
        "TELEFÓNICA GESTIÓN DE SERVICIOS COMPARTIDOS | Analista de Gestión de Nómina (2004 - 2010)",
        "COOPERATIVA LA EXCLUSIVA | Encargado de Control Interno y Planillas (2001 - 2003)",
      ],
      education: [
        "Universidad Inca Garcilaso de la Vega | Título Profesional de Contador Público (1995 - 2000)",
        "Universidad Ricardo Palma | Egresado de la Maestría en Comportamiento Organizacional y Recursos Humanos (2012 - 2013)",
      ],
    },
    color: "#4E9FC2",
    colorDark: "#124E68",
    icon: "📊",
    cta: "Solicitar diagnóstico de salud tributaria",
    email: "contabilidad@bmgconsultores.site",
  },
  {
    id: "legal",
    name: "Legal",
    menuName: "Legal",
    logo: "/logos/bg_juridico.png",
    tagline: "Protección legal para tu empresa y patrimonio",
    description:
      "Asesoría jurídica empresarial completa. Nuestro equipo de abogados especializados protege tus intereses en todas las áreas del derecho empresarial peruano.",
    longDescription:
      "En el complejo entorno legal peruano, contar con asesoría jurídica especializada no es un lujo: es una necesidad. Las relaciones comerciales, los contratos, las relaciones laborales y las regulaciones cambian constantemente. En Legal contamos con un equipo de más de 15 abogados especializados en derecho corporativo, laboral, tributario, propiedad intelectual y contrataciones del Estado. Representamos a empresas ante el Indecopi, el Poder Judicial, el Tribunal de Contrataciones del Estado y organismos reguladores. Hemos gestionado más de 200 contratos comerciales en el último año y mantenemos un 95% de casos resueltos favorablemente. Nuestra misión: anticiparnos a los riesgos legales antes de que se conviertan en problemas.",
    features: [
      "Derecho corporativo: constitución, fusiones, adquisiciones y disolución",
      "Redacción y revisión de contratos comerciales y societarios",
      "Derecho laboral: contratos, despidos, sindicatos y beneficios",
      "Defensa ante INDECOPI: barreras burocráticas, marcas y competencia desleal",
      "Registro de marcas, patentes y propiedad intelectual ante INDECOPI",
      "Arbitraje comercial y resolución alternativa de conflictos",
      "Compliance corporativo, SAGRILAFT y prevención de lavado de activos",
      "Asesoría en importaciones/exportaciones y comercio exterior",
    ],
    stats: [
      { value: "95%", label: "Casos favorables" },
      { value: "48h", label: "Respuesta inicial" },
      { value: "200+", label: "Contratos/año" },
      { value: "15+", label: "Abogados especializados" },
    ],
    images: [
      "/images/juridico.jpeg",
      "/images/juridico2_1.jpeg",
      "/images/juridico2_2.jpeg",
    ],
    faqs: [
      {
        q: "¿Cuánto tiempo tarda registrar una marca en el Perú?",
        a: "El proceso ante INDECOPI toma aproximadamente 6 meses si no hay oposición. Primero hacemos una búsqueda de anterioridad para evaluar la viabilidad, luego presentamos la solicitud y monitoreamos todo el proceso. Te entregamos el certificado de registro al finalizar.",
      },
      {
        q: "Mi trabajador me demandó por despido arbitrario, ¿qué hago?",
        a: "Lo primero es no entrar en pánico ni firmar nada sin asesoría. Contáctanos inmediatamente: revisamos el expediente, evaluamos la documentación laboral y diseñamos la mejor estrategia de defensa. En muchos casos es posible llegar a un acuerdo conciliatorio favorable antes del juicio.",
      },
      {
        q: "¿Ofrecen consultas legales gratuitas?",
        a: "Sí, ofrecemos una consulta inicial gratuita de 30 minutos para evaluar tu caso y orientarte sobre los pasos a seguir. Puedes agendar tu consulta vía WhatsApp o nuestro formulario de contacto. Sin compromisos.",
      },
    ],
    color: "#4E9FC2",
    colorDark: "#124E68",
    icon: "⚖️",
    cta: "Consulta legal gratuita",
    email: "legal@bmgconsultores.site",
  },
  {
    id: "comercio-exterior",
    name: "Comercio Exterior",
    menuName: "Comercio Exterior",
    logo: "/logos/bmg_clean.png",
    tagline: "Exportaciones, importaciones y blindaje aduanero global",
    description:
      "Asesoría integral en comercio exterior, regímenes aduaneros, drawback, logística internacional y cumplimiento bajo normativa INCOTERMS vigente.",
    longDescription:
      "El comercio internacional representa una de las mayores oportunidades de rentabilidad para las empresas peruanas, pero también exige un estricto rigor normativo y logístico. En Comercio Exterior asesoramos a importadores y exportadores en cada eslabón de la cadena: desde la clasificación arancelaria y gestión ante SUNAT/Aduanas, hasta contratos internacionales bajo términos INCOTERMS 2020, restitución simplificada de derechos arancelarios (Drawback) y optimización de cadenas de suministro globales. Brindamos soporte técnico y legal para evitar multas aduaneras, sobreestadías en puerto y fiscalizaciones posteriores, garantizando que tus operaciones de ultramar se ejecuten con máxima seguridad jurídica y eficiencia financiera.",
    features: [
      "Asesoría integral en regímenes de importación y exportación definitiva",
      "Clasificación arancelaria de mercancías y valoración aduanera SUNAT",
      "Gestión de Drawback y saldos a favor del exportador",
      "Contratos internacionales y estructuración de operaciones INCOTERMS 2020",
      "Auditoría preventiva ante fiscalizaciones de SUNAT Aduanas",
      "Gestión de permisos ante SENASA, DIGESA, DIGEMID y SUCAMEC",
      "Optimización logística marítima y aérea (Callao / Chancay / Jorge Chávez)",
      "Planificación tributaria aduanera para cadenas de suministro globales"
    ],
    stats: [
      { value: "100%", label: "Cumplimiento aduanero" },
      { value: "S/ 0", label: "Contingencias evitadas" },
      { value: "INCOTERMS", label: "Normativa 2020" },
      { value: "Callao & Chancay", label: "Cobertura portuaria" }
    ],
    images: [
      "/images/comercio_exterior.jpeg",
      "/images/juridico.jpeg",
      "/images/hero.jpeg"
    ],
    faqs: [
      {
        q: "¿Qué requisitos necesito para empezar a importar mercancías a gran escala al Perú?",
        a: "Requieres RUC activo y habido con condición de importador en SUNAT, comprobantes comerciales del proveedor del exterior (Factura comercial, Packing List, Documento de Embarque B/L o Guía Aérea), y según el tipo de producto, registros sanitarios o permisos especiales (DIGESA, DIGEMID, SENASA). En BMG Comercio Exterior estructuramos tu carpeta completa antes del embarque para evitar demoras o inmovilizaciones en aduana."
      },
      {
        q: "¿Cómo funciona la restitución simplificada de derechos arancelarios (Drawback)?",
        a: "El Drawback te permite recuperar el 3% del valor FOB de tus mercancías exportadas si en su producción incorporaste insumos importados por los que pagaste aranceles. En BMG gestionamos todo el expediente electrónico ante SUNAT para que recuperes ese capital de forma ágil y conforme a ley."
      },
      {
        q: "¿Cómo me protege BMG ante una fiscalización o ajuste de valor de SUNAT Aduanas?",
        a: "Preparamos la defensa técnica y documental basada en el Acuerdo del Valor de la OMC y la normativa aduanera nacional. Demostramos la trazabilidad del precio realmente pagado, respaldando tus transferencias bancarias, contratos internacionales y cotizaciones para anular reclasificaciones indebidas o multas aduaneras."
      }
    ],
    color: "#C69228",
    colorDark: "#082B3A",
    icon: "🌐",
    cta: "Consultar con especialista aduanero",
    email: "comercioexterior@bmgconsultores.site",
  },
  {
    id: "ia",
    name: "Desarrollo IA",
    menuName: "Desarrollo IA",
    logo: "/logos/bg_publicidad.png",
    tagline: "Automatiza, innova y escala con Inteligencia Artificial",
    icon: "🤖",
    color: "#4E9FC2",
    colorDark: "#124E68",
    description: "Soluciones de inteligencia artificial a medida para empresas peruanas. Automatizamos procesos, creamos agentes IA, desarrollamos software con IA y producimos contenido audiovisual generativo.",
    longDescription: "La inteligencia artificial ya no es el futuro — es el presente competitivo. Las empresas que adoptan IA hoy reducen costos operativos hasta un 40%, automatizan tareas repetitivas y escalan sin contratar más personal. En Desarrollo IA implementamos soluciones concretas y medibles: desde agentes conversacionales para WhatsApp y web, hasta sistemas de automatización con n8n y Make, pasando por producción de video con IA (Sora, Kling, Runway) y software SaaS a medida. Trabajamos con las últimas herramientas: ChatGPT, Claude, Gemini, Midjourney, ElevenLabs y más. Nuestro enfoque es pragmático: identificamos los procesos de tu empresa que más se benefician de la IA y los automatizamos primero.",
    features: [
      "Agentes IA conversacionales para WhatsApp, web y CRM",
      "Automatización de procesos con n8n, Make y Zapier",
      "Desarrollo de software SaaS con IA integrada",
      "Producción audiovisual con IA: video, voz y música generativa",
      "Chatbots con conocimiento de tu empresa (RAG / base de conocimiento)",
      "Integración de IA en sistemas existentes vía API",
      "Capacitación y onboarding en herramientas IA para equipos",
      "Consultoría de transformación digital con hoja de ruta IA"
    ],
    stats: [
      { value: "40%", label: "Reducción de costos operativos" },
      { value: "24/7", label: "Agentes IA activos" },
      { value: "3x", label: "Productividad del equipo" },
      { value: "30 días", label: "Primer entregable IA" }
    ],
    images: ["/images/publicidad.jpeg", "/images/publicidad2_2.jpeg", "/images/publicidad2_4.jpeg"],
    faqs: [
      { q: "¿Qué tipo de empresa puede adoptar IA?", a: "Cualquier empresa, sin importar el tamaño. Desde una MYPE con 5 empleados hasta una corporación. Empezamos identificando los 2-3 procesos con mayor impacto inmediato: atención al cliente, facturación, reportes, marketing o logística. El ROI se ve en los primeros 30-60 días." },
      { q: "¿Necesito tener conocimientos técnicos para usar IA en mi empresa?", a: "No. Nos encargamos de toda la implementación técnica. Tu equipo solo necesita aprender a usar las herramientas, y para eso incluimos capacitación práctica. El objetivo es que la IA trabaje para ti, no que tú trabajes para la IA." },
      { q: "¿Cuánto cuesta implementar un agente IA para mi negocio?", a: "Depende del alcance. Un agente conversacional básico para WhatsApp parte desde S/ 800 de implementación + S/ 150/mes de mantenimiento. Automatizaciones complejas o software SaaS a medida tienen presupuesto personalizado. Ofrecemos diagnóstico gratuito." }
    ],
    advisor: {
      name: "Bachiller Jorge Luis Ordoñez M.",
      role: "Bachiller · Ing. de Sistemas (USIL) · Ing. en Administración (ICTE) · CEO y Fundador de KREO IA Studio · Líder Tecnológico y Estratega en IA",
      bio: "Fusiona la creatividad humana con la Inteligencia Artificial para crear soluciones de vanguardia para el sector privado y las instituciones gubernamentales. Dirige un equipo híbrido de seis agentes IA —KIA (OpenAI), Plexy (Perplexity), Sky (Skywork), El Padrino (Manus), Antu (Claude) y Houston (Gemini)— que trabajan en aplicaciones, automatizaciones y estrategias de comercialización tecnológica. Sus competencias abarcan estrategia IA, liderazgo de equipos híbridos, automatización de procesos, innovación tecnológica, dirección creativa y despliegue tecnológico. Desde KREO IA Studio ha liderado proyectos como Kostruye+ ERP, KREO-CRM, Qatuna, CORFID, KREO Render, Agentes de Venta 24/7, KREO Explorer, PresenciaGov y Monitor Multiplataforma.",
      image: "/images/bmgdesarrollo.png",
      imagePosition: "center 20%",
      whatsappMessage: "Hola Jorge, quiero una asesoría con la División Desarrollo IA."
    },
    cta: "Diagnóstico IA gratis",
    email: "ia@bmgconsultores.site",
  },
  {
    id: "lobby",
    name: "Licitaciones",
    menuName: "Licitaciones",
    logo: "/logos/bg_lobby.png",
    tagline: "Gana licitaciones con el Estado peruano",
    description:
      "Especialistas en contrataciones públicas y participación en procesos de selección del Estado peruano. Te guiamos en cada etapa de las licitaciones y concursos públicos con el SEACE.",
    longDescription:
      "El Estado peruano es el mayor comprador de bienes, servicios y obras del país: en 2024 ejecutó más de S/ 50,000 millones en contrataciones públicas a través del SEACE. Sin embargo, el 60% de las empresas privadas no participa en estos procesos por desconocer la Ley de Contrataciones N° 30225 y su reglamento. En Licitaciones, nuestros expertos en contrataciones con el Estado te guían en cada etapa: desde la inscripción en el RNP (OSCE), la búsqueda de oportunidades en el SEACE, la elaboración de propuestas técnicas y económicas ganadoras, la gestión de garantías, hasta la ejecución del contrato y la liquidación. Hemos gestionado más de 300 procesos con una tasa de adjudicación del 80%. El Estado puede ser tu mejor cliente.",
    features: [
      "Inscripción y renovación en el RNP (OSCE) para bienes, servicios y obras",
      "Monitoreo diario del SEACE y alerta de nuevas convocatorias",
      "Elaboración de propuestas técnicas y económicas competitivas",
      "Gestión de garantías: fiel cumplimiento, adelanto y adicionales",
      "Recursos de apelación e impugnaciones ante el Tribunal de OSCE",
      "Asesoría en Ley 30225, su reglamento y directivas OSCE vigentes",
      "Gestión de adicionales, ampliaciones de plazo y penalidades",
      "Capacitación interna a tu equipo en contrataciones públicas",
    ],
    stats: [
      { value: "80%", label: "Tasa de adjudicación" },
      { value: "S/ 50M+", label: "Gestionados" },
      { value: "300+", label: "Procesos SEACE" },
      { value: "Ley 30225", label: "Expertos certificados" },
    ],
    images: [
      "/images/lobby.jpeg",
      "/images/lobby2_1.jpeg",
      "/images/lobby2_2.jpeg",
    ],
    faqs: [
      {
        q: "¿Mi empresa recién constituida puede participar en licitaciones del Estado?",
        a: "Sí, pero primero debes inscribirte en el Registro Nacional de Proveedores (RNP) del OSCE. El proceso puede tomar entre 5 y 15 días hábiles. Nosotros gestionamos toda la inscripción por ti y te orientamos sobre los requisitos según tu rubro: bienes, servicios o ejecución de obras.",
      },
      {
        q: "¿Qué documentos necesito para participar en una licitación?",
        a: "Depende del proceso, pero generalmente: ficha RUC activa, RNP vigente, estados financieros auditados (en algunos casos), certificados de experiencia similar, currículum del personal clave y garantía de seriedad de oferta. Hacemos el checklist completo para cada proceso específico.",
      },
      {
        q: "¿Cuánto cobra el Estado por las garantías en contrataciones?",
        a: "Las garantías (fiel cumplimiento, adelanto directo, etc.) representan el 10% del monto contractual y se tramitan con cartas fianza bancarias. Te asesoramos para obtener las mejores condiciones con entidades financieras y gestionamos toda la documentación requerida.",
      },
    ],
    color: "#4E9FC2",
    colorDark: "#124E68",
    icon: "🏛️",
    cta: "Quiero licitar con el Estado",
    email: "licitaciones@bmgconsultores.site",
  },
  {
    id: "inmobiliario",
    name: "Inmobiliaria",
    menuName: "Inmobiliaria",
    logo: "/logos/bg_inmobiliario.png",
    tagline: "Saneamiento, construcción y compra y venta de propiedades con asesoramiento técnico, legal y financiero",
    icon: "🏢",
    color: "#4E9FC2",
    colorDark: "#124E68",
    description: "Servicios de saneamiento, construcción e inmobiliarios: compra y venta de bienes, con asesoramiento técnico, legal y financiero.",
    longDescription: "En Inmobiliaria acompañamos a propietarios, empresas y entidades públicas en el saneamiento de predios, la planificación urbana y el desarrollo de sus proyectos. Integramos asesoramiento técnico, legal y financiero para el estudio de títulos, habilitaciones urbanas, evaluación de riesgos, diseño, construcción y gestión de licencias. También asesoramos en la compra y venta de propiedades, con un diagnóstico adaptado a cada inmueble y proyecto.",
    features: [
      "Saneamiento de propiedades a todo nivel, privadas y estatales",
      "Habilitación urbana, cambio de zonificación, planeamiento integral y otros",
      "Estudios de riesgos para titulación y expedientes técnicos",
      "Diseño y construcción a todo nivel",
      "Licencias de construcción, funcionamiento y Defensa Civil",
      "Compra y venta de propiedades",
      "Estudios de títulos, partidas registrales y diagnósticos técnico-legales",
      "Análisis estructurales de infraestructuras"
    ],
    stats: [
      { value: "500+", label: "Operaciones gestionadas" },
      { value: "98%", label: "Títulos saneados" },
      { value: "S/ 120M", label: "En transacciones asesoradas" },
      { value: "15 días", label: "Tiempo promedio de cierre" }
    ],
    images: ["/images/inmobiliario.jpeg", "/images/inmobiliario2_1.jpeg", "/images/inmobiliario2_2.jpeg"],
    faqs: [
      {
        q: "¿Qué documentos debo presentar para evaluar el saneamiento de mi propiedad?",
        a: "Para una evaluación inicial, comparte los documentos que tengas sobre el inmueble: título o contrato, partida registral si existe, constancias de posesión, planos y antecedentes municipales. Nuestro equipo revisará la documentación y te indicará qué información adicional corresponde a tu caso."
      },
      {
        q: "¿Cómo saber qué precio poner a mi propiedad para la venta?",
        a: "Analizamos la ubicación, el área, el estado del inmueble, su situación legal y las referencias de propiedades comparables. Con esa evaluación te orientamos sobre un rango de comercialización y, cuando corresponda, la necesidad de una tasación profesional."
      },
      {
        q: "¿Cuánto tiempo y costo toma desarrollar una habilitación urbana?",
        a: "El plazo y el presupuesto dependen del área, la situación del predio, la zonificación, los estudios necesarios y el alcance de las obras. Primero evaluamos el proyecto; después presentamos una propuesta por etapas, con costos y plazos estimados sujetos a las revisiones de las entidades competentes."
      },
      {
        q: "¿Me puedo titular con los documentos que tengo?",
        a: "Es necesario revisar tus documentos y la situación técnica y legal del predio para determinar si existe una vía de titulación aplicable. En la evaluación identificamos los antecedentes disponibles, los posibles impedimentos y la documentación que faltaría completar."
      },
      {
        q: "¿Qué requisitos necesito para sacar una licencia de construcción?",
        a: "Los requisitos dependen del tipo de obra, la modalidad de licencia y la municipalidad competente. Revisamos los antecedentes del predio y el proyecto para orientarte sobre los formularios, planos, documentos técnicos y acreditaciones que correspondan antes de presentar el expediente."
      },
      {
        q: "¿Qué documentos necesito para vender mi inmueble en Perú?",
        a: "Necesitas la partida registral de SUNARP (vigente), DNI del propietario, último recibo de predios de SUNAT y, si aplica, el HR y PU de la municipalidad. Verificamos que el inmueble esté libre de cargas, hipotecas o embargos antes de cualquier operación. Si hay algún problema de titulación, también lo resolvemos."
      },
      {
        q: "¿Cómo funciona el servicio de inversión en planos?",
        a: "Evaluamos el proyecto (inmobiliaria, licencias, avance de obra), revisamos el contrato de separación y compraventa, verificamos las garantías y te asesoramos en la estructura de financiamiento. También optimizamos el aspecto tributario si es una inversión para alquiler posterior. Negociamos condiciones contractuales favorables para el comprador."
      },
      {
        q: "¿Qué pasa si el inmueble tiene problemas de titulación?",
        a: "Nuestro equipo legal analiza cada caso: desde inscripciones pendientes, sucesiones intestadas o testamentarias, predios sin inmatricular, hasta levantamiento de hipotecas y medidas cautelares. En la mayoría de casos tenemos solución. Te damos un diagnóstico gratuito antes de comprometerte con cualquier operación."
      }
    ],
    advisor: {
      name: "Elvis E. Briceño Rivadeneyra",
      role: "Magíster en Planificación Urbana, Sostenibilidad y Cambio Climático (Universidad Politécnica de Cataluña) · Arquitecto urbanista · Geógrafo",
      bio: "Ha sido gerente de Desarrollo Urbano en municipalidades y funcionario de alto nivel. Es catedrático de la Universidad Nacional Mayor de San Marcos y actualmente participa en proyectos de infraestructura de alto impacto en el país. Especialista GIS, arquitecto urbanista colegiado, evaluador de riesgos y desastres certificado por CENEPRED y verificador catastral, cuenta con 13 años de experiencia en saneamiento físico-legal de bienes públicos y privados, catastro, habilitaciones urbanas y planificación territorial.",
      image: "/images/asesor-elvis.jpg",
      whatsappMessage: "Hola, quiero agendar una asesoría con el arquitecto de la División Inmobiliaria.",
    },
    cta: "Consulta gratuita",
    email: "inmobiliaria@bmgconsultores.site",
  },
  {
    id: "travel",
    name: "Viajes",
    menuName: "Viajes",
    logo: "/logos/bg_travel.jpg",
    tagline: "Tu agencia de viajes y movilidad corporativa de confianza",
    description:
      "Servicios integrales de turismo y viajes corporativos. Organizamos paquetes vacacionales, viajes de negocios y experiencias únicas en destinos nacionales e internacionales.",
    longDescription:
      "Perú es uno de los destinos turísticos más fascinantes del mundo: hogar de Machu Picchu, el Lago Titicaca, el Amazonas, la gastronomía reconocida globalmente y la majestuosa Lima. En Viajes diseñamos experiencias únicas que conectan a nuestros clientes con lo mejor del Perú y el mundo. Somos especialistas en viajes corporativos de incentivo, turismo de aventura, luna de miel, circuitos culturales y paquetes grupales. Contamos con alianzas estratégicas con aerolíneas, hoteles 4 y 5 estrellas, y operadores locales certificados. Gestionamos visas, seguros internacionales, traslados aeropuerto-hotel y guías bilingües. Nuestro equipo está disponible 24/7 para atenderte desde la planificación hasta el regreso.",
    features: [
      "Paquetes turísticos nacionales e internacionales personalizados",
      "Viajes corporativos, de incentivos y convenciones empresariales",
      "Gestión integral de visas y documentación migratoria",
      "Seguros de viaje con cobertura médica internacional",
      "Traslados, hospedaje en hoteles 3-5 estrellas y alquiler de vehículos",
      "Tours a Machu Picchu, Cusco, Amazonas y Lago Titicaca",
      "Paquetes de luna de miel y viajes románticos exclusivos",
      "Circuitos internacionales a Europa, USA, Caribe y Asia",
    ],
    stats: [
      { value: "500+", label: "Destinos" },
      { value: "24/7", label: "Soporte" },
      { value: "98%", label: "Satisfechos" },
      { value: "10+", label: "Años de experiencia" },
    ],
    images: [
      "/images/travel.jpeg",
      "/images/travel2_3.jpeg",
      "/images/travel2_1.jpeg",
    ],
    faqs: [
      {
        q: "¿Con cuánta anticipación debo reservar mi viaje a Machu Picchu?",
        a: "Recomendamos reservar con al menos 30-60 días de anticipación, especialmente en temporada alta (junio-agosto). Los boletos al Santuario Histórico tienen cupos limitados y se agotan rápidamente. Contáctanos y aseguramos tu lugar.",
      },
      {
        q: "¿Incluyen seguro de viaje en todos los paquetes?",
        a: "Todos nuestros paquetes incluyen seguro básico de viaje. Ofrecemos cobertura ampliada con asistencia médica internacional, cancelación de vuelo y pérdida de equipaje a un costo adicional muy accesible.",
      },
      {
        q: "¿Pueden organizar viajes corporativos para grupos grandes?",
        a: "Sí, somos especialistas en eventos corporativos, viajes de incentivo y convenciones para grupos de 10 a 500 personas. Coordinamos logística completa: vuelos grupales, hoteles, actividades team-building y traslados privados.",
      },
    ],
    color: "#4E9FC2",
    colorDark: "#124E68",
    icon: "✈️",
    cta: "Cotizar mi viaje",
    email: "viajes@bmgconsultores.site",
  },
  {
    id: "seguros",
    name: "Seguros",
    menuName: "Seguros",
    logo: "/logos/bg_seguros.png",
    tagline: "Protegiendo el futuro financiero de familias y empresarios",
    description:
      "Seguros personales y empresariales con más de 30 años de experiencia en el sector empresarial y 80 en el familiar. Salud, vida, vehicular, patrimoniales, SCTR, Vida Ley e ingeniería, con análisis de riesgos personalizado.",
    longDescription:
      "Seguros es una alianza estratégica de BMG Consultores que protege lo que más importa: tu salud, tu hogar, tu vehículo, tu familia y tu empresa. Sus asesores se sumergen en tus operaciones para comprender tus vulnerabilidades familiares y empresariales, evaluando tu exposición a cada riesgo y diseñando una protección sólida y adaptada a tus necesidades. Con respaldo nacional e internacional, el servicio va más allá de los seguros tradicionales: contempla cambios en la demanda y factores económicos para blindar tu tranquilidad financiera. Su equipo, liderado por un asesor profesional en seguros y finanzas personales, tiene décadas de experiencia asegurando a familias y empresas peruanas.",
    features: [
      "Seguros personales: vida familiar, fondos universitarios y jubilación",
      "Salud: seguros médicos con cobertura integral",
      "Vehículos: SOAT, seguro vehicular y responsabilidad civil",
      "Seguros patrimoniales: incendios, robos, responsabilidad civil, lucro cesante y deshonestidad",
      "Seguros para el personal exigidos por ley: Vida Ley y SCTR",
      "Seguros para el personal: accidentes y EPS",
      "Seguros de ingeniería: CAR, TREC y EAR",
      "Análisis de riesgos gratuito y asesoría personalizada con un asesor certificado",
    ],
    stats: [
      { value: "30+", label: "Años en el sector empresarial" },
      { value: "80+", label: "Años en el sector familiar" },
      { value: "100%", label: "Análisis de riesgos incluido" },
      { value: "24/7", label: "Asesoría personalizada" },
    ],
    images: ["/images/asesor-giancarlo.jpg", "/images/seguros_1.jpg", "/images/seguros_2.jpg"],
    faqs: [
      {
        q: "¿Qué seguros son obligatorios para mi empresa?",
        a: "En Perú, los seguros Vida Ley y SCTR son obligatorios para empleadores. Vida Ley cubre fallecimiento e invalidez de trabajadores, y el SCTR protege ante accidentes de trabajo y enfermedades profesionales en actividades de riesgo. Te indicamos exactamente cuáles aplican según tu rubro y cantidad de personal.",
      },
      {
        q: "¿Qué cubre un seguro patrimonial empresarial?",
        a: "Cubren tus instalaciones y operaciones: incendios, robos, responsabilidad civil, lucro cesante y deshonestidad de empleados. Analizamos la operación completa para dimensionar la cobertura correcta, sin dejar riesgos sin considerar y sin pagar de más.",
      },
      {
        q: "¿Cómo funciona el análisis de riesgos?",
        a: "Estudiamos tus procesos y tu exposición a distintos riesgos (incendios, robos, desastres naturales, cambios económicos). En el caso familiar, evaluamos la situación actual y futura de la familia para proyectar la protección correcta. Nada queda al azar, y tú decides con información.",
      },
      {
        q: "¿Puedo asegurar a mi familia con un solo plan?",
        a: "Sí. Diseñamos planes personales que combinan vida, fondos universitarios y jubilación, con posibilidad de sumar salud médica y vehicular. Trabajamos con aseguradoras de gran respaldo nacional e internacional para que la cobertura se ajuste a tu etapa de vida y a tus metas.",
      },
      {
        q: "¿Cómo cotizo y en cuánto tiempo tengo mi seguro?",
        a: "Con una breve asesoría por WhatsApp o en nuestras oficinas, nuestro asesor certificado estructura la mejor opción comparando aseguradoras. La emisión se puede completar en el mismo día cuando la documentación del asegurado está completa.",
      },
    ],
    advisor: {
      name: "Giancarlo Rengifo",
      role: "Asesor profesional de seguros y finanzas personales",
      bio: "Administrador de Negocios Internacionales de la URP, con especialidades en Administración y Gestión de Portafolios en IE University (España). Dedicado a mejorar la cultura financiera y de previsión de las familias y profesionales peruanos, con un enfoque en seguros de gran respaldo nacional e internacional.",
      image: "/images/asesor-giancarlo.jpg",
      whatsappMessage: "Hola Giancarlo, quiero una asesoría con la División Seguros.",
    },
    color: "#082B3A",
    colorDark: "#124E68",
    icon: "🛡️",
    cta: "Cotiza tu seguro gratis",
    email: "seguros@bmgconsultores.site",
  },
];
