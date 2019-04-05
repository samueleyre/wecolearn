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
make database
``

## Remplir les fixtures

``
make fixture
``

## Démarrer containers

``
make start
``



## Démarrer front 

``
make frontServer
``



## Debug dev

Problème de cache ou de droits ?   

``
make dev
``


# production

## Connect to online database

``
scalingo -a wecolearn-api-prod db-tunnel SCALINGO_MYSQL_URL
``

``
scalingo -a wecolearn-api-staging db-tunnel SCALINGO_MYSQL_URL
``









