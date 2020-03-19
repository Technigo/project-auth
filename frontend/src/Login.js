import React, { useState } from 'react'
import { Profile } from './Profile'

const URL = 'https://harry-potter-auth.herokuapp.com/login'
// const URL = 'http://localhost:9000/login'

export const Login = (props) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [signedIn, setSignedIn] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')

    const handleSubmit = event => {
        event.preventDefault()
        localStorage.removeItem('accessToken')
        // Clear the last accessToken from previous loggedIn user

        fetch(URL, {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .then((json) => {
                console.log('LOGIN:', json)
                if (json.notFound) {
                    // Status 404 - user not found
                    setErrorMsg(json.message)
                } else {
                    // Status 201 - All good
                    localStorage.setItem('accessToken', json.accessToken)
                    setErrorMsg('')
                    setSignedIn(true) // Just set this to true or false
                    setPassword('')
                    setUsername('')
                }
            })
            .catch(err => console.log('error:', err))
    }

    if (signedIn === false) {
        return (
            <div>
                {errorMsg && <h1 style={{ color: 'red' }}>{errorMsg}
                </h1>}
                <form onSubmit={handleSubmit}>
                    <h1>Login to Hogwarts:</h1>
                    <label>
                        Username:
                        <input
                            required
                            value={username}
                            onChange={event => setUsername(event.target.value)}
                        />
                    </label>
                    <label>
                        Password:
                        <input
                            required
                            type="password"
                            value={password}
                            onChange={event => setPassword(event.target.value)}
                        />
                    </label>
                    <button type="submit" onClick={handleSubmit}>LOGIN</button>
                </form>
            </div>
        )
    } else {
        //If user is logged in, show profile
        return (
            <Profile />
        )
    }
} 
