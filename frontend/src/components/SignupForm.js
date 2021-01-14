import React, { useEffect, useState } from 'react';
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
  const [nameError, setNameError] = useState(null)
  const [emailError, setEmailError] = useState(null)
  const [passwordError, setPasswordError] = useState(null)
  const [showValidations, setShowValidations] = useState(false)
  const [formIsValid, setFormIsValid] = useState(false)

  const nameIsValid = () => {
    if(!name){
      setNameError("Please type in your name")
      return false;
    } else if (name.length < 2) {
      setNameError("Name should be longer than 2 letters")
      return false;
    } else if (name.length > 40) {
      setNameError("Name should be less than 40 letters")
      return false;
    }
    setNameError(null)
    return true;
  }

  const passwordIsValid = () => {
    if(!password){
      setPasswordError("Please type in your password")
      return false
    }
  }
  const emailIsValid = () => true;

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
        {showValidations && nameError &&
          <p>{nameError}</p>
        }
        <label>
          Email
          <input
            required
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <label>
          Password
          <input
            required
            type="password"
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
