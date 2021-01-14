import React from 'react'
import styled from 'styled-components'

export const InputField = ({ placeholder, type, value, onChange, minLength }) => {
  return (
	<Input 
		placeholder={placeholder} 
		type={type} 
		value={value} 
		onChange={onChange} 
		minLength={minLength} 
		required/>
  )
}
const Input = styled.input`
border-bottom: 2px solid #9cb1bd;
border-top:none;
border-left:none;
border-right:none;
text-decoration:none;
background: #a48a94;
box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
font-style: italic;
font-weight: 300;
font-size: 25px;
font-family: 'Xanh Mono', monospace;
margin: 30px;
`