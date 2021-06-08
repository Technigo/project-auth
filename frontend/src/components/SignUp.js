import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'

import { StyledButton } from '../components/StyledBtn'
import { API_URL } from '../reusables/urls'
import user from '../reducers/user'

const Wrapper = styled.div`
  border: 1px solid #9099A5;
  border-radius: 2px;
  box-shadow: 7px 7px #CAEBF2, 7px 7px 0px 1px #9099A5;
  background-color: white;
  margin: 30px;
  width: 500px;
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 10px;
`

const Input = styled.input`
  margin: 7px;
`

export const SignUp = () => {
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')

  const history = useHistory()
  const dispatch = useDispatch()
  const errorMessage = useSelector(store => store.user.errors)
  

  const onFormSubmit = (e) => {
    e.preventDefault()
    fetch(API_URL('signup'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          history.push('/login')
        } else {
          dispatch(user.actions.setErrors(data))
        }
      })
      .catch()
  }

  return (
    <Wrapper>
    <Form>
    <h2>Sign up</h2>
      <label>
        Username
        <Input 
          onChange={(e) => setUsername(e.target.value)} 
          value={username} 
          type="text"
          required 
          minlength = '3'
          />
      </label>
      <label>
        Password 
        <Input 
          onChange={(e) => setPassword(e.target.value)} 
          value={password} 
          type="password" 
          required />
      </label>
      {errorMessage ? <p>{errorMessage.message}</p> : ''}
      <StyledButton onClick={onFormSubmit} type="submit">Submit</StyledButton>
    </Form>
    </Wrapper>
  )
}