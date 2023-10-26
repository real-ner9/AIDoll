clean:
	# Удаляем Docker images
	docker rmi docker-go_to_virt_frontend || true
	docker rmi docker-go_to_virt_app || true

	# Удаляем Docker volume
	docker volume rm frontend-dist || true

up: clean
	COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker compose -f ./docker/docker-compose.yml up -d --build --remove-orphans

down:
	docker compose -f ./docker/docker-compose.yml down

stop:
	docker compose -f ./docker/docker-compose.yml stop



up-local:
	COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker compose -f ./docker/docker-compose.local.yml up -d --build --remove-orphans

down-local:
	docker compose -f ./docker/docker-compose.local.yml down

stop-local:
	docker compose -f ./docker/docker-compose.local.yml stop
