import React from 'react'
import styled from 'styled-components'

const Label = styled.label``
const Input = styled.input.attrs({type: "text"})``

const TextInput = ({value, handleChange, title}) => {

return( 
 <>
    <Label htmlFor="username">{title}</Label>
    <Input id="username" value={value} onChange={handleChange} />
 </>)
}

export default TextInput