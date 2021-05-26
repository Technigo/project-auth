import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import TextInput from '../components/TextInput'

const Form = styled.form`
display: flex;
flex-direction: column;`

const Title = styled.h1``

const SubmitButton = styled.button``

const PathLink = styled(Link)``

const Signup = () => {
    const [value, setValue] = useState({ password: '', username: ''})

    const handleChange = (props) => (event) => {
        setValue({...value, [props]: event.target.value})
    }

  return (
    <Form>
      <Title></Title>
        <TextInput value={value.username} type="text" handleChange={handleChange('username')} title="Username" />
        <TextInput value={value.passwrd} type="password" handleChange={handleChange('password')} title="Password" />
      <PathLink to="/Login">
          <SubmitButton type="button"> </SubmitButton> 
      </PathLink>
    </Form>
  )
}

export default Signup