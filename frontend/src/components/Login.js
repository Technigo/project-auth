import React, {useEffect, useState} from "react";
import styled from "styled-components";
import { useDispatch, useSelector, batch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { API_URL } from "utils/utils";
import { user } from "reducers/user";
import { Wrapper, Button } from "./GlobalStyles";

const Login = () => {
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

    const onFormSubmit = (event) => {
        event.preventDefault();
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        }
        fetch(API_URL(mode), options)
        .then(response => response.json())
        .then(data => {
            if(data.success){
                batch(() => {
                    dispatch(user.actions.setUserName(data.response.username));
                    dispatch(user.actions.setUserId(data.response.id));
                    dispatch(user.actions.setAccessToken(data.response.accessToken));
                    dispatch(user.actions.setError(null));
                });
            } else {
                batch(() => {
                    dispatch(user.actions.setUserName(null));
                    dispatch(user.actions.setUserId(null));
                    dispatch(user.actions.setAccessToken(null));
                    dispatch(user.actions.setError(data.response));
                });
            }
        })
    }
    return(
        <>
        <HeaderContainer>
            <h1>Forest Adventure</h1>
        </HeaderContainer>
        <Wrapper>
        <ModeContainer>
        <Mode><label htmlFor="register">Register</label>
        <input 
            type="radio"
            id="register"
            checked={mode === "register"}
            onChange={() => setMode("register")}
        /></Mode>
        <Mode><label htmlFor="login">Login</label>
        <input 
            type="radio"
            id="login"
            checked={mode === "login"}
            onChange={() => setMode("login")}
        /></Mode>
        </ModeContainer>
        <Form onSubmit={onFormSubmit}>
            <InputContainer><label htmlFor="username">Username</label>
            <input 
               type="text"
               id="username"
               value={username}
               onChange={e => setUsername(e.target.value)} />
            </InputContainer>
            <InputContainer>
            <label htmlFor="password">Password</label>
            <input 
               type="password"
               id="password"
               value={password}
               onChange={e => setPassword(e.target.value)} />
            </InputContainer>
            <Button type="submit">Submit</Button>
        </Form>
        </Wrapper>
        </>
    );
}

export default Login;

const HeaderContainer = styled.header`
    display: flex;
    align-items: center;
    background-image: url('/images/background.jpg');
    height: 300px;
    background-position: center top;
    box-shadow: 10px 10px 19px 1px rgba(0,0,0,0.61);
    -webkit-box-shadow: 10px 10px 19px 1px rgba(0,0,0,0.61);
    -moz-box-shadow: 10px 10px 19px 1px rgba(0,0,0,0.61);
    
    h1{
        text-align: center;
        color: #4b4f3e;
        word-wrap: break-word;
        width: 200px;
        font-size: 30px;
    }

    @media (min-width: 668px){
        background-position: center bottom;
        h1{
            left: 30%;
        }
    }
`
const ModeContainer = styled.div`
    display: flex;
    padding: 70px 0 30px;
    flex-direction: row;
    gap: 50px;
`
const Mode = styled.div`
    display: inline-block;
    label {margin: 5px;}
`
const Form = styled.form`
    display: grid;
    margin: 0 auto;
    @media (min-width: 668px){
        justify-items: end;
    }
`
const InputContainer = styled.div`
    margin: 5px 0;
    display: flex;
    flex-direction: column;
    align-items: center;

    label {
        margin: 10px;
        padding: 10px;}
    input {
        border: none;
        border: 2px solid #4b4f3e;
        background-color: transparent;
        padding: 12px;
    }

    @media (min-width: 668px){
    }
`