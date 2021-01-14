import React, { useState } from 'react'
import styled from 'styled-components'


const FormContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #BCC7B6;
  box-sizing: border-box;
  margin: 0;
  padding: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Form = styled.form`
  background-color: white;
  color: #454545;
  text-align: left;
  padding: 20px;
  box-shadow: 6px 6px 25px 1px #696969;
`
const Input = styled.input`
  border: none;
  font: inherit;
  outline: none;
  border-bottom: 1px solid #ccc;
  width: 100%;
  padding: 10px;
  margin: 10px;
  box-sizing: border-box;
`

const Button = styled.button`
  display:inline-block;
  padding:0.35em 1.2em;
  border:0.1em solid #454545;
  margin:0 0.3em 0.3em 0;
  border-radius:0.12em;
  box-sizing: border-box;
  text-decoration:none;
  color:#454545;
  text-align:center;
  transition: all 0.2s;
  font: inherit;
  margin: 15px;
  cursor: pointer;
`
const Title = styled.p`
  text-align: center;
  padding: 10px;

`
export const PrettyForm = ({formTitle}) => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState(formTitle)
  
  return (
    <FormContainer>
      <Form>
        <Title>{title}</Title>
        <Input required value={ name } placeholder='Name'/>
        <Input type='password' required value={ password } placeholder='Password'/>

        <Button type='submit' >
          {title}
        </Button>
      </Form>
    </FormContainer>
  )
}
