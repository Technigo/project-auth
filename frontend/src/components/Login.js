import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import user from "reducers/user";
import { API_URL } from "utils/urls";

const Circle = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
  min-width: 400px;
  width: 80%;
aspect-ratio: 1/1;
border: 2px solid transparent;
border-radius: 50%;
background-color: #313131;
box-shadow: 0 0 10px 5px #313131;
&:hover {
   border: 2px solid rgb(133,243,202);
}
@media screen and (min-width: 768px) {
    width: 60%; 
}
@media screen and (min-width: 1024px) {
    width: 50%; 
}
`
const RadioButtons = styled.div`
display: flex;
flex-direction: column;
margin-left: auto;
margin-right: auto;
color: #F2F2F2;
cursor: pointer;
@media screen and (min-width: 768px) {
    flex-direction: row;
}
`

const SubmitButton = styled.button`
font-size: 0.9rem;
margin-top: 0.6rem;
padding: 0.3rem 0.6rem;
border: 2px solid transparent;
  border-image: linear-gradient(90deg, rgba(191,244,115,0.9556197478991597) 0%, rgba(183,248,213,1) 50%, rgba(133,243,202,1) 100%);
  border-image-slice: 1;
  background: none;
color: #f2f2f2;
cursor: pointer;
visibility: hidden;

input:not(:placeholder-shown) + & {
    visibility: visible;
}
&:active {
    background: rgb(191,244,115);
}
`


const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [mode, setMode] = useState("Login");
    const [loginError, setLoginError] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const accessToken = useSelector(store => store.user.accessToken);


    useEffect(() => {
        if (accessToken) {
            navigate("/")
        }
    }, [accessToken]);


    const onFormSubmit = (event) => {
        event.preventDefault(); // so the form does not reload the page
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
                if (data.success) {
                    console.log(data)

                    dispatch(user.actions.setAccessToken(data.response.accessToken));
                    dispatch(user.actions.setUsername(data.response.username));
                    dispatch(user.actions.setUserId(data.response.id));
                    dispatch(user.actions.setError(null));
                    setLoginError(false);
                } else {
                    alert(data.response);
                    dispatch(user.actions.setAccessToken(null));
                    dispatch(user.actions.setUsername(null));
                    dispatch(user.actions.setUserId(null));
                    dispatch(user.actions.setError(data.response));
                    setLoginError(true);
                }
            })
    }

    const onInputChange = () => {
        setLoginError(false); // Reset the login error when input changes
      };

    return (
        <div className="allWrapper">
            <Circle>
                <div className="contentContainer">
                    <RadioButtons>
                        <label htmlFor="register">New account
                            <input type="radio"
                                placeholder="New account"
                                id="register"
                                checked={mode === "register"}
                                onChange={() => setMode("register")}
                            />
                        </label>

                        <label htmlFor="login">Already a user</label>
                        <input type="radio"
                            id="login"
                            checked={mode === "login"}
                            onChange={() => setMode("login")} />
                    </RadioButtons>

                    <form onSubmit={onFormSubmit}>
                        <fieldset>
                            <legend>{mode === "register" ? "Create new user" : "Sign in"}</legend>
                            <label htmlFor="username">Username </label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => {
                                    setUsername(e.target.value);
                                    onInputChange();
                                }} />

                            <label htmlFor="password">Password </label>
                            <input
                                type="password"
                                id="password"
                                minLength="6"
                                placeholder=" "
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    onInputChange();
                                  }} />
                            {loginError && <p>username or password invalid</p>}

                            <SubmitButton type="submit">
                                {mode === "register" ? "Create user" : "Sign in"}
                            </SubmitButton>
                        </fieldset>
                    </form>
                </div>
            </Circle>
        </div>
    );

}

export default Login;