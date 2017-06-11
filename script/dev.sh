#!/bin/bash

sudo find ./../appService -type d -exec chmod 775 {} \;
sudo find ./../appService -type f -exec chmod 664 {} \;
sudo chmod +x ./../appService/bin/console

sudo chown -R etouraille:www-data ./../appService
