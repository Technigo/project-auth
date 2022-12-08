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
                <InputRadio
                  type="radio"
                  id="register"
                  checked={mode === "register"}
                  onChange={() => setMode("register")}
                />
                </LabelMode>
                    <ModeHeading>LOG IN </ModeHeading>
            </LoginContainer>
                )}

            {mode === "register" && (
            <LoginContainer>
              <LabelMode htmlFor="login">Go to Login
              <InputRadio
                className="radioBtn"
                type="radio"
                id="login"
                checked={mode === "login"}
                onChange={() => setMode("login")}
              /></LabelMode>
              <ModeHeading>NEW USER </ModeHeading>
    
        </LoginContainer>
        )}
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
            <Error>
            {catchError !== null &&(
            <ErrorText>{catchError}</ErrorText>
          )}       
          </Error>  

            </Form>
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
height: 10vh; 
 
  `

const Form = styled.form`
display: flex; 
flex-direction:column;
align-items: center;
justify-content: center; 
border: solid 5px white;
border-radius: 30px; 
height: 35vh; 
width: 30vh; 
padding: 4em;    
background-color: rgba(229, 229, 229, 0.4);
box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
 `

const SubmitBtn = styled.button`
margin-top: 20px; 
width: 25vh;
height: 5vh; 
border-radius: 5px; 
font-weight: bold; 
background-color: white;
&:hover {
    background-color: pink; 
    transition-delay: 0.1s; 
} ` 

const InputCredentials = styled.input`
border-radius: 5px;
font-weight: bold; 
height: 4vh;
margin: 5px; 

`
const Label = styled.label`
margin: 5px; 
font-weight: bold; 
color: white; 
`

const LabelMode = styled.label`
  color: #fff;
  text-shadow:
      0 0 7px #fff,
      0 0 10px #fff,
      0 0 21px #fff,
      0 0 42px #5271ff,
      0 0 82px #5271ff,
      0 0 92px #5271ff,
      0 0 102px #5271ff,
      0 0 151px #5271ff;
  text-align: center;
  font-weight: 400;
  font-size: 1.7rem;
    animation: pulsate 0.11s ease-in-out infinite alternate;  
	
	@keyframes pulsate {
    
	100% {
  
		text-shadow:
		0 0 4px #fff,
		0 0 11px #fff,
		0 0 19px #fff,
		0 0 40px #5271ff,
		0 0 80px #5271ff,
		0 0 90px #5271ff,
		0 0 100px #5271ff,
		0 0 150px #5271ff;
	
	}
	
	0% {
  
	  text-shadow:
	  0 0 4px #fff,
	  0 0 10px #fff,
	  0 0 18px #fff,
	  0 0 38px #5271ff,
	  0 0 73px #5271ff,
	  0 0 80px #5271ff,
	  0 0 94px #5271ff,
	  0 0 140px #5271ff;
  
  }
}`

const InputRadio = styled.input`
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #01FB37;
  background: ${(props) => (props.checked ? '#01FB37' : 'white')};
  position: absolute;

`
const Error = styled.div`
 
`

const ErrorText = styled.p`
`

const ModeHeading= styled.h4`
 color: #fff;
 margin-bottom: 50px; 
  text-shadow:
      0 0 7px #fff,
      0 0 10px #fff,
      0 0 21px #fff,
      0 0 42px #5271ff,
      0 0 82px #5271ff,
      0 0 92px #5271ff,
      0 0 102px #5271ff,
      0 0 151px #5271ff;
  text-align: center;
  font-weight: 400;
  font-size: 3rem;
    animation: pulsate 0.11s ease-in-out infinite alternate;  
	
	@keyframes pulsate {
    
	100% {
  
		text-shadow:
		0 0 4px #fff,
		0 0 11px #fff,
		0 0 19px #fff,
		0 0 40px #5271ff,
		0 0 80px #5271ff,
		0 0 90px #5271ff,
		0 0 100px #5271ff,
		0 0 150px #5271ff;
	
	}
	
	0% {
  
	  text-shadow:
	  0 0 4px #fff,
	  0 0 10px #fff,
	  0 0 18px #fff,
	  0 0 38px #5271ff,
	  0 0 73px #5271ff,
	  0 0 80px #5271ff,
	  0 0 94px #5271ff,
	  0 0 140px #5271ff;
  
  }
}
`

export default Login 