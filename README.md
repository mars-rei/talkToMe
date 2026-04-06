# talkToMe

after cloning this repository as of 03/04/26, run the following:
# install dependencies
composer install
npm install

# set up environment
cp .env.example .env
php artisan key:generate

# run migrations
php artisan migrate

# make storage link for local storage
php artisan storage:link

# start servers in separate terminals
php artisan serve
npm run dev