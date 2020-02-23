import React, { useState } from 'react'
import { useDispatch } from "react-redux"
import { auth } from "../reducers/auth"
import { Link } from 'react-router-dom'

const URL = 'http://localhost:8080/sessions'

export const Login = () => {
    // const dispatch = useDispatch()

    // const login = () => {
    //     dispatch(auth.actions.setToken('fc7d56b7d781b50dda47c6b0d5731265101dc11a21064845ac27ffd0950a0da5b52cab2d389e9f6fc42e23cfbdb556047a6aaad8bd2cc5c60163ddf99570f1658c32469a25837fc21747dbec3e73e213cfce555e56c19bcd2f413f4c2e3b6df74635aa63599aad8b573d20c831a5dcc29460756c50ec126d4a869a78c21a8aa8'))
    // }
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleSubmit = (event) => {
        event.preventDefault()

        fetch(URL, {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .then(json => console.log(json))
            .catch(err => console.log('error:', err))
    }
    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label> e-mail:
                <input required
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                        placeholder="email"
                    />
                </label>
                <label>
                    password:
                <input required
                        type="password"
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                        placeholder="password"
                    />
                </label>
                <button type="submit" onClick={handleSubmit}>
                    LOGIN
                </button>
            </form>

            {/* <Link to='/secrets'><button onClick={login}>Set Token</button></Link> */}
        </div>
    )
}
