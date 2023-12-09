# Project Auth API

This project is a pair-programming by Julia Holm and Vera Witting. We have build an API with authentication to implement a user registration flow. In the frontend we did a "form" to register and sign in and view some content once logged in.

## The problem

In the backend we used Express.js, MongoDB and mongoose. For the frontend we used React and VITE.
We had problems with using the backend API in the frontend, more specifically the form tag that we first used in the frontend was not working. When we changed it to a div it worked and we found the solution with Stack Overflow and help from our code coaches.

OBS! The loading time can be a little long the first time you use the frontend. Just give it a long second, take a coffee break ☕️
If we had more time we would add a loader to the page.

## API Documentation

This API allows users to register, sign in, access authenticated content, and sign out.

### Base URL

The base URL for all API endpoints is:
https://auth-julia-vera.netlify.app

### Endpoints

1. Get API Documentation
Endpoint: /
Method: GET
Description: Returns documentation of the API using Express List Endpoints.

2. Register a new user
Endpoint: /register
Method: POST
Request Body:
- username (string): User's username.
- password (string): User's password.
- email (string): User's email.

3. Login existing user
Endpoint: /login
Method: POST
Request Body:
- username (string): User's username.
- password (string): User's password.

4. User list
Endpoint: /users
Method: GET
Description: Retrieves a list of registered users for administrative purposes, excluding sensitive information like passwords and access tokens.

5. Authenticated Endpoint
Endpoint: /logged-in
Method: GET
Request Headers:
- Authorization (string): User's access token.

## View it live

FRONTEND: https://auth-julia-vera.netlify.app
BACKEND: https://register-login-auth.onrender.com
