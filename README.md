# Week 20 - Technigo Bootcamp

# Project Auth

Your project needs two parts; a backend API, and a React frontend. You'll need to create a `User` model using mongoose, with properties for your registered user, and to store a user's access token.

Then, on the frontend side of things, you'll need to build up a registration form that POSTs to your API. You'll need to store the access token you get back in the browser using local storage, and then use that token when making other requests to your API.

Once a user is logged in, you will need to have one last endpoint which returns some content which only logged-in users should be able to access. You can choose what you want this endpoint to return, and if you want to make multiple endpoints, that's fine too. It could return hard-coded data or something from the database - either is fine. Whatever you choose, it should be displayed in the frontend after you've logged in.

To summarise, your API needs:

- Registration endpoint, to create a new user.
- Sign-in endpoint, to authenticate a returning user.
- An authenticated endpoint which only returns content if the `Authorization` header with the user's token was correct.

Your frontend needs:

- A registration form.
- A sign-in form.
- A page to show the authenticated content from the API.
- A 'sign out' button that removes the saved access token and redirects the user to the login form.

## The problem

This is the last week of the small weekly projects, and in this case, I built a complete application with BE and FE. I followed the videos on the Technigo page and lectures to get all details possible. I developed a sign-up and sign-in page, and also some content from the database to show when the user is authenticated. I also included some error messages also to let the user know the error during the authentication process. 

I worked alone, and this week has been very interesting and challenging about how to use some libraries like crypto, and how to mix react-redux, react-router, the API with the database, and the frontend.  

## View it live

See backend: https://project-auth-backend.herokuapp.com/
See frontend: 
