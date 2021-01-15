import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { user, logout } from '../reducers/user';

const SECURE_URL =  'https://lmn-app.herokuapp.com/users'

export const Profile = () => {
    const dispatch = useDispatch();
    const accessToken = useSelector((store)=> store.user.login.accessToken);
    const userId = useSelector((store)=> store.user.login.userId);
    const statusMessage = useSelector((store)=> store.user.login.statusMessage);  
    
    const LoginSuccess = (loginResponse) => {
        const statusMessage = JSON.stringify(loginResponse);
        dispatch(user.actions.setStatusMessage({ statusMessage })
        )};

    const LoginFailed = (loginError) => {};
    
    const handleLogout = () => {
        dispatch(user.actions.logout)
    };

    return (
    <div>You are logged in! <Button onClick={handleLogout}>Logout</Button></div>)
}

const Button = styled.button`
	margin: 5px;
`;