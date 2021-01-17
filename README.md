# Project Auth

The purpose of this project was to build an API with authentication to implement a registration flow and a frontend with forms to register, sign in and view some content once logged in. 

I built it together with [Max Forssén](https://github.com/monkeybusiness101) during the Technigo Bootcamp for frontend developers in fall 2020.

## What it does

In this application you can:
- sign up as a new user
- log in as an existing user
- access the start page after login (as authenticated user)
- access your profile and change your alias (as authorized user)
- navigate between start page and profile page
- log out 

## The approach

Following the brief, we started with the creation of a `User` model using mongoose, where the registered user could store email address and password and where a secured access token was generated at user creation.

Then we created our endpoints and tested them in Postman:
- `POST /users` to be used when signing up. We made sure that the properties `email` and `password` were the only ones that could be populated using this endpoint, that `email` was unique and that the password was hashed before storage. The endpoint responds with an user ID and an access token.
- `POST /sessions` to be used when signing in. This endpoint will search for an existing user with matching email and compare the entered password with the user's hashed password. In case of positive authentication, the endpoint will respond with the user ID and the access token.
- `GET /users/:userId/profile` to be used when retrieving user details. This endpoint is secured by a authentication function that checks if the user's access token provided in the `Authorization` header exists. Moreover, the endpoint will only return content if the access token is correlated to the requested user ID.
All endpoints return customized error messages when validation fails.

The following step consisted in creating a signup form, a login form, a start page and a profile page in frontend. We decided to use Redux to keep the user ID and the access token in a local storage and React Router to navigate between the different pages and manage 404 errors.
When sign up/sign in details don't get validated, an error message is displayed under the form.
The start page can be accessed with a valid token, the profile page when the valid token matches the requested user ID. 
We completed the application with a logout button that removes user ID and access token from the local storage.

When this was done and we met the minimum requirements, we decided to spend some time on streched goals:
- we created a Mongoose Schema and added a pre hook to validate the password against the schema before hashing
- we added an `alias` property in `userSchema`
- we created an additional authenticated route `POST /users/:userId/profile` to post a new value for `alias`
- we created a form on the profile page where the user can update his/her alias. 

## Limitations

If we had more time, we would have:
- customized the validation messages in the registration and login forms
- validate the email address format in backend using Regex
- divided our main components into several reusable components
- used styled components
- made it possible to change password
- limited the validity time of the access token

## Compatibility

The application is responsive and works on mobile, tablet and desktop view. We tested the page's responsiveness in dev tools in Safari, Chrome, Firefox and Edge. Everything works as expected. 

## Tech used

- HTML5
- CSS3
- JavaScript ES6
- React
- Redux
- React Router
- Express
- MongoDB
- Mongoose
- bcrypt
- CORS

## View it live

You can take a look at the result on https://max-sandrine-auth-app.netlify.app/.
The API can be found on https://max-sandrine-auth-api.herokuapp.com/.
You are welcome to visit our pull request  and leave some comments about the code.
Enjoy!
