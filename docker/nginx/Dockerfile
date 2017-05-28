FROM phusion/baseimage:latest

# Install Nginx.
RUN \
  add-apt-repository -y ppa:nginx/stable && \
  apt-get update && \
  apt-get install -y nginx && \
  rm -rf /var/lib/apt/lists/* && \
  echo "\ndaemon off;" >> /etc/nginx/nginx.conf && \
  chown -R www-data:www-data /var/lib/nginx

#remove default conf
RUN rm /etc/nginx/sites-enabled/default

# Define mountable directories.
VOLUME ["/etc/nginx/sites-enabled", "/etc/nginx/certs", "/etc/nginx/conf.d", "/var/log/nginx", "/var/www/html"]

# Define working directory.
WORKDIR /src

# Expose ports.
EXPOSE 80
EXPOSE 443

#service

RUN mkdir -p /etc/sv/nginx
ADD run/nginx /etc/sv/nginx/run
RUN chmod +x /etc/sv/nginx/run
RUN ln -s /etc/sv/nginx /etc/service/nginx

#log
RUN mkdir -p /etc/sv/nginx/log
ADD log/nginx /etc/sv/nginx/log/run
RUN chmod +x /etc/sv/nginx/log/run
#launch command

CMD ["/sbin/my_init"]


