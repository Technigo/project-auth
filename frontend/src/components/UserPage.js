import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { user } from '../reducer/user';
import { UserPageContainer, UserPageHeader, UserPageText } from '../lib/UserPageStyle';
import { Button } from '../lib/Button';


export const UserPage = ({ id }) => {
    const [secretMessage, setSecretMessage] = useState("");
    const dispatch = useDispatch();
    const history = useHistory();
    const myUser = useSelector(store => store.user.login.userName);
    const statusMessage = useSelector(store => store.user.login.statusMessage);
    const accessToken = useSelector(store => store.user.login.accessToken);
    const userId = useSelector(store => store.user.login.userId);
    console.log('userID from Userpage' + userId)

    // useEffect(() => {
    //     getUserInfo();
    // }, [userId]); 

    const loginSuccessful = (loginResponse) => {
        dispatch(user.actions.setStatusMessage({ statusMessage: loginResponse.secretMessage}))
    };

    const getUserInfo = (userId) => {
        fetch(`https://auth-project-api.herokuapp.com/users/${userId}/secret`, {
            method: 'GET',
            headers: { Authorization: accessToken},
        })
            .then(res => res.json())
            .then(data => {
                loginSuccessful(data);
                console.log(data)
            })
    };

    
    const loginSuccess = (loginResponse) => {
        dispatch(user.actions.setStatusMessage({
            statusMessage: loginResponse.statusMessage
        })
      );
    };
    if (!accessToken) {
        return <></>;
    };

    const logout = () => {
        dispatch(user.actions.logout())
        dispatch(user.actions.setStatusMessage({
            statusMessage: 'No user logged in'
        }))
        history.push(`/`);
    };

    return (
        <UserPageContainer>
            <UserPageHeader>Hello there {myUser}!</UserPageHeader>
            <UserPageText>{statusMessage}</UserPageText>
            <Button title='Sign Out' onClickFunc={logout}></Button>
            <Button title='Show Secret' onClickFunc={() => getUserInfo(userId)}></Button>
        </UserPageContainer>
    )
};