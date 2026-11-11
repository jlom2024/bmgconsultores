# Bitacora de Proyecto — BG Travel Peru Smart Experience

> Documento vivo. Actualizar con cada sesión de trabajo relevante.
> Destinado a todos los agentes del equipo: Sky, Houston, KIA, Plexy, Antu, El Padrino.

---

## Identidad del proyecto

| Campo | Valor |
|---|---|
| Nombre | BG Travel Peru — Smart Experience |
| Cliente | BMG Consultores |
| Tipo | Agencia de viajes + portal cliente + panel admin |
| URL objetivo | https://bgtravel.pe |
| Dominio de negocio | Turismo cultural, comercial y personalizado en Peru (Cusco, Tarma, Lima, Ica, Gamarra, Nature Punk) |
| WhatsApp comercial | +51 994 118 084 |
| Email | info@bgtravel.pe |

---

## Estructura de carpetas (raiz del proyecto)

```
Smart Experience/
├── WEB/
│   └── app/                    <- código fuente principal (ver sección App)
├── Documentos/                 <- docs de negocio, contratos
├── BASES_INTEGRADAS_CONCURSO_2026-II.pdf
├── BG_Travel_Peru_Smart_Experience_Presentacion.pptx
├── BG_Travel_Peru_Smart_Experience_v2_PROFESIONAL.docx/.pdf
├── Concurso.docx               <- bases del concurso al que se participa
├── ppto.mp4                    <- video de presentación
└── bitacora.md                 <- este archivo
```

---

## Stack tecnológico

| Capa | Tecnología |
|---|---|
| Framework | TanStack Start v1.168 (SSR + file-based routing) |
| Runtime principal | Cloudflare Workers (deploy CF) / Node.js 22 (deploy VPS) |
| Base de datos CF | Cloudflare D1 (SQLite en edge) |
| Base de datos VPS | SQLite via better-sqlite3 (mismo esquema) |
| UI | React 19, Tailwind CSS v4, shadcn/ui (Radix), Quanta (Higgsfield design system) |
| Animaciones | GSAP 3 + Lenis (scroll suave) — progressive enhancement, solo client-side |
| Validación | Zod v4 |
| Bundler | Vite 7 + bun 1.3.13 |
| Build CF | vite.config.ts -> dist/ (Cloudflare Worker) |
| Build VPS | vite.config.node.ts -> dist-node/ (Node.js HTTP server) |
| Process manager | PM2 cluster mode |
| Reverse proxy | Nginx + Let''s Encrypt (Certbot) |
| CI/CD | GitHub Actions (.github/workflows/ci.yml) |
| Iconos | Material Symbols SVG 400 (outlined) |
| Fuentes | Cabinet Grotesk (display) + Inter Tight (body) via fonts.cdnfonts.com |
| Pagos | Culqi (integración en sandbox — pendiente activar con credenciales reales) |
| Chat IA | Travel Assistant (base de conocimiento local en travel-assistant.functions.ts) |

---

## Rutas de la aplicación

| Ruta | Archivo | Descripción | Auth |
|---|---|---|---|
| / | routes/index.tsx | Landing pública (hero, experiencias, destinos, testimonios, CTA) | No |
| /experiencias | routes/experiencias.tsx | Catálogo de experiencias | No |
| /vuelos | routes/vuelos.tsx | Búsqueda y listado de vuelos | No |
| /hoteles | routes/hoteles.tsx | Búsqueda y listado de hoteles | No |
| /cotizar | routes/cotizar.tsx | Formulario de cotización detallado | No |
| /blog | routes/blog.index.tsx | Listado de artículos | No |
| /blog/:slug | routes/blog.$slug.tsx | Artículo individual | No |
| /sobre-nosotros | routes/sobre-nosotros.tsx | Página institucional | No |
| /login | routes/login.tsx | Login panel admin (noindex) | No |
| /admin | routes/admin/index.tsx | Panel administrativo completo (noindex) | Admin token |
| /login-cliente | routes/login-cliente.tsx | Login/registro portal cliente (noindex) | No |
| /mi-cuenta | routes/mi-cuenta/index.tsx | Dashboard del cliente (noindex) | sessionToken cliente |
| /mi-cuenta/reserva/:id | routes/mi-cuenta/reserva.$id.tsx | Detalle de reserva (noindex) | sessionToken cliente |
| /sitemap.xml | routes/sitemap[.]xml.ts | Sitemap dinámico | No |
| /robots.txt | routes/robots[.]txt.ts | Robots con Disallow para rutas privadas | No |

---

## Módulos del panel admin (/admin)

El panel es una SPA con 15 módulos seleccionables por sidebar:

dashboard - reservas - clientes - vuelos - hoteles - itinerarios - proveedores
facturacion - gastos - comisiones - experiencias - cotizaciones - blog - whatsapp - pagos

Todos los endpoints requieren { token: string } en el payload.
Lógica en: src/lib/api/agency.functions.ts

---

## Esquema de base de datos

Migraciones en WEB/app/migrations/ — aplicar en orden numérico:

| Migración | Contenido |
|---|---|
| 0001_init.sql | Esquema base: experiencias, blog, quotes, admin_users |
| 0002_seed_blog_content.sql | Seed inicial de blog |
| 0003_fix_machu_picchu_image.sql | Corrección de imagen |
| 0004_nature_punk_blog.sql | Artículo Nature Punk |
| 0005_nature_punk_experience.sql | Experiencia Nature Punk |
| 0006_travel_agency_tables.sql | Tablas de agencia: customers, bookings, booking_items, flights, hotels, hotel_rooms, suppliers, itineraries, itinerary_activities, invoices, expenses, commissions |
| 0007_customer_accounts.sql | Portal cliente: customer_accounts |
| 0008_indexes_and_perf.sql | 28 índices compuestos de rendimiento en 13 tablas |

Tablas principales: customers, bookings, booking_items, flights, hotels, hotel_rooms,
suppliers, itineraries, itinerary_activities, invoices, expenses, commissions,
experiences, blog_posts, quotes, admin_users, customer_accounts

---

## Autenticación y sesiones

### Admin
- Login en /login -> adminLogin -> token opaco (32 bytes hex)
- Token guardado en localStorage como admin_token
- Cada server function admin recibe { token: string, ...data } y llama requireAdminSession(token)
- Sesiones en Map en memoria del Worker/proceso (se pierden en reinicio — pendiente KV/SQLite)
- Hash: SHA-256 con salt per-user formato salt:hash
- Rate limiting: 5 intentos / 15 min por IP

### Portal Cliente
- Login en /login-cliente -> customerLogin -> sessionToken opaco
- Token guardado en localStorage como bg_customer_token
- getCustomerSession(token) valida en servidor antes de renderizar /mi-cuenta
- Ownership verificada en servidor (no del payload del cliente) — IDOR cerrado

### Archivos clave
- src/lib/api/auth.functions.ts — sesiones, hashing, rate limiting
- src/lib/admin-client.ts — helper getAdminToken() y adminCall() para el frontend

---

## Server Functions (API interna)

| Archivo | Scope | Contenido |
|---|---|---|
| src/lib/api/auth.functions.ts | Admin + Cliente | Login, logout, sesiones, hashing |
| src/lib/api/agency.functions.ts | Admin + Cliente | CRUD completo de entidades (~38KB) |
| src/lib/api/quotes.functions.ts | Público + Admin | Cotizaciones del formulario landing |
| src/lib/api/experiences.functions.ts | Público + Admin | Experiencias turísticas |
| src/lib/api/blog.functions.ts | Público + Admin | Artículos del blog |
| src/lib/api/flights.functions.ts | Público + Admin | Vuelos |
| src/lib/api/hotels.functions.ts | Público + Admin | Hoteles |
| src/lib/api/payments.functions.ts | Admin | Pagos Culqi (sandbox/mock — pendiente real) |
| src/lib/api/whatsapp.functions.ts | Admin | Templates y scheduler WA (mock en memoria) |
| src/lib/api/travel-assistant.functions.ts | Público | Chatbot con knowledge base local |

---

## Bindings / Acceso a BD

### Cloudflare Workers
- src/lib/bindings.server.ts -> import { env } from "cloudflare:workers"
- env.DB es D1Database provista por la plataforma
- Configurado en app.manifest.json con "db": true

### Node.js VPS
- src/lib/bindings.node.server.ts -> better-sqlite3 con interfaz compatible D1
- Ruta de BD: variable SQLITE_DB_PATH (default: ./data/app.db)
- WAL mode + foreign keys activados
- El alias en vite.config.node.ts redirige automáticamente los imports

---

## Variables de entorno

Ver WEB/app/.env.example para el template completo.

| Variable | Descripción | Req |
|---|---|---|
| NODE_ENV | production / development | Si |
| PORT | Puerto Node (default 3000) | VPS |
| SQLITE_DB_PATH | Ruta absoluta SQLite | VPS |
| SESSION_SECRET | Secreto sesiones (min 32 chars) | Si |
| CULQI_PUBLIC_KEY | PK Culqi (pk_live_...) | Pagos |
| CULQI_SECRET_KEY | SK Culqi (sk_live_...) | Pagos |
| ADMIN_INITIAL_PASSWORD | Password inicial admin | Si |

---

## Deploy — Cloudflare Workers

CI en .github/workflows/ci.yml: bun install -> tsc -> bun run build -> deploy Worker.
El deploy NO usa wrangler.jsonc local — la plataforma Higgsfield genera su config desde app.manifest.json.

---

## Deploy — VPS Hostinger

### Archivos de infraestructura

| Archivo | Descripción |
|---|---|
| vite.config.node.ts | Config build Node.js (preset node-server de Nitro) |
| Dockerfile | Multi-stage: builder Alpine -> runner Alpine con PM2 |
| nginx.conf | Reverse proxy HTTPS, gzip, cache assets, rate limiting |
| ecosystem.config.cjs | PM2 cluster mode, logs, graceful shutdown |
| deploy/setup-vps.sh | Setup inicial VPS Ubuntu (una sola vez como root) |
| deploy/deploy.sh | Deploy incremental rsync + migraciones + PM2 reload |
| scripts/run-migrations.mjs | Aplica migraciones SQL idempotentemente |

### Flujo de primer deploy

  1. En el VPS (una sola vez):
     sudo bash deploy/setup-vps.sh

  2. SSL:
     certbot --nginx -d bgtravel.pe -d www.bgtravel.pe

  3. En el VPS — crear .env.production con SESSION_SECRET, CULQI_*, etc.

  4. Primera migración:
     bun add better-sqlite3
     node scripts/run-migrations.mjs

  5. Desde la máquina local (cada update):
     VPS_HOST=IP_DEL_VPS bash deploy/deploy.sh

### Comandos PM2 en el VPS

  pm2 status
  pm2 logs bg-travel --lines 100
  pm2 reload bg-travel              <- zero-downtime
  pm2 restart bg-travel             <- reinicio duro

---

## Convenciones de código

- TypeScript estricto: tsc --noEmit debe pasar en 0 errores antes de cada commit
- Validación Zod: todos los validators de server functions usan ZodSchema.parse
- Auth en servidor: toda mutación admin llama requireAdminSession(data.token) como primera instrucción
- Operaciones multi-tabla: usar db().batch([stmt1, stmt2]) para atomicidad (no loops secuenciales)
- Async real: WhatsApp/email van a cola externa, nunca bloqueando la request
- Imágenes: hero con fetchPriority="high"; secciones inferiores con loading="lazy" decoding="async" y dimensiones
- SSR safe: sin window/document/localStorage en el cuerpo del componente ni a nivel de módulo
- Estilos: tokens de styles.css (--color-amber, --color-bg-navy, etc.). Sin colores hardcoded
- Iconos: Material Symbols SVG 400 outlined. Sin emojis como iconos funcionales

---

## Pendientes técnicos (backlog priorizado)

### Alta prioridad
- [ ] Sesiones durables: mover sessions Map a Cloudflare KV (CF) o tabla _sessions en SQLite (VPS)
- [ ] Pagos reales: reemplazar mock con Culqi API real, webhooks firmados, idempotency key
- [ ] WhatsApp durable: migrar a tabla whatsapp_log en D1/SQLite + Cloudflare Queue / cron
- [ ] Imágenes WebP/AVIF: 19 assets suman 77 MB (PNG). Convertir con sharp + srcset responsive

### Media prioridad
- [ ] Tests E2E: Playwright para landing, admin login, portal cliente, cotización
- [ ] Tests de autorización: verificar que endpoints admin devuelven 401 sin token
- [ ] FTS full-text: searchCustomers usa LIKE %q% sin índice; migrar a SQLite FTS5
- [ ] Paginación cursor: todos los listados tienen LIMIT 200; implementar cursor pagination
- [ ] Datos reales en Pagos/WhatsApp: actualmente usan MOCK_BOOKINGS hardcodeados

### Baja prioridad
- [ ] ESLint en CI: excluir dist, node_modules, *.gen.ts y reactivar en CI
- [ ] MFA para admin: TOTP como segundo factor en login
- [ ] PWA: service worker + manifest para instalación móvil
- [ ] i18n completo: src/lib/i18n.ts tiene la base ES/EN; completar traducciones

---

## Historial de sesiones

### 2026-07-23 — Sky (KREO IA Studio)

**Auditoria completa + correcciones + deploy VPS**

Auditoría ejecutada sobre código fuente, build de producción y HTML servido.
Se usó el skill sol-task-orchestrator para orquestar 6 workers en paralelo
(Terra-1/2/3/4, Luna-5, Terra-6).

Cambios aplicados:

  Seguridad (Terra-1):
  - auth.functions.ts: requireAdminSession, requireCustomerSession, createCustomerSession,
    rate limiting 5/15min, hashing per-user salt:hash
  - agency.functions.ts: 30+ endpoints CRUD con requireAdminSession — acceso no autenticado bloqueado
  - Portal cliente: IDOR cerrado (ownership verificada en servidor)
  - admin-client.ts: helper getAdminToken() y adminCall()
  - Rutas privadas con noindex, nofollow

  SSR / SEO (Terra-2):
  - Landing: ClientOnly eliminado del árbol principal — HTML semántico en SSR
  - Formulario leads: createQuote corregido + estados loading/error
  - JSON-LD TravelAgency inyectado como primer nodo
  - og:url, canonical, noindex en rutas privadas

  Integridad (Terra-3):
  - server.ts: applySecurityHeaders conectado en todas las respuestas
  - CSP ampliada: cdnfonts, culqi, blob:
  - createBooking, deleteBooking, deleteHotel: atomicos con D1.batch()
  - Validación Zod estricta en customers, bookings, quotes
  - robots.txt: Disallow para rutas privadas

  Base de datos (Terra-4):
  - migrations/0008_indexes_and_perf.sql: 28 indices compuestos en 13 tablas

  UX / Rendimiento (Luna-5):
  - Chat responsive 390px: w-[calc(100vw-2rem)] max-w-[420px]
  - aria-label, aria-expanded, aria-controls en navbar y chat
  - prefers-reduced-motion global en styles.css
  - Labels asociados en formulario de registro
  - banner-smart-experience.png duplicado (4.71 MB) eliminado
  - fetchPriority="high" en hero, loading="lazy" en secciones inferiores

  Deploy VPS (Terra-6):
  - vite.config.node.ts, bindings.node.server.ts, scripts/run-migrations.mjs
  - ecosystem.config.cjs, nginx.conf, Dockerfile
  - .env.example, deploy/setup-vps.sh, deploy/deploy.sh
  - .gitignore y package.json actualizados

Resultado: tsc --noEmit 0 errores. 27 archivos creados o modificados.
Informe de auditoría completo: WEB/app/AUDITORIA_APP_LANDING_2026-07-23.md

---

## Comandos de referencia rápida

  # Desde WEB/app/

  bun run dev              <- desarrollo local (Cloudflare via wrangler)
  bun run build            <- build producción CF Workers
  bun run build:node       <- build producción Node.js VPS
  bun run typecheck        <- verificar tipos (debe dar 0 errores)
  bun run preview          <- preview local del build CF
  node scripts/run-migrations.mjs  <- aplicar migraciones en VPS

---

Bitacora mantenida por el equipo KREO IA Studio — Sky, Houston, KIA, Plexy, Antu, El Padrino.
