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
	
php-reload:
	clear && cd backend && docker-compose stop track-php && docker-compose start track-php && cd ..

migrate:
	cd backend docker-compose exec track-php bash -c  "cd /var/www && php artisan migrate --seed" && cd ..

fresh-migrate:
	cd backend docker-compose exec track-php bash -c  "cd /var/www && php artisan migrate:fresh --seed" && cd ..

add-work-record:
	cd backend docker-compose exec track-php bash -c  "cd /var/www && php artisan db:seed --class=WorkScheduleSeeder" && cd ..

clear:
	cd backend docker-compose exec track-php bash -c  "cd /var/www && php artisan cache:clear && php artisan config:clear && php artisan route:clear" && cd ..
	
new-invite:
	cd backend && docker-compose exec track-php bash -c  "cd /var/www && php artisan socket:invite new" && cd ..
	
decline-invite:
	cd backend && docker-compose exec track-php bash -c  "cd /var/www && php artisan socket:invite decline" && cd ..

accept-invite:
	cd backend && docker-compose exec track-php bash -c  "cd /var/www && php artisan socket:invite accept" && cd ..
	
delete-invite:
	cd backend && docker-compose exec track-php bash -c  "cd /var/www && php artisan socket:invite delete" && cd ..
