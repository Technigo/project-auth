import React from 'react';
import { useSelector } from 'react-redux';

import { LoginErrorMessage } from '../lib/LoginFormStyle';

export const UserStatus = () => {
    const statusMessage = useSelector(store => store.user.login.statusMessage);

    return (
        <>
        {statusMessage && <LoginErrorMessage >{statusMessage}</LoginErrorMessage>}
        </>
    )
}