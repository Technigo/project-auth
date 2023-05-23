import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { user } from 'reducer/user';
import { Button, Paper, Typography } from '@mui/material';

export const SecretPage = () => {
    const [secretMessage, setSecretMessage] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const accessToken = useSelector((store) => store.user.accessToken);

    useEffect(() => {
        if (!accessToken) {
            navigate("/");
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
        fetch('https://project-authentication-es4c3pthxq-lz.a.run.app/secrets', options)
            .then(res => res.json())
            .then((data) => { setSecretMessage(data.response) })
    }, []);

    return (
        <Paper elevation={4} style={{ margin: '20px', padding: '20px' }}>
            <Typography variant="body1">{secretMessage}</Typography>
            <Button
             type="button"
             onClick={() => dispatch(user.actions.signOut())}
             variant="contained">
                Sign out
            </Button>
        </Paper>
    )
};