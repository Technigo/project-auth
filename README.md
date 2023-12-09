# Project Auth API

Your project needs two parts; a backend API, and a React frontend. You'll need to create a User model using mongoose, with properties for your registered user, and to store a user's access token. Then, on the frontend side of things, you'll need to build up a registration form that POSTs to your API. You'll need to store the access token you get back in the browser using local storage, and then use that token when making other requests to your API.

Once a user is logged in, you will need to have one last endpoint which returns some content which only logged-in users should be able to access. You can choose what you want this endpoint to return, and if you want to make multiple endpoints, that's fine too. It could return hard-coded data or something from the database - either is fine. Whatever you choose, it should be displayed in the frontend after you've logged in.

To summarise, your API needs:

Registration endpoint, to create a new user.
Sign-in endpoint, to authenticate a returning user.
An authenticated endpoint which only returns content if the Authorization header with the user's token was correct.
Your frontend needs:

A registration form.
A sign-in form.
A page to show the authenticated content from the API.
A 'sign out' button that removes the saved access token and redirects the user to the login form.

<ins>My endpoints/routes</ins>: 

    "path": "/",
    "methods": "GET"
    
    "path": "/users",
    "methods": "GET"

    "path": "/login",
    "methods": "POST"

    "path": "/register",
    "methods":"POST"

## The problem

<ins>Describe how you approached to problem</ins>: I first tackled the backend and wrote simple endpoints with everything in the Server.js file, I then refactored my structure and followed Diego's examples, trying to follow each line of code, there are several things I am still confused about! I had issues with the Bcrypt when deploying the backend and realised i was using bcrypt-nodejs. 

I had issues connecting my db to my frontend at local host to help debug it. Help from my team was much appreciated! I was confused following Diego's example using Zustand so created a much simpler version, keeping the fetch function inside the register component.

I have one home page that displays both login and register options which then use React-Router to navigate and tenary oporators to display more information on the same page if the registration or login was successful.

<ins>How did you plan?</ins>: Completing the course content, I completed the code alongs and was able to get this simple structure to work. I started with this, everything in the server.js file and then slowly followed Diego's code example to re:structure into models, middleware, controllers, and routes. For the frontend I used React Router and useNavigate for navigation. I deployed both frontend and backend early on in the project.

<ins>What tools and techniques you used to solve it</ins>: Express API, MongoDB, Mongoose, jsonwebtoken, express-asyn-handler, bcrypt, dotenv  ...and for my frontend: HTML+CSS, React, JS, React Router, useNavigation

<ins>What technologies did you use?</ins>: HTML, CSS, JavaScript, React, React Router, React hooks (useState, useParams, useEffect)

<ins>If you had more time, what would be next?</ins>: I want to get my frontend and backend working together! So I need to spend time working out how to do this.

## View it live

Backend: https://project-auth-0x8y.onrender.com/

Frontend: https://wk16-project-auth-a42557.netlify.app/
