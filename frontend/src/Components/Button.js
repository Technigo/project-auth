import React from 'react'
import styled from 'styled-components'

const Btn = styled.button`
font-size: 18px;
margin: 10px;
`

const onClickFunction = (input) => {
    //This function could execute a fetch for
    //Log in and for Sign up
    if(input === 'Log in') {
        console.log('This is log in function')
    } else if(input === 'Sign up') {
        console.log('This is Sign up function')
    }
}

export const Button = ({ input }) => {
    return (
        <Btn type='submit' onClick={onClickFunction(input)}>
            {input}
        </Btn>
    )
}