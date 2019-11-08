FROM php:7.4-rc-fpm-buster

WORKDIR /application

ARG XDEBUG_VERSION=2.8.0beta2

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        build-essential \
        tzdata \
        coreutils \
        libgmp-dev \
        libgmp3-dev \
        zlib1g-dev \
        libssl-dev \
        libzip-dev \
    && docker-php-ext-install pdo pdo_mysql zip \
    && mkdir -p /usr/src/php/ext/xdebug \
    && curl -fsSL https://xdebug.org/files/xdebug-${XDEBUG_VERSION}.tgz | tar xz -C /usr/src/php/ext/xdebug --strip 1 \
    && docker-php-ext-install xdebug \
    && echo "xdebug.remote_enable=1" >> /usr/local/etc/php/php.ini \
    && rm -rf /var/lib/apt/lists/*
