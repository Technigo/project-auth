import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { login } from '../reducers/user';

import { Heading, FormWrapper, InputField, FormButton } from 'styling/GlobalStyles';

export const LogIn = () => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  // To log in a user
  const handleLogin = event => {
    event.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <FormWrapper onSubmit={handleLogin}>
      <Heading>Log In</Heading>
      <label>
        <InputField
          required
          type="email"
          placeholder="Your E-mail"
          value={email}
          onChange={event => setEmail(event.target.value)} />
      </label>
      <label>
        <InputField
          required
          type="password"
          placeholder="Your Password"
          value={password}
          onChange={event => setPassword(event.target.value)} />
      </label>
      <FormButton type="submit" onClick={handleLogin}>Log In</FormButton>
    </FormWrapper>
  );
};
