import React from 'react';
import { Heading, FormContainer, UserForm, FormLabel, FormInput, Button } from 'styling/styling';

export const LoginForm = () => {
    return (
        <FormContainer>
            <UserForm>
                <Heading> LOG IN </Heading>
                
                <FormLabel>
                USERNAME
                <FormInput
                    type="text"
                    placeholder="Enter your username"
                    required
                />
                </FormLabel>
                
                <FormLabel>
                PASSWORD
                <FormInput  
                    type="text"
                    placeholder="Enter your password"
                    required
                />
                </FormLabel>
                <Button>LOG IN</Button>
            </UserForm>
        </FormContainer>
    )
}

