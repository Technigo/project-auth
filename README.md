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

Describe how you approached to problem, and what tools and techniques you used to solve it. How did you plan? What technologies did you use? If you had more time, what would be next?

## View it live

See backend: 
See frontend: 
