FROM composer

# gmp
RUN apk add --update --no-cache gmp gmp-dev \
    && docker-php-ext-install gmp
