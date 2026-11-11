#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# deploy/deploy.sh
#
# Despliegue de actualización en VPS Hostinger (ejecutar desde la máquina local
# o desde CI — requiere acceso SSH configurado).
#
# Prerequisitos:
#   - setup-vps.sh ejecutado una vez
#   - SSH key configurada: ssh-copy-id bg-travel@VPS_IP
#   - .env.production presente en el servidor en $APP_DIR/.env.production
#
# Uso:
#   VPS_HOST=tu-ip-vps bash deploy/deploy.sh
# ─────────────────────────────────────────────────────────────────────────────
set -euo pipefail

APP_DIR="/var/www/bg-travel"
APP_USER="bg-travel"
VPS_HOST="${VPS_HOST:-}"
VPS_PORT="${VPS_PORT:-22}"

if [[ -z "$VPS_HOST" ]]; then
  echo "ERROR: Definir VPS_HOST=ip.del.servidor"
  exit 1
fi

echo "=== [1/6] Build local para Node.js ==="
bun run build:node

echo "=== [2/6] Sincronizar archivos al VPS ==="
rsync -avz --delete \
  --exclude '.git' \
  --exclude 'node_modules' \
  --exclude '.env*' \
  --exclude 'data' \
  --exclude 'logs' \
  --exclude 'dist' \
  --exclude '.edge-audit*' \
  --exclude '.chrome-audit*' \
  -e "ssh -p $VPS_PORT" \
  ./ "$APP_USER@$VPS_HOST:$APP_DIR/"

echo "=== [3/6] Instalar dependencias de producción en VPS ==="
ssh -p "$VPS_PORT" "$APP_USER@$VPS_HOST" "cd $APP_DIR && bun install --frozen-lockfile --production && bun add better-sqlite3"

echo "=== [4/6] Ejecutar migraciones ==="
ssh -p "$VPS_PORT" "$APP_USER@$VPS_HOST" "cd $APP_DIR && node scripts/run-migrations.mjs"

echo "=== [5/6] Recargar PM2 (zero-downtime) ==="
ssh -p "$VPS_PORT" "$APP_USER@$VPS_HOST" "cd $APP_DIR && pm2 reload ecosystem.config.cjs --env production --update-env || pm2 start ecosystem.config.cjs --env production"
pm_save_cmd="pm2 save"
ssh -p "$VPS_PORT" "$APP_USER@$VPS_HOST" "$pm_save_cmd"

echo "=== [6/6] Verificar salud ==="
sleep 3
STATUS=$(ssh -p "$VPS_PORT" "$APP_USER@$VPS_HOST" "curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:3000/")
if [[ "$STATUS" == "200" ]]; then
  echo "✓ App respondiendo con 200"
else
  echo "WARN: App respondió con status $STATUS — verificar logs: pm2 logs bg-travel"
fi

echo ""
echo "=== Deploy completado ==="
