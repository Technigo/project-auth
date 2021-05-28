# Project Auth

For this week's project, we're tying up all the skills we've learnt so far to build an API with authentication to implement a registration flow, and a frontend with forms to register, sign in, and view some content once the user is logged in.

## The problem

Below follows what we have implemented in this project.

### Backend 
- Created a User model with properties username, password and accessToken using mongoose
- Set up endpoints for register, login and authentication of a user (endpoint giving access to "secret" content if the user is registered as a member)
- The authenticated endpoint returns a status 401 with an error message if a user tries to access it without an access token or an invalid token
- Validation of user input when creating a new user, which returns error message if the registration fails 
- We also created an Inspo model and added json response to the database with images from Unsplash that is randomly selected using the mongodb method aggregate.sample 

### Frontend
- Structured pages and components and allocated code accordingly (sign in/up form, main page displaying secret content, sign out button). Added functionality and react hooks, props and styled them with styled components
- Set up of reducers and slices
- Stored access token in localStorage, which was saved to Redux store
- Made use of browserrouter, provider, switch, routes
- Displayed an error message when the validation of user input when creating a new user fails 


## View it live

* Here's the link to our live fullstack application: https://clever-wright-d2914b.netlify.app
* Here's the link to our live API: https://project-auth-isma-toha.herokuapp.com/ 


### Available paths backend
"path": "/",
"methods": "GET"

"path": "/travelinspo",
"methods": "GET"

"path": "/signup",
"methods": "POST"

"path": "/signin",
"methods": "POST"
