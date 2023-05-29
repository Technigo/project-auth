import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import user from "reducers/user";
import { API_URL } from "utils/urls";
import { Avatar, Button } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { FormControlLabel, FormGroup } from "@mui/material";
import Switch from "@mui/material/Switch";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { generatePassword, generateRandomName } from "./GuestLoginUtils";

export const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("login");
  const [guestLogin, setGuestLogin] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [loginErrorMessage, setLoginErrorMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector((store) => store.user.accessToken);

  useEffect(() => {
    if (accessToken) {
      navigate("/");
    }
  }, [accessToken]);

  useEffect(() => {
    if (guestLogin && (username !== "" && password !== "" && mode === "register")) {
      onFormSubmit()
    }
  }, [guestLogin, username, password, mode]);

  const onFormSubmit = (event) => {
    if (event != null) {
      event.preventDefault();
    }
    
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password }),
    };
    fetch(API_URL(mode), options)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log(data);
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
          setLoginErrorMessage(data.response);
        }
      });
  };

  
  const GuestLogin = () => {
  setUsername(generateRandomName());
  setPassword(generatePassword());
  setMode("register");
  setGuestLogin(true);
  };
  

  
  const defaultTheme = createTheme({
    typography: {
      fontFamily: ["VT323", "monospace"].join(","),
    },
  });

  const handleModeChange = () => {
    if (mode === "login") {
      setMode("register");
    } else {
      setMode("login");
    }
  };

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar> */}
            <Typography component="h1" variant="h5">
              Welcome, please {mode === "login" ? "login" : "register"}
            </Typography>
            <Box
              component="form"
              onSubmit={onFormSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                type="text"
                margin="normal"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                fullWidth
                id="username"
                label="Name"
                name="username"
                autoFocus
                error={loginError}
                helperText={
                  loginError
                    ? (() => {
                        if (mode === "register") {
                          if (
                            loginErrorMessage ===
                            "Username taken, try another one"
                          ) {
                            return "Username is already taken, please choose another one";
                          } else if (
                            loginErrorMessage ===
                            "Username cannot contain special characters or spaces"
                          ) {
                            return "Username cannot contain special characters or spaces";
                          } else {
                            return "";
                          }
                        } else if (mode === "login") {
                          return "Credentials do not match";
                        } else {
                          return "";
                        }
                      })()
                    : ""
                }
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
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                error={loginError}
                helperText={
                  loginError
                    ? mode === "login"
                      ? "Credentials do not match"
                      : ""
                    : ""
                }
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {mode === "login" ? "Login" : "Register"}
              </Button>
              <Button
                type="button"
                fullWidth
                variant="outlined"
                sx={{ mt: 3, mb: 2 }}
                onClick={GuestLogin}
              >
                Login as Guest
              </Button>
              <Grid container>
              <FormGroup>
                    {mode === "login"
                      ? "Don't have an account? →"
                      : "Already have an account? →"}
                    {mode === "login" ? (
                      <FormControlLabel
                        control={
                          <Switch
                            onChange={handleModeChange}
                            inputProps={{ "aria-label": "controlled" }}
                          />
                        }
                        label="Login"
                      />
                    ) : (
                      <FormControlLabel
                        control={
                          <Switch
                            onChange={handleModeChange}
                            inputProps={{ "aria-label": "controlled" }}
                          />
                        }
                        label="Register"
                      />
                    )}
                  </FormGroup>
                {/* <Grid item>
                  <Link href="#" variant="body3" onClick={GuestLogin}>
                                Login as Guest
                                    </Link>
                  
                </Grid> */}
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
};
