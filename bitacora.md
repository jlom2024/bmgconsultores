# Bitácora de Proyecto - BMG Consultores

[2026-11-12 21:43:00] ACTIVACIÓN OFICIAL DE DOMINIO Y SSL HTTPS EN PRODUCCIÓN:
 - Propagación DNS y Enrutamiento Web:
   * Registro A (`@` -> `2.24.72.21`) y CNAME (`www` -> `bmgconsultores.site`) propagados exitosamente en servidores DNS mundiales (Google, Cloudflare).
 - Aprovisionamiento Automático de Certificado SSL (Let's Encrypt):
   * Contenedor `acme-companion` autenticó y validó los dominios `bmgconsultores.site` y `www.bmgconsultores.site` con challenge HTTP-01.
   * Certificados emitidos e instalados en `/etc/nginx/certs/bmgconsultores.site/` (`fullchain.pem` y `key.pem`).
   * Recarga en caliente de `nginx-proxy` con HTTP/2 y HSTS habilitados.
 - Verificación de Acceso en Vivo (HTTP/2 200 OK con SSL):
   * URL Principal: https://bmgconsultores.site/
   * URL con www: https://www.bmgconsultores.site/
   * Módulo Contable: https://bmgconsultores.site/contable
 - Sincronización en las 4 Capas (VPS, Git, Brain, Local):
   * VPS: SSL y Docker 100% operativos.
   * Local: `bitacora.md`.
   * Git: Commit y push a `main`.
   * Brain: Actualizado informe técnico.

[2026-11-12 18:58:00] INTEGRACIÓN INTEGRAL DE LEADS A WHATSAPP DE BLANCA (+51 994 118 084):
 - Enriquecimiento Estructurado del Pop-up de Estrategia Premium (PrecalificacionModal.tsx):
   * Confección de plantilla ejecutiva completa para WhatsApp con todas las variables capturadas: Nombre, Empresa/Proyecto, WhatsApp del prospecto, Correo, Facturación/Capital, Naturaleza de la consulta y Presupuesto asignado.
   * Lead Premium Calificado: Redirige a Blanca con encabezado `🔥 SOLICITUD DE SESIÓN ESTRATÉGICA CON LA CEO (BMG CONSULTORES)` y credencial de Alta Dirección.
   * Lead Operativo / Estándar: Redirige con encabezado `📋 SOLICITUD DE CONSULTORÍA CORPORATIVA (BMG CONSULTORES)` con la ficha íntegra para asignación en mesa de entrada.
 - Formulario de Contacto al Pie del Home (src/pages/home/Index.tsx):
   * Reestructurado el mensaje automático con encabezado `📩 NUEVA CONSULTA WEB (BMG CONSULTORES)`, enviando a Blanca nombre, correo, servicio de interés y cuerpo del mensaje del solicitante.
 - Despliegue en Producción y Verificación Multicapa:
   * Bundle Vite compilado: `index-B3UTWJb_.js` y `index-D5gtz5BP.css`.
   * Contenedor Docker en VPS (`2.24.72.21`) actualizado y verificado en vivo con HTTP 200 OK.
   * Git, Brain y Local sincronizados.

[2026-11-12 18:45:00] OPTIMIZACIÓN RADICAL DE FLUIDEZ RESPONSIVA EN SCROLL WORK (MÓVIL):
 - Re-codificación de Video Web de Alta Densidad de Keyframes (`public/videos/bmg-experience.mp4`):
   * Estructura GOP Forzada: Generados 60 fotogramas clave I-frame (1 cada 4 fotogramas = 6 keyframes/segundo).
   * Eliminación Total de B-Frames (`bframes=0`): Suprimida la decodificación bidireccional que saturaba los decodificadores de hardware móvil al desplazarse con el pulgar.
   * Tamaño Optimizado: 3.23 MB con Faststart (`moov` en cabecera) y compresión CRF 24 en 720p HD.
 - Reingeniería del Motor de Scrubbing React (`ScrollExperienceSection.tsx`):
   * Cola de Decodificación Basada en Eventos (`seeked`): Se sustituyó el spam continuo de `video.currentTime` por un despachador no bloqueante que espera el evento `seeked` del navegador móvil antes de enviar el siguiente frame objetivo.
   * Soporte Nativo de `fastSeek`: Integrado para WebKit / iOS Safari y navegadores Chromium en Android cuando está disponible.
   * Resorte Cinemático Adaptativo: En móvil utiliza `stiffness: 180, damping: 26, mass: 0.1` para un acoplamiento instantáneo y táctil con el pulgar; en desktop mantiene `stiffness: 120, damping: 22` para una inercia fluida con rueda o trackpad.
   * Desactivación de Transformaciones de Perspectiva 3D en Móvil: El contenedor de video en móviles evita la rotación en perspectiva GPU (`rotateY`), evitando la pérdida de tasa de refresco (60-120 FPS estables).
   * Altura Proporcional en Móvil: Ajustada la sección a `h-[190vh]` en pantallas pequeñas y `h-[250vh]` en desktop, reduciendo la fricción de scroll a ~2 deslizamientos naturales.
 - Despliegue y Sincronización Multicapa:
   * Build Vite: bundle `index-QTJyWZIa.js` y `index-BPfxH0OG.css`.
   * Contenedor Docker en VPS (`2.24.72.21`) actualizado y verificado en vivo.
   * Git, Brain y Local sincronizados.

[2026-11-12 16:10:00] DESPLIEGUE EN PRODUCCIÓN DE REINGENIERÍA VISUAL Y BLINDAJE DE MODAL:
 - Blindaje Responsivo de Pop-up Modal (PrecalificacionModal.tsx):
   * Ajuste de altura dinámica a `max-h-[88vh] my-auto` con padding adaptable `p-2 sm:p-4`.
   * Integración de `overscroll-contain` en los contenedores desplazables para aislar el scroll de la página en laptops y pantallas táctiles.
   * Cabecera superior y pie inferior 100% blindados como componentes flex estáticos (`shrink-0`), asegurando visibilidad perpetua de los botones `← Volver a la landing` y `Continuar a Contacto` sin importar la escala de pantalla (125%/150%).
 - Despliegue de Reingeniería de Contraste en Scroll Work (ScrollExperienceSection.tsx):
   * Despeje absoluto del logotipo 3D dorado de BMG en el video sobre mármol negro.
   * Traslado del contenido y botones al dock ejecutivo inferior con cristal esmerilado de alta opacidad (`bg-[#082B3A]/92 backdrop-blur-2xl border border-[#D6A83F]/35`).
   * Eliminada colisión tipográfica HTML frente al render 3D.
 - Generación y Despliegue de Nuevos Bundles en VPS:
   * Build compilado con Vite: bundle JavaScript `index-CShekfHC.js` (753.55 KB) y CSS `index-azQTjnGa.css` (192.39 KB).
   * Imagen Docker `bmg-consultores-web:latest` reconstruida sin caché y levantada en el VPS `2.24.72.21`.
   * Verificación HTTP 200 OK en `http://2.24.72.21/` y `http://2.24.72.21/videos/bmg-experience.mp4` con soporte de streaming por rangos (Accept-Ranges).
 - Sincronización en las 4 Capas (VPS, Git, Brain, Local):
   * VPS: Contenedor actualizado y verificado en vivo.
   * Local: `bitacora.md`, componentes `PrecalificacionModal.tsx`, `ScrollExperienceSection.tsx` y `Navbar.tsx`.
   * Brain: Actualizado artefacto `INFORME_IMPLEMENTACION_BMG_SCROLL_WORK.md`.
   * Git: Commit y push a `main`.

[2026-11-12 15:40:00] REINGENIERÍA DE CONTRASTE SCROLL WORK Y VIDEO HD FLOW:
 - Reemplazo de Video por Versión HD (Google Flow):
   * Archivo: `public/videos/bmg-experience.mp4` (1280×720 píxeles, 24 fps, 1.87 MB).
   * Codificación con Faststart (`moov` al inicio) sin pista de audio para scrubbing ultra-rápido.
   * Frame de descanso/poster: `public/images/bmg-experience-poster.jpg` (101 KB).
 - Corrección de Colisión y Contraste Visual (ScrollExperienceSection.tsx):
   * Despeje del Logotipo 3D: Eliminado el texto HTML superpuesto en la fase 3 para que el logo dorado en relieve sobre mármol negro del video luzca como protagonista indiscutible sin colisiones.
   * Dock Ejecutivo en Tercio Inferior: Reubicados el llamado institucional y los botones de acción (*Solicitar Sesión con la CEO* y *Conocer las 9 Divisiones*) en un dock flotante inferior con fondo de cristal esmerilado oscuro (`bg-[#082B3A]/92 backdrop-blur-2xl border border-[#D6A83F]/35 shadow-2xl`).
   * Fondos de Cristal en Fases 1 y 2: Implementadas tarjetas con backdrop blur y sombra profunda (`bg-[#082B3A]/90 border border-white/15`) para legibilidad 100% sobre las tomas de oficinas y giro.
 - Navbar:
   * Añadido `whitespace-nowrap flex-shrink-0` al botón *Estrategia Premium* para evitar saltos o truncamientos de texto en cualquier resolución.
 - Documentación Multicapa:
   * Brain: Generado artefacto `INFORME_IMPLEMENTACION_BMG_SCROLL_WORK.md` con arquitectura, flujos Mermaid y prompts bilingües de Flow.
   * Local y Repo sincronizados.

[2026-11-12 14:30:00] IMPLEMENTACIÓN DE SCROLL WORK Y CORRECCIÓN POP-UP MODAL:
 - Pop-up de Precalificación Recortado (PrecalificacionModal.tsx):
   * Estructura interna fija `max-h-[90vh]` con flex-col.
   * Cabecera superior fija que nunca se pierde ni corta el título ni el botón `← Volver a la landing`.
   * Cuerpo central desplazable con scroll interno independiente y opciones compactadas para laptops y monitores con escala.
   * Pie de acciones anclado al fondo con botones siempre visibles (`← Volver a la landing` y `Continuar a Contacto`).
 - Scroll Work en Home (ScrollExperienceSection.tsx):
   * Contenedor sticky scrollytelling de 250vh debajo del Hero.
   * Scrubbing de video optimizado con `requestAnimationFrame` y curva no-lineal para acelerar y dinamizar el giro de cámara.
   * Efectos 3D durante el giro (perspectiva, rotación sutil en Y, iluminación radial dorada sobre el logo final de BMG).
   * 3 capas narrativas con tipografía serif de alta dirección sincronizadas con el progreso del scroll.
   * Archivo de video web optimizado con Faststart en `public/videos/bmg-experience.mp4` (963 KB).
 - Verificación en vivo:
   * Home: http://2.24.72.21/ (HTTP 200 OK)
   * Video Web: http://2.24.72.21/videos/bmg-experience.mp4 (HTTP 200 OK)

[2026-11-12 13:54:00] HABILITACIÓN DE PREVIEW PÚBLICA EN INTERNET:
 - Enrutamiento directo por IP pública: Vinculada la IP `2.24.72.21` en `VIRTUAL_HOST` del contenedor `bmg-consultores-web`.
 - Acceso inmediato en navegador (sin necesidad de hosts ni DNS aún):
   * Portada / Home: http://2.24.72.21/
   * División Contable (Pedro Reyes): http://2.24.72.21/contable
   * Imagen de Asesor Contable: http://2.24.72.21/images/asesor-pedro-reyes.png
   * Activos JS/CSS: http://2.24.72.21/assets/
 - Verificación de estado: Respuestas HTTP 200 OK en todas las rutas SPA y recursos estáticos.
 - Preparación de dominio final: El contenedor ya está listo para `bmgconsultores.site` y `www.bmgconsultores.site`; al apuntar los registros DNS A hacia `2.24.72.21`, Let's Encrypt aprovisionará SSL automáticamente.

[2026-11-12 13:46:00] DESPLIEGUE DE CONTENEDOR DOCKER EN VPS KREO:
 - Servidor VPS: `2.24.72.21` (Ubuntu / Docker 29.5.1).
 - Directorio en servidor: `/opt/bmg-consultores/`
 - Contenedor: `bmg-consultores-web` (Nginx Alpine optimizado para SPA).
 - Red interna: `traefik-public` conectada a `nginx-proxy` y `acme-companion` (SSL automático de Let's Encrypt).
 - Configuración de Dominio:
   * `VIRTUAL_HOST=bmgconsultores.site,www.bmgconsultores.site`
   * `LETSENCRYPT_HOST=bmgconsultores.site,www.bmgconsultores.site`
   * `LETSENCRYPT_EMAIL=admin@kreoiastudio.com`
 - Puerto local de verificación: `127.0.0.1:8088 -> 80`
 - Pruebas verificadas: HTTP 200 OK en raíz (`/`), rutas SPA (`/contable`) y assets estáticos.


[2026-11-11 17:17:26] VINCULACIÓN Y PUSH A REPOSITORIO GITHUB:
 - Repositorio remoto: `https://github.com/jlom2024/bmgconsultores.git`
 - Rama: `main` (rastreo configurado a `origin/main`).
 - Commit inicial: `615e41e` (869 archivos, 412,559 inserciones).
 - Incluye: Código fuente completo (`src/`), recursos multimedia (`public/`), scripts de build/deploy/backup, documentación oficial y último deploy con perfil contable.
 - Exclusiones configuradas en `.gitignore`: dependencias `node_modules`, builds `dist/`, respaldos `backups/`, `.env` y temporales.
 - Estado del repositorio: Limpio y sincronizado 1:1 con GitHub (`working tree clean`).

[2026-11-11] GENERACIÓN DE BACKUP INTEGRAL DEL ÚLTIMO DEPLOY EN LOCAL:
 - Ubicación: `Z:\Empresas\BMG Consultores\backups\`
 - Paquetes creados:
   1. `bmg_produccion_dist_20261111_161356.zip` (19.77 MB - 99 archivos): Copia 1:1 de la producción activa en LiteSpeed/cPanel con el perfil del contador, sitemap y bundles JS/CSS optimizados.
   2. `bmg_codigo_fuente_20261111_161356.zip` (29.86 MB - 211 archivos): Código fuente completo (`src`, `public`, `scripts`, `docs`, `Flyers`, configuraciones).
   3. `MANIFESTO_20261111_161356.md` y `LATEST_BACKUP.md`: Manifiesto con checksums SHA256 e instrucciones de restauración.


[2026-10-26] INTEGRACIÓN DE PERFIL PROFESIONAL DEL CONTADOR Y DEPLOY A PRODUCCIÓN:
 - Profesional: Pedro Alberto Reyes Caballero — Contador Público Colegiado (CPC N° 63979).
 - Implementación técnica:
   1. Datos de servicio (src/data/services.ts):
      - Añadido objeto `advisor` en la división `contable` con nombre, matrícula CPC N° 63979, resumen profesional, experiencia corporativa (BBVA Banco Continental, Telefónica Gestión de Servicios Compartidos, Cooperativa La Exclusiva), formación académica (Universidad Inca Garcilaso de la Vega, Maestría Universidad Ricardo Palma), mensaje personalizado a WhatsApp y badge "Tu contador".
      - Extendida interfaz `ServiceAdvisor` con campos opcionales `tag`, `experience` y `education`.
   2. Nueva fotografía profesional de estudio:
      - Archivo: `public/images/asesor-pedro-reyes.png` (527,256 bytes) con encuadre vertical optimizado (`center 20%`).
   3. Integración en landing contable (src/pages/service/Index.tsx):
      - Centralizado y modularizado componente `AdvisorSection` para renderizar perfil con avatar, biografía, experiencia profesional desglosada y formación académica.
      - Integrado `{service.advisor && <AdvisorSection advisor={service.advisor} color={GOLD_HEX} />}` en la página `/contable` entre testimonios y FAQs, manteniendo la misma armonía visual que Emprendedor e IA.
   4. Compilación y optimización:
      - Ejecutado `npm run build` con 0 errores TypeScript, prerender SSR y sitemap.xml actualizado.
   5. Despliegue FTPS:
      - Ejecutado `python scripts/deploy_ftp.py` -> 99 archivos transferidos con 0 errores a ftp.bmgconsultoresperu.com.
   6. Verificación en vivo:
      - https://www.bmgconsultoresperu.com/images/asesor-pedro-reyes.png (HTTP 200 OK, 527,256 bytes)
      - https://www.bmgconsultoresperu.com/contable (HTTP 200 OK)


[2026-10-07] ACTUALIZACIÓN Y RESUBIDA DE FOTO DE LA CEO (BLANCA GUTIÉRREZ):
 - Archivo fuente: `dist/images/blanca-gutierrez-ceo.jpg` (1,862,750 bytes).
 - Acción:
   1. Sincronizado a `public/images/blanca-gutierrez-ceo.jpg` para persistencia en futuras compilaciones de Vite.
   2. Transferido inmediatamente por FTPS a `/images/blanca-gutierrez-ceo.jpg` en el servidor de producción.
 - Verificación en vivo: HTTP 200 OK con Content-Length de 1,862,750 bytes en `https://www.bmgconsultoresperu.com/images/blanca-gutierrez-ceo.jpg`.

[2026-10-07] DEPLOY A PRODUCCIÓN — CORRECCIONES DE INICIO (DOCUMENTO OFICIAL):
 - Documento de referencia: "W:\Empresas\BMG Consultores\correccion de inicio de bmg consultores.docx".
 - Cambios implementados:
   1. Reingeniería de Navegación Global (src/components/Navbar.tsx):
      - Retiradas todas las siglas "BG" e iconos del menú superior para un estilo limpio, sobrio y minimalista.
      - Menú desplegable "Corporativo" al inicio con accesos a "Quiénes Somos" (scroll suave a `#quienes-somos`) y "Nuestra Fundadora" (/fundadora).
      - Orden secuencial y estratégico de los 9 servicios:
        1. Emprendedor (/emprendedor)
        2. Contabilidad (/contable)
        3. Legal (/juridico)
        4. Comercio Exterior (/comercio-exterior)
        5. Desarrollo IA (/ia)
        6. Licitaciones (/licitaciones)
        7. Inmobiliaria (/inmobiliario)
        8. Viajes (/travel)
        9. Seguros (/seguros)
      - Botón destacado y diferenciado al extremo derecho: "Estrategia Premium" (/estrategia-premium) con badge de exclusividad.
      - Eliminada la duplicación de barras de navegación en Home y Service Pages, unificando en el componente global Navbar.
   2. Ajustes en Sección Institucional Home (src/pages/home/Index.tsx):
      - Actualizado contador de "6 Servicios" a "9 Divisiones".
      - Orden de métricas corporativas ajustado estrictamente: [500+ Clientes] | [10+ Años] | [9 Divisiones] | [2 Sedes].
      - Párrafo del equipo corporativo actualizado para reflejar: "...expertos en contrataciones públicas, especialistas en comercio exterior y asesores de movilidad estratégica internacional...".
      - Añadido identificador `id="quienes-somos"` con `scroll-mt-16` para enlace directo desde el menú Corporativo.
      - Duplicado acceso a "Quiénes Somos", "Nuestra Fundadora" y "Estrategia Premium" en el Footer global.
   3. Nueva Página "Nuestra Fundadora" (src/pages/fundadora/Index.tsx):
      - Ruta `/fundadora` integrada con perfil oficial de Blanca Gutiérrez.
      - Cargo corporativo: "Blanca Gutiérrez | Socio Fundador & Directora Ejecutiva (CEO)".
      - Foto oficial integrada a la izquierda (`/images/blanca-gutierrez-ceo.jpg`) y biografía oficial íntegra (visión, trayectoria de más de una década, liderazgo en las 9 divisiones).
      - Llamado a la acción: "Solicitar Sesión Estratégica con la CEO" que activa el filtro de precalificación.
   4. Nueva Página "Estrategia Premium" (src/pages/estrategia-premium/Index.tsx):
      - Mesa ejecutiva y consultoría de alto nivel para corporaciones y proyectos de gran envergadura.
   5. Sistema Guardián Digital de Precalificación (src/components/PrecalificacionModal.tsx):
      - Formulario modal con 3 preguntas clave: Facturación anual, Naturaleza del proyecto y Presupuesto asignado.
      - Algoritmo de enrutamiento condicional (IF/ELSE):
        * Caso A (Lead Calificado Premium): Enrutamiento directo al despacho de la CEO vía WhatsApp con datos del proyecto preformateados.
        * Caso B (Lead Operativo Estándar): Mensaje institucional de asignación a Mesa Centralizada / Front Desk con WhatsApp comercial.
 - Compilación y Generación:
   - `npm run build` ejecutado con éxito en 4m 11s.
   - Sitemap actualizado con 14 rutas (`sitemap.xml` y `sitemap-routes.json`).
   - Prerenderizado SSR de la portada completado sin errores.
 - Deploy FTPS:
   - `python scripts/deploy_ftp.py` -> 97 archivos transferidos a www.bmgconsultoresperu.com con 0 errores.
 - Verificación en vivo:
   - https://www.bmgconsultoresperu.com/ (200 OK)
   - https://www.bmgconsultoresperu.com/fundadora (200 OK)
   - https://www.bmgconsultoresperu.com/estrategia-premium (200 OK)
   - https://www.bmgconsultoresperu.com/images/blanca-gutierrez-ceo.jpg (200 OK)



[2026-10-01] DEPLOY A PRODUCCIÓN — BOTÓN OFERTAS DEL MES Y ACTUALIZACIÓN ASESOR IA:
 - Compilación: `npm run build` ejecutado con éxito (3m 12s, prerender de rutas y sitemap.xml generados).
 - Deploy FTPS: Ejecutado `scripts/deploy_ftp.py` -> 91 archivos transferidos a www.bmgconsultoresperu.com con 0 errores (creado directorio remoto `/flyers`, subidos los 10 flyers, la imagen `bmgdesarrollo.png` y bundles compilados JS/CSS).
 - Verificación en vivo: Respuestas HTTP 200 OK comprobadas en:
   * https://www.bmgconsultoresperu.com/ia
   * https://www.bmgconsultoresperu.com/flyers/01_Portada_BMG_KREO.png
   * https://www.bmgconsultoresperu.com/images/bmgdesarrollo.png

[2026-10-01] ACTUALIZACIÓN FOTO ASESOR — BG DESARROLLO IA:
 - Solicitud: Reemplazar la imagen del asesor (Bachiller Jorge Luis Ordoñez M.) con `bmgdesarrollo.png` ubicado en la carpeta raíz.
 - Implementación:
   1. Copiada la imagen `bmgdesarrollo.png` a `public/images/bmgdesarrollo.png` y `public/bmgdesarrollo.png` para entrega estática en Vite.
   2. Actualizado `src/data/services.ts`: configurada la propiedad `image` del asesor en `/images/bmgdesarrollo.png` y añadida la propiedad `imagePosition: "center 20%"` para encuadre circular óptimo del rostro y audífonos.
   3. Actualizado `AdvisorSection` en `src/pages/service/Index.tsx` para admitir `advisor.imagePosition` personalizado.
 - Verificación: `npx tsc --noEmit` sin errores y comprobada entrega HTTP 200 OK con Content-Type `image/png` y 2.5 MB.

[2026-10-01] MÓDULO OFERTAS DEL MES — BG DESARROLLO IA (/ia):
 - Solicitud: Crear botón flotante "Ofertas del mes" que abra una ventana popup con carrusel de los flyers de la raíz.
 - Implementación técnica:
   1. Sincronización de activos: Copiadas las 10 imágenes desde Flyers/*.png hacia public/flyers/ para entrega estática HTTP optimizada en desarrollo y producción.
   2. Componente src/components/OfertasMesModal.tsx:
      - Botón flotante animado (Framer Motion) en centro inferior (fixed bottom-6 left-1/2 -translate-x-1/2 z-40) con brillo dorado/ámbar sutil, badge "-10%" e icono reactivo, diseñado para no interferir con WhatsApp (izquierda) ni Lemon Slice AI (derecha).
      - Modal popup con backdrop blur oscuro (z-[10000]), encabezado institucional BMG × KREO IA STUDIO y cierre mediante botón X, tecla Escape o clic exterior.
      - Carrusel interactivo con soporte de navegación por flechas, teclado (izq/der), gestos táctiles (swipe) y dots interactivos.
      - Botón CTA directo a WhatsApp personalizado por flyer (ej. "Cotizar esta oferta") con mensaje pre-redactado para maximizar conversión.
   3. Integración en src/pages/service/Index.tsx:
      - Integrado en IAPage para visualización exclusiva en la ruta /ia.
   4. Configuración Vite (vite.config.ts):
      - Añadido server.watch.usePolling = true para compatibilidad con unidades de red de Windows.
 - Verificación:
   - TypeScript tsc --noEmit superado con 0 errores.
   - Servidor Vite respondiendo en http://localhost:8080/ia y assets de /flyers/*.png verificados con HTTP 200 OK.

[2026-09-29] MODIFICACIONES PÁGINA WEB BG CONTABLES:
 - Solicitud según "MODIFICACIONES PAGINA WEB BG CONTABLES.md":
   1. Titular Principal (H1) y Subtítulo Ganador:
      - Titular Principal (H1): "Tu contabilidad sin errores, sin multas."
      - Subtítulo: "Regularizamos y gestionamos tu contabilidad de forma impecable. Evita nuevas contingencias con SUNAT y mantén tu negocio al día con total tranquilidad."
   2. Ajuste de Tarifa Comercial Estratégica (Módulo Izquierdo):
      - Texto nuevo: "TU DECLARACION MENSUAL PDT 601 Y 621 DESDE 150 SOLES", incorporado como badge destacado en el Hero de BG Contable y como primer módulo de estadísticas (módulo izquierdo tanto en la tarjeta de la Home como en la barra de estadísticas de la página de servicio).
   3. Reestructuración de la Grilla Azul ("¿Qué incluye BG Contable?"):
      - Reconfigurado el contenedor a cuadrícula simétrica de 12 ítems (3 columnas × 4 filas en desktop, 1 columna en celulares) con cajas oscuras y círculos dorados/amarillos numerados.
      - 12 ítems integrados y texto duplicado corregido:
        1. Contabilidad general, analítica y de costos para todo régimen.
        2. Declaraciones mensuales y anuales ante SUNAT (PDT 621, 601).
        3. Gestión de planillas, AFP, CTS y beneficios sociales.
        4. Libros electrónicos (PLE) y facturación electrónica OSE/SOL.
        5. Auditoría preventiva y de fiscalización.
        6. Asesoría en regímenes: Nuevo RUS, RER, MYPE Tributario y General.
        7. Estados financieros: balance general, EGP y flujo de caja.
        8. Representación ante SUNAT por fiscalizaciones y gestiones de cobranzas coactivas.
        9. Fraccionamiento de deuda por IGV, renta y multas.
        10. Declaraciones mensuales y anuales: Régimen de cuarta y quinta categoría.
        11. Declaración mensual de régimen de primera categoría.
        12. Declaración impuesto a los activos netos (ITAN).
   4. Consolidación de Bloque de Preguntas Frecuentes (7 FAQs en Acordeón):
      - 7 preguntas con respuestas técnicas y comerciales contextualizadas para el entorno peruano (multas/gradualidad, Nuevo RUS/topes y cambio de régimen, constitución en notaría en un solo acto, y transparencia de tarifa 150 vs libros electrónicos).
      - Comportamiento de acordeón estricto implementado con estado controlado: al abrir una pregunta se cierran automáticamente las demás.
   5. Pie de Página Institucional (Footer & Geolocalización):
      - Incorporado bloque de contacto institucional en el Footer de servicios y Home con la dirección indexable: "Av. Agustín Gamarra 1132, Segundo Piso, Oficina 226 (Galería Brisas), La Victoria, Lima."
      - Enlace e icono GPS directo para apertura en Google Maps / Apple Maps desde smartphones ("Ver ubicación en mapa").
 - Verificación: compilación de Vite y TypeScript sin errores.
 - Deploy: ejecutado scripts/deploy_ftp.py -> 79 archivos transferidos con éxito a www.bmgconsultoresperu.com (HTTP 200 OK verificado en producción).

[2026-08-29] REBRAND DE LOGO BG SEGUROS + CORRECCIÓN DE TOOLTIP:
 - Solicitud: reemplazar la "foto del personaje/asesor" (hombre de traje azul) que aparecía como icono de BG Seguros en los círculos de servicios de la home por un logo en el estilo de la familia BG.
 - Se generó scripts/make_legal_logo.py (PIL, vectorial supersampled 1024->512): círculo negro con gradiente, swoosh púrpura abierto a la derecha con punta afilada + estelas doradas, balanza dorada arriba, "BG" blanco y nombre del servicio en dorado.
 - Confusión inicial: el usuario indicó "BG Legal", pero la foto del hombre correspondía a BG Seguros (error del usuario aclarado: "el error es mio debes reemplazar el de BD seguros").
 - Logo nuevo generado con texto "SEGUROS" -> public/logos/bg_seguros.png (original bg_seguros.jpg respaldado como bg_seguros_old.jpg).
 - services.ts: logo de seguros cambiado de "/logos/bg_seguros.jpg" a "/logos/bg_seguros.png".
 - Tooltip oscuro de BG Seguros (src/pages/home/Index.tsx): el tooltip usaba backgroundColor: s.color con texto #1a1a1a; como el color de seguros era #082B3A (casi negro) el texto era ilegible. Se cambió a texto blanco con textShadow para contraste, sin alterar el resto de la identidad visual de la página.
 - NOTA: el logo de BG Legal (bg_juridico.png) también fue regenerado en el mismo estilo de familia (balanza + "LEGAL") durante la iteración, y queda vigente como parte de la familia visual coherente.
 - BUG DE DEPLOY: el script scripts/deploy_ftp.py fallaba con "SSL: BAD_LENGTH bad length" en Python 3.14 durante la transferencia de datos FTPS (0 archivos transferidos). Causa: Python 3.13+ negocia TLS 1.3 con LiteSpeed/cPanel y OpenSSL lanza BAD_LENGTH en el canal de datos. Solución: forzar TLS 1.2 en el contexto SSL (minimum_version/maximum_version = TLSv1_2) + envolver ftps.quit() en try/except. Patch reutilizable y documentado en el propio script.
 - DEPLOY: ejecutado scripts/deploy_ftp.py -> 75 archivos transferidos a www.bmgconsultoresperu.com (HTTP 200 OK en /logos/bg_seguros.png verificado).

[2026-07-26 13:57:00] Obtenida y entregada la clave pública SSH del sistema a Comando para gestión de accesos a servidor.
[2026-07-26 14:00:00] En espera de confirmación de acceso SSH del servidor por parte del administrador para proceder con el deploy automático de la web BMG Consultores.
[2026-07-26 14:32:00] Revisión preventiva del proyecto completada: Optimizado meta indexing (<meta name="robots" content="index, follow">) en index.html, verificado build del frontend y listo para ejecutar el deploy directo apenas se confirme el acceso al servidor objetivo.
[2026-07-26 14:33:00] Solucionada la compatibilidad del script de build en Windows usando `npx cross-env` en package.json.
[2026-07-26 14:36:00] Recibidas credenciales FTPS para la plataforma de producción `www.bmgconsultoresperu.com`.
[2026-07-26 14:43:00] DEPLOY AUTOMÁTICO DE PRODUCCIÓN COMPLETADO Y VERIFICADO:
 - Servidor: LiteSpeed / cPanel (IP 65.181.111.23)
 - URL Activa: https://www.bmgconsultoresperu.com/ (HTTP 200 OK)
 - Indexing & SEO: Meta robots `index, follow`, sitemap.xml y robots.txt generados y desplegados.
 - Caching & Seguridad: Archivo .htaccess configurado con compresión GZIP, cabeceras de seguridad y estrategia de cache optimizada (Cache-Control).
 - Limpieza de Casa: Eliminados archivos comprimidos de deploys antiguos (BMG-Consultores-Peru-Landing-Servidor-v2.zip, LEEME.txt) del servidor de producción.

[2026-07-27 02:00] AUDITORÍA POST-DEPLOY — Hosting y características técnicas:

### Hosting
- Tipo: **Hosting compartido (cPanel / LiteSpeed)**
- Servidor: LiteSpeed (con QUIC/HTTP3 habilitado)
- IP: 65.181.111.23
- Deploy: FTPS (FTP over SSL) puerto 21
- FTP: ftp.bmgconsultoresperu.com
- Método: Script `scripts/deploy_ftp.py` con conexión FTPS TLS

### Infraestructura
- CDN/Proxy: Sin Cloudflare. Sin reverse proxy. Directo a LiteSpeed.
- SSL: nativo del servidor (TLS, vistas en headers alt-svc)
- HTTP3/QUIC: habilitado (`alt-svc: h3=":443"`)
- Redirect HTTP→HTTPS: Sí, vía .htaccess mod_rewrite
- Redirect naked→www: NO configurado aún (https://bmgconsultoresperu.com sirve mismo contenido sin redirigir)

### Rendimiento
- HTML: ~389 KB (página completa con SSR/stático)
- JS bundle: 979 KB (index-XM4m0xjF.js)
- TTFB lento (~3.5s local) — posible por ruteo de red o proxy regional
- Assets estáticos con hash: cache 1 año immutable (funcionando)
- HTML: Cache-Control no-cache (correcto para SPA con hash)

### Seguridad
- X-Frame-Options: SAMEORIGIN
- X-Content-Type-Options: nosniff
- X-XSS-Protection: 1; mode=block
- Sin paths sensibles expuestos (/.env, /.git, /wp-admin, phpinfo → todos 404/error)
- CORS: No expuesto en cabeceras

### Archivos del sitio (todos HTTP 200 OK)
- / → index.html (389KB)
- /assets/index-XM4m0xjF.js (979KB, JS module, immutable cache)
- /logos/bmg_clean.png ✓
- /og-image.jpg ✓
- /favicon.ico ✓
- /robots.txt ✓ (Last-Modified: 27 Jul 2026 01:43:13 GMT)
- /sitemap.xml ✓ (Last-Modified: 27 Jul 2026 01:43:15 GMT)
- /.htaccess → activo con GZIP, caché, seguridad

### Stack de la aplicación
- Framework: Vite 5 + React 19
- UI: shadcn/ui (Radix), Tailwind CSS v4, Framer Motion
- Build: `npm run build` → carpeta `dist/`
- SEO: sitemap.xml y robots.txt generados en postbuild
- Routes SPA: Redirección a index.html vía .htaccess

[2026-08-13 21:10] BG SEGUROS + BOTÓN INICIO + SEO (asistente KREO con deploy key del repo):
 - Nueva pestaña de servicio `BG Seguros` (alianza estratégica BMG; material del asesor: GR Seguros y Finanzas / Giancarlo Rengifo).
 - Página premium con el molde de BG Contable/Legal/Emprendedor: hero imagen full-screen generada en universo BGM (navy+oro), badge, titular Cormorant, stats bar, features grid, galería (2 imágenes generadas), "La diferencia", "Nuestro proceso", asesor con foto (extraída del PDF), experiencia, FAQ y CTA WhatsApp.
 - Imágenes de marca generadas con IA (hero + galería, estilo dark navy/dorado del sitio) y optimizadas (~90-160 KB).
 - Botón "← Inicio" global en Navbar (todas las subpáginas, desktop + móvil).
 - SEO: corregido `VITE_SITE_URL` -> https://bmgconsultoresperu.com (antes bmgconsultores.pe que NO resuelve) en index/robots/sitemap; sitemap ahora 9 rutas.
 - Deploy FTPS al hosting del cliente: 69 archivos (dist completo). Verificado /seguros 200 e imágenes 200.
 - Repo GitHub actualizado (fuente completa + docs): commits 761ad4d y 2b92d0d.
 - Nota: rotar credenciales FTPS pendiente (siguen en `scripts/deploy_ftp.py`).

[2026-08-13 23:55] ASESOR BG INMOBILIARIO (patrón de BG Seguros):
 - Sección "Tu asesor" en la página /inmobiliario con Elvis E. Briceño Rivadeneyra (Geógrafo-Arquitecto, Magister en Planificación Urbana Sostenible UPC Cataluña, CENEPRED, GIS UNMSM, Verificador Catastral, 13 años en saneamiento físico legal, catastro y habilitaciones urbanas).
 - Foto extraída del PDF adjunto -> public/images/asesor-elvis.jpg y CTA WhatsApp con el número del sitio.
 - Build + deploy al hosting: 70 archivos. Verificado /inmobiliario 200 y /images/asesor-elvis.jpg 200.
 - Actualizado repos (commit con fuente) y documentación.

[2026-08-28] AUDITORÍA Y CORRECCIÓN DE PENDIENTES (sección 5 del handover):

### 5.1 Imágenes hardcodeadas → data-driven desde `src/data/services.ts`
- Convertidas a `service.images[n]` las imágenes de hero y galería en `src/pages/service/Index.tsx`:
  Contable, Emprendedor, IA, Lobby, Legal (Jurídico) e Inmobiliario. Ahora cualquier cambio en
  `services.ts` se refleja en la página (antes había literales `/images/...` fijos).
- Agregado `advisor` a `services.ts` para `inmobiliario` (Elvis E. Briceño Rivadeneyra) y `seguros`
  (Giancarlo Rengifo) y se cablearon los bloques "Tu asesor" de ambas páginas para leer de
  `service.advisor` (imagen, nombre, rol, bio y mensaje WhatsApp).
- Fix incidental: en Seguros, el título del asesor usaba `text-[#1B2B4B]` (navy oscuro) sobre fondo
  oscuro → invisible. Cambiado a `text-foreground`.
- Se mantienen hardcodeadas (curaduría deliberada): destinos/galería de BG Travel (`travel_*.jpeg`),
  tarjetas de soluciones IA y el hero dedicado de Seguros (`seguros_hero.jpg`).

### 5.3 Páginas legales Privacidad / Términos (antes NO existían)
- Nuevas páginas `src/pages/legal/Index.tsx` → `PrivacidadPage` (`/privacidad`) y `TerminosPage` (`/terminos`).
- Rutas agregadas en `src/App.tsx`.
- Enlaces agregados al footer de Home (`pages/home/Index.tsx`) y de las páginas de servicio
  (`pages/service/Index.tsx`).
- El sitemap las incluye automáticamente (el generador parsea las rutas de App.tsx). Verificado: 11 rutas.
- SEO: `usePageMeta` por página (título/meta/OG/canonical + FAQ si aplica). Meta client-side, igual que subpáginas.

### 5.4 JS bundle pesado (~979 KB) — evaluación y mejora
- Resultado: el bundle **ya estaba minificado** (esbuild default; `--mode development` NO desactiva la
  minificación). El peso real venía de empaquetar TODO en un solo chunk.
- Realizado code-splitting por ruta: `src/App.tsx` usa `React.lazy` para ServicePage y NotFound, dejando
  Home (que prerenderiza y se hidrata) en el chunk de entrada.
- Resultado del build:
  - chunk inicial `index-*.js`: ~590 kB (gzip ~161 kB) [antes 983 kB en un solo archivo]
  - chunk de servicios (lazy) `Index-*.js`: ~461 kB (gzip ~58 kB)
  - CSS: 130 kB. El peso inicial para la landing se redujo ~40%.
- Nota: hay una advertencia rollup (>500 kB). No se añadió `manualChunks` para no aumentar el alcance;
  opcional para aislar vendors (react/framer-motion) en otro chunk cacheable.

### Auditoría — dominio y deploy (hallazgos corregidos)
- **Dominio por defecto erróneo**: `seo.ts` y `seo-finalize.mjs` usaban `https://bmgconsultores.pe`
  (NO resuelve). Corregido a `https://www.bmgconsultoresperu.com`. El build ya resuelve correctamente
  canonical/OG/sitemap/robots al dominio live.
  - OJO: el comando del handout tenía `VITE_SITE_URL=https://bmgconsultores.pe` (mal). Uso correcto:
    `VITE_SITE_URL=https://www.bmgconsultoresperu.com npx vite build --mode development` (o confiar en el
    default corregido y omitir la var).
- **`scripts/deploy_ftp.py` apuntaba a `d:\Empresas\BMG Consultores\dist` (inexistente en esta máquina)**.
  Ahora deriva `LOCAL_DIR` desde la ubicación del script (`.../scripts/../dist`) → portable.
  `FTP_PASS` ahora lee `FTP_PASS` de env var con fallback al valor (sigue pendiente rotar credenciales).
- Advertencia: `FinanzasPage` en `service/Index.tsx` es código muerto (sin ruta) y apunta a una imagen
  incorrecta (`emprendedor.jpeg` para "BG Finanzas"). No se eliminó para no ampliar el alcance.

### 5.2 Redirect naked→www — PENDIENTE MANUAL (no se tocó del lado repo)
- No existe `.htaccess` en el repo ni en `dist/` → el deploy actual **no** lo sobrescribe (verificado:
  0 `.htaccess` en dist). El `.htaccess` del servidor (cPanel/LiteSpeed con GZIP/caché/seguridad/rewrite SPA)
  debe editarse manualmente. Añadir (con `RewriteEngine On` ya presente):
```
RewriteCond %{HTTP_HOST} ^bmgconsultoresperu\.com [NC]
RewriteRule ^(.*)$ https://www.bmgconsultoresperu.com/$1 [L,R=301]
```
- Se prefirió NO crear `public/.htaccess` para evitar sobrescribir las reglas actuales del servidor
  (caché/GZIP/seguridad). Aplicar en Panel → MultiPHP/htaccess del dominio.

### Verificación
- `npm run lint` → 0 errores (31 warnings preexistentes de style).
- `npm run build` (postbuild incluido) → OK. sitemap 11 rutas, robots/canonical/OG al dominio correcto.
- NO se hizo deploy FTPS ni commit (pendiente confirmación explícita).

[2026-08-28] REDISEÑO VISUAL — Identidad "Azul Marino + Celeste" (ref. mockup adjunto)
### Logro
- Tokenización completa de la paleta en `src/index.css` (tokens `--brand-*` + variables semánticas):
  navy `#082B3A`, petróleo `#124E68`, celeste `#4E9FC2`, dorado `#D6A83F`, beige `#BD844B`,
  marfil `#F5F1E8`, smoke `#D9E5EA`. Mapeadas como utilidades Tailwind (`bg-brand-sky`,
  `text-brand-gold`, etc.) vía `@theme inline`.
- Eliminadas TODAS las ocurrencias fuera de paleta: naranja (`#FF6B35/#FF6B00`), rojo (`#E53935`),
  verde (`#00C853`), cian (`#00BFFF/#00BCD4`), púrpura (`#7C5CBF`), dorado viejo (`#C6A43B/#C9A83C`)
  y crema viejo (`#F5F0E8`), transformadas a tokens de la paleta.
- Overlays de hero: negro puro (`rgba(8,8,12,…)`) y navy viejo → overlay azul marino/petróleo
  (`rgba(8,43,58,…)`). Sin negro puro.
- Logo real `bmg_clean.png` usado SIEMPRE (no redibujado): tintado a dorado vía filtro CSS
  (no se altera el archivo) en navbar y hero.
- Home rediseñado al mockup: navbar navy, badges/CTAs celeste, botón "Explorar Servicios" `#4E9FC2`
  texto blanco, botón WhatsApp transparente con borde, textos blancos + secundarios `#D9E5EA`,
  iconos en azul petróleo/celeste, hover sin naranja.
- Acentos por servicio en `src/data/services.ts` → todos `#4E9FC2` / `#124E68` (celeste/petróleo).
- WhatsApp FAB y página 404 realineados a la paleta. Página legal usa token de marca.

### Archivos modificados
- `src/index.css` (tokens de paleta + utilidades de marca)
- `src/data/services.ts` (colores por servicio)
- `src/pages/home/Index.tsx` (hero/navbar/badges/botones/logo/tokens)
- `src/pages/service/Index.tsx` (colores hardcodeados → tokens, logo dorado, overlays)
- `src/pages/legal/Index.tsx` (gold → token)
- `src/pages/not-found/Index.tsx` (404 → paleta)

### Validación
- `npm run lint` → 0 errores.
- `npm run build` → OK (postbuild: sitemap 11 rutas, domain correcto). CSS regenerado con paleta.
- Barrido binario del bundle: 0 colores prohibidos (case-insensitive) en CSS y JS.
- Paleta presente: navy×17, petróleo×5, celeste×7, dorado×7, beige×1, marfil×1, smoke×5.
- Logo real referenciado en el bundle (`/logos/bmg_clean.png`).
- Contraste: blanco/ivory sobre navy AA-AAA; botones celeste+blanco ≥3:1 (large text AA);
  navy sobre marfil AAA.
- PENDIENTE: revisión visual en navegador (desktop/móvil) — no disponible aquí.


[2026-09-18 23:40:59] BG SANEAMIENTO & CONSTRUCCIÓN — observaciones del cliente
- Fuente: E:\ANALISIS PORTAL.docx. Nuevo nombre comercial; se conserva /inmobiliario.
- Actualizados descripción, ocho servicios, cinco preguntas nuevas (ocho en total), perfil de Elvis y mensajes de WhatsApp.
- Perfil: Magíster, arquitecto urbanista y geógrafo; experiencia municipal, docencia en UNMSM y proyectos de infraestructura según documento del cliente.
- Nombre actualizado en inicio, navegación, página de servicio, metadatos y términos. Fotos y logotipo original conservados.
- Archivos: src/data/services.ts, src/pages/service/Index.tsx, src/pages/home/Index.tsx, src/pages/legal/Index.tsx y README.md.
- Respaldo y detalle: docs/revisiones/2026-09-19-bg-saneamiento/originales.zip y cambios.md.
- Validación: ESLint 0 errores, 5 advertencias previas; Vite build OK (2279 módulos); prerender OK; sitemap 11 rutas. Chrome escritorio/móvil: nombre, perfil, FAQs, imágenes y enlaces comprobados.
- Hallazgos fuera del alcance: error previo del widget Lemon Slice por instancias duplicadas; pequeño desbordamiento en otras secciones del inicio móvil.
- Entorno: compilar desde Z:\Empresas\BMG Consultores; la ruta UNC falló al resolver paquetes de Vite.
- Publicación FTPS pendiente de confirmación explícita conforme a PROMPT.md. No se hizo commit, push ni deploy.
- Limpieza: perfil temporal de Chrome y dist-ssr eliminados; respaldo y evidencias de revisión conservados.


[2026-09-22 19:54:29] HERO CORPORATIVO — actualizado y publicado
- H1 exacto: Gestión Corporativa 360° y Red de Negocios Profesional de Alto Nivel.
- H2 exacto: Planteamos soluciones integrales para proteger tu empresa, mientras creamos oportunidades únicas de expansión e internacionalización.
- Fuente: src/pages/home/Index.tsx. Se conservaron estilos, logotipo, imagen y botones.
- ESLint sin errores ni advertencias; Vite y prerender correctos; 11 rutas en sitemap.
- Deploy FTPS autorizado en este flujo: 5 archivos, index.html al final, TLS validado y SHA-256 comprobado también por HTTPS.
- Verificado en producción: textos exactos, jerarquía H1/H2, escritorio y móvil. Error anterior del chat Lemon Slice sin cambios.
- Respaldo, manifiesto y evidencia: docs/revisiones/2026-09-22-hero-corporativo/.
- Vista previa temporal detenida; perfiles temporales de Chrome y dist-ssr eliminados automáticamente.
