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
        <Label htmlFor="signUp">Sign up</Label>
       <Span><Input type="radio" id="signUp" checked={mode === "signUp"} onChange={()=>setMode("signUp")} /></Span>
        <Label htmlFor="signIn">Sign in</Label>
      <Span><Input type="radio" id="signIn" checked={mode === "signIn"} onChange={()=>setMode("signIn")}/></Span>

        <Form onSubmit={onFormSubmit}>
            <label htmlFor="username">Username</label>
            <input 
                type="text" 
                id="username" 
                value={username} 
                onChange={e => setUsername(e.target.value)}/>

            <label htmlFor="password">Password</label>
            <input 
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

const Input = styled.input`
  opacity: 0;
  height: 0;
  width: 0;

`
const Span = styled.span`
height: 20px;
width: 20px;
border: solid;
border-radius: 50%;
margin: 10px;

:hover {
    color: cornflowerblue;
}

&:checked {
    color: tan;
}
`

const Label = styled.label`
color: firebrick;
`

const Form = styled.form`
padding: 10px;
background-color: whitesmoke;
border-radius: 8px;
`