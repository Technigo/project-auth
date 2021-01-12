import React from "react";

// import { Signup } from "./SignUp";
import Signup from "./components/SignUp";
import Login from "./components/Login";

const BASE_URL = "http://localhost:8080/";
const SIGNUP_URL = `${BASE_URL}users`;
const LOGIN_URL = `${BASE_URL}sessions`;

export const App = () => {
  return (
    <>
      <Login LOGIN_URL={LOGIN_URL} />
      <Signup SIGNUP_URL={SIGNUP_URL} />
    </>
  )
};