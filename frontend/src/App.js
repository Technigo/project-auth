import React, { useState } from 'react';
import LoginForm from "./components/LoginForm";
import Profile from "./components/Profile";
import SignUpForm from "./components/SignUpForm"; 

export const App = () => {
  return (
    <div>
      <SignUpForm />
      <LoginForm /> 
    </div>
  )
}
