# Project Auth

This projects purpose was to practice building an API with authentication to implement a registrations flow, with a frontend where the user can register, 
sign in and view authorized content. This was a pair-programming project between Shaun Newmark and Erika Andersson Porath

## The problem

We started by watching and reading the provided materials. Then we went on and did the backend part and sat up the server with the endpoints for sign in
and sign up, a mongoose model, authorization with a token key and error catching. We use bcrypt to cryptorize the passwords and crypto for the token key. 
After setting up the backend we tested it out in Postman to see if it worked out.
In the frontend part we're using React Router for the paths. We're reaching the API data by POST and GET requests that lets the user to sign up and log in.
After the log in the user is redirected to an authorized site, where they also can log out and return on the log in screen. We used a Material UI library
for styling.
Our main problem was time management because it was difficult to find a time we could work together since we have different working hours. We ended up doing a lot on our own end since we both followed along and used the solutions in the lectures, and then we met up and merged our projects together. The errors we ran into was mostly caused by typos. If we had more time we would like to have improved the frontend with better shown error messages and let the user post things on the authorized side. On the backend signed we would like to improve the validations for the sign-up/sign-in form.

## View it live

The project is deployed in Heroku and Netlify, and the database is set up in Mongo Cloud Atlas.
See the deployed frontend here:  https://fervent-allen-86afba.netlify.app/

API: https://auth-updated.herokuapp.com/ 
