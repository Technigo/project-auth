import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import user from "reducers/user";
import { API_URL } from "utils/urls";
import { Avatar, Button } from '@mui/material';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export const LoginPage = () => {
    const [username, setUsername] = useState(""); 
    const [password, setPassword] = useState("");
    const [mode, setMode] = useState("login");
    const [loginError, setLoginError] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const accessToken = useSelector(store => store.user.accessToken);
  
    useEffect(() => {
        if(accessToken) {
            navigate("/")
        }
    }, [accessToken])
    console.log(username);

    const onFormSubmit = (event) => {
        event.preventDefault();
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username: username, password: password})
        }
        fetch(API_URL(mode), options)
            .then(response => response.json())
            .then(data => {
                if(data.success) {
                    console.log(data)
                    dispatch(user.actions.setAccessToken(data.response.accessToken));
                    dispatch(user.actions.setUsername(data.response.username));
                    dispatch(user.actions.setUserId(data.response.id));
                    dispatch(user.actions.setError(null));
                    setLoginError(false);
                } else {
                    dispatch(user.actions.setAccessToken(null));
                    dispatch(user.actions.setUsername(null));
                    dispatch(user.actions.setUserId(null));
                    dispatch(user.actions.setError(data.response));
                    setLoginError(true);
                }
            })
    }

    const defaultTheme = createTheme();

    const handleModeChange = () => {
        if (mode === 'login') {
          setMode('register');
        } else {
          setMode('login');
        }
      };

    return (
        <>
            <ThemeProvider theme={defaultTheme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Welcome!
                        </Typography>
                        <Box component="form" onSubmit={onFormSubmit} noValidate sx={{ mt: 1 }}>
                        {/* <label htmlFor="register">Register</label>
                            <input 
                                type="radio" 
                                id="register" 
                                checked={mode === "register"}
                                onChange={() => setMode("register")}/>
                            <label htmlFor="login">Login</label>
                            <input 
                                type="radio" 
                                id="login" 
                                checked={mode === "login"}
                                onChange={() => setMode("login")}/> */}
                            <TextField
                                type="text"
                                margin="normal"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                required
                                fullWidth
                                id="username"
                                label="Name"
                                name="username"
                                autoFocus
                                error={loginError}
                                helperText={loginError ? 'Credentials do not match' : ''}
                                />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                value={password} 
                                 onChange={e => setPassword(e.target.value)}
                                autoComplete="current-password" 
                                error={loginError}
                                helperText={loginError ? 'Credentials do not match' : ''}
                                />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me" />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                {mode === 'login' ? 'Login' : 'Register'}
                            </Button>
                           <Grid container>
                                {/* <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid> */}
                                <Grid item>
                                    <Link href="#" variant="body2" onClick={handleModeChange}>
                                    {mode === 'login' ? "Don't have an account? Register" : 'Already have an account? Login'}
                                    </Link>
                                </Grid>
                            </Grid> 
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider></>
  
        // <Container>
        //     <h1>Welcome, please login</h1>
        //     <LoginForm
        //         type="submit"
        //         onSubmit={(event) => loginUser(event)}>
        //         <NameInput
        //         id=""
        //         type="text"
        //         placeholder="Enter name"
        //         value={usernameInput}
        //         onChange={(event) => setUsernameInput(event.target.value)}
        //         required />
        //         <PasswordInput
        //         id=""
        //         type="text"
        //         placeholder="password"
        //         value={userPasswordInput}
        //         onChange={(event) => setUserPasswordInput(event.target.value)}
        //         required />
        //         <Button type="submit">Enter</Button>
        //     </LoginForm>
        // </Container>
    
)}