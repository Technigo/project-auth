import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { signup } from '../reducers/user';
import { Heading, FormWrapper, InputField, FormButton } from 'styling/GlobalStyles';

export const SignUp = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  // To sign up a user
  const handleSignup = event => {
    event.preventDefault();
    dispatch(signup(name, email, password));
  };

  return (
    <>
      <FormWrapper onSubmit={handleSignup}>
        <Heading>Sign Up</Heading>
        <label>
          <InputField
            required
            placeholder="Your Name"
            type="text"
            value={name}
            onChange={event => setName(event.target.value)} />
        </label>
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
            minlength="5"
            type="password"
            placeholder="Your Password"
            value={password}
            onChange={event => setPassword(event.target.value)} />
        </label>
        <FormButton type="submit" onClick={handleSignup}>Sign up!</FormButton>
      </FormWrapper>
    </>
  );
};