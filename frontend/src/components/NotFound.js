import React from 'react'
import notfound from "../images/search.png"
import { FormSection } from './LogIn'
import { Pic } from './Home'
import styled from 'styled-components'

export const NotFound = () => {
  return (
  <FormSection>
    <NotFoundHeader>Page not found</NotFoundHeader>
    <Pic src={notfound} alt="Not found" />
  </FormSection>
  )
}

const NotFoundHeader = styled.h1`
font-size: 25px;
margin: 20px;
`
