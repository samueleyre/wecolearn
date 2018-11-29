
# Installation des containers

``
cd docker
``

``
docker-compose up -d
``


# Installation du front


``
docker exec -ti docker_node_1 /bin/bash -c "yarn install"
``

# Installation du back


``
docker exec -ti docker_php_1 /bin/bash -c "composer install"
``


# Lancer le front 

``
docker exec -ti docker_node_1 /bin/bash -c "ng serve --port 8080 --host 0.0.0.0"
``











