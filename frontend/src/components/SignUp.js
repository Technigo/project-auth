import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { LinkButton } from './Button'
import { InputField } from './Input'
import swal from 'sweetalert'
import styled from 'styled-components/macro'

const fetch_URL = 'https://auth-narnia.herokuapp.com/signup'

export const SignUp = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()

  const handleSignup = event => {
    event.preventDefault()

    fetch(fetch_URL, {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => {
        if (!res.ok) {
          console.log('ERROR')
          // swal({
          //   text: 'Something went wrong',
          //   icon: "error",
          //   button: {
          //     text: 'Try again'
          //   },
          // })
          throw new Error ({ message: 'Could not create account.'})
        } else {
          return res.json()
        }
      })
      .then(() => {
          setName('')
          setEmail('')
          setPassword('')
          history.push('/login')
          // if (name) { 
          //   history.push('/login')
          // }          
        })
      .catch(err => {
        console.log("error:", err)
      })
    }

  return (
    <FormContainer>
      <InputContent>
      <StyledLabel> Name:
        <InputField placeholder='Allan Busbrallan' type='text' minLength='3'
        value={name} onChange={event => setName(event.target.value)}/>
      </StyledLabel>

      <StyledLabel> Email:
        <InputField placeholder='hey@hey.com' type='email' 
        value={email} onChange={event => setEmail(event.target.value)} /> 
      </StyledLabel>

      <StyledLabel> Password:
      <InputField placeholder='*****' type='password' 
        value={password} onChange={event => setPassword(event.target.value)}  /> 
      </StyledLabel>

      <LinkButton title='Submit' type="submit" onClick={handleSignup} />
    </InputContent>
    </FormContainer>
  )
}

const FormContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-self: center;
  justify-content: center;
  width: 60%;
  height: 500px;
`

const InputContent = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
  font-size: 12px;
`