import React from 'react'
import styled from 'styled-components/macro'

import { Form } from './Components/Form'
import { LogIn } from './Components/LogIn'

const InnerWrapper = styled.div`
display: flex;
justify-content: space-around;
align-items: center;
`

const Wrapper = styled.div`
display: flex;
align-items: center;
flex-direction: column;
`

export const App = () => {
  const username = false

  return (
    <>
      {username === false ? (
        <Wrapper>
          <h1>Sign up or log in here!</h1>
          <InnerWrapper>
            <Form input='Log in' heading='Log in here:' />
            <Form input='Sign up' heading='Sign up here:' />
          </InnerWrapper>
        </Wrapper>
      ) : (
          <LogIn username='Holabandola'/>
        )}
    </>
  )
}
