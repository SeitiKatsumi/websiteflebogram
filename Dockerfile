FROM nginx:1.27-alpine

COPY . /usr/share/nginx/html

RUN rm -rf /usr/share/nginx/html/.git \
  && rm -f /usr/share/nginx/html/Dockerfile \
  && rm -f /usr/share/nginx/html/captain-definition

EXPOSE 80
