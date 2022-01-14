# Project Auth

Created a sign in/sign up form in react with POST requests. Bulding our backend with MongoDB, Mongoose schemas & model, bcrypted/hashed & salted passwords. We authenticate our users before reaching logged in pages.

## The problem

We used Redux to dispatch actions for our users accessToken, username and errors. We also created reducers to clear accessToken, redirecting them from logged in to logged out. React Router to navigate from sign in/sign up to logged in page. In the backend we used Mongoose Schema and authenticated our users with bcrypt.

Stretch goal: To let the authenticated user upload a profile pic by posting it to Mongo DB. Still in progress.

## View it live

jakob-lovisa-authorization.netlify.app
