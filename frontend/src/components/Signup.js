import React, { useState } from 'react'
import styled from 'styled-components'
import { Button } from './Button'

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

`

const Form = styled.form`
  display: flex;
  flex-direction: column;
    label {
      margin: 10px;
      color:  #254b62;
    }
    input {
      width: 100%;
      height: 20px;
    }
`

const Header = styled.h1`
  color:  #254b62;
  font-size: 40px;
  margin-top: 40px;
`

export const Signup = () => {
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const url = 'https://anna-project-auth.herokuapp.com/users'
  // posts email and password to the api

  const handleSignin = event => {
    event.preventDefault()
    fetch('url', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
      headers: { 'Content-Type': 'application/json' }
    })
    //Här ska det komma en .then av något slag 
    //vi behöver local storage någonstans
  }

  return (
    <Section>
      <Header> Sign up below</Header>
      <Form>
        <label for='name'>Name <input type='text' id='name' name='name' /> </label>
        <label for='email'>Email  <input type='email' id='email' name='email' /> </label>
        <label for='password'>Password  <input type='password' id='password' name='password' /> </label>
      </Form>
      <Button title='Register' onClick={handleSignin} />
    </Section>
  )
}