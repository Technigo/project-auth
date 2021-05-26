import React, { useState, useEffect } from 'react'
import { batch, useDispatch, useSelector } from 'react-redux' 
import { useHistory } from 'react-router-dom'

import user from '../reducers/user'

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mode, setMode] = useState(null) // executing onFormSubmit wihtout clicking a button

  const accessToken = useSelector(store => store.user.accessToken)
  const dispatch = useDispatch()
  const history = useHistory()

  // every time accessToken is changing from our redux store we should redirect user to '/' path
  // if it is not null we are not logged in so we should stay on the login/signup page/landingpage/Home
  // else redirect user
  useEffect(() => {
    console.log('Checking accessToken', accessToken)
    if (accessToken) {
      history.push('/') //redirecting user to a different route
    }
  }, [accessToken])

  const onFormSubmit = (e) => {
    e.preventDefault()

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    }
   
    fetch('http://localhost:8080/signup', options)
      .then(res => res.json())
      .then(json => console.log(json))

    fetch(API_URL(mode), options)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if (data.success) {
          batch(() => {
            dispatch(user.actions.setUserName(data.email))
            dispatch(user.actions.setAccessToken(data.accessToken))
            dispatch(user.actions.setErrors(null))
          })
        } else {
            dipsatch(user.actions.setErrors(data))
        }
      })
      .catch()
  }

  return (
    <div>
      <form onSubmit={onFormSubmit}>
        <label>
          E-mail:
          <input 
            type="text" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
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
    </div>
  )
}

export default Signup
