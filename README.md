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

## Challenges and lessons learned

- We used a password generator to test strong passwords. Not noticing that the generator added white spaces resulted in false results on the test.
- A request in the backend was not passing through because of a typo ("sucess" instead of "success").
- Deployment was particularly challenging. We had to make sure the frontend was fetching from the right URL (all characters included. A slash was missing).
- Last but not least, missing the \_redirects file inside the public frontend folder was causing deployment issues as well.

## View it live

Backend
`https://project-auth-secrets.herokuapp.com/`

Frontend
`https://ida-and-isabel-secrets.netlify.app/login`

Documentation for endpoints can be found in Documentation.md
