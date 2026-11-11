# Documentación de Cambios — Correcciones de Inicio y Reestructuración Corporativa

**Fecha**: 2026-10-07  
**Proyecto**: BMG Consultores Perú  
**Documento Fuente**: `"W:\Empresas\BMG Consultores\correccion de inicio de bmg consultores.docx"`  
**Estado**: Completado, Verificado y Desplegado en Producción  
**URLs en Producción**:  
- Portada Institucional: [https://www.bmgconsultoresperu.com/](https://www.bmgconsultoresperu.com/)  
- Nuestra Fundadora: [https://www.bmgconsultoresperu.com/fundadora](https://www.bmgconsultoresperu.com/fundadora)  
- Estrategia Premium: [https://www.bmgconsultoresperu.com/estrategia-premium](https://www.bmgconsultoresperu.com/estrategia-premium)  

---

## 1. Resumen Ejecutivo

A partir de las directrices estratégicas de la dirección general contenidas en el documento oficial, se realizó una reingeniería profunda del sistema de navegación, la narrativa institucional de la marca, la creación de la página biográfica de la Fundadora & CEO Blanca Gutiérrez, la incorporación de la unidad de Estrategia Premium y el despliegue del sistema de filtrado y calificación de leads ("Guardián Digital").

---

## 2. Detalle de Requerimientos e Implementación Técnica

### 2.1. Reingeniería del Menú de Navegación Superior (`src/components/Navbar.tsx`)

#### Objetivos del Documento:
1. Retirar todas las siglas "BG" de los títulos de las divisiones.
2. Eliminar los iconos decorativos para proyectar una imagen sobria, limpia y corporativa.
3. Desplegar los servicios en un orden secuencial específico.
4. Crear al inicio el menú desplegable "Corporativo" con dos opciones: "Quiénes Somos" y "Nuestra Fundadora".
5. Incluir al extremo derecho un botón destacado para "Estrategia Premium".

#### Implementación:
- **Menú "Corporativo"**: Implementado con menú desplegable reactivo y animado con Framer Motion:
  - **"Quiénes Somos"**: Navega o realiza un scroll suave hacia el anclaje `#quienes-somos` en la página principal.
  - **"Nuestra Fundadora"**: Conduce a la ruta dedicada `/fundadora`.
- **9 Divisiones de Negocio** (en orden exacto):
  1. `Emprendedor` (`/emprendedor`)
  2. `Contabilidad` (`/contable`)
  3. `Legal` (`/juridico`)
  4. `Comercio Exterior` (`/comercio-exterior`)
  5. `Desarrollo IA` (`/ia`)
  6. `Licitaciones` (`/licitaciones`)
  7. `Inmobiliaria` (`/inmobiliario`)
  8. `Viajes` (`/travel`)
  9. `Seguros` (`/seguros`)
- **Botón Estrategia Premium**: Botón estilizado al extremo derecho con degradado dorado, borde ámbar y microbadge `"VIP"` que conduce a `/estrategia-premium`.
- **Unificación de Navegación**: Se reemplazaron las implementaciones locales independientes de la barra en `src/pages/home/Index.tsx` y `src/pages/service/Index.tsx` por el componente unificado `src/components/Navbar.tsx`, garantizando una experiencia coherente en todo el portal.

---

### 2.2. Sección Institucional de la Portada (`src/pages/home/Index.tsx`)

#### Objetivos del Documento:
1. Actualizar el contador de servicios para reflejar las 9 divisiones operativas.
2. Establecer el orden estricto de métricas corporativas.
3. Actualizar la descripción del equipo interdisciplinario.
4. Proveer anclaje directo `#quienes-somos`.
5. Replicar los accesos en el pie de página (Footer).

#### Implementación:
- **Métricas Institucionales**:
  ```tsx
  [500+ Clientes] | [10+ Años] | [9 Divisiones] | [2 Sedes]
  ```
  - Se sustituyó `"6 Servicios"` por `"9 Divisiones"`.
  - Se reorganizó el orden visual de izquierda a derecha.
- **Narrativa del Equipo Corporativo**:
  Se actualizó el párrafo de presentación institucional:
  > *"Nuestro equipo reúne a contadores colegiados, abogados corporativos, expertos en contrataciones públicas, especialistas en comercio exterior y asesores de movilidad estratégica internacional con más de una década de experiencia comprobada en el mercado peruano."*
- **Anclaje `#quienes-somos`**:
  Incorporado en el contenedor de la sección con la clase utilitaria `scroll-mt-16` para evitar que la barra fija tape el encabezado tras la navegación.
- **Footer Global**:
  Se incluyeron los accesos directos a "Quiénes Somos", "Nuestra Fundadora" y "Estrategia Premium" tanto en el pie de página de la portada como en el de las páginas de servicio.

---

### 2.3. Nueva Página: "Nuestra Fundadora" (`src/pages/fundadora/Index.tsx`)

#### Objetivos del Documento:
1. Posicionar la autoridad y trayectoria de Blanca Gutiérrez como fundadora de la firma.
2. Foto corporativa en alta resolución a la izquierda.
3. Biografía oficial de 3 párrafos a la derecha.
4. Botón de acción principal: *"💼 Solicitar Sesión Estratégica con la CEO"*.

#### Implementación:
- **Ruta Registrada**: `/fundadora` en `src/App.tsx`.
- **Datos Oficiales**:
  - **Nombre y Cargo**: `Blanca Gutiérrez | Socio Fundador & Directora Ejecutiva (CEO)`
  - **Fotografía**: `/images/blanca-gutierrez-ceo.jpg` (optimizada con bordes redondeados y marco dorado de distinción).
  - **Biografía Oficial**:
    1. *Párrafo 1 (Visión y liderazgo)*: Con más de una década transformando el ecosistema corporativo en el Perú, consolidando una firma integral que responde a desafíos complejos.
    2. *Párrafo 2 (Autoridad técnica)*: Especialista en estructuración tributaria, blindaje patrimonial y articulación de negocios de alta complejidad, liderando un equipo multidisciplinario en 9 divisiones.
    3. *Párrafo 3 (Compromiso institucional)*: Impulso a empresas locales e inversionistas con rigor legal, precisión financiera e innovación tecnológica.
- **Botón CTA**:
  Al pulsar el botón principal, se abre el modal de precalificación para evaluar si el lead califica a la mesa de la CEO.

---

### 2.4. Nueva Página: "Estrategia Premium" (`src/pages/estrategia-premium/Index.tsx`)

#### Objetivos:
Proveer una sección de alto nivel dirigida a consorcios, inversionistas extranjeros y corporaciones con proyectos estratégicos que requieren atención personalizada al más alto nivel.

#### Implementación:
- **Ruta Registrada**: `/estrategia-premium` en `src/App.tsx`.
- **Estructura**:
  - Hero ejecutivo con insignias doradas de exclusividad.
  - Los 4 Pilares de la Consultoría Premium:
    1. Blindaje Jurídico y Tributario Integral.
    2. Adjudicaciones y Licitaciones de Alta Envergadura.
    3. Expansión Internacional y Comercio Exterior.
    4. Transformación Digital con Inteligencia Artificial.
  - Acceso directo al sistema de precalificación para contacto reservado.

---

### 2.5. Guardián Digital de Precalificación (`src/components/PrecalificacionModal.tsx`)

#### Lógica de Preguntas:
1. **Facturación anual**:
   - `Menos de S/ 300,000` (Emprendimiento / MYPE básica)
   - `Entre S/ 300,000 y S/ 1,500,000` (Mediana Empresa)
   - `Más de S/ 1,500,000` (Gran Empresa / Corporativo)
2. **Naturaleza del proyecto**:
   - `Operativo / Trámite puntual` (Gestión contable rutinaria, constitución, etc.)
   - `Reestructuración o Estrategia Integral` (Defensa tributaria compleja, licitaciones)
   - `Gran Envergadura / Expansión Internacional` (Comercio exterior, inversión)
3. **Presupuesto asignado para asesoría especializada**:
   - `Estándar (Tarifa regular)`
   - `Estratégico (Inversión según valor y retorno)`
   - `Corporativo / Ilimitado (Prioridad y máxima confidencialidad)`

#### Algoritmo de Enrutamiento (IF/ELSE):
- **CASO A — Lead Calificado Premium**:
  - Condición: Facturación > S/ 1,500,000, o proyecto de "Gran Envergadura / Expansión Internacional", o presupuesto "Corporativo / Ilimitado".
  - Acción: Redirección prioritaria al despacho de la CEO por WhatsApp con ficha técnica del proyecto formateada.
- **CASO B — Lead Operativo Estándar**:
  - Condición: Proyectos operativos o presupuestos estándar.
  - Acción: Mensaje en pantalla notificando la asignación a la Mesa Centralizada / Front Desk, con enlace a WhatsApp corporativo para atención ágil.

---

## 3. Matriz de Archivos Creados y Modificados

| Archivo | Tipo | Descripción del Cambio |
| :--- | :--- | :--- |
| `src/components/Navbar.tsx` | Modificado | Menú Corporativo, 9 servicios ordenados, sin iconos ni siglas "BG", botón Estrategia Premium. |
| `src/components/PrecalificacionModal.tsx` | Modificado | Implementación del cuestionario de 3 pasos y lógica IF/ELSE (CEO vs Front Desk). |
| `src/pages/home/Index.tsx` | Modificado | Reemplazo por Navbar global, 9 Divisiones, métricas ordenadas, anclaje `#quienes-somos` y footer. |
| `src/pages/service/Index.tsx` | Modificado | Reemplazo por Navbar global, enlaces de footer, soporte de comercio exterior. |
| `src/pages/fundadora/Index.tsx` | Creado | Página institucional de Blanca Gutiérrez con biografía y fotografía oficial. |
| `src/pages/estrategia-premium/Index.tsx` | Creado | Página ejecutiva de alto nivel para consultoría corporativa. |
| `src/App.tsx` | Modificado | Registro de rutas `/fundadora`, `/estrategia-premium` y `/comercio-exterior`. |
| `bitacora.md` | Modificado | Registro histórico de la revisión y despliegue a producción. |

---

## 4. Pipeline de Compilación y Despliegue

1. **Chequeo de Tipos**:
   ```bash
   npx tsc --noEmit
   ```
   *Resultado*: 0 errores detectados en todo el árbol TypeScript.

2. **Compilación y Prerenderizado**:
   ```bash
   npm run build
   ```
   *Resultado*: 
   - Generación de bundles Vite en `dist/` (4m 11s).
   - Generación de `dist/sitemap-routes.json` y `dist/sitemap.xml` con 14 rutas activas.
   - Prerenderizado SSR de la portada en `dist/index.html`.

3. **Despliegue a Producción (FTPS)**:
   ```bash
   python scripts/deploy_ftp.py
   ```
   *Resultado*: 97 archivos transferidos vía FTPS (forzando TLS 1.2) al servidor `ftp.bmgconsultoresperu.com` con 0 incidencias.

---

## 5. Verificación en Producción

Las siguientes URLs fueron verificadas mediante peticiones automatizadas arrojando código de estado **200 OK**:

1. [https://www.bmgconsultoresperu.com/](https://www.bmgconsultoresperu.com/) (200 OK)
2. [https://www.bmgconsultoresperu.com/fundadora](https://www.bmgconsultoresperu.com/fundadora) (200 OK)
3. [https://www.bmgconsultoresperu.com/estrategia-premium](https://www.bmgconsultoresperu.com/estrategia-premium) (200 OK)
4. [https://www.bmgconsultoresperu.com/images/blanca-gutierrez-ceo.jpg](https://www.bmgconsultoresperu.com/images/blanca-gutierrez-ceo.jpg) (200 OK)
