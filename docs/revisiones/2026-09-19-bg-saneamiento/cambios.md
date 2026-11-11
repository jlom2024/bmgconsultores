# Actualización de BG Saneamiento & Construcción

Fuente: `E:\ANALISIS PORTAL.docx`, solicitud del cliente recibida el 18 de septiembre de 2026.

## Cambios aplicados

- Nombre comercial: **BG Saneamiento & Construcción**, conservando la ruta `/inmobiliario`.
- Descripción: servicios de saneamiento, construcción e inmobiliarios, compra y venta de bienes, con asesoramiento técnico, legal y financiero.
- Se reemplazaron los ocho servicios por los ocho solicitados en el documento, en el mismo orden.
- Se añadieron cinco preguntas frecuentes antes de las tres existentes. Las respuestas nuevas son orientativas: no fijan costos, plazos ni resultados de titulación.
- Perfil de Elvis E. Briceño Rivadeneyra: Magíster, arquitecto urbanista y geógrafo, en ese orden. Se incorporaron su experiencia como gerente de Desarrollo Urbano y funcionario de alto nivel, su docencia en la Universidad Nacional Mayor de San Marcos y su participación actual en proyectos de infraestructura de alto impacto, conforme a la información suministrada por el cliente.
- Nombre coherente en tarjetas y secciones del inicio, página del servicio, metadatos derivados, mensajes de WhatsApp y mención en términos del sitio.
- Ajustes de espacio y cuadrículas para acomodar el nombre y los textos en pantallas pequeñas.

## Elementos conservados

- Ruta pública `/inmobiliario`, teléfono de contacto, fotografía del asesor y fotografías de propiedades.
- Archivo del logotipo original `/logos/bg_inmobiliario.png`. El cliente no aportó un logotipo actualizado; el cambio realizado es de nombre y contenido textual.
- Estadísticas, testimonios y demás servicios del sitio.

## Criterio para las respuestas nuevas

El documento aporta las preguntas, pero no sus respuestas. Se redactaron respuestas generales que remiten al diagnóstico de cada predio y al procedimiento municipal aplicable. Referencias oficiales consultadas:

- [COFOPRI: documentos para la evaluación de titulación](https://www.gob.pe/institucion/cofopri/noticias/907270-accede-al-titulo-de-propiedad-que-documentos-debo-presentar).
- [Licencia de edificación, modalidad B](https://www.gob.pe/20997-obtener-licencia-de-edificacion-para-proyectos-de-la-modalidad-b?child=23755).

## Respaldo y publicación

`originales.zip` contiene las versiones previas de los archivos modificados. No se incluyó el script de despliegue ni las claves SSH.

## Verificación

- Vite: compilación correcta, 2279 módulos. Advertencia de tamaño de bundle existente (chunk principal de 632 KB).
- ESLint de los cuatro archivos de código modificados: 0 errores; 5 advertencias por variables sin usar en `src/pages/service/Index.tsx`.
- Navegador Chrome aislado: nombre, perfil, 8 preguntas en FAQPage y apertura de respuesta verificados.
- Los tres enlaces del servicio a WhatsApp conservan el nombre completo con `&`; no se enviaron mensajes.
- Imágenes del servicio: ninguna rota. Ruta y canonical `/inmobiliario` conservados.
- Capturas inspeccionadas en escritorio (1440 px) y móvil (390 px); la página del servicio no presenta desbordamiento horizontal.
- Inicio móvil: tarjeta con nombre y descripción nuevos verificada; se detectó un pequeño desbordamiento en bloques no modificados de otras secciones.
- Error detectado fuera del cambio: el widget Lemon Slice informa `Duplicate DailyIframe instances are not allowed`. Ya se inserta tanto en `index.html` como en los efectos de las páginas; esas inserciones no se modificaron.
- Prerenderizado y finalización SEO correctos: nombre nuevo en el HTML de inicio, sitemap de 11 rutas y archivos referenciados presentes; sin placeholders de dominio.
Publicación FTPS autorizada por el usuario y completada el 2026-09-18T23:46:57.239707. Se verificaron los archivos por SHA-256 y HTTPS; evidencia en `deploy-state.json` y `verificacion-produccion-http.json`.
