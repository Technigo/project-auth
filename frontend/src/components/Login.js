import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import user from "reducers/user";
import { API_URL } from "utils/urls";
import { Button, TextField, Alert, AlertTitle, Container, FormControl, RadioGroup, FormControlLabel, Radio, Typography, Box, Grid } from "@mui/material";

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [mode, setMode] = useState("login")
    const [errorMessage, setErrorMessage] = useState("");
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const accessToken = useSelector(store => store.user.accessToken)
    
    useEffect(() => {
        if (accessToken) {
            navigate("/")
        }
    }, [accessToken])

    const onFormSubmit = (event) => {
        event.preventDefault()
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username: username, password: password})
        }
        fetch(API_URL(mode), options)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    console.log(data)
                    dispatch(user.actions.setAccessToken(data.response.accessToken))
                    dispatch(user.actions.setUsername(data.response.username))
                    dispatch(user.actions.setUserId(data.response.id))
                    dispatch(user.actions.setError(null))
                } else {
                    dispatch(user.actions.setAccessToken(null));
                    dispatch(user.actions.setUsername(null));
                    dispatch(user.actions.setUserId(null));
                    dispatch(user.actions.setError(data.response))
                    setErrorMessage(data.message);
                }
            })
    }

    return (
        <Container component="main" maxWidth="xs" sx={{marginTop: 8}}>
            <Typography variant="h4" sx={{marginBottom: 2}}>Welcome!</Typography>
            <Typography variant="h6">Please register and/or login to continue.</Typography>
            <FormControl id="register-or-login">
                <RadioGroup
                    row
                    aria-labelledby="register-or-login-button-group"
                    defaultValue={mode === "register"}
                    name="register-or-login-button-group">
                    <FormControlLabel 
                        value="register" 
                        control={<Radio />}
                        label="Register"
                        checked={mode === "register"}
                        onChange={() => setMode("register")}/>
                    <FormControlLabel 
                        value="login" 
                        control={<Radio />}
                        label="Login"
                        checked={mode === "login"}
                        onChange={() => setMode("login")}/>
                  </RadioGroup>
            </FormControl>
           
            <Box component="form" onSubmit={onFormSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            type="text"
                            id="username"
                            label="Username"
                            variant="outlined"
                            value={username}
                            onChange={event => setUsername(event.target.value)}
                            minLength="4"
                            maxLength="30"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            type="password"
                            id="password"
                            label="Password"
                            variant="outlined"
                            value={password}
                            onChange={event => setPassword(event.target.value)}
                            minLength="4"
                            maxLength="30"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={username.length < 4 || username.length > 30 && password.length < 8 || password.length > 30}>
                            Submit
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        {errorMessage && (
                            <Alert severity="error">
                            <AlertTitle>Error</AlertTitle>
                            {errorMessage}
                            </Alert>
                        )}
                    </Grid>
                </Grid>
            </Box>

            {/* <label htmlFor="register">Register</label>
            <input
                type="radio"
                id="register"
                checked={mode === "register"}
                onChange={() => setMode("register")}
            />
            <label htmlFor="login">Login</label>
            <input
                type="radio"
                id="login"
                checked={mode === "login"}
                onChange={() => setMode("login")}
            /> */}

            {/* <form onSubmit={onFormSubmit}>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={event => setUsername(event.target.value)}
                    minLength="4"
                    maxLength="30"
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                    minLength="4"
                    maxLength="30"
                />
                <button type="submit" disabled={username.length < 4 || username.length > 30 && password.length < 7 || password.length > 30}>Submit</button>
            </form>
            {errorMessage && {errorMessage}} */}

        </Container>
    )
}

export default Login