import React, { useState } from 'react'
import { Navbar } from 'Navbar'
import styled from 'styled-components';

const UserForm = styled.form`
background-color: pink;
display: flex;
flex-direction: column;
align-content: center;
margin: 20px;
`;

const CenteredDiv = styled.div`
display: flex;    
justify-content: center;
`;

const HeadingText = styled.h1`
text-align: center;
`;

export const SignInForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const validateUserLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://auth-login-form-project.herokuapp.com/signin', {
                method: 'POST',
                // credentials: 'include',
                headers: {                
                    'Content-Type': 'application/json'
                },
                // mode: 'cors',
                // credentials: 'include',
                body: JSON.stringify({email: email, password: password})
            });
            const authorizedLogin = await response.json();
            console.log(authorizedLogin);              
            sessionStorage.setItem('accessToken', authorizedLogin.accessToken);      
        } catch(err) {
            console.error(err);
        }
    }

    return (
        <div>
            <Navbar />
            <HeadingText>Already an user? Login:</HeadingText>
            <CenteredDiv>
                <UserForm onSubmit={validateUserLogin}>
                <label>
                    <p>Email:</p>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label>
                    <p>Password:</p>
                    <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <input type="submit" value="Submit" />
                </UserForm>
            </CenteredDiv>
        </div>
    )
}
