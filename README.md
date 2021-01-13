# Project Auth

This project has an API with authentication (with validations) to implement a registration flow, and a frontend with a form registration which POST to the API. The front-end has form validation, a sign in, to view a secret message content once you're logged in, and a log out.

The project has
* Registration endpoint, to create a new user
* Sign-in endpoint, to authenticate a returning user.
* An authenticated endpoint which only returns content if the `Authorization` header with the user's token was correct.
* A 'sign out' button that removes the saved access token and redirects the user to the login form.

## Tech
* mongoose
* express
* React
* material-ui


## View it live


