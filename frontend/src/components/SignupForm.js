import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { signup } from '../reducers/user';
import { Wrapper, Form } from 'lib'

const SignupForm = () => {
  const dispatch = useDispatch();
  const errorMessage = useSelector((store) => store.user.login.errorMessage);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // To sign up a user.
  const handleSignup = (event) => {
    event.preventDefault();
    dispatch(signup(name, email, password));
  };

  return (
    <Wrapper>
      <Form>
        <label>
          Name
          <input
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <label>
          Email
          <input
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <label>
          Password
          <input
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <button type="submit" onClick={handleSignup}>
          Sign-Up
        </button>
      </Form>
      <Link to="/login">
        <button>Already a member?</button>
      </Link>
      {errorMessage && <h4>Error Message : {`${errorMessage}`}</h4>}
    </Wrapper>
  );
};
export default SignupForm;
