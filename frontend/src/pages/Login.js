import React, { useState, useEffect } from 'react'
import { batch, useDispatch, useSelector } from 'react-redux' 
import { useHistory } from 'react-router-dom'

import user from '../reducers/user'
import { API_URL } from '../reusable/urls'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mode, setMode] = useState(null)
  
  const errors = useSelector((store) => store.user.errors)
  const accessToken = useSelector(store => store.user.accessToken)
  const dispatch = useDispatch()
  const history = useHistory()

  // every time accessToken is changing from our redux store we should redirect user to '/' path
  useEffect(() => {
    console.log('Checking accessToken', accessToken)
    if (accessToken) {
      history.push('/')
    }
  }, [accessToken, history])

    let errorMessage = ''
    if (errors?.error?.errors?.email?.message) {
        errorMessage = errors?.error?.errors?.email?.message //email validation
      } else if (errors?.message) {
        errorMessage = errors?.message //login failed
    } 

  const onFormSubmit = (e) => {
    e.preventDefault()
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    }

    fetch(API_URL(mode), options)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          batch(() => {
            dispatch(user.actions.setEmail(data.email))
            dispatch(user.actions.setAccessToken(data.accessToken))
            dispatch(user.actions.setErrors(null))
            //specify the data that we want to save in localStorage 'user' here
            localStorage.setItem('user', JSON.stringify({
              email: data.email,
              accessToken: data.accessToken
            }))
          })
        } else {
            dispatch(user.actions.setErrors(data))
        }
      })
      .catch((error) => {
        dispatch(user.actions.setErrors(error))
      })
  }

  return (
    <>
      <form onSubmit={onFormSubmit}>
        <label>
          E-mail:
          <input 
            type="text" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errorMessage && <p>{errorMessage}</p>}
        </label>
        <label>
          Password:
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit" onClick={() => setMode('signin')}>Sign in</button>
        <button type="submit" onClick={() => setMode('signup')}>Sign up</button>
      </form>
    </>
  )
}

export default Login  

