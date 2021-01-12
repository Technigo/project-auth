import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { login } from '../reducers/user'


const SIGNUP_URL = 'http://localhost:8080/users'
/* const LOGIN_URL = 'http://localhost:8080/sessions' */

export const LogInForm = () => {
    const dispatch = useDispatch()
    const accessToken = useSelector((store) => store.user.login.accessToken)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSignUp = (event) => {
        event.preventDefault()
    
    fetch(SIGNUP_URL, {
        method: 'POST',
        body: JSON.stringify({name, email, password}),
        headers: {'Content-Type': 'application/json'},
    })
        .then((res) => res.json())
        .then((json) => console.log(json))
        .catch(err => console.log('error:', err))
    }

    const handleLogin = (event) => {
        event.preventDefault()
        dispatch(login(name, password))
    }
  /*   fetch(LOGIN_URL, {
        method: 'POST',
        body: JSON.stringify({name, email, password}),
        headers: {'Content-Type': 'application/json'},
    })
        .then((res) => res.json())
        .then((json) => console.log(json))
        .catch(err => console.log('error:', err))
    }
 */
    if(!accessToken) {
 
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
            <label>E-mail
                <input
                    type="email"
                    required
                    value={email}
                    onChange={event => setEmail(event.target.value)}
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
} else {
    return <><h1>hej</h1></>
}
}