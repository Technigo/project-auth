import React, {useEffect, useState} from "react";
import { useDispatch, useSelector, batch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { API_URL } from "utils/utils";
import user from "reducers/user";
import styled from "styled-components";
import { Button } from "./GlobalComponents";

const SignIn = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [mode, setMode] = useState("login");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const accessToken = useSelector((store) => store.user.accessToken);
    useEffect( () => {
        if (accessToken) {
            navigate("/");
        }
    }, [accessToken])

    const onFormSubmit =(event) => {
        event.preventDefault();
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username: username, password: password })
        }
        fetch(API_URL(mode), options)
            .then(response => response.json())
            .then(data => {
                if(data.success) {
                    batch(()=> {
                        dispatch(user.actions.setUsername(data.response.username));
                        dispatch(user.actions.setUserId(data.response.id))
                        dispatch(user.actions.setAccessToken(data.response.accessToken));
                        dispatch(user.actions.setError(null));
                    });
                } else {
                    batch (() => {
                        dispatch(user.actions.setUsername(null));
                        dispatch(user.actions.setUserId(null))
                        dispatch(user.actions.setAccessToken(null));
                        dispatch(user.actions.setError(data.response));
                        window.alert(data.response)
                    });
                }
            })
    }
    return (
        <>
        <LoginWrapper>
        <Label htmlFor="register">Sign up</Label>
       <Span><Input type="radio" id="register" checked={mode === "register"} onChange={()=>setMode("register")} /></Span>
        <Label htmlFor="login">Sign in</Label>
      <Span><Input type="radio" id="login" checked={mode === "login"} onChange={()=>setMode("login")}/></Span>
      </LoginWrapper>
        <Form onSubmit={onFormSubmit}>
            <Label htmlFor="username">Username</Label>
            <InputForm
                type="text" 
                id="username" 
                value={username} 
                onChange={e => setUsername(e.target.value)}/>

            <Label htmlFor="password">Password</Label>
            <InputForm 
                type="password" 
                id="password" 
                value={password} 
                onChange={e => setPassword(e.target.value)}/>

            <Button type="submit">Submit</Button>
        </Form>
    </> 
    );
}

export default SignIn;

const LoginWrapper = styled.div`
display: flex;
`

const Input = styled.input`
  height: 10px;
  width: 10px;
`
const Span = styled.span`
height: 20px;
width: 20px;
border: solid;
border-radius: 50%;
margin: 10px;
color: #464E2E;

:hover {
    color: #ACB992;
}

`

const Label = styled.label`
font-size: 16px;
`

const Form = styled.form`
padding: 10px;
border-radius: 8px;
`

const InputForm = styled.input`
padding: 10px;
margin: 15px;
border-radius: 8px;
font-size:16px;
box-shadow: 3px 2px #464E2E;
border: 1px solid;
background-color: rgb(228, 228, 228);
`