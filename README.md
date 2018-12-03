# Dépendances

Docker

Make


# Installation des containers


``
cd docker ; docker-compose up
``


# Installation du front


``
cd docker ; docker-compose exec node bash -c "yarn install"
``


# Installation du back


``
cd docker ; docker-compose exec node web -c "composer install"
``


# Remplacer les variables d'environment


``
cd docker ; make env
``


# Créer la base de donnée


``
cd docker ; make database
``

# Démarrer

``
cd docker ; make front
``


# Tout démarrer 

``
cd docker ; make start
``


# Bugs

Problème de droits ? 
``
cd script ; ./dev.sh
``











