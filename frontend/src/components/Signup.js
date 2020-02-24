import React, { useState } from 'react'
import { useDispatch } from "react-redux"
import { auth } from "../reducers/auth"
import styled from 'styled-components/macro'

const Wrapper = styled.section`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  width: 100%;
  min-height: 100vh;
  padding: 10px;
`;
const SignupForm = styled.form`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
border-radius: 5px;
width: 500px;
height: 600px;
border: 1px solid #000;
@media (min-width: 768px) {
  
  }

`
const Title = styled.h1`
color: #47476b;
text-transform: uppercase;
font-size:40px;
`

const Input = styled.input`
border-style: hidden;
border-radius: 5px;
border-bottom: 2px solid black;
background-color: #eee;
width: 100%;
height: 40px;
font-size: 20px;
line-height: 20px;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
padding: 0px 10px;
@media (min-width: 768px) {
   
}
`

const Button = styled.button`
background: transparent;
color: #47476b;
border: 3px solid #47476b;
padding: 15px;
border-radius: 20px;
text-transform: uppercase;
font-size:14px;
margin: 15px;
&:hover {
  background: #eee;
  cursor: pointer;
}
`
const LabelText = styled.label`
margin-bottom: 10px;
margin-top: 5px;
font-size: 18px;
`





const URL = 'https://authentication-tiago-ivett.herokuapp.com/users'
export const Signup = () => {
    const [name, setName] = useState('')
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleSubmit = (event) => {
        event.preventDefault()

        fetch(URL, {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => {
                res.json()
                if (res.status === 201)
                    dispatch(auth.actions.setSignedUp(false))
            })
            .then(json => console.log(json))
            .catch(err => console.log('error:', err))
    }
    return (
        <Wrapper>
            <Title>Sign up!</Title>
            <SignupForm onSubmit={handleSubmit}>
                 <ErrorText>{error}</ErrorText>
                <LabelText>
                <Input required
                        value={name}
                        onChange={event => setName(event.target.value)}
                        placeholder="name"
                    />
                </LabelText>
                <LabelText>
                <Input required
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                        placeholder="email"
                    />
                </LabelText>
                <LabelText>
                <Input required
                        type="password"
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                        placeholder="password"
                    />
                </LabelText>
                <Button type="submit" onClick={handleSubmit}>
                    SIGN UP
                    </Button>
            </SignupForm>

        </Wrapper>
    )
}
