import React, { useState } from 'react'
import { Provider } from 'react-redux'
import { configureStore, combineReducers } from "@reduxjs/toolkit";

import { LoginForm } from './components/LoginForm'
import { Profile } from './components/Profile'
import { SignUpForm } from './components/SignUpForm'
import { user } from './reducers/user'

//FETCH (THUNK?)

const URL = "http://localhost:8080/users"

const reducer = combineReducers({ user: user.reducer });

const store = configureStore({ reducer });

export const App = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  //Sign up

  return (
    <Provider store={store}>
      <SignUpForm />
      <LoginForm />
      <Profile />
    </Provider>
  )
}
