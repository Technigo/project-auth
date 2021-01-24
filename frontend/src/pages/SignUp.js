import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import SignupForm from '../components/SignupForm';
import { Wrapper } from '../lib';

const SignUp = () => {
  const accessToken = useSelector((store) => store.user.login.accessToken);
  return (
    <Wrapper>
      <h1>Signup</h1>
      <SignupForm />
      {accessToken && <Redirect to="/profile" />}
    </Wrapper>
  );
};

export default SignUp;
