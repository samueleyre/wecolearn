#!/bin/bash

sudo find ./../app/ -type d -exec chmod 775 {} \;
sudo find ./../app/ -type f -exec chmod 664 {} \;

sudo chown -R etouraille:www-data ./../app
