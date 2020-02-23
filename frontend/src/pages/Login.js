import React, { useState } from 'react'
import { useDispatch } from "react-redux"
import { auth } from "../reducers/auth"
import { Link } from 'react-router-dom'

const URL = 'http://localhost:8080/sessions'

export const Login = () => {
    const dispatch = useDispatch()

    const login = () => {
        const foundUserToken = state.users.find((user) => user.accessToken === action.payload)
        console.log('found', JSON.stringify(foundUserToken))
        // and toggle its state under "complete"
        if (foundUserToken) {
            dispatch(auth.actions.setToken({ foundUserToken }))
        } else {
            //error
        }
    }
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
    }l
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
