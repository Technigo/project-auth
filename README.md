# Project Auth - Developers: Anna Lindgren, Sofia Arzt Wallén, Elaine Bergstrom

What did we Learn?
-How to combine Frontend and Backend applications together.
-Built an API with authentication to create registration flow.
-Connected Frontend to create or register a user to our DB that is then linked in to our main page of content. 

## The problem

For this project we aimed to create our own backend to pull from to the frontend and display data on our main page after successfully logging in. The setup for this Express API consists of a MongoDB stored in Atlas and then deployed to Heroku. Mongoose was used for creating endpoints and manipulating the data. We then created a Schema, for the user, which defines the structure of the document.

Our Base URL for the API is: https://secret-auth-api.herokuapp.com/ 

Our Endpoints:

GET /secret 
Restricted endpoint - the user's accessToken must be included in the GET request from the frontend for the user to be able to see the secret message. We decided to redirect our users from this page instead of an error message if they try to access it without a proper accessToken.

POST /login
Endpoint to login for users that have already registered.

POST /register
Endpoint to register as a new user. This endpoint expects a name and password in the body from the POST request from the Frontend.

The frontend was built using React Redux and styled-components. We created one reducer for all the User logic (login, register, authenticate token, etc). 

If we had more time in the backend we'd love to build our own data collection to pull from and display in the frontend. We also would of added local storage, and email input with validation. We'd also like to use more re-useable components to avoid repeatition in our code.

## View it live

Netlify: https://romantic-torvalds-704609.netlify.app/
Heroku: https://secret-auth-api.herokuapp.com/ 
