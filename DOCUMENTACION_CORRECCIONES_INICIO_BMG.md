# Documentación Oficial — Correcciones de Inicio y Reestructuración Corporativa

**Fecha**: 2026-10-07  
**Proyecto**: BMG Consultores Perú  
**Fuente**: `"W:\Empresas\BMG Consultores\correccion de inicio de bmg consultores.docx"`  
**Estado**: Completado, Verificado y Desplegado en Producción  
**Servidor de Producción**: LiteSpeed / cPanel (`www.bmgconsultoresperu.com`)  

---

## 1. Alcance General del Cambio

Se aplicaron las correcciones estratégicas e institucionales solicitadas para consolidar el posicionamiento de **BMG Consultores Perú** como firma multidisciplinaria líder, destacando a su Fundadora & CEO, reordenando sus 9 unidades operativas y filtrando los prospectos de alto valor.

---

## 2. Puntos Clave Desarrollados

### 1. Barra de Navegación Global (`Navbar.tsx`)
- **Limpieza visual**: Retiro total de siglas "BG" e iconos. Tipografía sobria y minimalista.
- **Menú "Corporativo"**:
  - `Quiénes Somos`: Scroll suave hacia la sección institucional `#quienes-somos`.
  - `Nuestra Fundadora`: Enlace directo a `/fundadora`.
- **9 Divisiones en Orden Exacto**:
  1. Emprendedor (`/emprendedor`)
  2. Contabilidad (`/contable`)
  3. Legal (`/juridico`)
  4. Comercio Exterior (`/comercio-exterior`)
  5. Desarrollo IA (`/ia`)
  6. Licitaciones (`/licitaciones`)
  7. Inmobiliaria (`/inmobiliario`)
  8. Viajes (`/travel`)
  9. Seguros (`/seguros`)
- **Botón Exclusivo**: `Estrategia Premium` (`/estrategia-premium`) ubicado al extremo derecho.
- **Unificación**: Sustitución de barras locales en `home/Index.tsx` y `service/Index.tsx` por el componente global único.

### 2. Sección Institucional de la Portada (`home/Index.tsx`)
- **Contador Actualizado**: De "6 Servicios" a **"9 Divisiones"**.
- **Métricas Corporativas (Orden Estricto)**:
  `[500+ Clientes] | [10+ Años] | [9 Divisiones] | [2 Sedes]`
- **Narrativa Interdisciplinaria**:
  Inclusión explícita de *"expertos en contrataciones públicas, especialistas en comercio exterior y asesores de movilidad estratégica internacional"*.
- **Identificador `#quienes-somos`**: Clase `scroll-mt-16` para anclaje exacto.
- **Footer Corporativo**: Enlaces duplicados de "Quiénes Somos", "Nuestra Fundadora" y "Estrategia Premium".

### 3. Página "Nuestra Fundadora" (`fundadora/Index.tsx`)
- **Cargo Corporativo**: Blanca Gutiérrez | Socio Fundador & Directora Ejecutiva (CEO).
- **Diseño**: Fotografía oficial de alta calidad (`/images/blanca-gutierrez-ceo.jpg`) y biografía oficial de 3 párrafos.
- **Acción CTA**: Botón *"💼 Solicitar Sesión Estratégica con la CEO"* que invoca el Guardián Digital de precalificación.

### 4. Página "Estrategia Premium" (`estrategia-premium/Index.tsx`)
- Mesa de trabajo ejecutiva para corporaciones, consorcios y proyectos de alto valor con acceso directo a evaluación preliminar.

### 5. Guardián Digital (`PrecalificacionModal.tsx`)
- **Cuestionario**: 3 preguntas clave (Facturación anual, Naturaleza del proyecto y Presupuesto).
- **Lógica de Enrutamiento**:
  - **Lead Premium**: Notificación y derivación directa a la agenda de la CEO por WhatsApp.
  - **Lead Operativo Estándar**: Notificación de atención por Mesa Centralizada / Front Desk vía WhatsApp comercial.

---

## 3. Resumen de Despliegue y Verificación

- **Compilación**: `npm run build` completada con éxito.
- **Sitemap**: Actualizado a 14 rutas en `dist/sitemap.xml`.
- **Deploy FTPS**: Ejecutado vía `python scripts/deploy_ftp.py` (97 archivos transferidos con 0 errores).
- **Comprobación en Vivo**:
  - `https://www.bmgconsultoresperu.com/` (HTTP 200 OK)
  - `https://www.bmgconsultoresperu.com/fundadora` (HTTP 200 OK)
  - `https://www.bmgconsultoresperu.com/estrategia-premium` (HTTP 200 OK)
  - `https://www.bmgconsultoresperu.com/images/blanca-gutierrez-ceo.jpg` (HTTP 200 OK)
