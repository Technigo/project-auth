import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector, batch } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'

import user from '../reducers/user'
import { sign } from '../reducers/user'

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
        dispatch(sign(username, password, mode))
    }

    return (
    <div className="main-wrapper">
      <h1 className="login-title">Login to get the full experience!</h1>
        <form className="boxes-wrapper" onSubmit={onFormSubmit}>
            <p>username</p>
            <input
             className="input-box"
             type="text" 
             value={username} 
             onChange={(e) => setUsername(e.target.value)}
             />
            <p>password</p>
            <input
               className="input-box"
               type="password"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
            />
            <button className="button" type='submit' onClick={() => setMode('login')}>Log in</button>
        </form>
        <h3 className="login-title">You are not a member yet? Register <Link to="/signup"> here</Link></h3>    
    </div>
    )
}

export default Login