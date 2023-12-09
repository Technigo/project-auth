## Authors

[Julia Holm](https://github.com/JuliaHolm) & [Vera Witting](https://github.com/verawitting)

# Project Auth API

This project is a pair-programming by Julia Holm and Vera Witting. We have build an API with authentication to implement a user registration flow. In the frontend we did a "form" to register and sign in and view some content once logged in.

## The problem

In the backend we used Express.js, MongoDB and mongoose. For the frontend we used React and VITE.
We had problems with using the backend API in the frontend, more specifically the form tag that we first used in the frontend was not working. When we changed it to a div it worked and we found the solution with Stack Overflow and help from our code coaches.

OBS! The loading time can be a little long the first time you use the frontend. Just give it a long second, take a coffee break ☕  
If we had more time we would add a loader to the page.

## API Documentation

### Base URL
Frontend: https://auth-julia-vera.netlify.app  
Backend: https://register-login-auth.onrender.com

### Frontend Endpoints

#### 1. Login Page

| Endpoint | Method |
| :------- | :----- |
| `/`      | `GET`  |

_Displays the login page for users to enter their username and password._

#### 2. Registration Page

| Endpoint   | Method |
| :--------- | :----- |
| `/register`| `GET`  |

_Displays the registration page for users to sign up by providing a username, password and email._

#### 3. Authenticated Content Page

| Endpoint    | Method |
| :---------- | :----- |
| `/logged-in`| `GET`  |

_Displays content that is accessible only to authenticated users after successful login._

#### 4. Logout

| Endpoint | Method |
| :------- | :----- |
| `/logout`| `POST` |

_Logs the user out, clearing user information and redirecting to the login page._

### Backend Endpoints

#### 1. Get API Documentation

| Endpoint | Method |
| :------- | :----- |
| `/`      | `GET`  |

_Returns documentation of the API using Express List Endpoints._

#### 2. Register a new user

| Endpoint   | Method |
| :--------- | :----- |
| `/register`| `POST` |

| Request Body | Type     | Description                   |
| :----------- | :------- | :---------------------------- |
| `username`   | `string` | **Required**. Choose username |
| `password`   | `string` | **Required**. Choose password |
| `email`      | `string` | **Required**. User's email    |

#### 3. Login existing user

| Endpoint   | Method |
| :--------- | :----- |
| `/login`   | `POST` |

| Request Body | Type     | Description                   |
| :----------- | :------- | :---------------------------- |
| `username`   | `string` | **Required**. User's username |
| `password`   | `string` | **Required**. User's password |

#### 4. User list

| Endpoint | Method |
| :------- | :----- |
| `/users` | `GET`  |

_Retrieves a list of registered users for administrative purposes, excluding sensitive information like passwords and access tokens._

#### 5. Authenticated Endpoint

| Endpoint    | Method |
| :---------- | :----- |
| `/logged-in`| `GET`  |

| Request Headers | Type     | Description                        |
| :-------------- | :------- | :--------------------------------- |
| `Authorization` | `string` | **Required**. User's access token. |

## View it live

FRONTEND: https://auth-julia-vera.netlify.app

BACKEND: https://register-login-auth.onrender.com
