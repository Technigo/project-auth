import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { BASE_URL } from 'utils/urls';
import user from 'reducers/user';
import secrets from 'reducers/secrets';
import { Button } from '@mui/material';

export const Secrets = () => {
    const accessToken = useSelector(store => store.user.accessToken);
    const username = useSelector(store => store.user.username);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if(!accessToken) {
            navigate("/login")
        }
    }, [accessToken]);


    useEffect(() => {
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": accessToken
            }
        }
        fetch(`${BASE_URL}/secrets`, options)
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
            <p>This is a secret message</p>
        </> 
    )
};

        // the log in redirects here
        // Maybe go to secret endpoint instead?
        // Also add log out and style