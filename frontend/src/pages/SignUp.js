import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import SignupForm from '../components/SignupForm';

const SignUp = () => {
  const accessToken = useSelector((store) => store.user.login.accessToken);
  return (
    <>
      <h1>Signup Page</h1>
      <SignupForm />
      {accessToken && <Redirect to="/profile" />}
    </>
  );
};

export default SignUp;
