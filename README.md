# Project Auth
A project with two parts; a backend API, and a React frontend. In this project, we were supposed to create a User model using mongoose, with properties for the registered user, and storage of a user's access token.


## Requirements

A backend API with:

- Registration endpoint, to create a new user.
- Sign-in endpoint, to authenticate a returning user.
- An authenticated endpoint which only returns content if the athorization header with the user's token was correct.

A frontend with:

- A registration form.
- A sign-in form.
- A page to show the authenticated content from the API.
- A 'sign out' button that removes the saved access token and redirects the user to the login form.

## Endpoints

GET /listitems 

- endpoint to get all items on the grocery shopping list, after authentication.

POST /listitems

-endpoint to post new items to the grocery shopping list, after authentication.

POST /signup 

- endpoint to signup as new user with username and password

POST /signin

- endpoint for an already created user to sign in with username and password.



## View it live

The backend is deployed here:

https://grocerylistitems.herokuapp.com/

The frontend can be seen here:

https://grocery-shoppinglist.netlify.app/