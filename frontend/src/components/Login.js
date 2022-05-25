import React, { useState, useEffect } from "react";
import { useDispatch, useSelector, batch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { API_URL } from "utils/utils";

import user from "reducers/user";

import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";


const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [mode, setMode] = useState("register");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const accessToken = useSelector((store) => store.user.accessToken);

    useEffect(() => {
        if(accessToken) {
            navigate("/notes");
        }
    }, [accessToken]);


    const onFormSubmit = (event) => {
        event.preventDefault();

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({username: username, password: password})
    };

    fetch(API_URL(mode), options)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if (data.success) {
                batch(() => {
                    dispatch(user.actions.setUserId(data.userId));
                    dispatch(user.actions.setAccessToken(data.accessToken));
                    dispatch(user.actions.setUserName(data.username));
                    dispatch(user.actions.setError(null));
                });
            } else {
                batch(() => {
                    dispatch(user.actions.setError(data.response));
                    dispatch(user.actions.setUserId(null));
                    dispatch(user.actions.setAccessToken(null));
                    dispatch(user.actions.setUserName(null));
                });
            }
        })
    }

    return (
        <>

        <FormControl>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="register"
                name="radio-buttons-group"
            >
                <FormControlLabel 
                value="register" 
                control={<Radio />} 
                label="Register"
                checked={mode === "register"}
                onChange={() => setMode("register")} />

                <FormControlLabel 
                value="login" 
                control={<Radio />} 
                label="Log in"
                checked={mode === "login"}
                onChange={() => setMode("login")}/>
            </RadioGroup>
        </FormControl>
       
       <form onSubmit={onFormSubmit}>
            <TextField
                id="outlined-basic"
                label="Username"
                variant="outlined"
                value={username}
                onChange={(e)=>setUsername(e.target.value)}/>

            <TextField
                id="outlined-password-input"
                label="Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e)=>setPassword(e.target.value)} />

            <Button variant="contained" type="submit">Submit</Button>
        </form>
        </>
    )
    
};

export default Login;