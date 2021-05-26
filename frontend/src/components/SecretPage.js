import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';

import styled from 'styled-components/macro'

const Secret = () => {
  const accessToken = useSelector(store => store.user.accessToken)
  const history = useHistory()
  useEffect(() => {
    if (!accessToken) {
      history.push('/signin')
    }
  }, [accessToken, history])

  return(
    <Wrapper>
      <SecretHeader>A secret?</SecretHeader>
      <SecretText>"Grace Hopper was the first person to create a compiler for a programming language and one of the first programmers of the Harvard Mark I computer, an electro-mechanical computer based on Analytical Engine. Hopper's work with computers started in 1943, when she started working at the Bureau of Ordnance's Computation Project at Harvard where she programmed the Harvard Mark I. Hopper not only programmed the computer, but created a 500-page comprehensive manual for it.Even though Hopper created the manual, which was widely cited and published, she was not specifically credited in it.Hopper is often credited with the coining of the term "bug" and "debugging" when a moth caused the Mark II to malfunction.While a moth was found and the process of removing it called "debugging," the terms were already part of the language of programmers"./Wikipedia</SecretText>
      <Button>Sign out</Button>
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

  @media (min-width: 767px){
    margin-top: 35px;
  }
`
const SecretText = styled.p`
  color: white;
  font-size: 18px;
`

const SecretHeader = styled.h2`
  color: white;

  @media (min-width: 767px){
    font-size: 40px;
  }
`
const Button = styled.button`
  border-radius: 8px;
  background-color: #006cde;
  background-image: linear-gradient(90deg, #006cde 0%, #FC00FF 100%);
  padding: 10px 20px;
  border: solid #FFF 1.5px;
  border-radius: 50px;
  outline: none;
  width: 100%;
  color: #FFF;
  font-size: 17px;
  // transition: all 1s ease;
  // transition: 0.3s;

  :hover {
    background-color: #FC00FF;
    background-image: linear-gradient(90deg, #FC00FF 0%, #006cde 100%);
  }

  :active {
    background-color: #006cde;
  }

  @media (min-width: 767px){
    font-size: 19px;
  }
`