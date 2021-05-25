import React from 'react'
import styled from 'styled-components'

import Signup from '../components/Signup'

const SignupPage = () => {
  return (
    <Main>
      <Signup />
    </Main>
  )
}

export default SignupPage

const Main = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #ff7b54;
  height: 100vh;
  width: 100%;
`