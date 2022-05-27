import React from 'react'
import styled from 'styled-components'

const Error = styled.div`
  background-image: url(.img/error.jpg);
`

export const NotFound = () => {
  return (
    <Error>
      <h1>Not found...</h1>
    </Error>
  )
}
