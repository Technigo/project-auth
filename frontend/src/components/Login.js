// Add a input for username, password . Followed by radio buttons "login" "register" => button 
import React, { useState, useEffect } from "react";
import { batch, useDispatch, useSelector } from "react-redux";
import { API_URL } from "utils/utils";

import userSlice, { addUsername, addAccessToken, addUserId, catchError }  from "reducers/userSlice";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const accessToken = useSelector((state) => state.user.accessToken);

  /*   useEffect(() => {
        if(accessToken) {

        }
    }) */
   
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
                    dispatch(addUsername(data.username))
                    dispatch(addAccessToken(data.accessToken))
                    dispatch(addUserId(data.userId))
                    dispatch(catchError(null))
                })
    
            } else {
                batch(() => {
                    dispatch(catchError(data.response))
                    dispatch(addUsername(null))
                    dispatch(addAccessToken(null))
                    dispatch(addUserId(null))
                })
               
            }
           
        })

    }

   
    return(
        <div>
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
        </div>
    )
}

export default Login