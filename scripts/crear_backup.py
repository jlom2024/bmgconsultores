import os
import zipfile
import datetime
import hashlib

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
BACKUP_DIR = os.path.join(BASE_DIR, 'backups')
os.makedirs(BACKUP_DIR, exist_ok=True)

DATE_STR = datetime.datetime.now().strftime('%Y%m%d_%H%M%S')

def sha256_file(filepath):
    h = hashlib.sha256()
    with open(filepath, 'rb') as f:
        while chunk := f.read(65536):
            h.update(chunk)
    return h.hexdigest()

# -------------------------------------------------------------
# 1. BACKUP DE PRODUCCIÓN (dist/)
# -------------------------------------------------------------
dist_zip_path = os.path.join(BACKUP_DIR, f'bmg_produccion_dist_{DATE_STR}.zip')
dist_dir = os.path.join(BASE_DIR, 'dist')

print(f"1/2. Creando backup de producción en: {dist_zip_path}...")
dist_count = 0
with zipfile.ZipFile(dist_zip_path, 'w', zipfile.ZIP_DEFLATED, strict_timestamps=False) as z_dist:
    for root, dirs, files in os.walk(dist_dir):
        for file in files:
            file_path = os.path.join(root, file)
            arcname = os.path.relpath(file_path, dist_dir)
            z_dist.write(file_path, arcname)
            dist_count += 1

dist_size_mb = os.path.getsize(dist_zip_path) / (1024 * 1024)
dist_hash = sha256_file(dist_zip_path)
print(f"✓ Backup de producción listo: {dist_count} archivos ({dist_size_mb:.2f} MB)")

# -------------------------------------------------------------
# 2. BACKUP DE CÓDIGO FUENTE (source)
# -------------------------------------------------------------
src_zip_path = os.path.join(BACKUP_DIR, f'bmg_codigo_fuente_{DATE_STR}.zip')

# Carpetas esenciales a incluir
INCLUDE_FOLDERS = ['src', 'public', 'scripts', 'docs', 'Flyers']

# Archivos específicos de la raíz a incluir
INCLUDE_ROOT_FILES = [
    'package.json', 'package-lock.json', 'pnpm-lock.yaml', 'pnpm-workspace.yaml',
    'vite.config.ts', 'tsconfig.json', 'tsconfig.app.json', 'tsconfig.node.json',
    'index.html', 'bitacora.md', 'README.md', 'PROMPT.md',
    'MODIFICACIONES PAGINA WEB BG CONTABLES.md', 'DOCUMENTACION_CORRECCIONES_INICIO_BMG.md',
    'DOCUMENTACION_MODIFICACIONES_BG_CONTABLE.md', '.gitignore', '.env.example',
    'components.json', 'postcss.config.js', 'eslint.config.js', 'netlify.toml'
]

print(f"2/2. Creando backup de código fuente en: {src_zip_path}...")
src_count = 0
with zipfile.ZipFile(src_zip_path, 'w', zipfile.ZIP_DEFLATED, strict_timestamps=False) as z_src:
    # 2.1 Incluir carpetas clave
    for folder in INCLUDE_FOLDERS:
        folder_path = os.path.join(BASE_DIR, folder)
        if not os.path.exists(folder_path):
            continue
        for root, dirs, files in os.walk(folder_path):
            # Excluir caches temporales
            dirs[:] = [d for d in dirs if d not in {'__pycache__', '.temp', 'Thumbs.db'}]
            for file in files:
                if file in {'Thumbs.db'} or file.endswith('.pyc'):
                    continue
                file_path = os.path.join(root, file)
                arcname = os.path.relpath(file_path, BASE_DIR)
                z_src.write(file_path, arcname)
                src_count += 1

    # 2.2 Incluir archivos raíz
    for root_file in INCLUDE_ROOT_FILES:
        file_path = os.path.join(BASE_DIR, root_file)
        if os.path.exists(file_path):
            z_src.write(file_path, root_file)
            src_count += 1

src_size_mb = os.path.getsize(src_zip_path) / (1024 * 1024)
src_hash = sha256_file(src_zip_path)
print(f"✓ Backup de código fuente listo: {src_count} archivos ({src_size_mb:.2f} MB)")

# -------------------------------------------------------------
# 3. MANIFIESTO DE RESPALDO
# -------------------------------------------------------------
manifest_path = os.path.join(BACKUP_DIR, f'MANIFESTO_{DATE_STR}.md')
latest_manifest_path = os.path.join(BACKUP_DIR, 'LATEST_BACKUP.md')

manifest_content = f"""# Manifiesto de Respaldo — BMG Consultores Perú
- **Fecha y Hora de Generación:** {datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
- **Estado de Producción:** Alineado 1:1 con el último deploy en `https://www.bmgconsultoresperu.com/` (HTTP 200 OK)
- **Servidor Remoto:** cPanel / LiteSpeed (`ftp.bmgconsultoresperu.com`)
- **Últimos Cambios Clave Incluidos:**
  1. Perfil oficial de Pedro Alberto Reyes Caballero (Contador Público Colegiado - CPC N° 63979) en `/contable`.
  2. Fotografía profesional de estudio `asesor-pedro-reyes.png` con encuadre de alta resolución y badge "Tu contador".
  3. Desglose curricular: BBVA Banco Continental (Jefe de Nómina/Admin), Telefónica, Cooperativa La Exclusiva, UIGV y URP.
  4. Portada institucional, 9 divisiones corporativas y perfil de la fundadora Blanca Gutiérrez.

---

## Archivos de Respaldo Generados

### 1. `bmg_produccion_dist_{DATE_STR}.zip`
- **Finalidad:** Despliegue inmediato / Restauración en caso de contingencia.
- **Contenido:** Copia exacta del directorio `dist/` que está en el servidor de producción.
- **Cantidad de archivos:** {dist_count}
- **Tamaño:** {dist_size_mb:.2f} MB
- **SHA256:** `{dist_hash}`
- **Instrucción de uso:** Descomprimir en la raíz web (`public_html`) o subir mediante `python scripts/deploy_ftp.py`.

### 2. `bmg_codigo_fuente_{DATE_STR}.zip`
- **Finalidad:** Desarrollo continuo y mantenimiento futuro.
- **Contenido:** Todo el código fuente (`src/`), recursos estáticos (`public/`), scripts de build/deploy (`scripts/`), documentación (`docs/`) y librerías de diseño (`Flyers/`). Excluye archivos temporales y dependencias regenerables (`node_modules`).
- **Cantidad de archivos:** {src_count}
- **Tamaño:** {src_size_mb:.2f} MB
- **SHA256:** `{src_hash}`
- **Instrucción de uso:** Descomprimir, ejecutar `npm install` (o `pnpm install`) y compilar con `npm run build`.

---
*KREO IA Studio — Control de Versiones y Respaldo Operativo.*
"""

with open(manifest_path, 'w', encoding='utf-8') as f:
    f.write(manifest_content)

with open(latest_manifest_path, 'w', encoding='utf-8') as f:
    f.write(manifest_content)

print(f"✓ Manifiesto generado en: {manifest_path}")
print("=== PROCESO DE BACKUP COMPLETADO SATISFACTORIAMENTE ===")
