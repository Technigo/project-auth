import React, { useState } from 'react'
import { useDispatch, batch } from 'react-redux'

import  { API_URL }  from '../../src/utils/constants'
import user from '../../src/reducers/user'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [mode, setMode] = useState('signup')

    const dispatch = useDispatch()
    
    //This function posts the form to the database
    const onFormSubmit = (e) => {
          e.preventDefault()

          const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
          }

          fetch(API_URL(mode), options)
          .then(res => res.json())
          .then((data) => {
            console.log(data.response);
            if (data.success) {
              batch(() => {
                dispatch(user.actions.setUserId(data.response.userId))
                dispatch(user.actions.setUsername(data.response.username))
                dispatch(user.actions.setAccessToken(data.response.accessToken))
                dispatch(user.actions.setError(null))

              })
              
            } else {
              dispatch(user.actions.setUserId(null))
                dispatch(user.actions.setUsername(null))
                dispatch(user.actions.setAccessToken(null))
              dispatch(user.actions.setError(data.response))
            }
          })
    }
    
    console.log(mode);

  return (
    
    <div className="wrapper">

      <h1>Welcome to our login page!</h1>

      <label htmlFor='signup'>Sign up</label>
      <input 
      id='signup' 
      type="radio" 
      checked={mode === 'signup'} 
      onChange={() => setMode('signup')} 
      />


      <label htmlFor='signin'>Sign in</label>
      <input id='signin'
      type="radio" 
      checked={mode === 'signin'} 
      onChange={() => setMode('signin')} 

      />

        <form onSubmit={onFormSubmit}>

          <label htmlFor='username'>Username</label>
          
          <input
          id="username" 
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor='password'>Password</label>


          <input
          id="password" 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Submit</button>
          
        </form>
    
    </div>
  )
}

export default Login