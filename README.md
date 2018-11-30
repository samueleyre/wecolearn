
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

``
yarn install
``

# Installation du back


``
docker exec -ti docker_web_1 /bin/bash -c "composer install"

``

``
composer install
``


# Remplacer les variables d'environment


``
docker exec -ti docker_web_1 /bin/bash -c "php app/bin/console app:ENV
``


# Remplacer les variables d'environments


Remplacer les variables d'environment dans front/src/environments/environment.ts



# Lancer le front 

``
docker-compose run node bash
``

``
docker exec -ti docker_node_1 /bin/bash -c "ng serve --port 8080 --host 0.0.0.0"
``











