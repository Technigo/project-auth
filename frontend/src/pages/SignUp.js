import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'lib/Button'
import padlocks from '../assets/15586.jpg'
import styled from 'styled-components/macro'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (min-width: 768px) {
    flex-direction: row; 
  }
`
const Image = styled.div`
  width: 100vw;
  height: 50vh;
  background-image: url(${padlocks});
  background-size: cover; 
  background-position: center center; 

  @media (min-width: 768px) {
    width: 50vw;
    height: 100vh;
  }
`
const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100vw;
  height: 50vh;

  @media (min-width: 768px) {
    width: 50vw;
    height: 100vh;
  }
`
const Title = styled.h1`
  color: #5D5D5D;
  font-family: 'Varela Round', sans-serif;
`
const Form = styled.form`
  display: flex;
  flex-direction: column;
`
const Label = styled.label`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`
const Message = styled.p`
  color: #5D5D5D;
  text-align: center;
`
const Credit = styled.a`
  color: #5D5D5D;
  font-size: 10px;
`

export const SignUp = () => {
  const url = 'https://fridamaria-secret.herokuapp.com/users'
  const [signUpValues, setSignUpValues] = useState({
    name: '',
    email: '',
    password: ''
  })
  const [message, setMessage] = useState('')

  const handleSubmit = event => {
    event.preventDefault()

    fetch(url,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signUpValues)
      }
    )
      .then(res => res.json())
      .then(json => setMessage(json.message))
      .catch(err => console.log(err))
      .then(() => {
        setSignUpValues({
          name: '',
          email: '',
          password: ''
        })
      })
  }

  return (
    <Container>
      <Image />
      <Content>
        <Title>Sign up.</Title>
        <Form onSubmit={handleSubmit}>
          <Label>
            Name
        <input type='text' value={signUpValues.name} onChange={event => setSignUpValues({ ...signUpValues, name: event.target.value })} />
          </Label>
          <Label>
            E-mail
        <input type='email' required value={signUpValues.email} onChange={event => setSignUpValues({ ...signUpValues, email: event.target.value })} />
          </Label>
          <Label>
            Password
        <input type='password' required minLength='4' value={signUpValues.password} onChange={event => setSignUpValues({ ...signUpValues, password: event.target.value })} />
          </Label>
          <div>
            <Button
              type='submit'
              buttonText='Sign Up'
              backgroundColor='#00D3C2'
              borderProperties='solid 2px #5D5D5D'
              width='120px'
              color='#5D5D5D'
              fontFamily='"Varela Round", sans-serif'
            />
            <Link to='/'>
              <Button
                buttonText='Go back'
                backgroundColor='#F8EAD7'
                borderProperties='solid 2px #5D5D5D'
                width='120px'
                color='#5D5D5D'
                fontFamily='"Varela Round", sans-serif'
              />
            </Link>
          </div>
          {message && <Message>{message}</Message>}
        </Form>
        <Credit href='https://www.freepik.com/free-photos-vectors/business'>Image by rawpixel at freepick</Credit>
      </Content>
    </Container>
  )
}