# 📋 DOCUMENTACIÓN TÉCNICA Y DE ENTREGA — MODIFICACIONES BG CONTABLE

- **Proyecto**: BMG Consultores Perú
- **Servicio Afectado**: BG Contable (`/contable`) y Landing Home (`/`)
- **Fecha de Ejecución**: 2026-09-29
- **Estado**: ✅ **Completado, verificado y desplegado en Producción**
- **URL en Producción**: [https://www.bmgconsultoresperu.com/contable](https://www.bmgconsultoresperu.com/contable)

---

## 🎯 Detalle de Implementación Punto por Punto

### ✅ Punto N° 1 — Titular Principal (H1) y Subtítulo Ganador
- **Titular Principal (H1)**:
  - *Texto*: `"Tu contabilidad sin errores, sin multas."`
  - *Estilo*: Tipografía de alta legibilidad (*Cormorant Garamond* serif), con el tramo `sin errores,` resaltado en tono dorado corporativo (`var(--brand-gold)`), drop-shadow elegante y jerarquía semántica `<h1>`.
- **Texto Corto Ganador (Subtítulo)**:
  - *Texto*:
    > `"Regularizamos y gestionamos tu contabilidad de forma impecable. Evita nuevas contingencias con SUNAT y mantén tu negocio al día con total tranquilidad."`
  - Reemplazó por completo la frase anterior *"Contadores certificados que mantienen tu empresa al día con SUNAT y te dan claridad financiera real."*
- **Ubicación en código**:
  - [src/pages/service/Index.tsx](file:///z:/Empresas/BMG%20Consultores/src/pages/service/Index.tsx#L800-L815)
  - [src/data/services.ts](file:///z:/Empresas/BMG%20Consultores/src/data/services.ts#L140-L146)

---

### ✅ Punto N° 2 — Ajuste de Tarifa Comercial Estratégica (Módulo Izquierdo)
- **Texto Requerido**: `"TU DECLARACION MENSUAL PDT 601 Y 621 DESDE 150 SOLES"`.
- **Implementación**:
  1. **Badge destacado en el Hero**:
     - Se añadió una pastilla visual interactiva con punto dorado pulsante sobre el CTA principal:
       ```tsx
       <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border mb-8 text-xs sm:text-sm font-semibold tracking-wide"
            style={{ borderColor: `${GOLD_HEX}60`, background: "rgba(214,168,63,0.12)", color: "#FFFFFF" }}>
         <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: GOLD_HEX }} />
         <span>TU DECLARACION MENSUAL PDT 601 Y 621 DESDE 150 SOLES</span>
       </div>
       ```
  2. **Primer módulo de estadísticas (módulo izquierdo)**:
     - Configurado como elemento `0` en el arreglo `stats`:
       ```typescript
       { value: "Desde S/ 150", label: "Tu declaración mensual PDT 601 y 621" }
       ```
     - En el Hero de `/contable` se muestra en el módulo de la izquierda de la barra de estadísticas.
     - En la Home (`/`), en la sección de servicios donde se renderiza `service.stats.slice(0, 2)`, el bloque de la izquierda muestra inmediatamente la tarifa de 150 soles con su etiqueta correspondiente.

---

### ✅ Punto N° 3 — Reestructuración de la Grilla Azul ("¿Qué incluye BG Contable?")
- **Estructura CSS Grid simétrica**:
  - **Desktop (Computadoras)**: `grid-cols-1 lg:grid-cols-3 gap-4` -> 3 columnas × 4 filas = **12 ítems simétricos**.
  - **Mobile (Celulares)**: `grid-cols-1` -> 1 sola columna vertical con espaciado optimizado.
- **Línea Gráfica**:
  - Cajas oscuras con borde dorado transparente (`background: rgba(10, 47, 63, 0.45)` y `borderColor: rgba(214,168,63,0.30)`).
  - Círculos amarillos/dorados: `w-8 h-8 rounded-full` con fondo dorado brillante, número centrado en negro en negrita (`font-bold`).
  - Efecto interactivo `hover:scale-[1.02] hover:shadow-lg` y transición suave.
- **Contenido de los 12 módulos**:
  1. *Contabilidad general, analítica y de costos para todo régimen.*
  2. *Declaraciones mensuales y anuales ante SUNAT (PDT 621, 601).* *(eliminada la duplicación del 621).*
  3. *Gestión de planillas, AFP, CTS y beneficios sociales.*
  4. *Libros electrónicos (PLE) y facturación electrónica OSE/SOL.*
  5. *Auditoría preventiva y de fiscalización.*
  6. *Asesoría en regímenes: Nuevo RUS, RER, MYPE Tributario y General.*
  7. *Estados financieros: balance general, EGP y flujo de caja.*
  8. *Representación ante SUNAT por fiscalizaciones y gestiones de cobranzas coactivas.* *(agregada la palabra "gestiones").*
  9. *Fraccionamiento de deuda por IGV, renta y multas.* *(Nuevo módulo).*
  10. *Declaraciones mensuales y anuales: Régimen de cuarta y quinta categoría.* *(Nuevo módulo).*
  11. *Declaración mensual de régimen de primera categoría.* *(Nuevo módulo).*
  12. *Declaración impuesto a los activos netos (ITAN).* *(Nuevo módulo).*
- **Ubicación en código**:
  - [src/pages/service/Index.tsx](file:///z:/Empresas/BMG%20Consultores/src/pages/service/Index.tsx#L850-L875)
  - [src/data/services.ts](file:///z:/Empresas/BMG%20Consultores/src/data/services.ts#L147-L162)

---

### ✅ Punto N° 4 — Consolidación de 7 Preguntas Frecuentes (Acordeón Estricto)
- **Preguntas y Respuestas Contextualizadas para Perú**:
  1. **¿Qué documentos necesito entregar para que lleven mi contabilidad?**
     - *R*: Comprobantes de venta, compra, extractos bancarios y planilla; soporte en formato físico o digital.
  2. **¿Pueden hacer mi declaración anual del Impuesto a la Renta?**
     - *R*: Preparación y presentación de DJ Anual para personas naturales y jurídicas, optimización y deducciones legales aplicables.
  3. **¿Atienden empresas en todo el Perú o solo en Lima?**
     - *R*: Cobertura a nivel nacional vía plataforma digital segura y atención presencial para clientes en Lima.
  4. **¿Qué pasa si me olvidé de declarar mi PDT este mes?** *(Nueva)*
     - *R*: Tipificación según Art. 176 num. 1 del Código Tributario; regularización inmediata voluntaria aplicando el Régimen de Gradualidad con rebajas de hasta 90% a 100% de la multa según régimen, evitando cobranza coactiva.
  5. **Estoy en el Nuevo RUS, ¿ustedes me pueden llevar la contabilidad?** *(Nueva)*
     - *R*: Control estricto de topes de ingresos (S/ 8,000 mes o S/ 96,000 año) para evitar reclasificación de oficio a General; asesoría para migrar a RER o MYPE Tributario cuando el negocio requiera facturar a empresas.
  6. **¿Qué documentos necesito para que constituyan mi empresa en un solo acto?** *(Nueva)*
     - *R*: DNI de socios, 3 a 5 opciones de nombres para reserva SUNARP, objeto social y capital; gestión de minuta, firma notarial y registro en un solo acto con entrega de RUC y Clave SOL activa.
  7. **¿Mi tarifa de "tu PDT desde 150" incluye los libros electrónicos?** *(Nueva)*
     - *R*: Aclaración transparente de que la tarifa base cubre la declaración mensual PDT 621 y PDT 601 PLAME para microempresas sin contingencias complejas; libros electrónicos (PLE/SIRE) o mayores volúmenes cuentan con cotización transparente a medida.
- **Comportamiento en celulares y computadoras**:
  - Acordeón estricto controlado con estado React `openFaqIndex`:
    ```tsx
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
    ```
  - Al pulsar una pregunta, **se cierran automáticamente todas las demás**.
- **Ubicación en código**:
  - [src/pages/service/Index.tsx](file:///z:/Empresas/BMG%20Consultores/src/pages/service/Index.tsx#L988-L1030)
  - [src/data/services.ts](file:///z:/Empresas/BMG%20Consultores/src/data/services.ts#L170-L215)

---

### ✅ Bloque 5 — Pie de Página Institucional (Footer & Geolocalización)
- **Elemento Web**: Bloque de contacto institucional ubicado en la parte superior del Footer (tanto en la página de servicios como en la página principal Home).
- **Texto Indexable**:
  > *Av. Agustín Gamarra 1132, Segundo Piso, Oficina 226 (Galería Brisas), La Victoria, Lima.*
- **Enlace y Comportamiento GPS Móvil**:
  - Enlace estructurado: `https://maps.google.com/?q=Av.+Agust%C3%ADn+Gamarra+1132%2C+Segundo+Piso%2C+Oficina+226%2C+Galer%C3%ADa+Brisas%2C+La+Victoria%2C+Lima`
  - Botón: `<a ...><MapPin size={16} /> Ver ubicación en mapa</a>`
  - **Comportamiento Celular**: Al presionar la dirección o el botón en un smartphone Android o iOS, el sistema operativo lanza directamente la app de mapas nativa (Google Maps / Apple Maps) con las coordenadas fijadas para navegación directa.
- **Ubicación en código**:
  - [src/pages/service/Index.tsx](file:///z:/Empresas/BMG%20Consultores/src/pages/service/Index.tsx#L1804-L1855)
  - [src/pages/home/Index.tsx](file:///z:/Empresas/BMG%20Consultores/src/pages/home/Index.tsx#L680-L790)

---

## 🛠️ Archivos del Proyecto Modificados

1. [src/data/services.ts](file:///z:/Empresas/BMG%20Consultores/src/data/services.ts):
   - Definición del servicio `contable` con el nuevo tagline, descripción ganadora, 12 ítems de features, estadísticas con la tarifa destacada en la primera posición y las 7 FAQs completas.
2. [src/pages/service/Index.tsx](file:///z:/Empresas/BMG%20Consultores/src/pages/service/Index.tsx):
   - Importación de `MapPin` desde `lucide-react`.
   - Modificación del Hero de `ContablePage` (H1, párrafo comercial y badge de tarifa).
   - Reestructuración de la cuadrícula de características a 3 columnas en desktop y 1 en mobile con cajas oscuras y círculos amarillos.
   - Implementación del acordeón estricto en la sección de FAQs.
   - Inclusión del bloque institucional de geolocalización en el componente `Footer`.
3. [src/pages/home/Index.tsx](file:///z:/Empresas/BMG%20Consultores/src/pages/home/Index.tsx):
   - Actualización del bloque de contacto inferior con la dirección de Gamarra y enlace GPS.
   - Inclusión del bloque institucional de geolocalización en el `Footer` de la Home.
4. [bitacora.md](file:///z:/Empresas/BMG%20Consultores/bitacora.md):
   - Registro cronológico del cambio, pruebas de compilación y confirmación de deploy.
5. [docs/revisiones/2026-09-29-bg-contable/cambios.md](file:///z:/Empresas/BMG%20Consultores/docs/revisiones/2026-09-29-bg-contable/cambios.md):
   - Documento histórico de la revisión en la carpeta de documentación interna.

---

## 🚀 Verificación y Despliegue

| Fase | Comando | Resultado |
|---|---|---|
| **Tipado TypeScript** | `node ./node_modules/typescript/bin/tsc --noEmit` | ✅ 0 errores |
| **Compilación Vite** | `node ./node_modules/vite/bin/vite.js build --mode development` | ✅ Exitoso (2279 módulos) |
| **Postbuild SEO** | `node scripts/postbuild.mjs` | ✅ Sitemap 11 rutas, SSR prerender |
| **Despliegue FTPS** | `python scripts/deploy_ftp.py` | ✅ 79 archivos subidos sin errores |
| **Comprobación Live** | `curl` / HTTP GET a `bmgconsultoresperu.com/contable` | ✅ HTTP 200 OK |
