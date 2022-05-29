# Project Auth API

Authenticating a user based on login information by comparing user inputs from form fields with database stored user information. Also checking for cookie to display a "secret" page open only when authenticated.

## The problem

Tried to set cookies through the server, which was successful but only worked in Postman. Figured out that the cookies that have to be sent through the get-request are not attached due to cors policies with backend and frontend deployment links coming from different origins. Tried solving this through setting origin and credentials prototypes in the imported cors in the express-file, amongst other things but did not seem to work.

Thus changed approach due to the time-constraint of this project deadline, and used sessionStorage. Even though not favored due to its vulnerabilities for XSS attacks/obtaining information through it being stored client-side/accessible through javascript, I find it okay for this project wihtin development environment, but probably would not use it for production.

## View it live

https://symphonious-otter-f4f9a9.netlify.app/