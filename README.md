# Project Auth - Pair project - Jessica Nygren Walhed & Daniel Vestin

 First fullstack project, API with authentication to implement a registration flow, and a frontend with forms to register, sign in, and view some content once the user is logged in.
 
 BE: node,js, Express, Mongoose, MongoDB, Heroku
 FE: React, React Router, React Redux, Redux Toolkit, Netlify


## The problem

The user needs to be authorized to be able to see the "secret" content.
A user model created with mongoose, a registration form that posts to the database. If user already is signed up they choose to sign in instead.

Backend
- Registration endpoint, to create a new user.
- Sign-in endpoint, to authenticate a returning user.
- An authenticated endpoint which only returns content if the `Authorization` header with the user's token was correct.

Frontend
- A registration form.
- A sign-in form.
- A page to show the authenticated content from the API.
- A 'sign out' button that removes the saved access token and redirects the user to the login form.


### Link to Frontend
https://psst-very-secret.netlify.app/

### Link to Backend on Heroku
https://jes-secret-api.herokuapp.com/

