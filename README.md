# Project Auth

This project we built an API with authentication to implement a registration flow. The frontend consists of a form to sign up and sign in. Once the user is logged in you can access the restricted content.
It was a pair programming project built by:
Isabel González and Ida Aspen

## Features

### Frontend

- A registration form which POSTs to the API to create a new user
- Displaying errors using error messages from backend

### Backend

- API with routes to login, signup and an authenticated endpoint
- Encrypted password using bcrypt
- API validates the user input when creating a new user, and return error messages which could be shown by the frontend
- API deployed to Heroku.
- Database deployed using mongo cloud.
- Deployed to Netlify.

## View it live

Backend
`https://project-auth-secrets.herokuapp.com/`

Frontend
`https://ida-and-isabel-secrets.netlify.app/login`
