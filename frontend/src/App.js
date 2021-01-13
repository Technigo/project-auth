import React, { useState } from 'react';
import { Provider } from "react-redux";

import { SignUpForm } from './components/SignUpForm.js'; 
import { LoginForm } from './components/LoginForm.js'; 
import { Profile } from './components/Profile.js';

import { user } from "./reducers/user";

import { configureStore, combineReducers } from "@reduxjs/toolkit";

const URL = "http://localhost:8080/users";

const reducer = combineReducers({ user: user.reducer });
const store = configureStore({ reducer });

export const App = () => {
  // const [name, setName] = useState("");
  // const [password, setPassword] = useState("");

  // const handleSubmit = (event) => {
  //   event.preventDefault();

  //   fetch(URL, {
  //     method: "POST",
  //     body: JSON.stringify({ name, password }),
  //     headers: { "Content-Type": "application/json" },
  //   })
  //     .then((res) => res.json())
  //     .then((json) => console.log(json))
  //     .catch((err) => console.log("error:", err));
  // };
  return (
    <Provider store={store}>
      <SignUpForm />
      <LoginForm />
      {/* <Profile /> */}
    </Provider>
  )
}
