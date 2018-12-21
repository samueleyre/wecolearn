# Dépendances

docker
docker-compose ( avec sudo )
Make

# Installation 

``
make install
``


# Configurer les variables d'environment ( et relancer make env)

Dans le dossier /config


# Créer la base de donnée


``
make database
``

# Démarrer containers 

``
make start
``



# Démarrer front

``
make front
``



# Debug dev

Problème de cache ? 

``
cd script ; ./clear.sh
``

Problème de droits ? 
``
cd script ; ./dev.sh
``

Services Mysql, Nginx ou Apache2 ? 

``
sudo service mysql stop
``
``
sudo service nginx stop
``
``
sudo service apache2 stop
``











