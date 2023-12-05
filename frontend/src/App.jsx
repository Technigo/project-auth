import React from "react";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";

export const App = () => {
  return <div className="main">
    <RegistrationForm />
    <LoginForm />
  </div>;
};
