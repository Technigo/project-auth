import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Form } from './Form';
import { ContentContainer, Wrapper } from './styledComponents/Containers';

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
        <h1>Sign in</h1>
        <Form mode="login" />
        <h1>Create account</h1>
        <Form mode="register" />
      </ContentContainer>
    </Wrapper>
  );
};

export default Login;
