import React, {useEffect, useState} from "react";
import { useDispatch, useSelector, batch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { API_URL } from "utils/utils";
import user from "reducers/user";
import { Card, Input, Label, ModeLabel } from 'components/GlobalStyles';
import { Form, Button } from 'components/GlobalStyles';

export const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [mode, setMode] = useState("login")
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
            body: JSON.stringify({username: username, password: password })
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

// CSS to hide active radio buttons + label is located in index.css
  return (
    <Card>
       <form onSubmit={onFormSubmit}>
         <Form >
         <h1> { mode === "register" && "Register" || "Sign in" } </h1>
         <label htmlFor="username"/>
            <Input 
            type="text" 
            id="username" 
            placeholder="username"
            value={username} 
            onChange={e => setUsername(e.target.value)}/> 
            <label htmlFor="password"/>
            <Input 
            type="password" 
            id="password" 
            placeholder="password"
            value={password} 
            onChange={e => setPassword(e.target.value)}/>
         </Form>
            <Button type="submit" > 
                    { mode === "register" && "Join us now!" || "Sign in" } 
            </Button>
        </form>
        <Label>
            <ModeLabel htmlFor="register">{mode === "register" ? "" : "not a member? register here!" }
            <input type="radio" id="register" name="register" checked={mode === "register"} onChange={()=> setMode("register")}/>
            </ModeLabel>
            <ModeLabel htmlFor="login">{mode === "login" ? "" : "log in now" }
            <input type="radio" id="login" checked={mode === "login" } onChange={()=> setMode("login")}/> 
            </ModeLabel>
        </Label>    
    </Card>
  );
}
