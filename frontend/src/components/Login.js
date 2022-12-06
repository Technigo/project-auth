import React, { useState } from 'react';
import { Wrapper } from './GlobalStyles';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { API_URL } from './config'

const Login = ({ url }) => {
  // 1. make login component
  // 2. post request to /login, send in username and password, put accessToken in local storage

  const [usernameData, setUsernameData] = useState('');
  const [passwordData, setPasswordData] = useState('');
  const [accessToken, setAccessToken] = useState('');
  console.log(accessToken);

  const handleSubmit = () => {
    fetch(`${API_URL}/login`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: usernameData,
        password: passwordData
      })
    })
      .then((res) => res.json())
      .then((user) => {
        console.log('user:', user);
        setAccessToken(user.response.accessToken);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  if (accessToken.length > 0) {
    localStorage.setItem('accessToken', accessToken);

    setTimeout(() => {
      window.location = `${url}/content`;
    }, 1000);
    return (
      <Wrapper>
        <h1>Login successful!</h1>
        <h2>Re-directing to content page</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h1>Login</h1>
      <StyledForm>
        <label htmlFor="username-input">
          <p>Username:</p>
          <StyledInput
            id="username-input"
            onChange={(event) => setUsernameData(event.target.value)}
            className="username-input"
            type="text"
            value={usernameData}
          ></StyledInput>
        </label>
        <label htmlFor="username-input">
          <p>Password:</p>
          <StyledInput
            id="password-input"
            onChange={(event) => setPasswordData(event.target.value)}
            className="username-input"
            type="password"
            value={passwordData}
          ></StyledInput>
        </label>
        <StyledSubmit
          type="submit"
          onClick={(e) => {
            handleSubmit();
            setUsernameData('');
            setPasswordData('');
            e.preventDefault();
          }}
        >
          Login
        </StyledSubmit>
        <h2>No account?</h2>
        <Link to="/register">Sign up today!</Link>
      </StyledForm>
    </Wrapper>
  );
};

export default Login;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  /* text-align: center; */
  justify-content: center;

  p {
    display: inline;
    margin: 0 10px;
  }
`;

const StyledInput = styled.input`
  height: 20px;
  margin: 0 10px;
`;

const StyledSubmit = styled.button`
  padding: 5px;
  margin: 10px;
`;
