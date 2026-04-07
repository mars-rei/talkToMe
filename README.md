# talkToMe

after cloning this repository as of 03/04/26, run the following:
# install dependencies
`composer install` <br>
`npm install`

# set up environment
`cp .env.example .env` <br>
`php artisan key:generate`

# run migrations
`php artisan migrate`

# make storage link for local storage
`php artisan storage:link`

# start servers in separate terminals
`php artisan serve` <br>
`npm run dev`
