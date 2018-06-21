#!/bin/bash

docker exec -ti docker_web_1 /bin/bash -c "cd app;php bin/console cache:clear;"
./dev.sh
