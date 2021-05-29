# Project Auth

This assignment was a pair-programmed fullstack project during the Technigo Boot Camp of week 20. The main brief was to build an API with authentication to implement a registration flow - and a frontend with forms to register, sign in, and view a certain content once you're logged in.

## The problem

Since both us of are highly interested in concepts and design, we started off this week by creating a Figma sketch for our project. We had a great giph created by Elle, that we decided to use as our "secret" content displayed once the user had registered or signed in. The idea was to get the user curious about who was hiding in the other end of the electrical cord.

Our aim was to succeed in implementing the general requirements listed below, which we did by closely following this weeks lectures:

- The API should have routes to register and login, and finally an authenticated endpoint.
- The authenticated endpoint should return a 401 or 403 (see 401 vs. 403 on SO) with an error message if you try to access it without an Authentication access token or with an invalid token.
- The frontend should have a registration form which POSTs to the API to create a new user.
- The passwords in the database should be encrypted with bcrypt.
- The API should validate the user input when creating a new user, and return error messages which could be shown by the frontend.

When we have more time we would like to investigate why the inital page load at times is a bit slow, perhaps our image content might be a bit too heavy. Initially we also wanted to use Styled Components, but decided to go for separate css-files as we both felt more comfortable with that approach.

We are very happy with our visuals - and the code too!

## View it live

To view this project live, please follow these links:

Deployed site: https://elegant-hopper-4950bc.netlify.app/
Deployed database: https://pingu-register-app.herokuapp.com/
