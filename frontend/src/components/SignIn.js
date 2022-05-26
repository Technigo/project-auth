import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, batch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { API_URL } from 'utils/utils';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState('register');

  const dispatch= useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector((store) => store.user.accessToken);

  useEffect(() => {
    if(accessToken) {
      navigate('/')
    }
  }, [accessToken]);


  const onFormSubmit = (event) => {
    event.preventDefault();

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username: username, password: password})
    };
    fetch(API_URL('register'), options)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      if (data.success){
        batch(() => {
          dispatch(user.actions.setUserId(data.userId));
          dispatch(user.actions.setAccessToken(data.accessToken));
          dispatch(user.actions.setUserName(data.username));
          dispatch(user.actions.setError(null));
        })
      } else {
        batch(() => {
          dispatch(user.actions.setError(data.response));
          dispatch(user.actions.setUserId(null));
          dispatch(user.actions.setAccessToken(null));
          dispatch(user.actions.setUserName(null));
        })
      }
    })
  }

  return (
      <> 
          <label htmlFor='register'>Register</label>
          <input type='radio' id='register' checked={mode === 'register'} onChange={() => setMode('register')}/>
          {/* ???? */}
          <form onSubmit={onFormSubmit}>
            <p>Please type your username and password to sign in</p>
            <label htmlFor='username'>Username</label>
              <input
                type='text'
                id='username'
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
              <label htmlFor='password'>Password</label>
      
              <input
                type='password'
                id='password'
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <button type='submit'>Submit</button>
          </form>
      </>
  )
}

export default SignIn;
