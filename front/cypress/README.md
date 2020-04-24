## Tests d'intégration et end2end pour le front du Registre de Preuve de Covoiturage

### Config

Configure the tests to run in ci.config.ts for continuous integration and debug.config.ts for local debugging.

### Run tests

#### As run in circle-ci

run tests in terminal

- yarn cypress run

run tests in GUI ( requires installed cypress localy )

- yarn cypress open

#### To debug locally

In GUI

- yarn cypress open --env ENV_NAME=local

In terminal

- yarn cypress run --env ENV_NAME=local --spec cypress/integration/\*.e2e.ts

### Organisation

- fixtures : remplace les générateurs pour données > 80kb
- integration : tests cypress lancés par les commandes cypress
- support/reusables : tests cypress réutilisable, chaque test devrait pouvoir être appelé indépendamment
