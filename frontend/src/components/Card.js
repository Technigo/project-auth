import React from 'react'
import styled from 'styled-components/macro'
import { SignUpform } from './SignUpform'
import { SignInfrom } from './SignInform'

export const Card = () => {

    return (


        <Container>

       
           <SignUpform />
           <SignInfrom /> 

          

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

