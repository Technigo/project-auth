import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { user } from 'reducer/user';
import { Button } from '@mui/material';

export const SecretPage = () => {
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
            .then(data => {
                if(data.success) {
                    console.log(data);
                } else {
                    console.log(data.response);
                }
            })
    }, []);

    return (
        <>
            <p>This is a secret page you can only access when signed in.</p>
            <Button onClick={() => dispatch(user.actions.signOut())}>
                Sign out
            </Button>
        </>
    )
};