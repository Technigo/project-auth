# Project Auth
A pair-programming project made by Jessica Hermansson and Karoline Mann. 
The project goal was to build an API with authentication to implement a registration flow, and a frontend with forms to register, sign in, and view some content once you're logged in. 

## The problem
In the backend we started by creating a User model using mongoose, with properties for a registered user, and to store a user's access token. Then we added endpoints for sing-up and sign-in, and finally an authenticated endpoint.
We also made it so that the passwords in the database will be encrypted with bcrypt.

In the frontend we added a sign-up form which makes a POST request to the API to create a new user. 
Then a sign-in option was created. By using Redux we are able to update the access token and user information to make sure they match. With a GET request to the API, the user is then able to see the page with the authenticated content.
We also added a 'log out' button. By using dispatch the access token is removed/set to null, which redirects the user to the login form.

## View it live
Frontend: https://auth-jessica-karoline.netlify.app/signin
Backend API: https://auth-app-j-k.herokuapp.com/
