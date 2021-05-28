import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';

import styled from 'styled-components/macro'

import { logout } from '../reducers/user'
import user from '../reducers/user'

const Secret = () => {
  const accessToken = useSelector(store => store.user.accessToken)
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!accessToken) {
      history.push('/signin')
    }

  }, [accessToken, history])


  const handleClick = () => {
     dispatch(user.actions.setAccessToken(null))
  }

  return(
    <Wrapper>
      <Background>
        <SecretHeader>Did you know?</SecretHeader>
        <SecretText>"Grace Hopper was the first person to create a compiler for a programming language and one of the first programmers of the Harvard Mark I computer, an electro-mechanical computer based on Analytical Engine. Hopper's work with computers started in 1943, when she started working at the Bureau of Ordnance's Computation Project at Harvard where she programmed the Harvard Mark I. Hopper not only programmed the computer, but created a 500-page comprehensive manual for it.Even though Hopper created the manual, which was widely cited and published, she was not specifically credited in it.Hopper is often credited with the coining of the term "bug" and "debugging" when a moth caused the Mark II to malfunction.While a moth was found and the process of removing it called "debugging," the terms were already part of the language of programmers"./Wikipedia</SecretText>
        <Button
          type = 'submit'
          //onClick={handleClick()}
          // onClick={() => dispatch(logout())}
          onClick={handleClick}
          >
          Sign out
        </Button>
      </Background>
    </Wrapper>
  )
}

export default Secret

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 767px){
    margin-top: 35px;
  }
`
const Background = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 92%;
  margin-top: 27px;
  padding: 10px 20px 30px;
  opacity: 1;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 10px;

  @media (min-width: 767px){
    padding: 13px 30px 40px;
  }
  @media (min-width: 1024px){
    width: 800px;
    padding: 15px 40px 30px;
  }
`
const SecretText = styled.p`
  color: white;
  font-size: 18px;
`
const SecretHeader = styled.h2`
  color: white;
  margin: 14px 0 3px;

  @media (min-width: 767px){
    font-size: 40px;
  }
`
const Button = styled.button`
  border-radius: 8px;
  padding: 10px 20px;
  border: solid #FFF 1.5px;
  border-radius: 50px;
  outline: none;
  width: 230px;
  margin: 17px 0 25px;
  color: #FFF;
  font-size: 17px;
  background: linear-gradient(90deg, #006cde 0%, #FC00FF 100%);
  transition: all 0.3s ease 0s;

  :hover {
    background: linear-gradient(90deg, #FC00FF 0%, #006cde 100%);
  }
  :active {
    background-color: #006cde;
  }
  :visited {
    color: #FFF;
  }
  @media (min-width: 767px){
    margin: 38px 0 35px;
  }
`
