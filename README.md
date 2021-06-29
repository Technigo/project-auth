# Project Auth
This project was made by Malin Göthe and Felicia Liabäck Löwstedt.
This week we have learned to authenticate users and handle passwords.

- How to authenticate users using tokens
- How to securely store passwords in your databases
- How to think about security and defensive design when building frontend or backend code
- Some common attacks which are used against sites and how to protect against them

## The problem

Our project consists of two parts, a backend API, and a React frontend. In the backend we have a user model and thoughts model using mongoose with properties for the registered user, and to store a user's access token. In frontend we have a registration form that POST to our API. The passwords in the database are encrypted with bcrypt. 

## View it live

https://project-auth-fl-mg.herokuapp.com

