import React from "react";
import { Link } from "react-router-dom";
import { Header } from "../components/Header";

import "../index.css";

export const Home = () => {


  return (
    <>
      <div>
        <Header />
        <div className="bodyContainer">
          <h2>Create a new account and sign up here!</h2>
          <Link to={`/register`}>Sign Up</Link>
          <h2>Already registered? Log in here</h2>
          <Link to={`/login`}>Log in</Link>
        </div>
      </div>
    </>
  );
};
