# Project Auth

This was a Week 20 project @Technigo Frontend Bootcamp made by Julia Nikitina and Elsa Carlström. The assignment was to create a fullstack project connecting a backend API and a React frontend.

On a backend we needed to create three endpoints: a registration endpoint (to create a new user), a sign-in endpoint, to authenticate a returning user and an authenticated endpoint which only shows the content if the Authorization header with the user's token was correct.

On a frontend we implemented a sign up and a sign-in form, a page to show the authenticated content from the NASA API and a 'sign out' button that removes the saved access token and redirects the user to the login form.

## The problem and technologies

We have not faced any big issues, but we are proud that we managed to reach some stretch goals like improved validation for email address on a backend and displaying error messages on a frontend where it occurred (username duplicate or missing email).
If we had more time we would implement a POST endpoint to add a comment on today's NASA image :)

Backend technologies:

- Mongoose to create a User's schema and a model based on the schema
- Bcrypt method for salt to safely hash and store passwords
- Async/await was used for promises
- Regex to validate that the e-mail address provided by the user follows the correct format
- Deployed to MongoDB through Heroku

Frontend technologies:

- React/React Routes
- Redux (store, reducers)
- Styled components implementation for styling
- localStorage to enable user to stay logged in when reloading the page
- Lottie library for animations
- API fetch
- React Font Awesome icons

## View it live

Frontend: https://space-a-day.netlify.app/;
Backend: https://julia-elsa-fullstack.herokuapp.com/
