# Dépendances [ NCC ]

docker

docker-compose ( avec sudo )

Make

## Installation back et front

``
make install
``

### Installation seulement front [ NCC ]

``make install-dev.wecolearn``

Et copier les variables d'environnement de environment.staging.ts vers un fichier environment.ts


## Créer la base de donnée

``
make database
``

## Remplir les fixtures

``
make fixture
``

## Démarrer containers [ NCC ]

``
make start
``



## Démarrer front [ NCC ]

``
make frontServer
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









