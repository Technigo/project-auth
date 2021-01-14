import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { user, logout } from '../reducers/user';

const SECURE_URL =  'http://localhost:8080/users'

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
    
    const logout = () => {};
}
