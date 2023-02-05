install:
	cd backend && \
	sudo docker-compose up -d && \
	sudo cp .env.example .env && \
	bash -c 'echo "127.0.0.1 track.local" >> /etc/hosts' && \
	sudo docker-compose exec track-php bash -c  "cd /var/www && composer install" && \
	sudo docker-compose exec track-php bash -c  "cd /var/www && php artisan key:generate" && \
	sudo docker-compose exec track-php bash -c  "cd /var/www && chmod -R 777 storage" && \
	sudo docker-compose exec track-php bash -c  "cd /var/www && php artisan storage:link" && \
	sudo docker-compose exec track-php bash -c  "cd /var/www && php artisan migrate --seed" && \
	cd ..

run:
	cd backend && docker-compose down && docker-compose up -d && cd ..

stop:
	cd backend && docker-compose down && cd ..

migrate:
	cd backend && sudo docker-compose exec track-php bash -c  "cd /var/www && php artisan migrate --seed" && cd ..
