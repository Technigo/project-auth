import { Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { REACT_APP_BASE_URL } from 'utils/urls';
import user from 'reducers/user';

const Register = () => {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [isRegistered, setIsRegistered] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const [helperText, setHelperText] = useState("");
    const dispatch = useDispatch();

    // Password regex requirements
    const MIN_LENGTH = 8;
    const MAX_LENGTH = 32;
    const numberRegex = /(?=.*\d)/;
    const lowercaseRegex = /(?=.*[a-z])/;
    const uppercaseRegex = /(?=.*[A-Z])/;
    const specialCharRegex = /(?=.*[!@#\$%\^&\*])/;

    // Checks the password input against same regex as in backend
    const handlePasswordValue = (event) => {
        const passwordErrMsg = [];

        if (event.target.value.length < MIN_LENGTH) {
            passwordErrMsg.push("at least 8 characters")
        }
        if (event.target.value.length > MAX_LENGTH) {
            passwordErrMsg.push("no more than 32 characters")
        }
        if (!numberRegex.test(event.target.value)) {
            passwordErrMsg.push("at least one number")
        }
        if (!lowercaseRegex.test(event.target.value)) {
            passwordErrMsg.push("at least one lowercase letter")
        }
        if (!uppercaseRegex.test(event.target.value)) {
            passwordErrMsg.push("at least one uppercase letter")
        }
        if (!specialCharRegex.test(event.target.value)) {
            passwordErrMsg.push("at least one special character")
        }

        setErrorPassword(passwordErrMsg.length > 0);
        setHelperText("Password also needs to contain: " + passwordErrMsg.join(","))
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        handlePasswordValue({ target: { value: password } });

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username: username, password: password})
        };
        fetch(`${REACT_APP_BASE_URL}/register`, options)
            .then((response) => response.json())
            .then(data => {
                if (data.success) {
                    console.log(data)
                    dispatch(user.actions.setUserName(data.response.username))
                    dispatch(user.actions.setUserId(data.response.id))
                    dispatch(user.actions.setError(null))
                    setIsRegistered(true);
                    setSuccessMsg('User successfully created')
                } else if (data.response.message === 'Username is already taken') {
                    dispatch(user.actions.setAccessToken(null))
                    dispatch(user.actions.setUserName(null))
                    dispatch(user.actions.setUserId(null))
                    dispatch(user.actions.setError(data.response))
                    setErrorMsg('Username is already taken')
                } else {
                    dispatch(user.actions.setAccessToken(null))
                    dispatch(user.actions.setUserName(null))
                    dispatch(user.actions.setUserId(null))
                    dispatch(user.actions.setError(data.response))
                    setErrorMsg('User could not be created')
                }
            })
            .catch(error => {
                console.log('Fetch error: ', error);
                dispatch(user.actions.setAccessToken(null))
                dispatch(user.actions.setUserName(null))
                dispatch(user.actions.setUserId(null))
                dispatch(user.actions.setError(error.message))
            })
    };

    return (
        <>
            <h1>REGISTER HERE</h1>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <TextField
                    type="text" 
                    id="outlined-name-input" 
                    label="Username" 
                    variant="outlined"
                    onChange={event => setUserName(event.target.value)}
                    required
                />

                <TextField
                    type="password" 
                    id="outlined-password-input" 
                    label="Password" 
                    variant="outlined"
                    helperText={helperText}
                    error={errorPassword}
                    onChange={event => setPassword(event.target.value)}
                    required
                />

                <Button 
                    type="submit" 
                    variant="outlined"
                    component={isRegistered ? Link : "button"}
                    to={isRegistered ? "/login" : undefined}
                >
                    {isRegistered ? "Go to login" : "Submit"}
                </Button>
                <p>{errorMsg}</p>
                <p>{successMsg}</p>
            </Box>
        </>
    )
};

export default Register;