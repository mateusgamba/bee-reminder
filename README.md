# Bee Reminders

Bee Reminders is a platform focused on helping you set reminders and never forget them.

## Pre-requisites

All of these requirements are provided by [docker-compose](https://docs.docker.com/compose/).

## How to install

### Download using Git

Clone the project from github.

```
git clone https://github.com/mateusgamba/playground-test.git
```

### Setting up the environment

Access API directory and copy the `.env.dev` file to a new file named `.env`.

```
cp .env.dev .env
```

In your terminal and run the following command to install:

```
docker-compose up -d --build
```

Then run following commands:

```
docker-compose exec api bash

php composer install

php artisan migrate
```

If you want to preloading data (it is optional), you can run the following command:

```
php artisan db:seed
```
