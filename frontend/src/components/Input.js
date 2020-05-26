import React from 'react'
import styled from 'styled-components'

export const InputField = ({ placeholder, type, value, onChange }) => {
  return (
    <Input placeholder={placeholder} type={type} 
    value={value} onChange={onChange} required/>
  )
}

const Input = styled.input`
  width: 200px; 
  height: 30px;
  border-radius: 15px;
  border: 2px solid teal;
  margin: 10px;
  outline: none;
`