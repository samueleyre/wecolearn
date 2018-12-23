#!/bin/bash

docker-compose exec api bash -c "php api/bin/console cache:clear;"
./dev.sh
