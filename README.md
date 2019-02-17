# Dépendances

docker
docker-compose ( avec sudo )
Make

# Installation 

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
make front
``



## Debug dev

Problème de cache ? 

``
cd script ; ./clear.sh
``

Problème de droits ? 
``
cd script ; ./dev.sh
``


# production

## Connect to production database

``
scalingo -a wecolearn-api-dev db-tunnel SCALINGO_MYSQL_URL
``








