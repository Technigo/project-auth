import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { user } from "../reducers/user";
import { API_URL } from '../utils/urls'
import { useNavigate } from "react-router-dom";

import { OuterWrapper, InnerWrapper, Button, Form, RadioButtonWrapper, Header, DescriptionWrapper, Paragraph, Label } from "./GeneralStyles";

const Login = () => {
    const [username, setUsername] = useState(""); // useState hook for holding the username
    const [password, setPassword] = useState(""); // useState hook for holding the password
    const [mode, setMode] = useState("login"); // useState hook for holding the mode (e.g., "login" or "register")
    const dispatch = useDispatch(); // useDispatch hook from Redux for accessing the dispatch function
    const navigate = useNavigate(); // useNavigate hook from React Router for navigation
    const accessToken = useSelector(store => store.user.accessToken); // useSelector hook from Redux for accessing the access token from the store
    const registrationError = useSelector(store => store.user.error); // useSelector hook from Redux for accessing the registration error from the store

    useEffect(() => {
        if (accessToken) {
            navigate("/"); // If an access token exists, navigate to the home page
        }
    }, [accessToken]);

    const onFormSubmit = (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username: username, password: password }) // Convert the username and password to JSON string and set as the request body
        };
        fetch(API_URL(mode), options) // Make a POST request to the API URL based on the current mode
            .then(response => response.json()) // Convert the response to JSON
            .then(responsedata => {
                if (responsedata.success) {
                    console.log(responsedata);
                    dispatch(user.actions.setAccessToken(responsedata.response.accessToken)); // Dispatch an action to set the access token in the store
                    dispatch(user.actions.setUsername(responsedata.response.username)); // Dispatch an action to set the username in the store
                    dispatch(user.actions.setUserId(responsedata.response.id)); // Dispatch an action to set the user ID in the store
                    dispatch(user.actions.setError(null)); // Dispatch an action to clear any previous error in the store
                } else {
                    dispatch(user.actions.setAccessToken(null)); // Dispatch an action to clear the access token in the store
                    dispatch(user.actions.setUsername(null)); // Dispatch an action to clear the username in the store
                    dispatch(user.actions.setUserId(null)); // Dispatch an action to clear the user ID in the store
                    dispatch(user.actions.setError(responsedata.response)); // Dispatch an action to set the error message in the store
                }
            });
    };
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