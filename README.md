# Project Auth

This was a pair project by Jessica Nordahl and Madelene Trang.
The aim of this week was to build a fullstack app by using Nodejs for backend and react, redux and styled components for frontend. We also learned how to securely store encrypted passwords, authenticate users using tokens. We built our API with a security and a defensive design in mind.

Our API contains:

- Registration endpoint, to create a new user.
- Sign-in endpoint, to authenticate a returning user.
- An authenticated endpoint which only returns content if the `Authorization` header with the user's token was correct.
- Post and get endpoint for posting and fetching secret.

Our frontend contains:

- A registration form.
- A sign-in form.
- A page to show the authenticated content from the API.
- A 'sign out' button that removes the saved access token and redirects the user to the login form.

## The challenges

To learn how to authenticate users by using accesstokens and understand the flow between frontend and backend.

## View it live

https://login-for-secrets.netlify.app/login
