make.PHONY:
start:
	docker-compose up -d

.PHONY:
stop:
	docker-compose stop

.PHONY:
network-create:
	docker network create --gateway 172.82.0.1 --subnet 172.82.0.0/24 prueba_widitrade_network

.PHONY:
network-remove:
	docker network rm prueba_widitrade_network

.PHONY:
init:
	sudo chmod -R 777 ./docker/*
	docker-compose build
	docker-compose up -d

.PHONY:
rebuild:
	docker-compose -f docker-compose.yml up --build --force-recreate -d

.PHONY:
node-restart:
	docker stop prueba_widitrade_node
	docker start prueba_widitrade_node

.PHONY:
nginx-shell:
	docker exec -it prueba_widitrade_nginx /bin/bash

.PHONY:
php-shell:
	docker exec -it prueba_widitrade_app /bin/bash

.PHONY:
node-shell:
	docker exec -it prueba_widitrade_node /bin/bash

.PHONY:
db-shell:
	docker exec -it prueba_widitrade_db /bin/bash
