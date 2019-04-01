install:
	@git clone git@gitlab.com:samueleyre/wecolearn_front.git front
	@git clone git@gitlab.com:samueleyre/wecolearn_api.git api
	@git clone git@gitlab.com:wecolearn/wecolearn_socket.git node
	@docker-compose down
	@docker-compose build --force-rm
	@docker-compose up -d
	@docker-compose exec angular bash -c "yarn"
	@docker-compose exec api bash -c "composer install"
	@docker-compose exec socket bash -c "cd /src;npm install"
	@echo "Installation completed"

database:
	@docker-compose exec api bash -c "php api/bin/console doctrine:database:create"
	@docker-compose exec api bash -c "php api/bin/console doctrine:schema:create"

fixture:
	@docker-compose exec api bash -c "php api/bin/console do:fi:lo"

start:
	@docker-compose up -d

frontServer:
	@docker-compose exec angular bash -c "ng serve --port 8080 --host 0.0.0.0"

socket:
	@docker-compose exec socket bash -c "cd /src;node server.js"

fix:
	sudo find api/ -type d -exec chmod 775 {} \;
	sudo find api/ -type f -exec chmod 664 {} \;
	sudo chown -R $(shell whoami):www-data ./api

ssl: fix
	sudo rm -R api/var/jwt/*
	@docker-compose up ssl
	@docker-compose kill ssl

test:
	@docker-compose exec api bash -c "cd api;APP_ENV=test vendor/bin/behat"

clear:
	@docker-compose exec api bash -c "cd api;bin/console cache:clear"

dev:
	sudo chown -R $(shell whoami):www-data ./api
	sudo find ./api/ -type d -exec chmod 775 {} \
    sudo find ./api/ -type f -exec chmod 664 {} \
