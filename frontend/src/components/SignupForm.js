import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { signup } from '../reducers/user';

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
    <div>
      <form>
        <h1>Sign up</h1>
        <label>
          name
          <input
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <label>
          email
          <input
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <label>
          password
          <input
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <button type="submit" onClick={handleSignup}>
          Sign-Up
        </button>
      </form>
      <Link to="/login">
        <button>Already a member?</button>
      </Link>
      {errorMessage && <h4>Error Message : {`${errorMessage}`}</h4>}
    </div>
  );
};
export default SignupForm;
