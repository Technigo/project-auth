import { Box, TextField } from '@mui/material';
import { StyledButton } from "./Styled components/StyledButton";
import { StyledBox } from "./Styled components/StyledBox";
import { MainContainer } from "./Styled components/MainContainer";
import { StyledButtonContainer } from "./Styled components/StyledButtonContainer";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { REACT_APP_BASE_URL } from 'utils/urls';
import user from 'reducers/user';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [helperTextLogin, setHelperTextLogin] = useState("")
    const [errorLogin, setErrorLogin] = useState(false);
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
                    setErrorLogin(true);
                    setErrorMsg("Could not log in");
                    setHelperTextLogin("Credentials do not match");
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
        <MainContainer imageUrl="https://images.unsplash.com/photo-1546110998-90292f445be8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80">
            <StyledBox>
                <h1>LOGIN</h1>
                <p>{errorMsg}</p>
                <Box component="form" noValidate onSubmit={handleLoginButton} sx={{ mt: 3 }}>
                    <TextField
                        type="text"
                        id="outlined-name-input-login"
                        label="Username"
                        variant="outlined"
                        helperText={helperTextLogin}
                        error={errorLogin}
                        onChange={event => setUserName(event.target.value)}
                        required
                        fullWidth
                        margin="normal"
                        />

                    <TextField
                        type="password"
                        id="outlined-password-input-login"
                        label="Password"
                        variant="outlined"
                        helperText={helperTextLogin}
                        error={errorLogin}
                        onChange={event => setPassword(event.target.value)}
                        required 
                        fullWidth
                        margin="normal"
                        />

                    <StyledButtonContainer />
                    <StyledButton
                        type="submit"
                        variant="outlined"
                    >
                        Login
                    </StyledButton>
                </Box>
            </StyledBox>
        </MainContainer>
    )
};

export default Login;