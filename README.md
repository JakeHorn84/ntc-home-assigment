# Home assignment

Imagine a client has asked you to build a small tool for browsing their EU population data. There is data for countries and some of the cities in those countries. You have two options for the approach:

## Running application

- Application is running in docker containers. To get appliations to started it is needed to build first using command `docker-compose build`. After that application can be run using `docker-compose up -d`.
- Application backend can be test with `curl`
  - `curl http://localhost:3000/home-assignment/health` returns status of backend
  - `curl http://localhost:3000/home-assignment/countryInfo\?country\=Spain` return country info
  - `curl http://localhost:3000/home-assignment/citiesByPopulation\?population\=3000000` returns cities with population over or equal with population query parameter
  - `curl http://localhost:3000/home-assignment/countries` returns list of countries
- Containers can be kill with `docker-compose down`

## Backend

- Backend is using sample PostgreSQL.
- To start developing backend database is needed to start first. It can be done with `docker-compose up database -d`
- In `backend` folder use `yarn` to install needed packages. After that you can start application in developing mode with `yarn start-dev`
- Test can be run with `yarn test` command. Notice that database is needed to be up and running to run tests.
