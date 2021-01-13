import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import Button from './Button';
import InputField from './InputField';

const SIGNUP_URL = 'https://auth-project-api.herokuapp.com/users';

const CreateUserContainer = styled.div`
  border-radius: 0 20px 20px 0;
  width: 35%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  box-shadow: 5px 5px 5px grey;
`;

const Register = styled.form`
  display: flex;
  flex-direction: column;
  align-items:center;
  width: 300px;
`;

const Title = styled.h1`
  align-self: flex-start;
  color: purple;
  font-size: 36px;
  padding: 20px 0;
`;

const CreateUser = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleSignUpSuccess = (user) => {
    console.log(user.name);
  }

  const handleSignup = (event) => {
    event.preventDefault();

    fetch(SIGNUP_URL, {
      method: 'POST',
      body: JSON.stringify({ name, password }),
      headers: {'Content-type': 'application/json'},
    })
      .then(res => res.json())
      .then(data => handleSignUpSuccess(data))
    
    setName('');
    setPassword('');
  }
  return (
    <CreateUserContainer>
      <Register>
        <Title>Create account</Title>
        <InputField
          title='Username'
          htmlFor='name'
          id='name'
          type='text'
          value={name}
          onChange={setName}
        />
        <InputField
          title='Password'
          htmlFor='password'
          id='password'
          type='password'
          value={password}
          onChange={setPassword}
        />
        <Button
          title='Sign Up'
          onClickFunc={handleSignup} />
      </Register>
    </CreateUserContainer>
  )
}

export default CreateUser;