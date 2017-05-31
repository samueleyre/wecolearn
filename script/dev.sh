#!/bin/bash

find ./../appService -type d -exec chmod 775 {} \;
find ./../appService -type f -exec chmod 664 {} \;