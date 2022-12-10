import React, {useEffect, useState} from "react";
import { useDispatch, useSelector, batch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { API_URL } from "utils/utils";
import user from "reducers/user";

// const BASE_URL = "http://localhost:8090";
// export const API_URL = (slug) => `${BASE_URL}/${slug}`;


const Login = () => {
    const [email, setEmail] = useState("");
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

    const onFormSubmit =(event) => {
        event.preventDefault();
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username: username, password: password, email: email})
        }
        fetch(API_URL(mode), options)
            .then(response => response.json())
            .then(data => {
                if(data.success) {
                    batch(()=> {
                        dispatch(user.actions.setUsername(data.response.username));
                        dispatch(user.actions.setUserId(data.response.id))
                        dispatch(user.actions.setAccessToken(data.response.accessToken));
                        dispatch(user.actions.setError(null));
                    });
                } else {
                    batch (() => {
                        dispatch(user.actions.setUsername(null));
                        dispatch(user.actions.setUserId(null))
                        dispatch(user.actions.setAccessToken(null));
                        dispatch(user.actions.setError(data.response));
                    });
                }
            })
    }
    return (
        <>
        <label htmlFor="register">Register</label>
        <input type="radio" id="register" checked={mode === "register"} onChange={()=>setMode("register")}/>
        <label htmlFor="login">Login</label>
        <input type="radio" id="login" checked={mode === "login"} onChange={()=>setMode("login")}/>
        <form onSubmit={onFormSubmit}>
        <button type="submit">Submit</button>
    
        <input
            required 
            type="password" 
            id="password" 
            placeholder="password"
            value={password} 
            onChange={e => setPassword(e.target.value)}/>
            <label htmlFor="Password">Password</label>
                
        <input
           // required
            type="email"
            value={email}
            name="email"
            placeholder="email"
            onChange={event => setEmail(event.target.value)} />
           <label htmlFor="email">Email</label>
            
        <input 
            required
            type="text" 
            id="username" 
            placeholder="username"
            value={username} 
            onChange={e => setUsername(e.target.value)}/>
            <label htmlFor="username">Username</label>
        </form>
    </> 
    );
}

export default Login;

