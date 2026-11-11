/**
 * ecosystem.config.cjs — PM2 process manager para VPS Hostinger
 *
 * Uso en producción:
 *   pm2 start ecosystem.config.cjs --env production
 *   pm2 save
 *   pm2 startup
 */

"use strict";

module.exports = {
  apps: [
    {
      name: "bg-travel",
      // El servidor Node.js generado por Nitro con preset node-server
      script: "./dist-node/server/index.mjs",
      instances: "max",           // Un proceso por vCPU disponible
      exec_mode: "cluster",
      max_memory_restart: "512M",

      // Reinicio automático si el proceso cae
      autorestart: true,
      watch: false,
      restart_delay: 3000,

      env: {
        NODE_ENV: "development",
        PORT: 3000,
        HOST: "127.0.0.1",
        SQLITE_DB_PATH: "./data/app.db",
      },

      env_production: {
        NODE_ENV: "production",
        PORT: 3000,
        HOST: "127.0.0.1",
        SQLITE_DB_PATH: "/var/www/bg-travel/data/app.db",
        // Las siguientes variables se cargan desde /etc/environment o .env.production
        // SESSION_SECRET, CULQI_SECRET_KEY, ADMIN_PASSWORD_HASH
      },

      // Logs
      out_file: "./logs/out.log",
      error_file: "./logs/error.log",
      merge_logs: true,
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",

      // Graceful shutdown
      kill_timeout: 5000,
      listen_timeout: 10000,
      shutdown_with_message: true,
    },
  ],
};
