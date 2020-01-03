install:
	@git clone git@gitlab.com:samueleyre/wecolearn_front.git front
	@git clone git@gitlab.com:samueleyre/wecolearn_api.git api
	@docker-compose down
	@docker-compose build --force-rm
	@docker-compose up -d
	@docker-compose exec node bash -c "yarn"
	@docker-compose exec angular bash -c "yarn"
	@docker-compose exec api bash -c "composer install"
	@echo "Installation completed"

createDatabase:
	@docker-compose exec api bash -c "php api/bin/console doctrine:database:create"
	@docker-compose exec api bash -c "php api/bin/console doctrine:schema:create"

addFixtures:
	@docker-compose exec api bash -c "php bin/console do:fi:lo -v"

generateJWT:
	@mkdir -p api/config/jwt
	@openssl genpkey -out api/config/jwt/private.pem -aes256 -algorithm rsa -pkeyopt rsa_keygen_bits:4096
	@openssl pkey -in api/config/jwt/private.pem -out api/config/jwt/public.pem -pubout

runComposer:
	@docker-compose run composer bash

frontServer:
	@docker-compose run angular bash -c "ng serve --host 0.0.0.0"

fixPermissions:
	sudo find api/ -type d -exec chmod 775 {} \;
	sudo find api/ -type f -exec chmod 664 {} \;
	sudo chown -R $(shell whoami):www-data ./api

test:
	@docker-compose exec api bash -c "cd api;APP_ENV=test vendor/bin/behat"

clearCache:
	@docker-compose exec api bash -c "php bin/console cache:clear"

startMercure:
