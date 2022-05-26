import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, batch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { SIGNIN_URL } from '../utils/API';

import user from '../reducers/user';

const SignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    //  const [error, setError] = useState(null);
    const [validationError, setValidationError] = useState(null);
  
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const accessToken = useSelector(store => store.user.accessToken);
  
    useEffect(() => {
      if (accessToken) {
        navigate('/main');
      }
    }, [accessToken, navigate]);
  
    const onFormSubmit = event => {
      event.preventDefault();
  
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, email }),
      };
  
      fetch(SIGNIN_URL, options)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            batch(() => {
              dispatch(user.actions.setUserId(data.response.userId));
              dispatch(user.actions.setUsername(data.response.username));
              dispatch(user.actions.setAccessToken(data.response.accessToken));
              dispatch(user.actions.setEmail(data.response.email));
              dispatch(user.actions.setError(null));
              localStorage.setItem(
                'user',
                JSON.stringify({
                  userId: data.response.userId,
                  username: data.response.username,
                  email: data.response.email,
                  accessToken: data.response.accessToken,
                })
              );
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
          <h1>sign in</h1>
          <label htmlFor='username'>username*</label>
          <input
            id='username'
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
          <label htmlFor='password'>password*</label>
          <input
            id='password'
            type='password'
            placeholder='enter password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <p>*required fields</p>
          {validationError !== null && (
            <p style={{ fontSize: '21px', color: 'red' }}>{validationError}</p>
          )}
          <button type='submit'>sign in</button>
        </form>
        <div>
          <Link to='/signup'>Back to sign up</Link>
        </div>
      </div>
    );
  };
  export default SignIn;