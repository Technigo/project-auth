import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import user from "reducers/user";
import { API_URL } from "utils/urls";
import { ContentContainer, LoginRegister, Wrapper } from './styledComponents/Containers';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [mode, setMode] = useState("login");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const accessToken = useSelector(store => store.user.accessToken);
    useEffect(() => {
        if (accessToken) {
            navigate("/")
        }
    }, [accessToken]);

    const onFormSubmit = (event) => {
        event.preventDefault();
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: username, password: password }),
        }
        fetch(API_URL(mode), options)
        .then(res => {
          if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
          }
          console.log(res);
          return res.json()
        })
        .then(data => {
          // Handle the response data
          if (data.success) {
            dispatch(user.actions.setAccessToken(data.response.accessToken));
            dispatch(user.actions.setUsername(data.response.username));
            dispatch(user.actions.setUserId(data.response.id));
            dispatch(user.actions.setError(null));
          } else {
            dispatch(user.actions.setAccessToken(null));
            dispatch(user.actions.setUsername(null));
            dispatch(user.actions.setUserId(null));
            dispatch(user.actions.setError(data.response));
          }
        })
        .catch(error => {
          console.error("Error:", error);
        });
    };
      // By adding the error handling block, you'll be able to see any additional error messages or status codes that can help pinpoint the problem with the fetch request.
      
    return (
      <Wrapper>
        <ContentContainer>
        <LoginRegister primary>
            {/* <label htmlFor="register">Register</label> */}
            <h1>Register</h1>
            <input 
                type="radio" 
                id="register" 
                checked={mode === "register"}
                onChange={() => setMode("register")}
            />
            {/* <label htmlFor="login">Login</label> */}
            <h1>Login</h1>
            <input 
                type="radio" 
                id="login" 
                checked={mode === "login"}
                onChange={() => setMode("login")}
            />
            <form onSubmit={onFormSubmit}>
                {/* <label htmlFor="username">Username</label> */}
                <h2>Username</h2>
                <input 
                    type="text" 
                    id="username" 
                    value={username} 
                    onChange={e => setUsername(e.target.value)}
                    placeholder="Username"
                />
                {/* <label htmlFor="password">Password</label> */}
                <h2>Password</h2>
                <input 
                    type="password" 
                    id="password" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <button type="submit">Submit</button>
        </form>
        </LoginRegister>
        </ContentContainer>
        </Wrapper>
    );
}

export default Login;