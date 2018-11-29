#!/bin/bash

# COLORED TEXT
TEXTCOLOR=$(tput setaf 0)$(tput setab 2)
RESETCOLOR=$(tput sgr0)

function colored(){
    [ $# -gt 1 ] && echo -n '> ' || echo -n '  '
    echo ${TEXTCOLOR}' '${1}' '${RESETCOLOR}
}


VERSION='5.6.27'

# CHECK FOR ARGUMENTS
while [[ $# > 1 ]]
do
key="$1"
case $key in
    -v|--version)
    VERSION="$2"
    shift
    ;;
esac
shift
done


mkdir /opt/php-${VERSION}
mkdir /usr/local/src/php5-build
cd /usr/local/src/php5-build
wget http://fr2.php.net/get/php-${VERSION}.tar.bz2/from/this/mirror -O php-${VERSION}.tar.bz2
tar jxf php-${VERSION}.tar.bz2

colored "Donwload complete"

cd php-${VERSION}/


apt-get install build-essential

apt-get build-dep php5

apt-get install libxml2-dev libcurl3 libcurl3-dev libreadline-dev libedit-dev

apt-get install libfcgi-dev libfcgi0ldbl libjpeg62-dbg libmcrypt-dev libssl-dev libc-client2007e libc-client2007e-dev

ln -s /usr/lib/libc-client.a /usr/lib/x86_64-linux-gnu/libc-client.a

./configure\
 --prefix=/opt/php-${VERSION}\
 --with-config-file-path=/opt/php-${VERSION}\
 --with-config-file-scan-dir=/opt/php-${VERSION}/conf.d\
 --disable-cgi \
 --enable-ftp \
 --enable-mbstring \
 --enable-mysqlnd \
 --with-curl \
 --with-libedit \
 --with-openssl \
 --with-zlib \
 --enable-fpm \
 --with-fpm-user=www-data \
 --with-fpm-group=www-data \

make
make install 

cp /usr/local/src/php5-build/php-${VERSION}/php.ini-production /opt/php-${VERSION}/lib/php.ini
cp /opt/php-${VERSION}/etc/php-fpm.conf.default /opt/php-${VERSION}/etc/php-fpm.conf 
