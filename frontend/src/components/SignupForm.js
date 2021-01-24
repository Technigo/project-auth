import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { signup } from '../reducers/user';
import { Wrapper, Form } from '../lib';

const SignupForm = () => {
  const dispatch = useDispatch();
  const errorMessage = useSelector((store) => store.user.login.errorMessage);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // This part can be improved with having one error object as a useState
  const [nameError, setNameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [showValidations, setShowValidations] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);

  const nameIsValid = () => {
    if (!name) {
      setNameError('Name can not be blank');
      return false;
    } else if (name.length < 2) {
      setNameError('Name should be longer than 2 letters');
      return false;
    } else if (name.length > 40) {
      setNameError('Name should be less than 40 letters');
      return false;
    }
    setNameError(null);
    return true;
  };

  const passwordIsValid = () => {
    if (!password) {
      setPasswordError('Please type in your password');
      return false;
    } else if (password.length < 5) {
      setPasswordError('Password needs to be longer than 5 characters');
      return false;
    }
    setPasswordError(null);
    return true;
  };

  const emailIsValid = () => {
    if (!email) {
      setEmailError('Email can not be blank');
      return false;
    } else if (!email.includes('@')) {
      setEmailError('Invalid email');
      return false;
    }
    setEmailError(null);
    return true;
  };

  useEffect(() => {
    const formIsValid = nameIsValid() && passwordIsValid() && emailIsValid();
    setFormIsValid(formIsValid);
  }, [name, email, password]);

  // To sign up a user.
  const handleSignup = (event) => {
    event.preventDefault();
    if (formIsValid) {
      dispatch(signup(name, email, password));
    } else {
      setShowValidations(true);
    }
  };

  return (
    <Wrapper>
      <Form>
        <label>
          Name
          <input
            required
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <div style={{ fontSize: 12, color: 'red' }}>
          {showValidations && nameError}
        </div>
        <label>
          Email
          <input
            required
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <div style={{ fontSize: 12, color: 'red' }}>
          {showValidations && emailError}
        </div>
        <label>
          Password
          <input
            required
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <div style={{ fontSize: 12, color: 'red' }}>
          {showValidations && passwordError}
        </div>
        <button type="submit" onClick={handleSignup}>
          Sign-Up
        </button>
      </Form>
      <Link to="/login">
        <button>Already a member?</button>
      </Link>
      {errorMessage && <p>{`${errorMessage}`}</p>}
    </Wrapper>
  );
};
export default SignupForm;
