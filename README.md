Project Auth
An build API with authentication to implement a registration flow and a frontend with forms to register and login and view some content once you're logged in.

Its created with a backend API and a React frontend. A User model is created with mongoose with properties for the registered user and to store a user's access token.

On the frontend side a registration form is built which POSTs to the API. The access token is stored in order to get back in the browser using local storage. Then we use that token when we are making other requests to the API.

Once a user is logged in, there is a final endpoint which returns some content which only logged-in users should be able to access.

The problem
The problems was to tie the backend to the frontend and to make sure the access token really worked as a gate keeper.
With help from google and peers we solved the problems.

See it live here:
Heroku https://pb-auth-api.herokuapp.com/ 
Netlify https://pb-authorization.netlify.com
