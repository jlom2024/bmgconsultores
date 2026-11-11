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
FTP_PASS = 'ftpps09$13$f3'
LOCAL_DIR = '/home/user/0c5aa6ee-e901-4e6e-ae3e-3546cad119f7/bmg-consultores/dist'

def get_ftps_connection():
    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE

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
    ftps.quit()

if __name__ == '__main__':
    main()
