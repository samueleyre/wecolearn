# Dépendances

docker
docker-compose ( avec sudo )
Make

# Installation 

``
make install
``


## Configurer les variables d'environment ( et relancer make env) 

Dans le dossier /config


## Créer la base de donnée

``
make database
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








