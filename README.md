# Project Auth

This is pair project done by Rosanna Dahlberg & Jenny Quach at Technigos Bootcamp. This week we were tie all the skills we've learnt so far to build an API with authentication to implement a registration flow, and a frontend with forms to register, sign in, and view some content once you're logged in. 

## How we did it
We started by creating the back end:
- Create a User model and schema.
- Adding endpoint, to create a new user. 
- Sign-in endpoint, to authenticate a returning user.
- And least but not last an authenticated endpoint which only returns content if the Authorization header with the user's token was correct.

We tried out the backend in Postman so we could see that the POST and GET requests worked before starting on the front end. 

We decided to go for a simple but clean front end. A simle modal where you can either sign up or sign in. When the user has signed in the perosnal profile page appers with a welcome text and log out button.

 What we learned this week:
- How to authenticate users using tokens
- How to securely store passwords in your databases
- How to think about security and defensive design when building frontend or backend code
- Some common attacks which are used against sites and how to protect against them
- How to build a registration flow
- How to handle authentication, both in the frontend and in the backend
- How to build a frontend and backend at the same time

## View it live
https://rosanna-jenny-auth-app.netlify.app/

https://week20-auth-backend.herokuapp.com/
