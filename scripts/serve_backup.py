import os
import sys
import mimetypes
from http.server import HTTPServer, SimpleHTTPRequestHandler

PORT = 8085
DIRECTORY = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'backups', 'preview_dist'))

class SPARequestHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def do_GET(self):
        # Limpiar path de query strings
        req_path = self.path.split('?')[0].split('#')[0]
        local_path = os.path.join(DIRECTORY, req_path.lstrip('/'))

        # Si es un archivo existente, servirlo normalmente
        if os.path.isfile(local_path):
            return super().do_GET()
        
        # Si es un directorio con index.html, servir normalmente
        if os.path.isdir(local_path) and os.path.isfile(os.path.join(local_path, 'index.html')):
            return super().do_GET()

        # Si la ruta no tiene extensión (es una ruta de SPA como /contable, /ia, /emprendedor), servir index.html
        _, ext = os.path.splitext(req_path)
        if not ext or req_path in ('/contable', '/ia', '/emprendedor', '/juridico', '/fundadora', '/estrategia-premium'):
            self.path = '/index.html'
            return super().do_GET()

        return super().do_GET()

    def end_headers(self):
        # Desactivar cache en preview local
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

def run():
    port = PORT
    server = None
    for attempt in range(5):
        try:
            server = HTTPServer(('127.0.0.1', port), SPARequestHandler)
            break
        except OSError:
            port += 1

    if not server:
        print("Error: No se pudo enlazar el servidor a ningún puerto libre.")
        sys.exit(1)

    print(f"Servidor de prueba del backup iniciado exitosamente en: http://localhost:{port}/")
    print(f"Sirviendo directorio: {DIRECTORY}")
    sys.stdout.flush()
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()

if __name__ == '__main__':
    run()
