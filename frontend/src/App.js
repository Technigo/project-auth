import React from "react";
import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

import { Login } from "./components/Login";
import { Status } from "./components/Status";
import { user } from "./reducers/user";
import { UserProfile } from "./components/UserProfile";

/* 
Structure:
App
Reduxstore
Reducers 
Thunks?

- components:
- Login/singup (login btn/log outbtn)
- Profile ()
- Status (Login sucess/logged out?)


To acheieve:
- Page to show authenticated content from API? What content, name + welcome message and pic?
- checked - Registration form - POST to api to create new user
- checked - Sign in form - For registration and sign in form have two buttons that have two actions that are connect to two different post requests
- checked - Sign out button that removes the saved access token and redirects the user to the login form. 
- Styling - make look nice and responsive.
- Deploy - heroku and netlify.
-  checked -Redux. 
*/

const reducer = combineReducers({ user: user.reducer });
const store = configureStore({ reducer });

export const App = () => {
  return (
    <Provider store={store}>
      <Login />
      <UserProfile />
      <Status />
    </Provider>
  );
};
