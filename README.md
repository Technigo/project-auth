# Project Auth 🗝

This week's project was to tie all the skills learnt so far to build an API with authentication to implement a registration flow, and a frontend with forms to register, sign in, and view some content once the user is logged in. The project has two parts, a backend API and a React Redux frontend. This was a pair programming project developed by Sandra Shumanteva and Sofia Vaz Sousa.

## Planning & What we learned 🧩

Our backend is an Express API built using mongoose and MongoDB for the database, deployed on Heroku. We started by building the "User" model that we use to store the users in the database. 
The frontend is built in React Redux where we use a mix of local and global state to control the app's flow. 

## Endpoints 💫
- POST endpoint to create a new user.
- POST endpoint to login (for existing users)
- GET restricted endpoint only accessible with a valid access token.

## Tech ⚡️
- MongoDB
- Mongoose
- Node.js
- Express
- Heroku 
- Redux

## View it live 🔴
- [Authentication Backend](https://authentication-sandra-sofia.herokuapp.com/)
- [Authentication Frontend](https://auth-sandra-sofia.netlify.app/)
