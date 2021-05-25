import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import Login from '../components/Login'
import Button from '../components/Button'

const StartPage = () => {
  return (
    <Main>
      <Login />
      <Link to='/signup'>
        <Button />
      </Link>
    </Main>
  )
}

export default StartPage

const Main = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #ff7b54;
  height: 100vh;
  width: 100%;
`