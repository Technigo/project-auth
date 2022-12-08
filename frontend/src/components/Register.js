import React, { useState } from 'react';
import { Wrapper } from './GlobalStyles';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from './config';

const Register = () => {
  // Local state variables for storing form data and data from API
  const [usernameData, setUsernameData] = useState('');
  const [passwordData, setPasswordData] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  // Post request with username and password
  const handleSubmit = () => {
    fetch(`${API_URL}/register`, {
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
        setSuccess(user.success);
      })
      .catch((error) => {
        console.error(error);
        setSuccess(user.success);
      });
  };

  // On successful register, show re-direct message for 1 second with navigate to login page
  if (success) {
    setTimeout(() => {
      navigate('/login');
    }, 1000);
    return (
      <Wrapper>
        <h1>User created successfully!</h1>
        <h2>Re-directing to login page</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h1>Register</h1>
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
          Submit
        </StyledSubmit>
      </StyledForm>
      <h2>Already registered?</h2>
      <Link to="/login">Head over to the login!</Link>
    </Wrapper>
  );
};

export default Register;

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
