# Project Auth

Project Auth by Olof & Bäm

Assignment was to create a backend including authorization of user, including both signup / login. And also to manage errors in case of unsuccesful signup/login.

## The problem

We structured the project so that one person started building a frontend and the other the backend.

Backend
- express/node/mongo to create endpoints for storing users
- also created mongoose model to let users create simple notes that could then be shown in the frontend.
- authorization of user is achieved by using middleware that runs before user/session is saved to the database
- Authenticateuser method that runs before any protected endpoints to verify that user has access to that endpoint

Frontend
- react app with components for signup/login and a component that renders for logged in users. In that component user can add new notes (happy thoughts style) and also get a list of previous notes they have written
- redux for state management
- styled components for styling frontend

If we had more time we would probably have made better use of the logout functionality and maybe added local storage to persist the user session.

Backend endpoints:

/users (POST) to create new user
/sessions (POST) to login user
/secrets (GET) dummy endpoint not really used, to test that authentication works
/notes (POST) to let users create notes that are then related to that user by userid
/notes (GET) to get list of notes for a specific user (related to their userid)

## View it live

Frontend: https://project-auth-bamolof.netlify.app/
Backend: https://project-auth-olof.herokuapp.com/