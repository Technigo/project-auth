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
const LoginForm = styled.form`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
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
const ErrorText = styled.h2`
color: red;
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
const ButtonWrapper = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
height: 10vh;
width:100%;

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
    background: #a3a3c2;
    cursor: pointer;
  }
`
const LabelText = styled.label`
margin-bottom: 10px;
margin-top: 5px;
font-size: 18px;
`



const URL = 'https://authentication-tiago-ivett.herokuapp.com/sessions'

export const Login = () => {
    const dispatch = useDispatch()
    const [error, setError] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const signUp = () => {
        dispatch(auth.actions.setSignedUp(true))
    }
    const handleSubmit = (event) => {
        console.log("In handleSumbit()")
        event.preventDefault()

        fetch(URL, {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => {
                console.log('first step')
                if (res.ok) {
                    return res.json()

                } else {
                    setError("Unable to login, please try again")
                    throw new Error('Unable to login, please try again')
                }
            })
            .then(json => {
                console.log(json)
                dispatch(auth.actions.setLoggedIn(json.loggedIn))
                dispatch(auth.actions.setToken(json.accessToken))
                dispatch(auth.actions.setUser(json.userId))
                dispatch(auth.actions.setName(json.name))
            })
            .catch(err => console.log('error:', "TEST" + err))
    }

    return (
        <Wrapper>
            <Title>Login</Title>
            <LoginForm onSubmit={handleSubmit}>
                <ErrorText>{error}</ErrorText>
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
                <ButtonWrapper>
                    <Button type="submit" onClick={handleSubmit}>
                        LOGIN
                </Button>
                    <Button type="button" onClick={signUp}>
                        SIGN UP
                </Button>
                </ButtonWrapper>
            </LoginForm>
        </Wrapper>
    )
}

