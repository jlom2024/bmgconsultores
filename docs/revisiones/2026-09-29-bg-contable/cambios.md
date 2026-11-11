# Modificaciones Página Web — BG Contable

**Fecha**: 2026-09-29  
**Proyecto**: BMG Consultores Perú  
**Módulo / Servicio**: BG Contable (`/contable`) y Landing Corporativa (`/`)  
**Estado**: Desplegado en producción ([https://www.bmgconsultoresperu.com/contable](https://www.bmgconsultoresperu.com/contable))

---

## 1. Alcance y Requerimientos Implementados

En base al documento base `MODIFICACIONES PAGINA WEB BG CONTABLES.md`, se ejecutaron las siguientes modificaciones:

### Punto N° 1 — Titular Principal (H1) y Subtítulo Ganador
- **H1**: `"Tu contabilidad sin errores, sin multas."`
  - Implementado con tipografía *Cormorant Garamond*, destacado en color dorado corporativo (`var(--brand-gold)`), sombra suave y renderizado responsivo.
- **Subtítulo (Párrafo Comercial)**:
  - Reemplazo del texto previo *"Contadores certificados..."* por:
    > *"Regularizamos y gestionamos tu contabilidad de forma impecable. Evita nuevas contingencias con SUNAT y mantén tu negocio al día con total tranquilidad."*
- **Archivos actualizados**:
  - `src/pages/service/Index.tsx` (Hero de `ContablePage`).
  - `src/data/services.ts` (`tagline` y `description` de `contable`).

---

### Punto N° 2 — Ajuste de Tarifa Comercial Estratégica (Módulo Izquierdo)
- **Texto Requerido**: `"TU DECLARACION MENSUAL PDT 601 Y 621 DESDE 150 SOLES"`.
- **Implementación**:
  1. **Badge destacado en el Hero de BG Contable**: Etiqueta visual dorada interactiva ubicada estratégicamente sobre los botones de acción principal.
  2. **Primer módulo de estadísticas (módulo izquierdo)**: Posicionado como el primer elemento en `service.stats`:
     - Valor: `"Desde S/ 150"`
     - Etiqueta: `"Tu declaración mensual PDT 601 y 621"`
     - Esto garantiza que en la barra de métricas del Hero y en la tarjeta de servicios de la Home (`stats.slice(0, 2)`), el módulo izquierdo presente esta tarifa comercial de forma inmediata.

---

### Punto N° 3 — Reestructuración de la Grilla ("¿Qué incluye BG Contable?")
- **Estructura CSS Grid simétrica**:
  - **Computadoras (Desktop)**: `grid-cols-1 lg:grid-cols-3 gap-4` (cuadrícula simétrica de 3 columnas × 4 filas = 12 ítems).
  - **Celulares (Mobile)**: 1 sola columna vertical continua (`grid-cols-1`).
- **Línea Gráfica**:
  - Cajas oscuras con borde dorado sutil (`rgba(10, 47, 63, 0.45)`, borde `var(--brand-gold)` al 30% y efecto hover scale).
  - Círculos amarillos/dorados numerados del 1 al 12 (`rounded-full`, fondo oro, texto negro en negrita).
- **Lista de 12 ítems completa**:
  1. Contabilidad general, analítica y de costos para todo régimen.
  2. Declaraciones mensuales y anuales ante SUNAT (PDT 621, 601). *(Se eliminó la duplicidad del 621).*
  3. Gestión de planillas, AFP, CTS y beneficios sociales.
  4. Libros electrónicos (PLE) y facturación electrónica OSE/SOL.
  5. Auditoría preventiva y de fiscalización.
  6. Asesoría en regímenes: Nuevo RUS, RER, MYPE Tributario y General.
  7. Estados financieros: balance general, EGP y flujo de caja.
  8. Representación ante SUNAT por fiscalizaciones y gestiones de cobranzas coactivas. *(Se incorporó el término "gestiones").*
  9. Fraccionamiento de deuda por IGV, renta y multas. *(Nuevo).*
  10. Declaraciones mensuales y anuales: Régimen de cuarta y quinta categoría. *(Nuevo).*
  11. Declaración mensual de régimen de primera categoría. *(Nuevo).*
  12. Declaración impuesto a los activos netos (ITAN). *(Nuevo).*

---

### Punto N° 4 — Consolidación de 7 Preguntas Frecuentes (Acordeón Estricto)
- Se consolidaron las 3 preguntas existentes con 4 nuevas soluciones rápidas para el contexto tributario peruano:
  1. **¿Qué documentos necesito entregar para que lleven mi contabilidad?** (Existente).
  2. **¿Pueden hacer mi declaración anual del Impuesto a la Renta?** (Existente).
  3. **¿Atienden empresas en todo el Perú o solo en Lima?** (Existente).
  4. **¿Qué pasa si me olvidé de declarar mi PDT este mes?** (Nueva - Sanción según Art. 176 num. 1 del Código Tributario, régimen de gradualidad voluntaria y subsanación inmediata).
  5. **Estoy en el Nuevo RUS, ¿ustedes me pueden llevar la contabilidad?** (Nueva - Control de límites mensuales/anuales de ingresos para evitar reclasificación de oficio a General y asesoría para migrar a RER/MYPE).
  6. **¿Qué documentos necesito para que constituyan mi empresa en un solo acto?** (Nueva - DNI socios, reserva SUNARP, objeto social, capital, minuta y firma en notaría en un solo acto con RUC y Clave SOL).
  7. **¿Mi tarifa de "tu PDT desde 150" incluye los libros electrónicos?** (Nueva - Detalle de cobertura base PDT 621 y 601 para microempresas vs cotización a medida para PLE/SIRE).
- **Comportamiento de Acordeón Estricto**:
  - Implementado mediante estado reactivo centralizado (`openFaqIndex`).
  - Al hacer clic para desplegar una pregunta, **se cierran automáticamente todas las demás**, optimizando el espacio y la experiencia en pantallas móviles.

---

### Punto N° 5 — Pie de Página Institucional (Footer & Geolocalización)
- **Elemento Web**: Bloque de contacto institucional y geolocalización agregado en el pie de página de servicios y en el pie de página de la Home.
- **Texto Indexable en HTML**:
  > *Av. Agustín Gamarra 1132, Segundo Piso, Oficina 226 (Galería Brisas), La Victoria, Lima.*
- **Enlace GPS Interactivo**:
  - URL universal: `https://maps.google.com/?q=Av.+Agust%C3%ADn+Gamarra+1132%2C+Segundo+Piso%2C+Oficina+226%2C+Galer%C3%ADa+Brisas%2C+La+Victoria%2C+Lima`
  - Botón: `"Ver ubicación en mapa"` con icono `MapPin`.
  - **Comportamiento Celular**: Al pulsar la dirección o el botón en un smartphone, abre directamente el GPS integrado del dispositivo (Google Maps en Android / Apple Maps en iOS) para guiar al usuario a la oficina en Gamarra.

---

## 2. Archivos Modificados

| Archivo | Cambios principales |
|---|---|
| `src/data/services.ts` | Tagline, description, 12 features, stats con tarifa S/ 150 a la izquierda y 7 FAQs. |
| `src/pages/service/Index.tsx` | ContablePage (H1, subtítulo, badge de tarifa, grilla 12 ítems 3x4, acordeón estricto) y Footer con geolocalización. |
| `src/pages/home/Index.tsx` | Actualización de dirección en bloque de contacto y Footer con bloque institucional de geolocalización. |
| `bitacora.md` | Registro cronológico del cambio, verificación y despliegue a producción. |

---

## 3. Pipeline de Compilación y Verificación

1. **TypeScript Check**:
   ```bash
   node ./node_modules/typescript/bin/tsc --noEmit
   ```
   *Resultado*: 0 errores de tipado o sintaxis.

2. **Vite Build**:
   ```bash
   node ./node_modules/vite/bin/vite.js build --mode development
   ```
   *Resultado*: 2279 módulos transformados. Bundle generado en `dist/` en 4m 14s.

3. **Pipeline Postbuild SEO**:
   ```bash
   node scripts/postbuild.mjs
   ```
   *Resultado*:
   - Generación de `dist/sitemap-routes.json` (11 rutas).
   - Prerender SSR integrado en `dist/index.html`.
   - Finalización de SEO: `dist/sitemap.xml` y `dist/robots.txt` actualizados con URL canónica `https://www.bmgconsultoresperu.com`.

4. **Deploy FTPS a Producción**:
   ```bash
   python scripts/deploy_ftp.py
   ```
   *Resultado*: Conexión TLS 1.2 a `ftp.bmgconsultoresperu.com` (IP 65.181.111.23, LiteSpeed cPanel). 79 archivos transferidos con éxito.

5. **Comprobación HTTP en Vivo**:
   - URL: `https://www.bmgconsultoresperu.com/contable` -> `HTTP 200 OK`.
   - URL: `https://www.bmgconsultoresperu.com/` -> `HTTP 200 OK`.
