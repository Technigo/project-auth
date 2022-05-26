import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, batch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { SIGNUP_URL } from '../utils/API';

import user from '../reducers/user';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [validationError, setValidationError] = useState(null);
  
    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    const onFormSubmit = event => {
      event.preventDefault();
  
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, email }),
      };
  
      fetch(SIGNUP_URL, options)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            alert({
              title: 'Congratulations! User created 😻',
            }).then(function () {
              navigate('/signin');
            });
          } else {
            batch(() => {
              dispatch(user.actions.setUserId(null));
              dispatch(user.actions.setUsername(null));
              dispatch(user.actions.setAccessToken(null));
              dispatch(user.actions.setEmail(null));
              dispatch(user.actions.setError(data.response));
              setValidationError(data.message);
            });
          }
        });
    };
  
    return (
      <div>
        <form onSubmit={onFormSubmit}>
          <h1>sign up</h1>
          <label>username*</label>
          <input
            type='text'
            placeholder='enter username'
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <label>email*</label>
          <input
            type='email'
            placeholder='enter email'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <label>password*</label>
          <input
            type='password'
            placeholder='enter password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          {password && password.length < 5
            ? 'password must be over 5 characters'
            : ''}
          <button type='submit'>register</button>
          <p>*required fields</p>
          {validationError !== null && (
            <p style={{ fontSize: '21px', color: 'red' }}>{validationError}</p>
          )}
        </form>
        <div>
          <p>Already a member?</p>
          <Link to='/signin'>Sign in</Link>
        </div>
      </div>
    );
  };
  
  export default SignUp;