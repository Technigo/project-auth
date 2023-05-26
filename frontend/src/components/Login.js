import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import user from 'reducers/user';
import { API_URL } from 'utils/urls';
import styled from 'styled-components';
import { Player, Controls } from '@lottiefiles/react-lottie-player';

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
        <Hello><h1>Hello!</h1></Hello>
        <LoginWrapper>
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
            <Inputs>
                <input
                    type="text"
                    id="username"
                    value={username}
                    placeholder="Username"
                    onChange={event => setUsername(event.target.value)}/>
                <input
                    type="password"
                    id="password"
                    value={password}
                    placeholder="Password"
                    onChange={event => setPassword(event.target.value)}/>
                    <Monster>
                    <Player
                     autoplay
                     loop
                     src="https://assets3.lottiefiles.com/packages/lf20_borkvxlu.json"
                     style={{ height: '100px', width: '100px', }}>
                     <Controls visible={false} buttons={['play', 'repeat', 'frame', 'debug']} />
                     </Player>
                     </Monster>
                <button type="submit">Submit</button>
                </Inputs>
            </form>
            
            </LoginWrapper>
        </>
    )
};

//<label htmlFor="username">Username</label>//
// <label htmlFor="password">Password</label>//

const Hello = styled.div`
color: white;
display: flex;
justify-content: flex-start;
margin: 30px 0 -20px 28px;
font-size: 42px;
font-family: 'Cherry Bomb One', cursive;
`

const LoginWrapper = styled.div`
height: 500px;
position: relative;
background-color: pink;
font-family: 'Montserrat', sans-serif;
--mask:
    radial-gradient(65.38px at 50% 91.20px,#000 99%,#0000 101%) calc(50% - 76px) 0/152px 51% repeat-x,
    radial-gradient(65.38px at 50% -53.2px,#0000 99%,#000 101%) 50% 38px/152px calc(51% - 38px) repeat-x,
    radial-gradient(65.38px at 50% calc(100% - 91.20px),#000 99%,#0000 101%) calc(50% - 76px) 100%/152px 51% repeat-x,
    radial-gradient(65.38px at 50% calc(100% + 53.20px),#0000 99%,#000 101%) 50% calc(100% - 38px)/152px calc(51% - 38px) repeat-x;
  -webkit-mask: var(--mask);
          mask: var(--mask);
`

const RegisterLogin = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
font-size: 18px;
gap: 10px;
padding-top: 130px;
`
const Inputs = styled.div`
display: flex;
flex-direction: column;
padding: 30px;
@media (min-width: 768px) {
    align-items: center;
}

input {
    height: 30px;
    outline: 0;
    border-width: 0 0 1px;
    border-color: black;
    margin-bottom: 15px;
    background-color: pink;
    width: 340px;
    font-family: 'Montserrat', sans-serif;
::placeholder { 
  color: black;
  opacity: 1;
  font-size: 18px;
}
}
button {
    width: 230px;
    height: 40px;
    color: white;
    font-size: 18px;
    background-color: black;
    align-self: center;
    border-radius: 10px;
    border-style: none;
    margin-top: 20px;
    font-family: 'Montserrat', sans-serif;
}
`
const Monster = styled.div`
margin: 0 0 -45px 55px;
`