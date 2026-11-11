# Auditoria tecnica: App y Landing

Fecha: 23 de julio de 2026

## Conclusion

La solucion no esta lista para produccion. El build y el typecheck pasan, pero existen
bloqueos criticos de seguridad y SEO: los endpoints administrativos no validan
autorizacion en servidor, el portal cliente confia en una identidad manipulable desde
`localStorage`, y la landing se entrega por SSR sin contenido principal porque todo el
arbol visual esta envuelto en `ClientOnly`.

Prioridad recomendada:

1. Cerrar autorizacion y sesiones.
2. Restaurar SSR real de la landing.
3. Corregir persistencia y atomicidad de pagos, reservas y WhatsApp.
4. Optimizar imagenes, bundles e indices.
5. Completar accesibilidad, responsive y pruebas de aplicacion.

## Hallazgos criticos

### 1. CRUD administrativo sin autorizacion en servidor

- Evidencia: `src/lib/api/agency.functions.ts:13-63` y el resto de las funciones CRUD
  ejecutan lecturas, escrituras y borrados sin validar una sesion.
- El panel solo comprueba el token en el navegador:
  `src/routes/admin/index.tsx:55-63`.
- Impacto: un usuario no autenticado puede invocar las server functions y acceder o
  modificar clientes, reservas, vuelos, hoteles, facturas, gastos y comisiones.
- Correccion: middleware obligatorio `requireAdminSession()` en cada server function,
  sesion en cookie `HttpOnly; Secure; SameSite=Lax/Strict`, RBAC por operacion y CSRF
  para mutaciones.

### 2. Portal cliente vulnerable a suplantacion e IDOR

- `src/routes/login-cliente.tsx:36-39` guarda el objeto cliente en `localStorage`.
- `src/routes/mi-cuenta/index.tsx:17-22` usa ese objeto como identidad.
- `src/lib/api/agency.functions.ts:634-688` acepta `customer_id`, `booking_id` o un id
  de itinerario enviados por el cliente, sin una sesion autenticada que determine el
  propietario.
- Impacto: basta alterar el id local o llamar directamente al endpoint para consultar
  reservas e itinerarios ajenos.
- Correccion: sesion de cliente en servidor y derivar siempre `customer_id` desde la
  sesion. Nunca aceptar la identidad/propiedad desde el payload.

### 3. Password hashing y credencial inicial inseguros

- Admin: SHA-256 rapido y password inicial fija `admin123`:
  `src/lib/api/auth.functions.ts:5-13` y `39-59`.
- Cliente: SHA-256 con un salt global embebido:
  `src/lib/api/agency.functions.ts:575-580`.
- No hay rate limit, bloqueo progresivo, MFA ni auditoria de intentos.
- Correccion: Argon2id o bcrypt con salt individual, migracion forzada de hashes,
  eliminar credenciales por defecto, rate limit por IP/cuenta y MFA para admin.

### 4. Landing sin contenido SSR

- Toda la landing esta bajo `ClientOnly`: `src/routes/index.tsx:723-741`.
- `ClientOnly` devuelve `null` hasta montar en navegador:
  `src/components/motion.tsx:5-10`.
- Verificacion: el HTML de produccion respondio 200 con `<title>`, pero sin `<h1>`,
  contenido principal ni JSON-LD.
- Impacto: SEO, accesibilidad inicial, previews, resiliencia sin JS y Core Web Vitals.
- Correccion: renderizar contenido semanticamente en SSR y limitar `ClientOnly` a los
  efectos GSAP/Lenis que realmente dependen del navegador.

### 5. Formulario principal puede no guardar leads

- La landing llama `createQuote` con forma distinta a la API y oculta cualquier error:
  `src/routes/index.tsx:549-560`.
- La implementacion correcta usada en otra ruta envia `{ data: {...} }`.
- Luego abre WhatsApp y muestra exito aunque la escritura haya fallado.
- Impacto: perdida silenciosa de leads y metricas falsas.
- Correccion: usar `createQuote({ data })`, mostrar estados loading/error/success,
  registrar fallos y no confirmar persistencia si la API no respondio `ok`.

## Hallazgos altos

### 6. Cabeceras de seguridad definidas pero no aplicadas

- `src/lib/security-headers.server.ts` existe, pero `src/server.ts` no importa ni llama
  `applySecurityHeaders`.
- Verificacion HTTP: no se recibieron CSP ni HSTS.
- Ademas, la CSP declarada no permite `fonts.cdnfonts.com`, dominio usado por
  `src/styles.css:33-74`.
- Correccion: envolver todas las respuestas, ajustar CSP con nonces/hashes y probar
  fuentes, RPC, imagenes, Culqi y WhatsApp.

### 7. Pagos y WhatsApp son mocks volatiles

- Pagos usa claves placeholder y transacciones en memoria:
  `src/lib/api/payments.functions.ts:4-15`.
- WhatsApp usa reservas ficticias, reglas y logs en memoria:
  `src/lib/api/whatsapp.functions.ts:74-93`.
- Cualquier reinicio de Worker pierde estado. No hay webhooks firmados, idempotencia,
  reintentos, cola, conciliacion ni registro durable.
- Correccion: D1 para estado durable, Queue para envios y conciliacion, secrets del
  entorno, webhook verificado, claves idempotentes y outbox transaccional.

### 8. Operaciones multi-tabla no atomicas

- Crear reserva inserta cabecera y luego items secuencialmente:
  `src/lib/api/agency.functions.ts:87-115`.
- Borrar reserva elimina items y cabecera en llamadas separadas:
  `src/lib/api/agency.functions.ts:132-137`.
- Un fallo parcial deja datos inconsistentes.
- Correccion: `DB.batch()`/transaccion, constraints y claves foraneas efectivamente
  habilitadas. Procesar notificaciones posteriores mediante outbox asincrono.

### 9. Sin rate limit ni proteccion antiabuso

- Login admin, registro/login cliente, cotizaciones y chatbot son endpoints publicos
  sin limite por IP/cuenta, CAPTCHA/Turnstile ni cuotas.
- Impacto: fuerza bruta, spam de leads, enumeracion de emails y consumo innecesario
  de D1/CPU.

## Base de datos e indexing

Los indices actuales cubren algunas claves foraneas y filtros simples, pero no los
patrones completos de consulta.

Agregar y validar con `EXPLAIN QUERY PLAN`:

```sql
CREATE INDEX idx_customers_created_at ON customers(created_at DESC);
CREATE INDEX idx_bookings_created_at ON bookings(created_at DESC);
CREATE INDEX idx_bookings_customer_created ON bookings(customer_id, created_at DESC);
CREATE INDEX idx_bookings_email_created ON bookings(customer_email, created_at DESC);
CREATE INDEX idx_booking_items_order ON booking_items(booking_id, date, time, sort_order);
CREATE INDEX idx_itineraries_customer_start ON itineraries(customer_id, start_date DESC);
CREATE INDEX idx_itinerary_activities_order
  ON itinerary_activities(itinerary_id, day_number, sort_order, time);
CREATE INDEX idx_quotes_created_at ON quotes(created_at DESC);
CREATE INDEX idx_invoices_created_at ON invoices(created_at DESC);
CREATE INDEX idx_commissions_created_at ON commissions(created_at DESC);
```

Observaciones:

- `customer_accounts.email` ya es `UNIQUE`; el indice adicional de
  `migrations/0007_customer_accounts.sql:13` es redundante.
- La busqueda `%texto%` de `src/lib/api/agency.functions.ts:19-25` no aprovecha
  indices B-tree. Usar FTS5, busqueda por prefijo normalizada o un servicio de search.
- Evitar `SELECT *` en listados; seleccionar columnas y aplicar paginacion cursor.
- Los KPIs recorren tablas en cada carga. Crear agregados/materializaciones
  actualizados por eventos si el volumen crece.

## Cache y asincronismo

### Cache

- Publico: `Cache-Control` con `s-maxage` y `stale-while-revalidate` para experiencias,
  blog y sitemap.
- Aplicacion: Query keys por entidad y usuario, invalidacion despues de mutaciones y
  `gcTime` explicito. No cachear PII en caches compartidas.
- Edge: Cache API para contenido publico versionado; purga por tag/evento al publicar.
- Assets: nombres con hash, AVIF/WebP responsive y TTL inmutable de un ano.

### Async

- Cloudflare Queues para WhatsApp, emails, comprobantes, reportes y conciliacion.
- Patron transactional outbox en D1 para no perder trabajos despues de una mutacion.
- Consumer con idempotencia, backoff exponencial, DLQ y trazabilidad por `job_id`.
- Nunca ejecutar envios masivos dentro de una request interactiva.

## Rendimiento de landing y app

- `public/assets` contiene 77.59 MB; 17 de 19 archivos superan 1 MB.
- El hero carga aproximadamente 15 MB entre imagen, niebla y textura.
- Las imagenes inferiores no declaran `loading="lazy"`, `decoding="async"`,
  `srcset/sizes` ni dimensiones intrinsecas.
- `og-image.png` y `banner-smart-experience.png` son duplicados exactos de 4.71 MB.
- El build advierte chunks mayores de 500 kB. La ruta de detalle de reserva produce un
  chunk cliente de 629.28 kB y SSR de 1.82 MB.
- Correccion: convertir a AVIF/WebP, generar variantes, preload solo del hero,
  lazy-load del resto, eliminar duplicados y dividir PDF/exportacion con imports
  dinamicos.

## UX, responsive y accesibilidad

- El chat usa ancho fijo de 380 px y `right: 24px`:
  `src/components/ChatWidget.tsx:72-88`. En viewport de 390 px se desplaza fuera del
  borde izquierdo; usar `w-[calc(100vw-2rem)] max-w-[420px]`.
- Boton cerrar chat y enviar no tienen nombre accesible:
  `src/components/ChatWidget.tsx:102-104` y `168-176`.
- El boton de menu no expone `aria-expanded`/`aria-controls`:
  `src/components/Navbar.tsx:87-95`.
- El boton flotante de WhatsApp no tiene nombre accesible:
  `src/routes/index.tsx:70-81`.
- Falta skip link y hay animaciones CSS sin una regla global
  `prefers-reduced-motion`.
- Labels del login cliente no estan asociados mediante `htmlFor`/`id`.
- La landing y el admin usan emojis como iconos, con representacion inconsistente.

## SEO y meta indexing

- Mantener SSR real y agregar JSON-LD de `TravelAgency`, `Organization`, breadcrumbs,
  experiencias y articulos.
- Agregar canonical y `og:url`; completar Twitter/OG por ruta.
- El sitemap asigna `lastmod` de hoy a todas las rutas:
  `src/routes/sitemap[.]xml.ts:9,44-48`. Debe usar la fecha real de modificacion.
- `StructuredData` existe pero no se usa.
- No incluir `/admin`, `/login` ni datos privados en indexacion; agregar `noindex` en
  pantallas de autenticacion y cuenta.

## Calidad y verificacion

- TypeScript: aprobado (`tsc --noEmit`).
- Build de produccion: aprobado con advertencias de chunks grandes.
- ESLint: no termino dentro de 3 minutos. Ajustar exclusiones para `dist`, paquetes
  vendorizados y archivos generados; despues hacerlo obligatorio en CI.
- No existen pruebas de negocio de la app. Las pruebas presentes corresponden a los
  paquetes base `fnf`, `fnf-react` y `quanta`.
- Faltan pruebas de autorizacion, IDOR, formularios, reservas atomicas, webhooks,
  accesibilidad y flujos E2E.

## Plan recomendado

### Fase 0: bloqueo de produccion

1. Middleware de autenticacion/autorizacion server-side.
2. Cookies HttpOnly y sesiones durables.
3. Argon2id/bcrypt, eliminacion de password default y rate limiting.
4. Cerrar IDOR del portal cliente.
5. Quitar `ClientOnly` del contenido SSR y reparar el formulario de leads.

### Fase 1: integridad operativa

1. Transacciones/batch para reservas y operaciones relacionadas.
2. Pagos reales con webhooks, idempotencia y conciliacion.
3. WhatsApp durable mediante Queue + outbox + DLQ.
4. Validacion Zod estricta y errores tipados.

### Fase 2: rendimiento y crecimiento

1. Imagenes responsive AVIF/WebP y lazy loading.
2. Indices compuestos, FTS y paginacion cursor.
3. Cache publico con SWR e invalidacion por eventos.
4. Code splitting de PDF/exportacion/admin.

### Fase 3: calidad

1. E2E de landing, admin y portal.
2. Pruebas de seguridad y permisos por rol.
3. Lighthouse/axe en 390, 768, 1024 y 1440 px.
4. Observabilidad: request id, audit log, metricas de colas y alertas.
