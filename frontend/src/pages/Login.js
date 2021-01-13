import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import LoginForm from 'components/LoginForm';

const Login = () => {
  const accessToken = useSelector((store) => store.user.login.accessToken);
  return (
    <>
      <h1>Login Page</h1>
      <LoginForm />
      {accessToken && <Redirect to="/profile" />}
    </>
  );
};

export default Login;
