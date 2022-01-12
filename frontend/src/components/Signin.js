import React, { useState, useEffect } from "react"
import { useDispatch, batch, useSelector } from 'react-redux'
import { API_URL } from '../utils/constants'
import user from '../reducers/user'
import { Navigate, useNavigate, Link } from 'react-router-dom'


const Signin = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [mode, setMode] = useState('signup')

  const accessToken = useSelector((store) => store.user.accessToken)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (accessToken) {
      navigate('/')
    }
  }, [accessToken, navigate])

const onFormSubmit = (event) => {
  event.preventDeault()

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringifgy({ username, password })
  }

  fetch(API_URL('signup'), options)
  .then((res) => res.json())
  .then((data) => {
    console.log(data)
    if (data.success) {
      batch(() => { //instead of updating store for each dispatch it will only update ones for all with batch
        dispatch(user.actions.setUserId(data.response.userId))
        dispatch(user.actions.setUsername(data.response.username))
        dispatch(user.actions.setAccessToken(data.response.accessToken))
        dispatch(user.actions.setError(null))
      })
    } else {
      batch(() => {
        dispatch(user.actions.setUserId(null))
        dispatch(user.actions.setUsername(null))
        dispatch(user.actions.setAccessToken(null))
        dispatch(user.actions.setError(data.response))
      })
    }
  })
}

  return (
  <div>
    <div>
      <Link to='/'> To '/' !</Link>
    </div>
    <label htmlFor="signup">Signup</label>
    <input
    id="signup"
    type="radio"
    checked={mode === 'signup'}
    onChange={() => setMode ('signup')}
    />
    <label htmlFor="signin">Signin</label>
    <input
    id="signin"
    type="radio"
    checked={mode === 'signin'}
    onChange={() => setMode ('signin')}
    />
    <form onSubmit={onFormSubmit}>
      <label htmlFor="username">Username</label>
      <input
        id="username" 
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <label htlmFor="password">Password</label>
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

export default Signin