import { Box, Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { REACT_APP_BASE_URL } from 'utils/urls';
import user from 'reducers/user';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const accessToken = useSelector(store => store.user.accessToken);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (accessToken) {
            navigate("/secrets");
        }
    }, [accessToken]);

    const handleLoginButton = (event) => {
        event.preventDefault();
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username: username, password: password})
        };

        fetch(`${REACT_APP_BASE_URL}/login`, options)
            .then((response) => response.json())
            .then(data => {
                if (data.success) {
                    dispatch(user.actions.setAccessToken(data.response.accessToken));
                    dispatch(user.actions.setUserName(data.response.username));
                    dispatch(user.actions.setUserId(data.response.id));
                    dispatch(user.actions.setError(null));
                } else {
                    dispatch(user.actions.setAccessToken(null));
                    dispatch(user.actions.setUserName(null));
                    dispatch(user.actions.setUserId(null));
                    dispatch(user.actions.setError(data.response));
                    setErrorMsg("Could not log in")
                }
            })
            .catch(error => {
                console.log('Fetch error: ', error);
                dispatch(user.actions.setAccessToken(null));
                dispatch(user.actions.setUserName(null));
                dispatch(user.actions.setUserId(null));
                dispatch(user.actions.setError(error.message));
            })
    };

    return (
        <>
        <h1>LOGIN HERE</h1>
        <Box component="form" noValidate onSubmit={handleLoginButton} sx={{ mt: 3 }}>
            <TextField
                type="text"
                id="outlined-name-input-login"
                label="Username"
                variant="outlined"
                onChange={event => setUserName(event.target.value)}
                required />

            <TextField
                type="password"
                id="outlined-password-input-login"
                label="Password"
                variant="outlined"
                onChange={event => setPassword(event.target.value)}
                required />

            <Button
                type="submit"
                variant="outlined"
            >
                Login
            </Button>
        </Box>
        <p>{errorMsg}</p>
        </>
    )
};

export default Login;