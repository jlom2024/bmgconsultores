# BMG Consultores

Sitio multi-página de BMG Consultores: home + 8 subpáginas de servicio (BG Travel, BG Emprendedor, BG Contable, BG Legal, BG Desarrollo IA, BG Lobby, BG Saneamiento & Construcción, **BG Seguros**).

**Stack:** Vite + React 19 + TypeScript + Tailwind v4 + react-router. Sin backend — el formulario de contacto y todos los CTAs abren WhatsApp directamente (+51 994 118 084).

## Desarrollo local

```bash
npm install
npx vite --port 8081
```

No uses `npm run dev`/`npm run build` directo en Windows: el script usa sintaxis bash (`VITE_ENABLE_ROUTE_MESSAGING=true vite ...`) que `cmd.exe` no entiende. En Windows corre:

```bash
VITE_ENABLE_ROUTE_MESSAGING=true VITE_SITE_URL=https://tu-dominio.pe npx vite build --mode development
node scripts/postbuild.mjs
```

(En Netlify/Linux el script `npm run build` normal funciona sin problema.)

## Estructura de datos de servicios

`src/data/services.ts` tiene un array `Service[]` con `logo`, `images`, `faqs`, etc. por servicio.

⚠️ **Ojo:** algunas páginas en `src/pages/service/Index.tsx` (ej. `InmobiliarioPage`) tienen rutas de imagen **hardcodeadas** directo en el JSX en vez de leer `service.images[n]`. Si cambias una imagen en `services.ts` y no se refleja visualmente, greppea el JSX de esa página específica por el path viejo.

## SEO

- `src/lib/seo.ts` — hook `usePageMeta()` que setea `<title>`, meta description, OG/Twitter, canonical y JSON-LD de FAQPage por página (client-side).
- `scripts/seo-finalize.mjs` — reemplaza el placeholder `__SITE_URL__` en `dist/index.html` y `dist/robots.txt`, y genera `dist/sitemap.xml` real a partir de las rutas de `App.tsx`. Usa `VITE_SITE_URL` (default `https://bmgconsultoresperu.com` — dominio de producción activo).
- Solo el home tiene SSR pre-renderizado (`scripts/prerender.mjs`) — las subpáginas actualizan meta tags vía JS, así que un bot que no ejecuta JS (WhatsApp/Facebook link preview) verá el título genérico del home si comparten un link directo a `/inmobiliario` etc. Pendiente si se necesita preview perfecto en redes.

## Deploy

- **Preview actual (Netlify):** https://bmg-consultores.netlify.app — para revisión del cliente.
- **Producción (ACTIVA):** hosting cPanel/LiteSpeed del cliente — `https://bmgconsultoresperu.com` (HTTP 200). Deploy vía `scripts/deploy_ftp.py` (FTPS).

## Notas 2026-08-13 (2)

- **Asesor BG Saneamiento & Construcción**: Elvis E. Briceño Rivadeneyra (Magíster en Planificación Urbana, Sostenibilidad y Cambio Climático — UPC Cataluña; arquitecto urbanista; geógrafo; experiencia municipal, docencia en la UNMSM y proyectos de infraestructura). Sección "Tu asesor" en la página /inmobiliario (foto, perfil y CTA WhatsApp), mismo patrón que BG Seguros.

## Notas 2026-08-13

- **BG Seguros** — nueva pestaña de servicio (alianza estratégica BMG). Página premium con hero de imagen, badge dorado, stats, features, galería, proceso, **asesor Giancarlo Rengifo** (foto + perfil), experiencia, FAQ y CTA WhatsApp. Rutas: `src/data/services.ts` (id `seguros`), `src/pages/service/Index.tsx` (`SegurosPage`), `src/App.tsx` (`/seguros`).
- **Botón "← Inicio"** en el Navbar de todas las subpáginas (desktop + menú móvil).
- **SEO**: dominio corregido a `https://bmgconsultoresperu.com` en index, robots y sitemap (9 rutas).

## Pendientes conocidos

- Páginas de Privacidad/Términos (footer) — no creadas aún.
- Rotar credenciales FTPS (están en claro en `scripts/deploy_ftp.py`) y pasarlas a variables de entorno.
