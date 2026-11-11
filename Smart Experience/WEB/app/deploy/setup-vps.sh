#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# deploy/setup-vps.sh
#
# Script de configuración inicial del VPS Hostinger (Ubuntu 22.04/24.04).
# Ejecutar UNA VEZ como root o con sudo en el servidor.
#
# Uso:
#   chmod +x deploy/setup-vps.sh
#   sudo bash deploy/setup-vps.sh
# ─────────────────────────────────────────────────────────────────────────────
set -euo pipefail

APP_DIR="/var/www/bg-travel"
APP_USER="bg-travel"
NODE_VERSION="22"

echo "=== [1/8] Actualizando sistema ==="
apt-get update -y && apt-get upgrade -y
apt-get install -y curl git nginx certbot python3-certbot-nginx sqlite3 ufw dumb-init

echo "=== [2/8] Creando usuario de aplicación ==="
id -u "$APP_USER" &>/dev/null || useradd -r -m -d "$APP_DIR" -s /bin/bash "$APP_USER"

echo "=== [3/8] Instalando Node.js $NODE_VERSION (via nvm) ==="
curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | bash -
apt-get install -y nodejs
node --version && npm --version

echo "=== [4/8] Instalando bun + PM2 globalmente ==="
npm install -g bun pm2
pm2 startup systemd -u "$APP_USER" --hp "$APP_DIR"

echo "=== [5/8] Creando directorios ==="
mkdir -p "$APP_DIR"/{data,logs,dist-node}
chown -R "$APP_USER":"$APP_USER" "$APP_DIR"
chmod 750 "$APP_DIR"

echo "=== [6/8] Configurando UFW (firewall) ==="
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
ufw allow 'Nginx Full'
ufw --force enable

echo "=== [7/8] Configurando Nginx ==="
cp /tmp/bg-travel/nginx.conf /etc/nginx/sites-available/bg-travel
ln -sf /etc/nginx/sites-available/bg-travel /etc/nginx/sites-enabled/bg-travel
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx

echo "=== [8/8] Configurando proxy_params de Nginx ==="
cat > /etc/nginx/proxy_params << 'EOF'
proxy_http_version  1.1;
proxy_set_header    Upgrade $http_upgrade;
proxy_set_header    Connection 'upgrade';
proxy_set_header    Host $host;
proxy_set_header    X-Real-IP $remote_addr;
proxy_set_header    X-Forwarded-For $proxy_add_x_forwarded_for;
proxy_set_header    X-Forwarded-Proto $scheme;
proxy_cache_bypass  $http_upgrade;
proxy_read_timeout  60s;
proxy_connect_timeout 10s;
EOF

echo ""
echo "=== Setup base completado ==="
echo "Siguiente paso: ejecutar deploy/deploy.sh para subir el código."
echo "Después: certbot --nginx -d bgtravel.pe -d www.bgtravel.pe"
