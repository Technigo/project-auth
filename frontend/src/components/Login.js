import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { user } from "../reducers/user";
import { API_URL } from '../utils/urls'
import { useNavigate } from "react-router-dom";

import { OuterWrapper, InnerWrapper, Button, Form, RadioButtonWrapper, Header, DescriptionWrapper, Paragraph, Label } from "./GeneralStyles";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [mode, setMode] = useState("login");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const accessToken = useSelector(store => store.user.accessToken);
    const registrationError = useSelector(store => store.user.error)

    useEffect(() => {
        if(accessToken) {
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
            body: JSON.stringify({username: username, password: password})
        }
        fetch(API_URL(mode), options)
            .then(response => response.json())
            .then(responsedata => {
                if(responsedata.success) {
                    console.log(responsedata)
                    dispatch(user.actions.setAccessToken(responsedata.response.accessToken));
                    dispatch(user.actions.setUsername(responsedata.response.username));
                    dispatch(user.actions.setUserId(responsedata.response.id));
                    dispatch(user.actions.setError(null));
                } else {
                    dispatch(user.actions.setAccessToken(null));
                    dispatch(user.actions.setUsername(null));
                    dispatch(user.actions.setUserId(null));
                    dispatch(user.actions.setError(responsedata.response))
                }
            })
    }
    return(
        <OuterWrapper vh100>
            <InnerWrapper>
                <DescriptionWrapper>
                    <Header>
                    SECRET MESSAGE BOARD
                    </Header>
                    <Header>🔮🕵🤫</Header>
                    <Paragraph>Create a user and login to see the secret message board</Paragraph>
                </DescriptionWrapper>
                
            <Form onSubmit={onFormSubmit}>
                <RadioButtonWrapper>
                <Label htmlFor="register">Register</Label>
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
                </RadioButtonWrapper>    
                    <label htmlFor="username">Username</label>
                    <input 
                        required
                        type="text" 
                        id="username" 
                        value={username} 
                        onChange={e => setUsername(e.target.value)} />
                    <label htmlFor="password">Password</label>
                    <input 
                        required
                        type="password" 
                        id="password" 
                        value={password} 
                        onChange={e => setPassword(e.target.value)} />
                    <Button type="submit">Submit</Button>
            </Form>
            {registrationError && <Paragraph bold>{registrationError}</Paragraph>}
            </InnerWrapper>
        </OuterWrapper>
    );
}

export default Login;