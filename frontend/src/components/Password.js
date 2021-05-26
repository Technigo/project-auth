import React from 'react'
import Styled from 'styled-components'

const Password = ({value, handleChange}) => {

  return(
    <>
    <Label htmlFor="password">Password: </Label>
      <TextInput type="password" id="password" value={value} onChange={handleChange} />
    </>
  )
}