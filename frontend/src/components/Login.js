import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Form } from './Form';
import { ContentContainer, LoginRegister, Wrapper } from './styledComponents/Containers';

const Login = () => {
  const navigate = useNavigate();

  const accessToken = useSelector((store) => store.user.accessToken);

  useEffect(() => {
    if (accessToken) {
      navigate('/');
    }
  }, [accessToken, navigate]);

  return (
    <Wrapper>
      <ContentContainer>
        <LoginRegister primary>
          <h1>Sign in</h1>
          <Form mode="login" />
        </LoginRegister>
        <LoginRegister>
          <h1>Sign Up</h1>
          <Form mode="register" />
        </LoginRegister>
      </ContentContainer>
    </Wrapper>
  );
};

export default Login;
