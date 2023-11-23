# Wecolearn

Une application web et mobile de mise en relation d'apprenants basé sur Angular et Symfony. Le projet n'est plus en développement depuis septembre 2021. 


## Dépendances

docker, docker-compose ( avec sudo ), Make

### Installation back et front

``
make install
``

### Créer la base de donnée

``
make createDatabase
``

### Remplir les fixtures

``
make loadFixtures
``

### Démarrer back

``
docker-compose up webserver
``

### Démarrer worker

``
make worker
``


### Démarrer front 

``
docker-compose up angular
``

### Lancer les tests e2e
`
make test
`

### Version mobile

voir [front/README.md](https://github.com/samueleyre/wecolearn/blob/dev/front/README.md)


## Debug dev

Problème de cache ou de droits ?   

``
make fixPermissions;
make clearCache
``









