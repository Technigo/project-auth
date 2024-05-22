# Project Auth API

This weeks assignment was to build a backend API and a React frontend. The backend handles user authentication, while the frontend includes a registration form, token storage, and access to restricted (secret) content after login.

## The problem

Backend:
I followed the codealong and added more specific error messages.

Frontend:
I started by creating separate components for login and signup functionalities. These components communicate with the backend API for user authentication and account creation. Using styled components for styling and React Router for navigation. Error handling was implemented to provide clear feedback to users. You should get errors if you try and create an account that already exists, if you try to log in without creating a user, if you write the wrong username/password, you should get a success message when you've succesfully created a user which will be displayed on the login page ect. If I had more time, I would refine error messages and enhance user experience with features like form validation. I also intended to create a separate component named AccountPage.jsx to handle account-related functions and content. However, due to issues with the login, I the the code intended for the "Account Page" within LoginPage.jsx. This decision was made to resolve the login issues.

## View it live

Backend:

Frontend:
