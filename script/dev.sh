#!/bin/bash

sudo find ./../app/var -type d -exec chmod 775 {} \;
sudo find ./../app/var -type f -exec chmod 664 {} \;

sudo chown -R ubuntu:www-data ./../app
