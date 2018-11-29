
# Installation des containers

``
cd docker
``

``
docker-compose up -d
``


# Installation du front


``
docker-compose run node bash
``

``
yarn install
``

# Installation du back


``
docker-compose run web bash
``

``
composer install
``


# Remplacer les variables d'environments


Remplacer les variables d'environment dans front/src/environments/environment.ts



# Lancer le front 

``
docker-compose run node bash
``

``
ng serve --port 8080 --host 0.0.0.0"
``











