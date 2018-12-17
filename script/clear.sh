#!/bin/bash

docker-compose exec api bash -c "cd app;php bin/console cache:clear;"
./dev.sh
