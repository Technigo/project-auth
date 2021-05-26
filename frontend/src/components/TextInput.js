import React from 'react'
import styled from 'styled-components'

const Label = styled.label``
const Input = styled.input.attrs(props => ({ type: props.type}))``

const TextInput = ({value, handleChange, title, type}) => {

return( 
 <>
    <Label htmlFor="username">{title}</Label>
    <Input id="username" value={value} onChange={handleChange} type={type} />
 </>)
}

export default TextInput