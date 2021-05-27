import React from 'react'
import styled from 'styled-components'

const Label = styled.label`
padding: 5px 0;`

const Input = styled.input.attrs(props => ({ type: props.type}))`
margin-bottom: 20px;`

const TextInput = ({value, handleChange, title, type}) => {

return( 
 <>
    <Label htmlFor="username">{title}</Label>
    <Input id="username" value={value} onChange={handleChange} type={type} />
 </>)
}

export default TextInput