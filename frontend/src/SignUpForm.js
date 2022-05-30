import React, {useState} from 'react'
import { Navbar } from 'Navbar'
import styled from 'styled-components';

const UserForm = styled.form`
background-color: pink;
display: flex;
flex-direction: column;
align-content: center;
margin: 20px;
`;

const FormLabel = styled.label`
background-color: pink;
`;

const CenteredDiv = styled.div`
display: flex;    
justify-content: center;
`;

const HeadingText = styled.h1`
text-align: center;
`;

export const SignUpForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    //prevent duplicate data/several clicks on post to be store (code in backend + frontend?)

    const createUserLogin = async (e) => {
        e.preventDefault();
        console.log('Submitted:' + username + ' ' + email + ' ' + password)

        // if (!response.ok) {
        //     const errorMessage = `An error has occurred: ${response.status}`;
        //     throw new Error(errorMessage);
        // } 
        try {
            const response = await fetch('https://auth-login-form-project.herokuapp.com/signup', {
                method: 'POST',
                // credentials: 'include',
                headers: {                    
                    'Content-Type': 'application/json'
                },
                // mode: 'cors',
                // credentials: 'include',
                body: JSON.stringify({name: username, email: email, password: password})
            });
            
            const signupInfo = await response.json();
            console.log(signupInfo);
            sessionStorage.setItem('accessToken', signupInfo.accessToken);
            
        } catch(err) {
            const errorMessage = `An error has occurred: ${response.status}`;
        }
    }

    return (
        <div>
            <Navbar />
            <HeadingText>Create a new user account</HeadingText>
            <CenteredDiv>
                <UserForm onSubmit={createUserLogin}>
                <FormLabel>
                    <p>Username:</p>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </FormLabel>
                <FormLabel>
                    <p>Email:</p>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                </FormLabel>
                <FormLabel>
                    <p>Password:</p>
                    <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
                </FormLabel>
                <input type="submit" value="Submit" />
                </UserForm>
            </CenteredDiv>
        </div>
    )
}
