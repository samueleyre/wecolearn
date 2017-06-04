FROM ubuntu:latest

ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update && apt-get install -y --no-install-recommends \
      autoconf \
      build-essential \
      bison \
      bzip2 \
      curl \
      re2c \
      lbzip2 \
      libcurl4-gnutls-dev \
      libfreetype6-dev \
      libldap-2.4-2 \
      libldb-dev \
      libldap2-dev \
      libpng-dev \
      libssl-dev \
      libsslcommon2-dev \
      libtool-bin \
      libxml2-dev \
      libxml2-utils \
      libzip-dev \
      postfix \
      re2c \
      gcc \
      git \
      vim \
      wget \
      zlib1g-dev \
      libgmp-dev \
      libgmp3-dev \
      libbz2-dev \
      libjpeg-dev \
      libxpm-dev \
      libmcrypt-dev \
      libpspell-dev \
      librecode-dev \
      runit 

RUN ln -s /usr/include/x86_64-linux-gnu/gmp.h /usr/include/gmp.h

RUN ln -s /usr/lib/x86_64-linux-gnu/libldap.so /usr/lib/libldap.so \
      && ln -s /usr/lib/x86_64-linux-gnu/liblber.so /usr/lib/liblber.so

RUN wget http://au1.php.net/get/php-7.1.5.tar.gz/from/this/mirror && tar xvzf mirror

RUN cd php-7.1.5 && ./buildconf --force && ./configure --prefix=/usr/local/php7 \
      --with-config-file-path=/usr/local/etc \
      --with-config-file-scan-dir=/usr/local/etc/php-fpm.d \
      --enable-bcmath \
      --enable-calendar \
      --enable-exif \
      --enable-ftp \
      --enable-intl \
      --enable-mbstring \
      --enable-pcntl \
      --enable-sysvmsg \
      --enable-sysvsem \
      --enable-sysvshm \
      --enable-fpm \
      --enable-wddx \
      --enable-zip \
      --with-fpm \
      --with-curl \
      --with-mcrypt \
      --with-iconv \
      --with-gmp=/usr/include/x86_64-linux-gnu \
      --with-pspell \
      --with-gd \
      --with-jpeg-dir=/usr \
      --with-png-dir=/usr \
      --with-zlib-dir=/usr \
      --with-xpm-dir=/usr \
      --with-freetype-dir=/usr \
      --with-fpm-user=www-data \
      --with-fpm-group=www-data \
      --with-t1lib=/usr \
      --enable-gd-native-ttf \
      --enable-gd-jis-conv \
      --with-openssl \
      --with-pdo-mysql \
      --with-gettext=/usr \
      --with-zlib=/usr \
            --with-bz2 \
      --with-recode=/usr \
      --with-ldap \
      --with-xdebug \
      && make clean \
      && make -j `cat /proc/cpuinfo | grep processor | wc -l` \
      && make install 

#binary

RUN ln -s /usr/local/php7/bin/php /usr/bin/php
RUN ln -s /usr/local/php7/sbin/php-fpm /usr/sbin/php-fpm

#unix socket

RUN touch /var/run/php7-fpm.sock
RUN chmod 660 /var/run/php7-fpm.sock

#wrights.
RUN usermod -u 500 www-data

#php service

RUN mkdir -p /etc/sv/php
ADD run/php /etc/sv/php/run
RUN chmod +x /etc/sv/php/run
RUN ln -s /etc/sv/php /etc/service/php

#composer

RUN apt-get install ca-certificates
RUN curl -sS https://getcomposer.org/installer | php
RUN mv composer.phar /usr/bin/composer && chmod +x /usr/bin/composer

#workdir

WORKDIR /src/

# Install Nginx.
RUN apt-get install -y software-properties-common 
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

#TODO relocalize
RUN chown www-data:www-data /var/run/php7-fpm.sock

#config files

RUN mkdir -p /usr/local/etc/php-fpm.d
#RUN touch /usr/local/etc/php-fpm.conf
#RUN touch /usr/local/etc/php-fpm.d/www.conf

ADD php-fpmConf/php-fpm.conf /usr/local/etc/php-fpm.conf
ADD phpConf/www.conf /usr/local/etc/php-fpm.d/www.conf
ADD ini/php.ini /usr/local/etc/php.ini

#cron + logrotate
#RUN apt-get update && apt-get install -y cron logrotate

#cron service
#RUN mkdir -p /etc/sv/cron
#ADD run/cron /etc/sv/cron/run
#RUN chmod +x /etc/sv/cron/run
#RUN ln -s /etc/sv/cron /etc/service/cron


#launch command

CMD ["/usr/bin/runsvdir","-P", "/etc/service"]