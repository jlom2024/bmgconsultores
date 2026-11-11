# PROMPT PARA OPENCODE — BMG CONSULTORES

Eres el agente de OpenCode trabajando sobre el proyecto **BMG Consultores**. Lee primero este contexto completo antes de tocar código. El proyecto vive en `D:\Empresas\BMG Consultores` (Windows).

## 1. El negocio

Website multi-servicio de **BMG Consultores (Perú)**: home + 7 páginas de servicio:
- BG Travel
- BG Emprendedor
- BG Contable
- BG Legal
- BG Desarrollo IA
- BG Lobby
- BG Inmobiliario

Sin backend: el formulario de contacto y todos los CTAs abren WhatsApp al **+51 994 118 084**.

**URL producción (live):** https://www.bmgconsultoresperu.com
**Preview Netlify:** https://bmg-consultores.netlify.app

## 2. Stack

- Vite 5 + React 19 + TypeScript
- UI: shadcn/ui (Radix) + Tailwind CSS v4 + Framer Motion
- Router: react-router-dom (SPA)
- Supabase: `@supabase/supabase-js` + `supabase/edge_function/` (uso mínimo)
- Build: `npm run build` → `dist/` (usa `npx cross-env` por compatibilidad Windows)
- Postbuild: `node scripts/postbuild.mjs` (SEO finalize + sitemap)

## 3. Deploy — Producción (FTPS a cPanel/LiteSpeed)

Deploy se hace con el script `scripts/deploy_ftp.py`, que sube `dist/` por FTPS (TLS explícito, puerto 21):

- Host: `ftp.bmgconsultoresperu.com`
- IP: **65.181.111.23** (LiteSpeed / cPanel compartido)
- User FTPS: `ftpweb@bmgconsultoresperu.com`
- Pass FTPS: `ftpps09$13$f3` (está hardcodeada en el script — pendiente mover a env var)
- Local dir: `d:\Empresas\BMG Consultores\dist`

Flujo correcto de deploy:
1. `VITE_SITE_URL=https://bmgconsultores.pe npx vite build --mode development` (en Windows NO usar `npm run build` con env inline sin cross-env)
2. `node scripts/postbuild.mjs` (genera sitemap.xml, robots.txt, reemplaza `__SITE_URL__`)
3. `python scripts/deploy_ftp.py`
4. Verificar → HTTP 200 en https://www.bmgconsultoresperu.com

Datos de hosting (de la auditoría del 2026-07-27):
- LiteSpeed con HTTP3/QUIC habilitado, SSL nativo, redirect HTTP→HTTPS vía `.htaccess`
- `.htaccess` en raíz: GZIP, cache headers, seguridad (X-Frame-Options, nosniff, XSS), reescritura SPA a index.html
- Assets con hash: cache immutable 1 año; HTML: no-cache
- Netlify.toml existe también (redirect SPA) para el preview

## 4. SEO pipeline

- `src/lib/seo.ts` → hook `usePageMeta()` setea title/meta/OG/JSON-LD por página (client-side)
- Solo el home tiene prerender real (`scripts/prerender.mjs`); las subpáginas dependen de JS
- `scripts/seo-finalize.mjs` usa `VITE_SITE_URL` (env, default `https://bmgconsultores.pe` — revisar: prod usa `bmgconsultoresperu.com`)
- `sitemap.xml` + `robots.txt` generados en postbuild

## 5. Problemas conocidos / caveats (NO los rompas)

1. **Rutas de imagen hardcodeadas**: algunas páginas en `src/pages/service/Index.tsx` (ej. Inmobiliario) hardcodean paths de imagen en JSX en vez de leerlas de `src/data/services.ts`. Si cambias una imagen y no se refleja, grepea el JSX.
2. **Redirect naked→www NO configurado**: `bmgconsultoresperu.com` sirve contenido sin redirigir a www. Pendiente fix en `.htaccess`.
3. **Páginas Privacidad/Términos** (footer links): NO existen aún.
4. **JS bundle pesado**: ~979 KB `index-*.js` (Vite mode development por decisión del cliente — evaluar producción minificada).
5. Env solamente: `VITE_SITE_URL` + `VITE_ENABLE_ROUTE_MESSAGING=true` (activar route messaging).
6. En la raíz hay archivos/carpas sueltas (`un_espectacular_intro_del_logo.mp4`, `uploaded_files/`, `Smart Experience/`, `.netlify/`) — no son parte del build; no borrar sin preguntar.

## 6. Tu tarea

[ESCRIBE AQUÍ TU TAREA ESPECÍFICA]

Ejemplos de tareas habituales en este proyecto:
- "Audita el proyecto y corrige los pendientes listados en la sección 5"
- "Arregla el redirect naked→www en .htaccess y redeploy"
- "Crea las páginas Privacidad y Términos"
- "Optimiza el bundle JS (build production + code splitting) y redeploy"
- "Mueve las credenciales FTPS a variables de entorno seguras"

Reglas:
- Sigue el estilo del código existente (Tailwind v4, Radix/shadcn patterns)
- Cambios mínimos y verificados (`npm run lint`, build + preview antes de deploy)
- NO hagas git commit/push ni deploy FTPS sin pedirme confirmación explícita
- Actualiza `bitacora.md` con timestamp al terminar cambios importantes
