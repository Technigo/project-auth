import React from 'react'
import styled from 'styled-components/macro'

import { Button } from './Button'

const StyledForm = styled.form`
border: 2px solid black;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 250px;
height: 300px;
`

const Label = styled.label`
font-size: 18px;
margin: 10px;
`

const Input = styled.input`
margin: 10px;
`

export const Wrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
margin: 20px;
`

export const Form = ({ input, heading }) => {
    return (
        <Wrapper>
            <h1>{heading}</h1>
            <StyledForm>
                <Label> Username:
                <Input type='text' />
                </Label>
                <Label> Password:
                    <Input type='text' />
                </Label>
                <Button input={input}/>
            </StyledForm>
        </Wrapper>
    )
}