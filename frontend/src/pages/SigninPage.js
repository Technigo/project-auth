import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { API_URL_SIGNUP } from '../utils/urls'

const SigninPage = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const onUsernameChange = (event) => {
        setUsername(event.target.value)
    }
    const onPasswordChange = (event) => {
        setPassword(event.target.value)
    }
    const handleFormSubmit = (event) => {
        event.preventDefault()

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password })
        }

        fetch(API_URL_SIGNUP, options)
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
            })
    }

    return (
        <div>
            <form onSubmit={handleFormSubmit}>
                <label>
                    Username:
                    <input
                        type="text"
                        placeholder="username"
                        value={username}
                        onChange={onUsernameChange}
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={onPasswordChange}
                    />
                </label>
                <button type="submit">Sign in</button>
            </form>
            <Link to={'/signup'}>
                <button>Do not have an account? Sign up!</button>
            </Link>
        </div >
    )
}

export default SigninPage