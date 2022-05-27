import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, batch } from 'react-redux';
import { useNavigate, Link } from "react-router-dom";
import { API_URL } from "utils/utils";
// import styled from 'styled-components';

import user from 'reducers/user';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("")
    const [mode, setMode] = useState("register");
    const [loginError, setLoginError] = useState(null)

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const accessToken = useSelector((store) => store.user.accessToken)

    useEffect(() => {
        if (accessToken) {
            navigate("/")
        }
    }, [accessToken]);

    const onFormSubmit = (event) => {
        event.preventDefault();

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username: username, password: password })
        };

        fetch(API_URL(mode), options)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.success) {
                    batch(() => {
                        dispatch(user.actions.setUserId(data.userId))
                        dispatch(user.actions.setAccessToken(data.accessToken))
                        dispatch(user.actions.setUserName(data.username))
                        dispatch(user.actions.setError(null))
                        setLoginError(null)
                    })

                } else {
                    batch(() => {
                        dispatch(user.actions.setError(data.response))
                        dispatch(user.actions.setUserId(null))
                        dispatch(user.actions.setAccessToken(null))
                        dispatch(user.actions.setUserName(null))
                        setLoginError(data.response)
                    })
                }
            })
    }

    return (
        <>
            {/* <Link to="/"> LINK TO /</Link> */}
            <container>
            <h1>Welcome to your gardening page!</h1>
            <label htmlFor="register">Register</label>
            <input type="radio" id="register" checked={mode === "register"} onChange={() => setMode("register")} />
            <label htmlFor="login">Login</label>
            <input type="radio" id="login" checked={mode === "login"} onChange={() => setMode("login")} />

            <form onSubmit={onFormSubmit}>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} />

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />

                    {loginError !== null && (
                            <p className="login-error">{loginError}</p>
                            )}

                <div className="button-container">
                    <button type="submit">Sign up</button>
                    <button type="submit">Login</button>
{/* 
                    <button type="button"
                onClick={logOutButton}>Log out</button> */}
                </div>
                {/* <h1>$`{data.response}`</h1> */}
            </form>
            </container>
        </>
    )
}
export default Login;
