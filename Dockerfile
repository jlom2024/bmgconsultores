FROM nginx:alpine

# Limpiar configuración por defecto
RUN rm -rf /etc/nginx/conf.d/* /usr/share/nginx/html/*

# Copiar configuración personalizada optimizada para SPA
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar bundle de producción precompilado
COPY dist /usr/share/nginx/html

EXPOSE 80

STOPSIGNAL SIGQUIT

CMD ["nginx", "-g", "daemon off;"]
