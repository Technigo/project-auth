import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch, batch } from 'react-redux'
import styled from 'styled-components'

import { API_URL } from '../reusables/urls'
import user from '../reducers/user'

import { StyledButton } from '../components/StyledBtn'

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
`

const Input = styled.input`
  margin: 7px;
`

export const LogIn = () => {
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  
  const accessToken = useSelector(store => store.user.accessToken)
  const errorMessage = useSelector(store => store.user.errors)
  const history = useHistory()
  const dispatch = useDispatch()


  useEffect(() => {
    if (accessToken) {
      history.push('/content')
    }
  },[accessToken, history])

  const onLogIn = (e) => {
    e.preventDefault()
    
    fetch(API_URL('login'), {
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
          batch(() => {
            dispatch(user.actions.setUsername(data.username))
            dispatch(user.actions.setAccessToken(data.accessToken))
            dispatch(user.actions.setErrors(null))
          })
          // window.localStorage.setItem('accessToken', accessToken)
          setUsername('')
          setPassword('')
        } else {
          dispatch(user.actions.setErrors(data))
        }
      })
      .catch()
  }

  return (
    <Wrapper>
      <Form>
        <h2>Log In</h2>
        <label>
          Username
          <Input onChange={(e) => setUsername(e.target.value)} value={username} type="text" />
        </label>
        <label>
          Password
          <Input onChange={(e) => setPassword(e.target.value)} value={password} type="password" />
        </label>
        {errorMessage ? <p>{errorMessage.message}</p> : ''}
        <StyledButton onClick={onLogIn} type="submit">Log in</StyledButton>
      </Form>
    </Wrapper>
  )
}