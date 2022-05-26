import React, { useState, useEffect}  from "react";
import { useDispatch, useSelector, batch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { API_URL } from "utils/utils";

import user from "reducers/user";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [mode, setMode] = useState("register");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const accessToken = useSelector((store) => store.user.accessToken);

    useEffect( ()=>{
        if(accessToken) {
            navigate("/");
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
                ;
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
    }

    return (
    <div className="form-wrapper">
        <Link to="/"></Link>
        
        <label className="container">Register
        <input type="radio" id="register" checked={mode === "register"} onChange={()=> setMode("register")}/>
        <span className="checkmark"></span>
        </label>
        <label className="container">Login
        <input type="radio" id="login" checked={mode === "login"} onChange={()=> setMode("login")}/>
        <span className="checkmark"></span>
        </label>


        <form onSubmit={onFormSubmit}>
          <div className="inputfields">
             <label htmlFor="username">Username</label>
               <input 
                type="text"
                id ="username"
                value={username}
                onChange={(e)=>setUsername(e.target.value)}/>
           </div>
                <div className="inputfields">
            <label htmlFor="password">Password</label>
              <input 
                 type="password"
                 id ="password"
                 value={password}
                 onChange={(e)=>setPassword(e.target.value)}/>
             </div>
             <button className="button-80" type="submit">Submit</button>
                </form>
                
    </div>
    )
};

export default Login;