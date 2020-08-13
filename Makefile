install:
	@docker-compose down
	@docker-compose build --force-rm
	@docker-compose up -d
	@docker-compose exec angular bash -c "yarn"
	@docker-compose exec composer bash -c "composer install"
	@echo "Installation completed"

createDatabase:
	@docker-compose exec api bash -c "php bin/console doctrine:database:create"
	@docker-compose exec api bash -c "php bin/console doctrine:schema:create"

loadFixtures:
	@docker-compose exec api bash -c "php bin/console do:fi:lo -v --no-interaction"

runComposer:
	@docker-compose run composer bash

frontServer:
	@docker-compose run angular bash -c "ng serve --host 0.0.0.0"

fixPermissions:
	sudo find api/ -type d -exec chmod 775 {} \;
	sudo find front/ -type d -exec chmod 775 {} \;
	sudo find api/ -type f -exec chmod 664 {} \;
	sudo find front/ -type f -exec chmod 664 {} \;
	sudo chown -R $(shell whoami):www-data ./api;
	sudo chown -R $(shell whoami):www-data ./front

clearCache:
	@docker-compose exec api bash -c "php bin/console cache:clear"

test:
	@make loadFixtures
	cd front; yarn test:e2e; cd ..
	@make loadFixtures
	cd front; yarn test:e2e:mobile
