import React, {useState} from "react";
import { Navbar } from 'Navbar'
import styled from 'styled-components';

const CenteredDiv = styled.div`
display: flex;    
justify-content: center;
`;

const HeadingText = styled.h1`
text-align: center;
`;

export const LoggedInPage = () => {

    const [loggedInUser, setLoggedInUser] = useState('log in first');
    
    const checkLoginStatus = async () => {
            try {
                const response = await fetch('https://auth-login-form-project.herokuapp.com/secrets', {
                    method: 'GET',
                    headers: {                
                        'Content-Type': 'application/json',
                        'Authorization': sessionStorage.getItem('accessToken'),
                    },
                    // mode: 'cors',
                    // credentials: 'include'
                });
                const loggedOutResponse = await response.json();
                console.log(loggedOutResponse.loginData);
                console.log(loggedOutResponse);
                setLoggedInUser(loggedOutResponse.loginData);

            } catch(err) {
                console.error(err);
            }
        };

    const LogOutSession = () => {
        sessionStorage.removeItem('accessToken');
        setLoggedInUser('log in first');
    }

    return (
        <div>
            <Navbar />
            {loggedInUser !== '' && <HeadingText>Welcome to your account, {loggedInUser} </HeadingText>}
            <CenteredDiv>
                <button onClick={LogOutSession}>Log out</button>
                <button onClick={checkLoginStatus}>Access secret page</button>
            </CenteredDiv>
        </div>
    )
}
