import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser, user, loginUser } from "./reducers/user";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import PetsIcon from '@mui/icons-material/Pets';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import {ThemeProvider, createTheme } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import { Alert, Stack } from "@mui/material";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Nora and Jennifer's Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();
const Login = () => {
const[username, setUsername] = useState("");
const[password, setPassword] = useState("");
const[email, setEmail] = useState("");
const [checked, setChecked] = useState(true);
// const mode = useSelector(store => store.user.mode);
const error = useSelector(store => store.user.error);
console.log(error)
const dispatch = useDispatch();
const navigate = useNavigate();
const accessToken = useSelector(store => store.user.accessToken);
  
  useEffect(() => {
   if(accessToken){
      navigate("/")
   }
  }, [accessToken]);
const onFormSubmit = (event)=>{
event.preventDefault()
if(!checked){
dispatch(registerUser(username, email, password))
}else{
dispatch(loginUser(email, password))
}
}
     return(
<ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <PetsIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
             {checked ? 'Sign in' : 'Sign up'}
            </Typography>
            <Box component="form" noValidate onSubmit={onFormSubmit} sx={{ mt: 1 }}>
              {!checked && <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={username}
                onChange={e => setUsername(e.target.value)} 
              /> }
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={e => setEmail(e.target.value)} 
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
              />
              <FormControlLabel
                  control={<Switch checked={checked} on onChange={(event)=>setChecked(event.target.checked)} defaultChecked />}
                label={checked ? 'Sign in' : 'Sign up'}
                />
                  {error!==null && <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert severity="error">{error}</Alert>
                  </Stack>}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Submit
              </Button>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>

)};

export default Login