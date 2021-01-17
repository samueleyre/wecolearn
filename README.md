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









