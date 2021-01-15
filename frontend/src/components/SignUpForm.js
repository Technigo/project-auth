import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { Heading, Text, UserForm, FormLabel, FormInput, Button } from 'styling/styling';
import { Profile } from './Profile.js';

const SIGNUP_URL = 'https://agnes-emma-login.herokuapp.com/users';

export const SignUpForm = () => {
    const accessToken = useSelector((store) => store.user.login.accessToken);

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const handleLoginSuccess = (loginResponse) => {
        console.log(loginResponse);
    };

    const handleLoginFailed = (loginError) => {
        console.log(loginError)
    };
    
    const handleSignup = (event) => {
    
        event.preventDefault();
        
        fetch(SIGNUP_URL, {
          method: 'POST',
          body: JSON.stringify({ name, password }),
          headers: { 'Content-Type': 'application/json' },
        })
        .then((res) => {
            if (!res.ok) {
                throw 'Signup failed.'
            }
            return res.json()
        })
        .then((json) => handleLoginSuccess(json))
        .catch((err) => handleLoginFailed(err))
    }
    
    if (!accessToken)  {

        return (

                <UserForm>
                    <Text>Don't have an account?</Text>
                    <Heading> SIGN UP </Heading>
                
                    <FormLabel>
                    USERNAME
                    <FormInput
                        type="text"
                        placeholder="Choose a username"
                        required
                        value={name}
                        onChange={(event => setName(event.target.value))}
                    />
                    </FormLabel>
                
                    <FormLabel>
                    PASSWORD
                    <FormInput  
                        type="password"
                        placeholder="Choose a password"
                        required
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    </FormLabel>
                    <Button type="submit" onClick={handleSignup}>SUBMIT</Button>
                </UserForm>
         );
    } else {
        return <Profile />
    };
};
