# Project Auth

This is an API with authentication to implement a registration flow, and a frontend with forms to register, sign in, and view some content once the users is logged in.

## The problem

My project has two parts; a backend API, and a React frontend. 

I have creates a `User` model using mongoose, with properties for my registered user, and to store the user's access token. 

Then, on the frontend side of things, I have built up a registration form which POSTs to my API. I've then stored the access token that I got back in the browser using local storage, and then used that token when making other requests to my API.

Once a user is logged in, I've one last endpoint which returns a super secret message which only logged-in users will be able to access. The password is encrypted with bcrypt.

I have included some different http status codes depending on the result. 

## View it live

https://determined-spence-6e20e0.netlify.app/ 