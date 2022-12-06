import React, { useState } from 'react';
import { Wrapper } from './GlobalStyles';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Register = ({ url }) => {
  // 1. input form for username and password
  // 2. post request with username and password
  // 3. register component, on success, show "Redirect-message" ("User created, re-directing to login") for 2 seconds (use setTimeout) with window.direct or something like that to the login page

  console.log(url);

  const [usernameData, setUsernameData] = useState('');
  const [passwordData, setPasswordData] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = () => {
    fetch(`http://localhost:8080/register`, {
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
        setSuccess(user.success);
      })
      .catch((error) => {
        console.error(error);
        setSuccess(user.success);
      });
  };

  if (success) {
    setTimeout(() => {
      window.location = `${url}/login`;
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
