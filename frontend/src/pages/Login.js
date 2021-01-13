import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Wrapper } from 'lib'

import LoginForm from 'components/LoginForm';

const Login = () => {
  const accessToken = useSelector((store) => store.user.login.accessToken);
  return (
    <Wrapper>
      <h1>Login</h1>
      <LoginForm />
      {accessToken && <Redirect to="/profile" />}
    </Wrapper>
  );
};

export default Login;
