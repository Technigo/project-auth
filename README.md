# Project Auth API
This is a fullstack project with an API containing registration endpoint to create a new user. A sign in endpoint to authenticate a returning user and an authenticated endpoint only retrievable if users token was correct.
All this shall be applied to frontend by a register/sign in form that navigates to authenticated endpoint that also includes a log out possibility.

## The problem
We started to complete the backend by using the techniques we learned such as crypto for the password and bcrypt for accesstoken. We had some trouble in the frontend  - the first thing was the accesstoken  - where we had forgotten to add the setAccessToken as a reducer. Then when trying to retrieve error messages  - we realized that there was a misspelling in the backend. 

If we had more time we would do more with the styling part.

## View it live
https://auth-api-notes.herokuapp.com/
https://magnificent-shortbread-a5eb44.netlify.app/
