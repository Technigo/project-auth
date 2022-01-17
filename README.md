# Project Auth
 We built an API with authentication to implement a registration flow, and a frontend with forms to register, sign in, and view some content once you're logged in.
 
## The problem

Our project consists of two parts; a backend API, and a React frontend. We created a `User` model using mongoose, with properties to registered users, and to store a user's access token.

On the frontend side of things, we created a registration form that POSTs an API. We had to store the access token that we got back in the browser using local storage, and then we used that token when making other requests to our API.
When you signin you will see the 20 most popular movies, right know.


## View it live

https://heuristic-payne-c25e27.netlify.app/login
