install:
	@git clone git@gitlab.com:samueleyre/wecolearn_front.git front
	@git clone git@gitlab.com:samueleyre/wecolearn_api.git api
	@docker-compose down
	@docker-compose build --force-rm
	@docker-compose run node bash -c "yarn"
	@docker-compose run api composer install -d /src/api
	@make env
	@echo "Installation completed"

env:
	@docker-compose exec api bash -c "php api/bin/console app:env"

database:
	@docker-compose exec api bash -c "php api/bin/console doctrine:database:create"
	@docker-compose exec api bash -c "php api/bin/console doctrine:schema:create"

start:
	@docker-compose up -d

frontServer:
	@docker-compose exec node bash -c "ng serve --port 8080 --host 0.0.0.0"

fix:
	sudo find api/ -type d -exec chmod 775 {} \;
	sudo find api/ -type f -exec chmod 664 {} \;
	sudo chown -R $(shell whoami):www-data ./api

ssl: fix
	sudo rm -R api/var/jwt/*
	@docker-compose up ssl
	@docker-compose kill ssl
