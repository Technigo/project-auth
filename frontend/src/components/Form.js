import React, { useEffect } from 'react';
import { useDispatch, useSelector, batch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { user } from 'reducer/user';
import { Button, CssBaseline, TextField, Grid, Box, Typography, Container } from '@mui/material';

export const Form = ({ path, title, btnText }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const accessToken = useSelector((store) => store.user.accessToken);
    const error = useSelector(store => store.user.error);

    useEffect(() => {
        if (accessToken) {
            navigate("/secret");
        }
    }, [accessToken]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const userInput = new FormData(event.currentTarget);
        const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username: userInput.get('username'), password: userInput.get('password') })
        }
        fetch(`https://project-authentication-es4c3pthxq-lz.a.run.app/${path}`, options)
        .then((res) => res.json())
        .then(data => {
            if(data.success) {
              console.log(data)
                batch(() => {
                    dispatch(user.actions.setUsername(data.response.username));
                    dispatch(user.actions.setUserId(data.response.id));
                    dispatch(user.actions.setAccessToken(data.response.accessToken));
                });
            } else {
              console.log(data.response)
              dispatch(user.actions.setError(data.response));
            }
        });
    };

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
          <Typography component="h1" variant="h5">
                {title}
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username" />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password" />
              </Grid>
              <Typography variant="body1" color="red">
                {error}
              </Typography>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}>
                  {btnText}
            </Button>
            <Grid container>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
};