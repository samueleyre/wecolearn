# Dépendances

docker

docker-compose ( avec sudo )

Make

## Installation back et front

``
make install
``


## Créer la base de donnée

``
make createDatabase
``

## Remplir les fixtures

``
make loadFixtures
``

## Démarrer back

``
docker-compose up webserver
``


## Démarrer front 

``
docker-compose up angular
``


## Debug dev

Problème de cache ou de droits ?   

``
make dev
``


# Online servers

## Connect to online database

``
scalingo -a wecolearn-api-prod db-tunnel SCALINGO_MYSQL_URL
``

``
scalingo -a wecolearn-api-staging db-tunnel SCALINGO_MYSQL_URL
``









