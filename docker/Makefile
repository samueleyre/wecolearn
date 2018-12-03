install:
	@docker-compose down
	@docker-compose build --force-rm
	@docker-compose run node bash yarn
	@docker-compose run web composer install
	@make env
	@echo "Installation completed"

env:
	@docker-compose exec web bash -c "php app/bin/console app:env"

database:
	@docker-compose exec web bash -c "php app/bin/console do:da:cr"
	@docker-compose exec web bash -c "php app/bin/console do:sc:cr"

start:
	@docker-compose up -d
	@make front

front:
	@docker-compose exec node bash -c "ng serve --port 8080 --host 0.0.0.0"

