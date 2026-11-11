# ─────────────────────────────────────────────────────────────────────────────
# Dockerfile — BG Travel Peru VPS (Hostinger)
# Multi-stage: builder → runner
# ─────────────────────────────────────────────────────────────────────────────

# ── Stage 1: builder ─────────────────────────────────────────────────────────
FROM node:22-alpine AS builder

# Dependencias nativas para better-sqlite3
RUN apk add --no-cache python3 make g++ sqlite-dev

WORKDIR /app

# Instalar bun (el lockfile es de bun)
RUN npm install -g bun@1.3.13

# Copiar manifests de dependencias primero para aprovechar la cache de Docker
COPY package.json bun.lock bunfig.toml ./
COPY packages/ ./packages/

# Instalar todas las dependencias (incluyendo better-sqlite3 para Node.js)
RUN bun install --frozen-lockfile

# Instalar better-sqlite3 para el target Node.js
RUN bun add better-sqlite3
RUN bun add -d @types/better-sqlite3

# Copiar el resto del código fuente
COPY . .

# Build para Node.js
RUN bun run build:node

# ── Stage 2: runner ───────────────────────────────────────────────────────────
FROM node:22-alpine AS runner

RUN apk add --no-cache sqlite-libs dumb-init

WORKDIR /app

# Instalar solo PM2 globalmente
RUN npm install -g pm2@5

# Copiar el build y los archivos necesarios
COPY --from=builder /app/dist-node ./dist-node
COPY --from=builder /app/migrations ./migrations
COPY --from=builder /app/scripts ./scripts
COPY --from=builder /app/ecosystem.config.cjs ./
COPY --from=builder /app/package.json ./

# Copiar solo las dependencias de producción con better-sqlite3
COPY --from=builder /app/node_modules ./node_modules

# Crear directorios de datos y logs
RUN mkdir -p data logs && chown -R node:node /app

# Variables de entorno por defecto (sobreescribir en docker-compose o VPS)
ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0
ENV SQLITE_DB_PATH=/app/data/app.db

USER node

EXPOSE 3000

# dumb-init para manejo correcto de señales
ENTRYPOINT ["dumb-init", "--"]

# Ejecutar migraciones y luego arrancar la app
CMD ["sh", "-c", "node scripts/run-migrations.mjs && pm2-runtime ecosystem.config.cjs --env production"]
