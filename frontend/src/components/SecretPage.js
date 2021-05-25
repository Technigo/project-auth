import React from 'react'
import styled from 'styled-components/macro'

const Secret = () => {

  return(
    <Wrapper>
      <SecretHeader>A secret?</SecretHeader>
      <SecretText>"Grace Hopper was the first person to create a compiler for a programming language and one of the first programmers of the Harvard Mark I computer, an electro-mechanical computer based on Analytical Engine. Hopper's work with computers started in 1943, when she started working at the Bureau of Ordnance's Computation Project at Harvard where she programmed the Harvard Mark I. Hopper not only programmed the computer, but created a 500-page comprehensive manual for it.Even though Hopper created the manual, which was widely cited and published, she was not specifically credited in it.Hopper is often credited with the coining of the term "bug" and "debugging" when a moth caused the Mark II to malfunction.While a moth was found and the process of removing it called "debugging," the terms were already part of the language of programmers"./Wikipedia</SecretText>
    </Wrapper>
  )
}

export default Secret;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  margin: auto;
`
const SecretText = styled.p`
  color: white;
`

const SecretHeader = styled.h2`
  color: white;
`