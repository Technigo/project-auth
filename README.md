# Project Auth

Fullstack application that authenticates users and handles passwords. Backend consists of an API with authentication and a frontend with forms to register, sign in and view certain content when signed in, in order to get the full registration flow.

## The problem

This was a pair-programming project, so we started to make a plan how to structure the project and our working hours.
We installed all dependencies in order to build a backend with Mongo express and Mongoose, and a frontend in React and Redux, then began building the API to store users. We built a Mongoose Schema and Model, then created endpoints to store new users in the database. In order to save user passwords securely, an access token is stored with each user. This token is later being checked and if it is correct, you are authenticated and can access an other endpoint.
We built the frontend in React and Redux to store information about the logged in user globally. By using conditionals, the form differs depending on whether you will log in or sign up. There are alerts with appropriate error messages and a 404-page that you are dericted to if something goes wrong.

If we had more time, we would have made it possible to log in by being directed to google or linkedin.

## View it live

https://admj-authentication.herokuapp.com/
