![release staging on playstore](https://github.com/samueleyre/wecolearn/workflows/release%20staging%20on%20playstore/badge.svg?branch=staging)

![tests before merge](https://github.com/samueleyre/wecolearn/workflows/tests%20before%20merge/badge.svg?branch=staging)



## Front de l'application Wecolearn

Voir le repo : https://gitlab.com/samueleyre/wecolearn/tree/dev pour les explications


### Déploiement sur ionic.

## JAVA 1.8

`sudo apt install openjdk-8-jdk`

## Téléchargement de android studio

se rendre sur [le site](https://developer.android.com/studio)

## Mise en place des variable d'environment

dans le ~/.bashrc rajouter

`export JAVA_HOME="/usr/lib/jvm/java-8-openjdk-amd64"`
` export ANDROID_HOME=~/Android/Sdk`
 `export PATH="${PATH}:${ANDROID_HOME}build-tools/:${ANDROID_HOME}platform-tools/"`

executer

`source ~/.bashrc` pour rendre ses modification actives dans la fenêtre courante

## ionic et capacitor


`npm install -g @ionic/cli@6.4.0`

## configuration du tel: 

configurer le téléphone en mode debuggage USB

`adb devices` doit indiquer un message de la forme suivante
`5031649995040505	device`

## compilation de l'application

`ng build --configuration=android-$ENV`

exemple : staging en local : ng build --configuration=android-staging-local

Remplacer $ENV par prod, staging ou staging-local

## Installer les dépendances

`ionic capacitor update`


## Synchronisation du code avec le mobile

`npx cap sync`

## lancement de android studio

`npx cap open android`

