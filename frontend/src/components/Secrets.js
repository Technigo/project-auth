import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { REACT_APP_BASE_URL } from 'utils/urls';
import user from 'reducers/user';
import secrets from 'reducers/secrets';
import { Box, Button } from '@mui/material';

export const Secrets = () => {
    const accessToken = useSelector(store => store.user.accessToken);
    const username = useSelector(store => store.user.username);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": accessToken
            }
        }
        fetch(`${REACT_APP_BASE_URL}/secrets`, options)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    dispatch(secrets.actions.setError(null));
                    dispatch(secrets.actions.setSecretMessage(data.response))
                } else {
                    dispatch(secrets.actions.setError(data.response));
                    dispatch(secrets.actions.setSecretMessage(null))
                }
            })
    }, []);

    const onLogOutButtonClick = () => {
        dispatch(user.actions.setAccessToken(null));
        dispatch(user.actions.setUserName(null));
        dispatch(user.actions.setUserId(null));
        dispatch(user.actions.setError(null));
        dispatch(secrets.actions.setSecretMessage(null));
    }

    
        if (!accessToken) {
            return (
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: '100vh',
                        backgroundImage: 'url("https://images.unsplash.com/photo-1585152002465-43c1f64b95d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80")',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <Box
                        sx={{
                            margin: 'auto',
                            textAlign: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            width: 500,
                            maxWidth: '80%',
                            padding: '20px',
                            color: 'white',
                            background: 'rgba(10, 10, 10, 0.5)',
                        }}
                    >
                        <p>Unauthorized. Please login to see secret page.</p>
                        <Link to="/login">
                            <Button 
                                type="submit" 
                                variant="outlined"
                                sx={{
                                    margin: '20px',
                                    color: "white",
                                    borderColor: "white",
                                    "&:hover": {
                                      color: "black",
                                      borderColor: "black",
                                      backgroundColor: "white",
                                    },
                                  }}
                            >           
                            GO TO LOGIN
                            </Button>
                        </Link>
                    </Box>
                </Box>
                
            )
        } else {
            return (
                <>
                    <Link to="/">
                        <Button
                            type="button"
                            variant="outlined"
                            onClick={onLogOutButtonClick}
                        >
                            LOGOUT
                        </Button>
                    </Link>
                    <p>This is your secret message {username}</p>
                </>
            )
        }
};

        // the log in redirects here
        // Maybe go to secret endpoint instead?
        // Also add log out and style