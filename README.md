# Project Auth API

This project involves creating a full-stack application with a backend API and a React frontend for user authentication. The backend API, built using Express and MongoDB, includes endpoints for user registration, login, and an authenticated endpoint for logged-in users. The frontend incorporates registration and sign-in forms, a page to display authenticated content, and a sign-out button. Key features include bcrypt-encrypted passwords, proper handling of authentication errors, and validation of user input.

## The Problem

To address this challenge, I implemented a backend API using Express and MongoDB to handle user registration, login, and authentication. The frontend, built with React, includes forms for user registration and sign-in. The project uses local storage to store and manage access tokens for authenticated users. Bcrypt is employed for password encryption, and the backend validates user input, providing appropriate error messages. The stretch goals involve enhancing the application's functionality and security.

The project have two parts: a backend API and a React frontend. Follow these requirements:

#### Backend

- The `User` model using mongoose.
- Routes for user registration, login, and an authenticated endpoint.
- A sign-in form.
- Encrypt passwords in the database with bcrypt.
- user validation input during registration and return error messages.

#### Frontend

- A registration form that POSTs to the API.
- Store the access token in the browser using local storage.
- A sign-in form.
- A page to display authenticated content.
- A 'sign out' button to remove the access token.

#### Requirements

- The API should have routes for registration, login, and an authenticated endpoint.
- The authenticated endpoint should return a 401 or 403 for incorrect or missing tokens.
- The frontend should have a registration form posting to the API.
- Encrypt passwords with bcrypt.
- API should validate user input and return error messages.

### Stretch Goals

#### Intermediate Stretch Goals

- Store data in the database for authenticated data routes.
- Display error messages from the API next to the corresponding input fields during registration.

#### Advanced Stretch Goals

- Add more routes for logged-in users.
- Improve backend validations for unique email addresses or validate email format.



## Technologies Used

### Backend: 
Express, MongoDB, Bcrypt, JSON Web Token

### Frontend: 
React, React Router

#### Stretch Goals: 
Database data storage, improved error messaging, Google authentication with Firebase

If I had more time, I would explore and implement advanced stretch goals to add more features, improve backend validations, and enhance the overall user experience.

## View it live

Check out the deployed project:

- **Backend Deploy:** [Project Auth API](https://project-auth-1.onrender.com/)
- **Frontend Deploy:** [Project Auth Frontend](https://6572f11d60878875620f10bf--steady-queijadas-17fe7d.netlify.app/home)


