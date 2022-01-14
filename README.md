# Project Auth

A pair programming project made by Birgit Nehrwein and Rebecca Philipson.
The project consists of two parts; a backend API with authentication to implement a registration flow, and a React frontend with a form to register, sign in and view some content once the user is logged in.

## The problem

First we created a user model using mongoose, with properties for our registered users, and to store a user's access token. Then on the frontend side we built a registration form that POSTs to our API.

What we have learned:

- How to authenticate users using tokens
- How to securely store passwords in our databases
- How to think about security and defensive design when building frontend or backend code
- Some common attacks which are used against sites and how to protect against them
- How to build a registration flow
- How to handle authentication, both in the frontend and in the backend
- How to build a frontend and backend at the same time

## View it live

Deployed frontend on Netlify: https://proj-auth-rephili-bine.netlify.app/
Deployed backend on heroku: https://proj-auth-rephili-bine.herokuapp.com/
