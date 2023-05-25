import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import user from 'reducers/user';
import { API_URL } from 'utils/urls';
import styled from 'styled-components';

export const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [mode, setMode] = useState("login");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const accessToken = useSelector(store => store.user.accessToken);
    useEffect(() => {
        if(accessToken) {
            navigate("/")
        }
    },[accessToken])

    const onFormSubmit = (event) => {
        event.preventDefault();

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username, password})
        }
        fetch(API_URL(mode), options)
            .then(response => response.json())
            .then(data => {
                if(data.success) {
                    console.log(data)
                    dispatch(user.actions.setAccessToken(data.response.accessToken));
                    dispatch(user.actions.setUsername(data.response.username));
                    dispatch(user.actions.setUserId(data.response.id));
                    dispatch(user.actions.setError(null));
                } else {
                    dispatch(user.actions.setAccessToken(null));
                    dispatch(user.actions.setUsername(null));
                    dispatch(user.actions.setUserId(null));
                    dispatch(user.actions.setError(data.response));
                }
            })
    }
    return (
        <>
        <LoginWrapper>
            <Header>
                <h1>Welcome!</h1>
                <h2>Sign in for todays qoute</h2>
            </Header>
            <RegisterLogin>
            <label htmlFor="register">Register</label>
            <input
                type="radio"
                id="register"
                checked={mode === "register"}
                onChange={() => setMode("register")}/>
            <label htmlFor="login">Login</label>
            <input
                type="radio"
                id="login"
                checked={mode === "login"}
                onChange={() => setMode("login")}/>
            </RegisterLogin>
            <form onSubmit={onFormSubmit}>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={event => setUsername(event.target.value)}/>
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={event => setPassword(event.target.value)}/>
                <button type="submit">Submit</button>
            </form>
            </LoginWrapper>
        </>
    )
};

const LoginWrapper = styled.div`
width: 350px;
height: 400px;
background-color: linen;
margin-left: 50px;
margin-top: 90px;
border-radius: 10px;
`
const Header = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
h1 {
    font-size: 29px;
}
h2 {
    font-size: 20px;
}
`

const RegisterLogin = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
`
