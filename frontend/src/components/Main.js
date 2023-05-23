import React from 'react'
import styled from 'styled-components'
// import { Link } from 'react-router-dom'

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  `

const Button = styled.button`
  margin: 1rem;
  font-size: 1.5rem;
  padding: 5px;
  border: none;
  background-color: pink;
`


export const Main = () => {
  return (
    <Wrapper>
        <h1>Register and log in to see the secret page!</h1>
        <div>
            <Link to="/register"><Button type="button">Register</Button></Link>
            <Link to="/login"><Button type="button">Log In</Button></Link>
        </div>
    </Wrapper>
  )
}

// Remember to match the path-names when creating routes in App