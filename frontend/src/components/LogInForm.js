import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { user, login } from '../reducers/user'
import { Profile } from '../components/Profile'

const SIGNUP_URL = 'http://localhost:8080/users'

export const LogInForm = () => {
    const dispatch = useDispatch()
    const accessToken = useSelector((store) => store.user.login.accessToken)
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')

    
    //RELATED TO SIGNING UP
    const handleSignUp = (event) => {
        event.preventDefault()
    
    fetch(SIGNUP_URL, {
        method: 'POST',
        body: JSON.stringify({name, password}),
        headers: {'Content-Type': 'application/json'},
    })
    .then((res) => {
        if (!res.ok) {
          throw 'Could not create account.  Try a different username.'
        }
        return res.json()
    })

    .then((json) => {
        // Save the login info
        dispatch(user.actions.setAccessToken({accessToken: json.accessToken}))
        dispatch(user.actions.setUserId({ userId: json.userId }))
      })
      .catch((err) => {
        dispatch(user.actions.setErrorMessage({ errorMessage: err }))
      })
  }
    //SIGNING IN - THUNK IS IN THE REDUCER
    const handleLogin = (event) => {
        event.preventDefault()
        dispatch(login(name, password))
    }
 
    if(accessToken) {
        return (
            <Profile />
        )}

    return (
        <form>
            <h1>Login/Sign up</h1>
            <label>Name
                <input 
                    required
                    value={name}
                    onChange={event => setName(event.target.value)}
                />
            </label>
            <label>Password
                <input 
                    required
                    value={password}
                    type="password"
                    onChange={event => setPassword(event.target.value)}
                />
            </label>
            <button type="submit" onClick={handleLogin}>LOGIN</button>
            <button type="submit" onClick={handleSignUp}>SIGN UP</button>            
        </form>
    )
}