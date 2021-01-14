import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

import { ScreenContainer } from 'lib/Container'

const TextColor = styled.p`
  color: #fff;
`

export const Loading = () => {
  const isLoading = useSelector((state) => state.ui.isLoading)

  return (
    <>
      {isLoading && <ScreenContainer><TextColor>Loading...</TextColor></ScreenContainer>}
    </>
  )
}