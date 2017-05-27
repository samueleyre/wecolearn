FROM php:7.0.10-fpm

# Install bcmath RUN docker-php-ext-install bcmath

RUN apt-get update

ENV DEBIAN_FRONTEND noninteractive

RUN apt-get install -y  --no-install-recommends \
      git \
      curl \
      vim \
      zlib1g-dev \
      libxml2-utils \
      libxml2-dev \
      postfix \
      mailutils \
      net-tools \
      cron \
    && rm -rf /var/lib/apt/lists/*


# Add crontab file in the cron directory
ADD crontab /etc/cron.d/alive-cron

# Give execution rights on the cron job
RUN chmod 0644 /etc/cron.d/alive-cron

RUN crontab /etc/cron.d/alive-cron

# Create the log file to be able to run tail
RUN touch /var/log/cron.log

RUN usermod -u 500 www-data

RUN docker-php-ext-install bcmath zip pdo_mysql xmlrpc

RUN curl -sS https://getcomposer.org/installer | php

RUN mv composer.phar /usr/bin/composer && chmod +x /usr/bin/composer

ADD scriptmail.sh /root/scriptmail.sh

WORKDIR /src

RUN mkdir /var/log/RunProgrammation

RUN mkdir -p /var/log/php/error/

RUN touch /var/log/php/error/log