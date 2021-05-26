import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Container } from '@material-ui/core'


import user from '../reducers/user';

import { API_URL } from '../reusables/urls';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [mode, setMode] = useState(null);

    const accessToken = useSelector(store => store.user.accessToken);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        // redirect user to '/' path
        console.log('Checking access token', accessToken);
        if (accessToken) {
            history.push('/');
        }
    }, [accessToken, history]);

    const onFormSubmit = (e) => {
        e.preventDefault();

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        }
        fetch(API_URL(mode), options)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.success) {
                    console.log("access token from backend:", data.accessToken)
                    batch(() => {
                        dispatch(user.actions.setUsername(data.username));
                        dispatch(user.actions.setAccessToken(data.accessToken));
                        dispatch(user.actions.setErrors(null));
                    });
                } else {
                    console.log(data.error)
                    dispatch(user.actions.setErrors(data));
                }
            })
            .catch();
    };       

    return (
        <Container maxWidth="sm">
        <form onSubmit={onFormSubmit}>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" onClick={() => setMode('signin')}>Sign in</button>
            <button type="submit" onClick={() => setMode('signup')}>Sign up</button>
        </form>
        </Container>
    );
};

export default Login;