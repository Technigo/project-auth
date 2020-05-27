import React from 'react'
import styled from 'styled-components/macro'
import { SignUpform } from './SignUpform'
import { SignInform } from './SignInform'

export const Card = () => {

    return (


        <Container>

       
           <SignUpform />
           <SignInform  /> 

          

        </Container>
       
 

    )
}

const Container = styled.div`

    width: 500px;
    height: 400px;
    background-color: white;
    display: flex;
    flexdirection: row;
    margin-top: 100px;
    padding: 20px;
    
`

