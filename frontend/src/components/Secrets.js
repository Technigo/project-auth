import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { REACT_APP_BASE_URL } from 'utils/urls';
import user from 'reducers/user';
import secrets from 'reducers/secrets';
import { MainContainer } from './Styled components/MainContainer';
import { StyledBox } from './Styled components/StyledBox';
import { StyledButton } from './Styled components/StyledButton';

export const Secrets = () => {
    const accessToken = useSelector(store => store.user.accessToken);
    const username = useSelector(store => store.user.username);
    const dispatch = useDispatch();

    useEffect(() => {
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": accessToken
            }
        }
        fetch(`${REACT_APP_BASE_URL}/secrets`, options)
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

    
        if (!accessToken) {
            return (
                <MainContainer imageUrl="https://images.unsplash.com/photo-1585152002465-43c1f64b95d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80">
                    
                    <StyledBox>
                        <p>Unauthorized. Please login to see secret page.</p>
                        
                        <Link to="/login">
                            <StyledButton variant='outlined'>           
                            GO TO LOGIN
                            </StyledButton>
                        </Link>
                    </StyledBox>
                </MainContainer>
                
            )
        } else {
            return (
                <MainContainer imageUrl="">
                    <StyledBox>
                        <h2>This is your secret message {username}</h2>
                        <Link to="/">
                            <StyledButton onClick={onLogOutButtonClick}>
                                LOGOUT
                            </StyledButton>
                        </Link>   
                    </StyledBox>
                </MainContainer>
            )
        }
};