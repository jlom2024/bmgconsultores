import os
import sys
import ftplib
import ssl

if sys.stdout.encoding != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

FTP_HOST = 'ftp.bmgconsultoresperu.com'
FTP_USER = 'ftpweb@bmgconsultoresperu.com'
FTP_PASS = os.environ.get('FTP_PASS') or 'ftpps09$13$f3'
# Uso: python scripts/deploy_ftp.py  (requiere haber corrido `npm run build` antes)
# Si cambia la clave, exportar FTP_PASS o editar la línea anterior.
# Nota histórica: Python 3.13+ negocia TLS 1.3 con LiteSpeed y falla con
# "SSL: BAD_LENGTH" en la transferencia de datos. Se fuerza TLS 1.2 en
# get_ftps_connection() para evitarlo. Ver bitácora [2026-08-29].
# dist/ lives one level above scripts/ (project root). Derive it from the script
# location so the deploy works from any machine/clone instead of a hardcoded path.
LOCAL_DIR = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'dist'))

def get_ftps_connection():
    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE
    # Forzar TLS 1.2: evita el error SSL: BAD_LENGTH en Python 3.13+ con
    # algunos servidores LiteSpeed/cPanel que negocian TLS 1.3 en el canal de datos.
    try:
        ctx.minimum_version = ssl.TLSVersion.TLSv1_2
        ctx.maximum_version = ssl.TLSVersion.TLSv1_2
    except Exception:
        pass

    ftps = ftplib.FTP_TLS(context=ctx)
    ftps.connect(FTP_HOST, 21, timeout=60)
    ftps.auth()
    ftps.login(FTP_USER, FTP_PASS)
    ftps.prot_p()
    ftps.set_pasv(True)
    return ftps

def ensure_remote_dir(ftps, remote_dir):
    parts = [p for p in remote_dir.replace('\\', '/').split('/') if p]
    current = ''
    for part in parts:
        current += '/' + part
        try:
            ftps.cwd(current)
        except ftplib.error_perm:
            try:
                ftps.mkd(current)
                print(f"[DIR CREATED] {current}")
            except Exception as e:
                print(f"[DIR ERR] {current}: {e}")

def upload_file(ftps, local_path, remote_path):
    remote_path = remote_path.replace('\\', '/')
    remote_dir = os.path.dirname(remote_path)
    if remote_dir and remote_dir != '/':
        ensure_remote_dir(ftps, remote_dir)
    
    dir_name = os.path.dirname(remote_path).replace('\\', '/') or '/'
    file_name = os.path.basename(remote_path)
    ftps.cwd(dir_name)

    with open(local_path, 'rb') as f:
        ftps.storbinary(f'STOR {file_name}', f)
    print(f"[UPLOADED] {remote_path}")

def main():
    print("=== INICIANDO DEPLOY AUTOMÁTICO VÍA FTPS EN BMG CONSULTORES PERÚ ===")
    ftps = get_ftps_connection()
    print(f"Conectado exitosamente a {FTP_HOST}")

    # 1. Limpieza de archivos antiguos comprimidos o sin uso en la raíz del servidor
    print("\n--- Limpiando archivos antiguos sin uso en el servidor ---")
    try:
        remote_files = ftps.nlst()
        cleanup_targets = ['BMG-Consultores-Peru-Landing-Servidor-v2.zip', 'LEEME.txt']
        for target in cleanup_targets:
            if target in remote_files:
                try:
                    ftps.delete(target)
                    print(f"[LIMPIEZA SERVIDOR] Eliminado archivo innecesario: {target}")
                except Exception as ex:
                    print(f"[WARN] No se pudo borrar {target}: {ex}")
    except Exception as e:
        print(f"[WARN] Error consultando archivos remotos para limpieza: {e}")

    # 2. Subida recursiva de dist
    print("\n--- Subiendo archivos compilados de la aplicación ---")
    uploaded_count = 0
    for root, dirs, files in os.walk(LOCAL_DIR):
        for file in files:
            local_path = os.path.join(root, file)
            rel_path = os.path.relpath(local_path, LOCAL_DIR)
            remote_path = '/' + rel_path.replace('\\', '/')
            
            # Reintentar en caso de desconexión por timeout en archivos grandes
            success = False
            for attempt in range(3):
                try:
                    upload_file(ftps, local_path, remote_path)
                    uploaded_count += 1
                    success = True
                    break
                except Exception as e:
                    print(f"[RETRY {attempt+1}] Error subiendo {remote_path}: {e}")
                    try:
                        ftps = get_ftps_connection()
                    except Exception:
                        pass
            if not success:
                print(f"[ERROR CRÍTICO] Falló la subida de {remote_path}")

    print(f"\n✅ DEPLOY COMPLETADO EXITOSAMENTE: {uploaded_count} archivos transferidos.")
    try:
        ftps.quit()
    except Exception:
        try:
            ftps.close()
        except Exception:
            pass

if __name__ == '__main__':
    main()
