# BG Travel Perú Smart Experience — Design Brief

## Design read
Plataforma de turismo peruano cultural-comercial para viajeros que buscan experiencias auténticas, no paquetes masivos. Registro emocional: caluroso, contemporáneo, con identidad peruana pero sin caer en el folclore kitsch.

## Concept spine
"El mapa viviente" — el sitio se despliega como un recorrido donde cada sección es un destino que se revela mientras bajas. El usuario no lee información, atraviesa el viaje.

## Delivery tier
cinema — Lenis + GSAP ScrollTrigger, hero con parallax multicapa, reveals con texto animado.

## Locked palette
- Fondo: `#0F172A` (zinc-900 azulado profundo, noche cusqueña)
- Neutro claro: `#E2E8F0` (slate-200)
- Acento: `#D97706` (ámbar peruano, tierra de Tarma — saturación controlada, no neon)
- Acento secundario: `#0891B2` (cyan piscina de Huacachina, solo para highlights muy puntuales)
- Líneas/divisores: `#1E293B`

Defensa: paleta de tierra + cielo que evoca geografía peruana (desierto, sierra, costa) sin el cliché de beige+brass. El ámbar como color de cultura y textiles; el cyan como sopresa de naturaleza. Un solo acento principal.

## Locked type
- Display: Cabinet Grotesk (grotesca geométrica con carácter, amigable pero premium)
- Body: Inter Tight (legible, compacta, funciona en español)
- Mono: JetBrains Mono (para métricas y datos del panel admin)

Justificación: sans-serif moderno, no serif — BG Travel es una marca joven y digital, no una institución patrimonial. Cabinet Grotesk tiene personalidad sin ser excentrica.

## Tier-1 technique
**B1 — Cutout parallax rig.** Hero con 4 capas: (1) fondo montañoso del Valle Sagrado, (2) niebla translúcida, (3) tejido textil andino superpuesto en esquina, (4) copy en primer plano. Scroll mueve cada capa a velocidad distinta; cursor añade un micro-parallax sutil.

Defensa: el concepto "mapa viviente" cobra vida con profundidad espacial — el usuario siente que está entrando al paisaje peruano, no solo viendo una foto. Es cinemático pero ligero, no requiere WebGL pesado.

Mobile degradación: parallax reducido a 2 capas, efecto solo en scroll (sin cursor). Fallback estático: imagen compuesta completa.

## Section plan (7 secciones)
1. **Hero** — split 50/50: copy izquierda, parallax derecha. Family: split-hero.
2. **Propuesta de valor** — 3 features asimétricas (bento ligero). Family: bento-grid.
3. **Experiencias destacadas** — grid 2 columnas con cards de destino. Family: card-grid.
4. **Cómo funciona** — pasos numerados horizontales con línea de tiempo. Family: timeline-row.
5. **Destinos** — sticky stack de capítulos con foto full-bleed. Family: sticky-stack.
6. **Testimonios + datos** — cita grande + métricas animadas. Family: quote-stats.
7. **CTA + WhatsApp** — sección ancha con formulario de cotización rápido. Family: split-cta.

## Asset plan
- Hero: 4 capas (fondo Valle Sagrado, niebla, textil andino, montaña primer plano) — generadas como imágenes separadas
- Section plates: 3 placas atmosféricas (Gamarra textil, Tarma naturaleza, Cusco cultura)
- 6 tarjetas de experiencia (Cusco, Tarma, Gamarra Fashion Tour, Lima Gastronómica, Huacachina, Paquete Internacional)
- Icon set custom (12 iconos: maleta, brújula, sombrero, textiles, cámara, billetera, whatsapp, estrella, mapa, avión, tenedor, gente)
- Logo/monograma BG Travel (marca wordmark + símbolo)
- OG image + favicon
- Patrón textil andino repetible (para fondos de sección)

## CTA inventory
1. **Hero CTA primario** — "Ver experiencias" → botón ámbar sólido, radio 12px, hover: elevación + brillo suave
2. **Hero CTA secundario** — "Cotizar por WhatsApp" → outline con ícono de WhatsApp
3. **Card experience CTA** — "Más información" → enlace subrayado con flecha
4. **CTA sección cotización** — "Enviar consulta" → botón grande ámbar con icono de mensaje
5. **WhatsApp flotante** — botón circular fijo esquina inferior derecha (pulsación sutil)
