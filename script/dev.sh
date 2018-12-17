#!/bin/bash

sudo find ./../api/ -type d -exec chmod 775 {} \;
sudo find ./../api/ -type f -exec chmod 664 {} \;

sudo chown -R $USER:www-data ./../api
