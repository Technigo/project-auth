# Project Auth
This project is about authentication in a sign in form. A user can sign up and log in and then get access to their “secret info”. The authentication is handled both in the frontend and in the backend. Both the backend and the frontend is built in the project. The flow: when a user signs up/log in in the registration form a POST req is sent to the API, storing the a access token using local storage, and then making other requests to the API with it.
Techniques used:
- Node.js
- Express 
- MongoDb for the backend  
- React and Redux for the frontend.
- Postman
- Mongo compass
The project has been done by pair programming using live share in VSCode.
General Requirements for the API 
Registration endpoint, to create a new user.
Sign-in endpoint, to authenticate a returning user.
An authenticated endpoint which only returns content if the Auhourization header with the user’s token was correct.
General Requirements for the frontend 
A registration form.
A sign-in form.
A page to show the authenticated content from the API.
A ‘sign out’ button that removes the saved access token and redirects the user to the login form.

## View it live

Deployed frontend:
Deployed API:
