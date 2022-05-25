import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, batch } from 'react-redux';

import { API_URL } from 'utils/utils';

import user from 'reducers/user';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // Fortsätt här Ida :) 

    const dispatch = useDispatch();

    const onFormSubmit = (event) => {
        event.preventDefault();

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username: username, password: password})
        };

        fetch(API_URL("register"), options)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.success) {
                    dispatch(user.actions.setUserId(data.userId));
                    dispatch(user.actions.setAccessToken(data.accessToken));
                    dispatch(user.actions.setUserName(data.username));
                    dispatch(user.actions.setError(null));
                } else {
                    dispatch(user.actions.setError(data.response));
                    dispatch(user.actions.setUserId(null));
                    dispatch(user.actions.setAccessToken(null));
                    dispatch(user.actions.setUserName(null));
                }
            })
    }

    return (
        <>
            <form onSubmit={onFormSubmit}>
                <label htmlFor="username">Username</label>
                <input 
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e)=>setUsername(e.target.value)}/>

                <label htmlFor="password">Password</label>
                <input 
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}/>

                <button type="submit">Submit</button>
            </form>
        </>
    )
}

export default Login