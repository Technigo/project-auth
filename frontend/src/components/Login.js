import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, batch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { API_URL } from "utils/utils";
import user from "reducers/user";
import styled from 'styled-components';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [mode, setMode] = useState("login");
    const [error, setError] = useState(null); 

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const accessToken = useSelector((store) => store.user.accessToken);

    useEffect( () => {
        if (accessToken) {
            navigate("/");
        }
    }, [accessToken])

    const onFormSubmit = (event) => {
        event.preventDefault();
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username: username, password: password })
        }
        fetch(API_URL(mode), options)
            .then(response => response.json())
            .then(data => {
                if(data.success) {
                    batch(() => {
                        dispatch(user.actions.setUsername(data.response.username));
                        dispatch(user.actions.setUserId(data.response.id));
                        dispatch(user.actions.setAccessToken(data.response.accessToken));
                        dispatch(user.actions.setError(null));
                    });
                } else {
                    batch (() => {
                        dispatch(user.actions.setUsername(null));
                        dispatch(user.actions.setUserId(null));
                        dispatch(user.actions.setAccessToken(null));
                        dispatch(user.actions.setError(data.response));
                    });
                }
            });
    }
    return (
        <>
        <Wrapper>
        <FormWrapper>
            <RadioButtonsWrapper>
                <Label>
                  <label htmlFor="login">Login</label>
                  <input type="radio" id="login" checked={mode === "login"} onChange={() => setMode("login")}/>
                </Label>
                <Label>
                  <label htmlFor="register">Register</label>
                  <input type="radio" id="register" checked={mode === "register"} onChange={() => setMode("register")}/>
                </Label>
            </RadioButtonsWrapper>
            <InputWrapper>
                <Form onSubmit={onFormSubmit}>
                    <label htmlFor="username">Username</label>
                    <Input
                        type="text" 
                        required
                        placeholder="Username"
                        id="username" 
                        value={username} 
                        onChange={e => setUsername(e.target.value)}/>
                    <label htmlFor="password">Password</label>
                    <Input 
                        type="text" 
                        required
                        placeholder="Password"
                        id="Password" 
                        value={password} 
                        onChange={e => setPassword(e.target.value)}/>
                        {password && password.length < 8
                        ? 'password must be over 8 characters'
                        : ''}
                    <Button type="submit">Submit</Button>
                    {error !== null && (
                    <p style={{ fontSize: '21px', color: 'red' }}>{error}</p>
                    )}
                </Form>
            </InputWrapper>
        </FormWrapper>
        </Wrapper>
    </>
    )
}

export default Login;

const Wrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 100vh;
background: #f8f9fd;
color: white;
`

const FormWrapper = styled.div`
width: 40%;
padding: 50px;
background: linear-gradient(#e36373, #e36460);
box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
border-radius: 15px;
`

const InputWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
`

const Form = styled.form`
display: flex;
flex-direction: column;
width: 300px;
`

const RadioButtonsWrapper = styled.div`
text-align: center;
margin-bottom: 20px;
display: flex;
flex-direction: row;
justify-content: center;
`

const Label = styled.div`
margin: 10px;
`

const Input = styled.input`
border-radius: 15px;
padding: 8px;
border: none;
margin-bottom: 15px;
font-size: 10px;

::placeholder {
    color: #EAEAEA;
}
`

const Button = styled.button`
width: 300px;
border-radius: 15px;
padding: 8px;
margin-top: 30px;
background-color: #e36373;
color: white;
border: 1px solid white;

&:hover {
    background-color: white;
    color: #e36373;
}
`