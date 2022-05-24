import React from 'react';

import LandingPage from './LandingPage';
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';
import MemberPage from './MemberPage';


const Container = () => {
  return (
    <div>
        <LandingPage />
        <SignUpForm />
        <SignInForm />
        <MemberPage />
    </div>
  )
}

export default Container;
