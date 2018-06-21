#!/bin/bash
docker exec -i docker_web_1 /bin/bash -c "cd app;php bin/console app:sendReminder;"
