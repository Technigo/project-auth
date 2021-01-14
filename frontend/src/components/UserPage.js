import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { user } from '../reducer/user';
import { UserPageContainer, UserPageHeader, UserPageText } from '../lib/UserPageStyle'


export const UserPage = ({ id }) => {
    const dispatch = useDispatch();
    const myUser = useSelector(store => store.user.login.userName);
    const statusMessage = useSelector(store => store.user.login.statusMessage);
    const accessToken = useSelector(store => store.user.login.accessToken);
    
    const loginSuccess = (loginResponse) => {
        dispatch(user.actions.setStatusMessage({
            statusMessage: loginResponse.statusMessage
        })
      );
    };
    if (!accessToken) {
        return <></>;
    }

    return (
        <UserPageContainer>
            <UserPageHeader>Hello there {myUser}!</UserPageHeader>
            <UserPageText>{statusMessage}</UserPageText>
        </UserPageContainer>
    )
}