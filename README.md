# Project Auth

This project's goal was to build an API with authentication using acces token and securly save passwords in database. Also create a frontend with form where users can register, sign in and only then see restricted content.
This was a pair programming project made by Sofia Wallerberg and Aleksandra Safranko.

# How we built it and what we learned

The backend was made with Express API using mongoose and MongoDB for our user database. We used one main "User" model to store our users in the database with different validation properties so we make sure that data is stored properly or is unique.In the frontend we are using a combination of Redux and local state to keep track of signup and signin flow.
Our main endpoints are:

- A POST endpoint to create new user.
- A POST endpoint for existing users to sign in.
- A GET endpoint that is restricted with authentication middleware so it is only accessible with a valid access token that we receive from the database.

## View it live

Frontend: https://sofia-aleksa-cat-society.netlify.app/
Backend: https://user-signup-sofia-aleksa.herokuapp.com
