// Add a input for username, password . Followed by radio buttons "login" "register" => button 
import React, { useState, useEffect } from "react";
import { batch, useDispatch, useSelector } from "react-redux";
import { API_URL } from "utils/utils";

import userSlice from "reducers/userSlice";
import { useNavigate } from "react-router-dom";

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
        <div>
            {mode === "login" && (
            <div>
                <label htmlFor="Sign-Up">Sign up </label>
                <input 
                  type="radio"
                  id="register"
                  checked={mode === "register"}
                  onChange={() => setMode("register")}
                />
                    <h1>LOG IN </h1>
            </div>
                )}

            {mode === "register" && (
            <div>
              <label htmlFor="login">Go to Login</label>
              <input
                className="radioBtn"
                type="radio"
                id="login"
                checked={mode === "login"}
                onChange={() => setMode("login")}
              />
              <h1>REGISTER</h1>
    
        </div>
        )}
         
            <form onSubmit={onLoginSubmit}>
                <label>Username</label>
             <input
             type="text"
             id="username"
             value={username}
             onChange={(e) => setUsername(e.target.value)} />
             <label>Password</label>
             <input
             type="password"
             id="password"
             value={password}
             onChange={(e) => setPassword(e.target.value)} />
             <button className="submit" type="submit">submit</button>

            </form>
            
            {catchError !== null &&(
            <p>{catchError}</p>
          )}       
                
        </div>
    )
}

export default Login 