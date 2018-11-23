# Trello Board
This is an implementation of trello board in react-redux-nodejs-mongodb tech 
stack. I wanted to see if I can develop a full-stack application using react
and express, and this is the byproduct. Instead of using a code generator
utility to bootstrap my application, I started out writing almost every line
of the code by myself, so that I know what's going on. Also, I wanted to do 
this in TDD approach, with a good amount of tests to ensure the quality of 
the code. My rants on this experience below

## Technologies Used
* [node](https://nodejs.org/en/) platform
    * [react](https://reactjs.org/) for building UI
    * [redux](https://redux.js.org/) for UI application state management
    * [express](https://expressjs.com/) for backend API
    * [jest](https://jestjs.io/) and [enzyme](https://airbnb.io/enzyme/) for react components unit testing
    * [webpack](https://webpack.js.org/) for dependency bundling and packaging
* [bootstrap](https://getbootstrap.com/) for UI theming
* [mongodb](https://www.mongodb.com/) for database persistence
* [docker](https://www.docker.com/) for containerization, distribution and deployment

## Design


## Development
Make sure you have the following dependencies:
* Node v8.12.0
* npm 6.4.1
* docker

### Setting up
On your shell
```
bash-3.2$ npm install 
bash-3.2$ sh mongodb-persist/mongo-docker-start.sh # run the pre-configured docker image for mongodb backend
bash-3.2$ npm test # run all tests
bash-3.2$ npm run dev # run development server, visit http://localhost:3000/
```
### Build and Distribution
```
bash-3.2$ npm run build
bash-3.2$ docker build -t <your-docker-id>/trello-app . # Build the image
bash-3.2$ docker push <your-docker-id>/trello-app # Push the image to repository
```
