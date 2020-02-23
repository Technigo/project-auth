import React, { useState } from 'react'
import { useDispatch } from "react-redux"
import { auth } from "../reducers/auth"
import styled from 'styled-components/macro'

const URL = 'http://localhost:8080/users'
export const Signup = () => {
    const [name, setName] = useState('')
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleSubmit = (event) => {
        event.preventDefault()

        fetch(URL, {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => {
                res.json()
                if (res.status === 201)
                    dispatch(auth.actions.setSignedUp(false))
            })
            .then(json => console.log(json))
            .catch(err => console.log('error:', err))
    }
    return (
        <div>
            <h1>Sign up!</h1>
            <form onSubmit={handleSubmit}>
                <label> name:
                <input required
                        value={name}
                        onChange={event => setName(event.target.value)}
                        placeholder="name"
                    />
                </label>
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
                    SIGN UP
                    </button>
            </form>

        </div>
    )
}
