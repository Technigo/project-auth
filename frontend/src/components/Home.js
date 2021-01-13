import React from 'react'
import { Link } from 'react-router-dom'
import {SubmitButton} from "./SubmitButton"

import styled from 'styled-components/macro'
import TextAnimation from "react-animate-text";

export const Home = () => {
  return (	 
  <Image>
      <Content>
      <Text>
		  <TextAnimation><span>Welcome to XYZ. Let's get you logged in! Don't have an account yet? Sign up and get started.</span></TextAnimation>
      </Text>
		  {/* <TextOther>Don't have an account yet?</TextOther>
      <TextOther>Sign up and get started!</TextOther> */}
		  <TextFinal>Created by Kat and Liza</TextFinal>
        <ButtonContainer>
          <Redirect to="/login">
            <SubmitButton title='Login' />
          </Redirect>

          <Redirect to="/signup">
            <SubmitButton title='Sign Up' />
          </Redirect>
        </ButtonContainer>
      </Content>
			</Image>
  )
}

const Image = styled.main`
  background-image: url('${process.env.PUBLIC_URL + '/flower.jpg'}');
  position: fixed;
  width: 100%;
  height: 100%;
  background-size: cover;
`
const Content = styled.div`
 display: flex;
  flex-direction: column;
  width: 30%;
  margin: 400px auto;
  align-items: center;
  justify-content: center;
  background-color: #9b959f;
  padding: 15px;
`
const Text = styled.text`
  display: flex;
  padding: 3px;
  flex-direction: column;
  color: #44333a;
  font-weight: bold;
  font-size: 30px;
  font-family: 'Xanh Mono', monospace;
  align-items: center;
  justify-content: center;
  text-align: center;
`
// const TextOther = styled.text`
//   display: flex;
//   padding: 3px;
//   flex-direction: column;
//   color: #44333a;
//   font-size: 20px;
//   font-family: 'Xanh Mono', monospace;
//   align-items: center;
//   justify-content: center;
//   text-align: center;
// `
const TextFinal = styled.text`
  display: flex;
  padding: 3px;
  flex-direction: column;
  color: #873c40;
  font-weight: bold;
  font-size: 25px;
  font-family: 'Xanh Mono', monospace;
  text-transform: uppercase;
  padding-top: 20px;
  align-items: center;
  justify-content: center;
  text-align: center;
`
const ButtonContainer = styled.div`
  display: flex,
  flex-direction: column;
  align-self: center;
  justify-content: center;
  width: 30%;
  @media (max-width: 950px) {
    margin: 2em 8em;
  }
  @media (max-width: 660px) {
    align-self: center;
    margin: 1em;
  }
`

const Redirect = styled(Link)`
  text-decoration: none;
`
