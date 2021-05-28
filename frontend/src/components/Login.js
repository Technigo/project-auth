import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector, batch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import user from '../reducers/user'

import { API_URL } from '../reusable/urls'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [mode, setMode] = useState(null)
    
    const accessToken= useSelector(store => store.user.accessToken)    
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        //redirect user to '/path
        if (accessToken) {
            history.push('/')
        }   
    }, [accessToken, history])

    const onFormSubmit = (e) => {
        e.preventDefault()

        const options = {
            method: 'POST',
            headers:{
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ username, password})
        }
        fetch(API_URL(mode), options)
          .then(res => res.json())
          .then(data => {
             if (data.success) {
                batch(() => {//batch updates all the dispatches at the same time, not one at a time
                    dispatch(user.actions.setUsername(data.username))
                    dispatch(user.actions.setAccessToken(data.accessToken))
                    dispatch(user.actions.setErrors(null))
                })
            } else {
                dispatch(user.actions.setErrors(data))
            }
        })
        .catch()
    }

    return (
    <div className="main-wrapper">
      <h1 className="login-title">Create an account on Happy Thoughts and share the fun!</h1>
        <form className="boxes-wrapper" onSubmit={onFormSubmit}>
            <input
             className="username-box"
             type="text" 
             value={username} 
             onChange={(e) => setUsername(e.target.value)}
             />
            <input
               className="password-box"
               type="password"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
            />
            <button className="signin-button" type='submit' onClick={() => setMode('signin')}>Sign in</button>
            <button className="signup-button" type='submit' onClick={() => setMode('signup')}>Sign up</button>
        </form>
    </div>
    )
}

export default Login