# Actualización del asesor de Desarrollo IA y CEO de KREO

Fecha de cierre: 23 de agosto de 2026

## Estado final

La imagen utilizada en ambas propiedades es `kk.png`, publicada en KREO como:

`https://kreoia.site/CEO/assets/profile.png?v=20260823`

La imagen original no fue recortada ni modificada.

## BMG Consultores

Página: https://bmgconsultoresperu.com/ia

Se incorporó como asesor:

- Bachiller Jorge Luis Ordoñez M.
- Ing. de Sistemas (USIL)
- Ing. en Administración (ICTE)
- CEO y Fundador de KREO IA Studio
- Líder Tecnológico y Estratega en IA

También se añadió la biografía profesional, agentes de IA y proyectos de KREO IA Studio disponibles en la página CEO.

El encuadre final de la tarjeta circular usa:

`object-position: center 25%`

Este valor muestra suficiente cabello y evita el efecto de calvicie producido por el recorte superior.

Archivo principal:

`src/pages/service/Index.tsx`

Datos del asesor:

`src/data/services.ts`

Commit final de BMG:

https://github.com/jlom2024/bmg-consultores/commit/3789047506d396a3d7673509d465d2223c2234b6

## KREO IA Studio

Página: https://kreoia.site/CEO/index.html

Se reemplazó la imagen del CEO en las vistas correspondientes y se mantuvo el encuadre final en:

`object-position: center 60%`

La hoja de estilos quedó versionada como `styles-v13.css?v=2.7` para evitar caché del navegador.

Archivos del VPS:

- `/opt/kreoia-site/CEO/index.html`
- `/opt/kreoia-site/CEO/styles-v13.css`
- `/opt/kreoia-site/CEO/assets/profile.png`

Después de los cambios se reconstruyó y reinició el contenedor `kreoia-web`.

## Verificación

- BMG Desarrollo IA: HTTP 200
- CEO de KREO: HTTP 200
- El asesor y la imagen de KREO se encuentran incluidos en la versión publicada de BMG.
- KREO conserva el encuadre aprobado; sólo se corrigió el recorte de BMG.
