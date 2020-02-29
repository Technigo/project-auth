Project Auth

This site authenticate users using tokens, shows how to securely store passwords in your databases, tought me how to think about security and defensive design when building frontend or backend code and I learnt about some common attacks which are used against sites and how to protect against them. 

This project needed two parts; a backend API, and a React frontend so I had to create a `User` model using mongoose, with properties for my registered user, and to store a user's access token.

Then, on the frontend side of things, l needed to build up a registration form which POSTs to my API. l had to store the access token I got back in the browser using local storage, and then use that token when making other requests to my API.

Once a user was logged in, l had to have one last endpoint which could return some content which only logged-in users should be able to access. I could choose what I wanted this endpoint to return, and if I wanted to make multiple endpoints. It could return hard-coded data, or something from the database - either was fine. Whatever I choose, it should be displayed in the frontend after I had logged in.


The problems was to tie the backend to the frontend and to make sure the access token really worked as a gate keeper.
With help from google and peers we solved the problems.

See it live here:
Heroku https://pb-auth-api.herokuapp.com/ 
Netlify https://pb-authorization.netlify.com
