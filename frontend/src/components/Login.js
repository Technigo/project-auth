import React, { useState } from 'react';
import { Wrapper } from './GlobalStyles';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from './config';

const Login = () => {
  // Local state variables for storing form data and data from API
  const [usernameData, setUsernameData] = useState('');
  const [passwordData, setPasswordData] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  // post request to /login, send in username and password, put accessToken in local storage
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
        setUser(user);
        setAccessToken(user.response.accessToken);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // handle the successful login, put token in localStorage
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);

    setTimeout(() => {
      navigate('/top10Views');
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
            type="text"
            value={usernameData}
          ></StyledInput>
        </label>
        <label htmlFor="password-input">
          <p>Password:</p>
          <StyledInput
            id="password-input"
            onChange={(event) => setPasswordData(event.target.value)}
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
        {!user.success && <p>{user.response}</p>}
        <h2>No account?</h2>
        <Link to="/register">Sign up today!</Link>
      </StyledForm>
    </Wrapper>
  );
};

export default Login;

/////////////////////////
// ------ Styled components -----------
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
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
