# Project Auth

This project was to build an API with authentication to implement a registration flow, and build a frontend with forms to register, sign in, and direct the authenticated user to a "logged-in"-page once they were authenticated.

## Features

backend:

- a signup endpoint, to create a new user.
- Sign-in endpoint, to authenticate a returning user.
- An authenticated endpoint which only returns content if the Authorization header with the user's token was correct.
- API deployed on Heroku
- database deployed using mongoDB
- passwords in the database encrypted with bcrypt

frontend:

- A registration form.
- A sign-in form.
- A page that shows the authenticated content from the API.
- A 'sign out' button that removes the saved access token and redirects the user to the login form.
- frontend deployed on netlify

## The process and problems

we encountered some issues when we deployed our project to heroku. the connection string to the database stopped working when trying to create new users to the database, we then discovered that we had to delete the database collection and create a new connection which made it work.
We also wanted to display a button that changes the mode in the useState hook to either sign in or sign up depending on what the user wanted. for That we created a ternary operator to display different buttons that onClick alternated between the states.

## View it live

frontend:
https://project-auth-emelie-nina.netlify.app/

backend:
https://project-auth-emelie-nina.herokuapp.com
