import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, batch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

import { API_URL } from 'utils/utils';

import user from 'reducers/user';

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
    fetch(API_URL(mode), options)
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
          {/* <Link to='/'> LINK TO /</Link> */} 
      <form className='container' onSubmit={onFormSubmit}>
        <div>
          <h2>Welcome!</h2>
          <p>Please register or sign in by typing username and password</p>
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
          </div>
          <div>
            <button type='submit'>Submit</button>
          </div>
          <div className='radio-btn-container'>
            <label htmlFor='register'>Register</label>
            <input type='radio' id='register' checked={mode === 'register'} onChange={() => setMode('register')}/>
            <label htmlFor='login'>Login</label>
            <input type='radio' id='login' checked={mode === 'login'} onChange={() => setMode('login')}/>
          </div>
      </form>
    </>
  )
}

export default SignIn;
