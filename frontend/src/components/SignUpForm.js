import React, { useState } from 'react';
import { Heading, FormContainer, UserForm, FormLabel, FormInput, Button } from 'styling/styling';

const SIGNUP_URL = 'http://localhost:8080/users';

export const SignUpForm = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const handleLoginSuccess = (loginResponse) => {};
    const handleLoginFailed = (loginError) => {};

    const handleSignup = (event) => {
        event.preventDefault();
    
        fetch(SIGNUP_URL, {
          method: 'POST',
          body: JSON.stringify({ name, password }),
          headers: { 'Content-Type': 'application/json' },
        })

// VI
          .then((res) => {
            if (!res.ok) {
              throw 'Signup failed';
            }
            return res.json();
          })
          .then((json) => handleLoginSuccess(json))
          .catch((err) => handleLoginFailed(err));
      };

    return (
        <FormContainer>
            <UserForm>
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
                    type="text"
                    placeholder="Choose a password"
                    required
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
                </FormLabel>
                <Button
                    type="submit"
                    onClick={handleSignup}>SUBMIT</Button>
            </UserForm>
        </FormContainer>
    )
}