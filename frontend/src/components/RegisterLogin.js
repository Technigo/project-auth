import React, {useState, useEffect} from "react";
import styled from "styled-components";
import { useDispatch, useSelector, batch } from "react-redux";
import { API_URL } from "utils/utils";
import { useNavigate, Link } from "react-router-dom";

import user from "../reducers/user";



const RegisterContainer = styled.div`
    background-color: #F759A0;
    padding: 20px;
`
const InputContainer = styled.div`
    display: flex;
    margin: 10px 0;
`

const RegisterLabel = styled.label`
    margin-right: 5px;
`

const LoginContainer = styled.div`
background-color: #82DBE5;
padding: 20px;
`

const LoginLabel = styled.label`
margin-right: 5px;
`
const RegisterLogin = () => {


    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [mode, setMode] = useState("register");

    const dispatch = useDispatch();

    const navigate = useNavigate();
    const accessToken = useSelector((store) => store.user.accessToken);

    useEffect( ()=>{
        if(accessToken) {
            navigate("/Main");
        }
    }, [accessToken]);

    const onFormSubmit = (event)=> {
        event.preventDefault();

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username: username, password: password})
            // body: JSON.stringify({username, password})

        };
        fetch(API_URL(mode), options)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.success) {
                    batch(()=> {
                        dispatch(user.actions.setUserId(data.userId));
                        dispatch(user.actions.setAccessToken(data.accessToken));
                        dispatch(user.actions.setUserName(data.username));
                        dispatch(user.actions.setError(null));
                    });
                   
                } else {
                    batch(()=> {
                        dispatch(user.actions.setError(data.response));
                        dispatch(user.actions.setUserId(null));
                        dispatch(user.actions.setAccessToken(null));
                        dispatch(user.actions.setUserName(null));
                    });
                   
                }
            })
    };







    return(

        <div className="container">  
            <RegisterContainer>
                <h2>Register</h2>
                <form>
                    <InputContainer>
                        <RegisterLabel for="chooseusername">User name</RegisterLabel>
                        <input id="chooseusername" type="text"></input>
                    </InputContainer>
                    <InputContainer>
                        <RegisterLabel for="choosepassword">Password</RegisterLabel>
                        <input id="choosepassword" type="password"></input>
                    </InputContainer>

                    <button type="submit">Register</button>
                </form>
            </RegisterContainer>
            <LoginContainer>
            <h2>Log in</h2>
            <form onSubmit={onFormSubmit}>
                <InputContainer>
                    <LoginLabel htmlFor="username">User name</LoginLabel>
                    <input id="username" type="text" value={username} onChange={(e)=>setUsername(e.target.value)} />
                </InputContainer>
                <InputContainer>
                    <LoginLabel htmlFor="password">Password</LoginLabel>
                    <input id="password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                </InputContainer>
                <button type="submit">Login</button>
            </form>
        </LoginContainer>
        







        </div>
    )

};

export default RegisterLogin;