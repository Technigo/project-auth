import React, { useState } from 'react'
import styled from 'styled-components'
import { Button } from 'components/Button'

const Form = styled.form`
`

const Label = styled.label`
`

const Text = styled.p`
`

const Input = styled.input`
`

export const SignUpForm = () => {
  const [signUpValues, setsignUpValues] = useState ({
    username: '',
    email: '',
    password: ''
  })

  const handleSubmit = e => {
    e.preventDefault()
    fetch('http://localhost:8080/users', {
      method: 'POST',
      body: JSON.stringify(signUpValues),
      headers: { 'content-type': 'application/json' }
    }).then(() => {
      console.table(signUpValues)
      window.alert(`Registry complete, welcome ${signUpValues.username}!`)
      setsignUpValues({
        username: '',
        email: '',
        password: ''
      })
    })
}

return (
  <Form onSubmit={handleSubmit}>
    <Label>
      <Text>Username</Text>
      <Input 
      onChange={e => setsignUpValues({ ...signUpValues, username: e.target.value })}
      value={signUpValues.username}
      type='text'
      placeholder='Enter Username'
      minLength='2'
      maxLength='20'
      required
      />
    </Label>
    <Label>
      <Text>Email</Text>
      <Input 
      onChange={e => setsignUpValues({ ...signUpValues, email: e.target.value })}
      value={signUpValues.email}
      type='text'
      placeholder='Enter Username'
      minLength='2'
      maxLength='20'
      required
      />
    </Label>
    <Label>
      <Text>Password</Text>
      <Input 
      onChange={e => setsignUpValues({ ...signUpValues, password: e.target.value })}
      value={signUpValues.password}
      type='password'
      placeholder='min 5 characters'
      minLength='5'
      maxLength='20'
      required
      />
    </Label>
    <Button type='submit' title='Sign-up' />
  </Form>
)}