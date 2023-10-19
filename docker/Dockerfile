FROM nginx:1.19
ENV NGINX_HOST="0.0.0.0" NGINX_PORT="80"
COPY dist/ /usr/share/nginx/html
COPY docker/nginx/nginx.conf /etc/nginx/nginx.conf
COPY docker/nginx/templates /etc/nginx/templates
