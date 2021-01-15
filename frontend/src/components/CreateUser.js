import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { user } from '../reducer/user';
import { Button } from '../lib/Button';
import InputField from '../lib/InputField';
import { CreateUserContainer, Register, Title } from '../lib/CreateUserStyle';
import { LoginErrorMessage } from 'lib/LoginFormStyle';


const SIGNUP_URL = 'https://auth-project-api.herokuapp.com/users';

const CreateUser = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleSignUpSuccess = (data) => {
    console.log(data.name);
    dispatch(user.actions.setUserName(data.name));
  }

  const handleSignup = (event) => {
    event.preventDefault();

    fetch(SIGNUP_URL, {
      method: 'POST',
      body: JSON.stringify({ name, password }),
      headers: { 'Content-type': 'application/json' },
    })
      .then(res => res.json())
      .then(data => handleSignUpSuccess(data))
      .catch((err) => console.log(err));
    
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
      )

    </CreateUserContainer>
  )
}

export default CreateUser;