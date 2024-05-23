# Project Auth API

This project is a user authentication system built with React, Express.js, MongoDB, bcrypt, and crypto. The application provides secure user registration, login, and access to protected routes.

## The problem

.React: For building the frontend.
.Express.js: For handling backend routing and API logic.
.MongoDB: For storing user data.
.bcrypt: For hashing passwords before storing them in the database.
.crypto: For generating secure access tokens.
.dotenv: For managing environment variables securely.

If more time were available, the next steps would include implementing user roles, adding more comprehensive validation and error handling.

## API Endpoints

GET
./: Basic root route for testing, returns a welcome message.
./secrets: Access a protected route, requires a valid access token.

POST
./users: Register a new user.
./sessions: Log in an existing user.
./logout: Log out the user by invalidating the access token.

## View it live

You can view the live project [here](https://doggyadopt.netlify.app/)
