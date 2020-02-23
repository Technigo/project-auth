import React, { useState } from 'react'
import { useDispatch } from "react-redux"
import { auth } from "../reducers/auth"
import styled from 'styled-components/macro'

const LoginForm = styled.form`
display: flex;
flex-direction: column;
justify-content: flex-start;
width: 50vw;
`


const URL = 'http://localhost:8080/sessions'

export const Login = () => {
    const dispatch = useDispatch()
    const [error, setError] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    // const [isUserLoggedin, setIsUserLoggedin] = useState(null)
    const signUp = () => {
        dispatch(auth.actions.setSignedUp(true))
    }
    const handleSubmit = (event) => {
        console.log("In handleSumbit()")
        event.preventDefault()

        fetch(URL, {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => {
                console.log('first step')
                if (res.ok) {
                    return res.json()

                } else {
                    setError("Unable to login, please try again")
                    throw new Error('Unable to login, please try again')
                }
            })
            .then(json => {
                console.log(json)
                dispatch(auth.actions.setLoggedIn(json.loggedIn))
                dispatch(auth.actions.setToken(json.accessToken))
                dispatch(auth.actions.setUser(json.userId))
                dispatch(auth.actions.setName(json.name))
            })
            // .then(json => setIsUserLoggedin(json))
            .catch(err => console.log('error:', "TEST" + err))
    }
    // if (isUserLoggedin === null) {
    // if user is logged out, show login form
    return (
        <div>
            <h1>Login</h1>
            <LoginForm onSubmit={handleSubmit}>
                <div>{error}</div>
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
                <button type="button" onClick={signUp}>
                    SIGN UP
                </button>
            </LoginForm>

            {/* <Link to='/secrets'><button onClick={login}>Set Token</button></Link> */}
        </div>
    )
    // } else {
    // If user is logged in, show secrets page
    // return (<Secret isUserLoggedin={isUserLoggedin} />);
    // }
}

