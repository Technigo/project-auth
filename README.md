# Project Auth

Fullstack application that authenticates users and handles passwords. Backend consists of an API with authentication and a frontend with forms to register, sign in and view certain content when signed in, in order to get the full registration flow.

## The problem

This was a pair-programming project, so we started to make a plan how to structure the project and our working hours.
We installed all dependencies in order to build a backend with Mongo express and Mongoose, and a frontend in React and Redux, then began building the API to store users. We built a Mongoose Schema and Model, then created endpoints to store new users in the database. In order to save user passwords securely, an access token is stored with each user. This token is later being checked and if it is correct, you are logged in and can access another endpoint.

If you had more time, what would be next?

## View it live

Every project should be deployed somewhere. Be sure to include the link to the deployed project so that the viewer can click around and see what it's all about.
