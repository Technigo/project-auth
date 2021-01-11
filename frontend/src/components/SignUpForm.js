import React from 'react';
import { Heading, FormContainer, UserForm, FormLabel, FormInput, Button } from 'styling/styling';

export const SignUpForm = () => {
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
                />
                </FormLabel>
                
                <FormLabel>
                PASSWORD
                <FormInput  
                    type="text"
                    placeholder="Choose a password"
                    required
                />
                </FormLabel>
                <Button>SUBMIT</Button>
            </UserForm>
        </FormContainer>
    )
}