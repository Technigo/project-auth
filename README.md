# Project Auth

Pair-programming project developed by Jessica Falk and Naushin Malik

This project's goal was developing an API with authentication in order to implement a sign-in/sign-up interface with authentication.

## The problem

We learned how to authenticate users using tokens and how to store passwords in databases in a secure way. We also created a Frontend with a form to register, sign in and be able to see restricted content in case the login was successful.

We used MongodB and Mongoose to build our Backend Express API. This API has 4 endpoints:

1: A POST endpoint to create a new user.
2: A POST endpoint for the existing users to log in.
3: A GET endpoint to receive restricted data based on the validation of user through access token.
4: A POST endpoint to add restricted content.

## View it live

Frontend: https://signuptobehappy.netlify.app/login
Backend: https://user-autherisation.herokuapp.com/
