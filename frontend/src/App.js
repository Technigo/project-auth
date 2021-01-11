import React /*, { useState } */ from 'react';

import { SignUpForm } from './components/SignUpForm.js'; 
import { LoginForm } from './components/LoginForm.js'; 
// import Profile from "./components/Profile.js";

export const App = () => {
  return (
    <div>
      <SignUpForm />
      <LoginForm />
    </div>
  )
}
