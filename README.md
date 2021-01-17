# Project Auth

Week 20: This weeks project is to build an **Express API** with user **authentication**. The goal was to authenticate users using **access tokens** and securely store passwords by encrypting them. The second part of the task is to create a Frontend form to allow you to register and sign in to view a restricted site.

This is a pair-programming project by Jamie Cook and Emelie Svensson.

## The problem

**_Backend_**
We started by creating a **User** model using **Mongoose** and **MongoDB**, setting up crypto to generate our random access token. Then we created our endpoints.

**/** - root endpoint displaying available routes

**/users** - GET - will allow us to fetch our user data

**/users** - POST - registration endpoint: this endpoint expects a name and password in the clients POST body

**/secrets** - GET - our authenticateUser function makes this a restricted endpoint. **Authorization: accessToken** are required in the headers.

**/sessions** - POST - Login endpoint. username and password are expected in the body of this request.

**_Frontend_**

In the Frontend we are using React Redux to store the login information. The main focus of this week was to understand user authorisation on the backend, so this is what we prioritised. We ran out of time but if we had more time we would clean up the frontend by splitting the code into a Login and SignUp components, and then move our fetch requests to our reducer as Thunks.

## Tech

- MongoDB
- Mongoose
- Node
- Express
- JavaScript
- React Redux
- Postman
- Heroku
- MongoDB Atlas & Compass

## View it live

Backend: https://user-authorisation.herokuapp.com/
Frontend: https://project-user-authentication.netlify.app/
