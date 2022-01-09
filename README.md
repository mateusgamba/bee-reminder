# Bee Reminders

Bee Reminders is a platform focused on helping you set reminders and never forget them.

Try out the [Demo](https://bee-reminders.netlify.app/).

![](https://repository-images.githubusercontent.com/377284075/9e49af00-ce1b-11eb-8df8-8d1ab95bdd76)

This project also aims to present some technologies and development methods. It was developed in an easy way, therefore, making updates more easily. You can find more details below.

The project consists of two modules:

- **API** implemented with Lumen and GraphQL, directory: `/api`
- **APP** developed with RectJS, GraphQL and TypeScript, directory: /app

These modules were developed over the following packages:

- **API**

  - Lumen
  - Lighthouse
  - PostgreSQL
  - Solid

- **Web**

  - ReactJS
  - Apollo GraphQL
  - Typescript
  - Toastify
  - Reactstrap
  - React Hook Form
  - React Router Dom
  - Eslint
  - Session storage

- **Devops**
  - Heroku
  - Netlify
  - GitHub Actions

## Pre-requisites

All of these requirements are provided by [docker-compose](https://docs.docker.com/compose/).

## How to install

### Download using Git

Clone the project from github.

```
git clone https://github.com/mateusgamba/bee-reminder.git
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

composer install

php artisan migrate
```

If you want to preloading data (it is optional), you can run the following command:

```
php artisan db:seed
```

and finally, it is necessary to generate the authentication keys.
```
php artisan passport:keys --force

php artisan passport:client --password --provider=users --name=beeOClient
```


## Access

After installing and setting the application, click on the link to access:

[http://localhost:3000](http://localhost:3000)

## Mode Details

### Next features

- Authentication
- Improve deployment
- Add email notifications
- Unit and integration tests
- Pagination
- More filters

### Deploy

The deployment process is split into 2 parts. The first part, the API, is deploying to Heroku and the second, the APP, is deploying to Netlify.

The deployment is using GitHub Actions, you can see its configuration on `.github/workflows/` folder.

The `api-pipeline.yml` file provides the deployment of the API to Heroku, whereas the `app-pipeline.yml` file provides the deployment of the APP to Netlify. You can find more details about workflow in Configuring a workflow documentation.

## Get in touch!

You can contact me directly on my Email (mateusgamba@gmail.com) or via Linkedin ([https://www.linkedin.com/in/mateusgamba/](https://www.linkedin.com/in/mateusgamba/)).

Kind regards
