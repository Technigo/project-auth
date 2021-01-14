# Project Auth

This project contains two parts: a backend API, and a React frontend. In the backend we have built an API with authentication to implement a registration flow. In the frontend we have made forms to register, sign in, and view some content once you're logged in.
This project was developed by Jessica Panditha and Ingela Löfgren in pair-programming.

## The problem

We started out by structuring the project and planning what techniques to use. We realised that Redux would be a good way to go as we have to store the local state - the user name and password and the access token this would generate - to be able to access the secret content.
But first, we created the endpoints in the backend: to sign up, log in and to get the secret message.
In the frontend we have made a form to sign up/log in, and once logged in you can click a button to reveal the secret message.

## Tech

• MongoDB
• Mongoose
• Node.js
• Express
• React
• Redux

## View it live

Frontend:
https://auth-api-technigo.netlify.app/

Backend:
auth-api-technigo.herokuapp.com

Endpoints:

POST /users
To be able to sign up the user

POST /sessions
To be able to log in

GET /secrets
To get the secret message (This is protected by a authenticatation middleware so that only a user with a valid access token can see the hard coded message, once logged in)
