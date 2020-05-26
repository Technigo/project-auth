import React from 'react'
import styled from 'styled-components'

export const InputField = ({ placeholder, type, value, onChange, minlength, maxlength }) => {
  return (
    <Input placeholder={placeholder} type={type} 
    value={value} onChange={onChange} required/>
  )
}

const Input = styled.input`
  font-family: 'Roboto', sans-serif;
  width: 200px; 
  height: 25px;
  border-radius: 5px;
  border: none;
  margin-bottom: 20px;
  margin-top: 5px;
  outline: none;
  padding-left: 5px;
`