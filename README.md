# Project User Authentication API and Frontend
This project is a full-stack application designed to handle user registration, authentication, and protecting routes that return sensitive data. It utilizes a token-based authentication system on the backend and a React.js frontend with Redux state management. It was built using Node.js, Express, MongoDB on the backend, and React.js, Redux, React Router on the frontend. The full application is deployed on Google Cloud and Netlify.

# The Problem
The main challenge of this project was to develop a system that securely handles user registration, authentication, and provides access to protected data. The backend API provides several routes for these actions, all of which are secured using token-based authentication. The frontend part of the project provides a user-friendly interface for registration, login, and viewing protected data.

# Technologies Used:
- Node.js
- Express
- CORS
- Mongoose
- MongoDB
- bcrypt
- crypto
- React.js
- Redux
- React Router
- MaterialUI

# Features:
- User registration with password complexity requirements
- User sign-in with password matching
- Authenticated access to protected data
- Token-based user session management
- Redux state management for user and secret data
- Routing with React Router

# MongoDB Schema:
A user in the database is defined with the following properties:

- username: A string that is required and unique.
- password: A string that is required.
- accessToken: A string that is unique for each user and generated when a new user is created.

# React Components:
- Startpage
- Register
- Login
- Secrets
- NotFound

# Endpoints/Routes:
Backend:
- / - GET route that returns the list of available endpoints
- /register - POST route to register a new user
- /login - POST route to authenticate a user and return a token
- /secrets - GET route that requires authentication and returns sensitive data

Frontend:
- / - Startpage
- /register - User registration page
- /login - User login page
- /secrets - Page that displays authenticated content from the API
- /* - 404 page

# How to Run the API Locally:
- Clone the repository
- Install dependencies with `npm install`
- Make sure MongoDB is installed and running
- Run the server with `npm start`
- Access the API at http://localhost:8080

# How to Run the Frontend Locally:
- Clone the repository
- Install dependencies with `npm install`
- Run the server with `npm start`
- Access the frontend at http://localhost:3000

# API Deployed on Google Cloud:

# The Frontend is Deployed on Netlify:
https://authorization-project.netlify.app/