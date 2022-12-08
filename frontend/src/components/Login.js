// Add a input for username, password . Followed by radio buttons "login" "register" => button 
import React, { useState, useEffect } from "react";
import { batch, useDispatch, useSelector } from "react-redux";
import { API_URL } from "utils/utils";

import userSlice from "reducers/userSlice";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [mode, setMode] = useState("register")
    const [catchError, setCatchError] = useState(null)

    const navigate = useNavigate()

    const dispatch = useDispatch();
    const accessToken = useSelector((state) => state.user.accessToken);

    useEffect(() => {
        if(accessToken) {
            navigate("/thoughts")
        }
    }, [accessToken])
   
    const onLoginSubmit = (event) => {
      event.preventDefault();  
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username: username, password: password})
        };
    
        fetch(API_URL(mode), options)
        .then(res => res.json())
        .then(data => {
            if(data.success) {
                batch(() => {
                    dispatch(userSlice.actions.addUsername(data.response.username))
                    dispatch(userSlice.actions.addUserId(data.response.userId))
                    dispatch(userSlice.actions.addAccessToken(data.response.accessToken))
                    dispatch(userSlice.actions.catchError(null))
                    setCatchError(null)
                })
    
            } else {
                batch(() => {
                    dispatch(userSlice.actions.addUsername(null))
                    dispatch(userSlice.actions.addUserId(null))
                    dispatch(userSlice.actions.addAccessToken(null))
                    dispatch(userSlice.actions.catchError(data.response))
                    setCatchError(data.response)
                })
               
            }
           
        })

    }

   
    return(
        <WrapperLogin>
            {mode === "login" && (
            <LoginContainer>
                <LabelMode htmlFor="Sign-Up">Go to sign up 
                <input 
                  type="radio"
                  id="register"
                  checked={mode === "register"}
                  onChange={() => setMode("register")}
                />
                </LabelMode>
                    <h4>LOG IN </h4>
            </LoginContainer>
                )}

            {mode === "register" && (
            <LoginContainer>
              <LabelMode htmlFor="login">Go to Login
              <input
                className="radioBtn"
                type="radio"
                id="login"
                checked={mode === "login"}
                onChange={() => setMode("login")}
              /></LabelMode>
              <h4>REGISTER AS NEW USER </h4>
    
        </LoginContainer>
        )}
         <div>
            <Form onSubmit={onLoginSubmit}>
                <Label>Username</Label>
             <InputCredentials
             type="text"
             id="username"
             value={username}
             onChange={(e) => setUsername(e.target.value)} />
             <Label>Password</Label>
             <InputCredentials
             type="password"
             id="password"
             value={password}
             onChange={(e) => setPassword(e.target.value)} />
             {mode === "login" && (
                <SubmitBtn className="submit" type="submit">Log in</SubmitBtn>
             )}
             {mode === "register" && (
                <SubmitBtn className="submit" type="submit">Create user</SubmitBtn>
             )}
             

            </Form>
            </div>
            <div>
            {catchError !== null &&(
            <p>{catchError}</p>
          )}       
          </div>    
        </WrapperLogin>
    )
}

const WrapperLogin = styled.div`
display: grid; 
height: 100vh; 
width: 100vw; 
justify-content: center; 
`

const LoginContainer = styled.div`
display: flex;
flex-direction: column; 
align-items: center;
margin-top: 5em;   `

const Form = styled.form`
display: flex; 
flex-direction:column;
align-items: center; 
border: solid 5px black;
height: 30vh; 
width: 30vh; 
padding: 4em;  
 `

const SubmitBtn = styled.button`
margin-top: 20px; ` 

const InputCredentials = styled.input`
border-radius: 5px;
height: 4vh;
margin: 5px; 

`
const Label = styled.label`
margin: 5px; 
`

const LabelMode = styled.label``

export default Login 