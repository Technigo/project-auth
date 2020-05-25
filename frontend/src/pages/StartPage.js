import React from 'react';
import { SignUp } from '../components/SignUp';
import { LogIn } from '../components/LogIn';

export const StartPage = () => {
  return (
    <div>
      <SignUp />
      <LogIn />
    </div> 
  );
};
