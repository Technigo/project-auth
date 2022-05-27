import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { API_CONTENT, API_URL } from 'utils/utils'
import styled from 'styled-components'

import content from 'reducers/content'


const Main = () => {

  const accessToken = useSelector((store) => store.user.accessToken)
  // const contentItems = useSelector((store) => store.content.items)
  const navigate = useNavigate()
  const dispatch = useDispatch()


  useEffect(() => {
    if(!accessToken) {
      navigate("/login") //change to "login" instead of "main" when styled
    }
  }, [accessToken])

  useEffect(() => {

    const options = {
      method: "GET",

        headers: {
          'Content-Type': 'application/json',
          'Authorization': accessToken
        },
        
    }

    fetch(API_CONTENT, options)  //removed ("content") after API_URL, caus eit dodnt work 
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        dispatch(content.actions.setItems(data.response))
        dispatch(content.actions.setError(null))
      } else {
        dispatch(content.actions.setError(data.response))
        dispatch(content.actions.setItems([]))
      }
    })
  }, [])


  return(
    <MainWrapper>
    <Wrapper>
    <SecretTitle>Remember to:</SecretTitle>
      <SecretText>Live</SecretText>
      <SecretText>Love</SecretText>
      <SecretText>Laugh</SecretText>
      
    </Wrapper>
    <LinkHome to="/">Ok thank you..</LinkHome>
    </MainWrapper>
  )
}

const MainWrapper = styled.section`
display: flex;
flex-direction: column;
justify-content: center;
min-width: 90vw;
`

const Wrapper = styled.div`
min-width: 90vw;
min-height: 80vh;
margin-top: 40px;

@media (min-width: 768px) {
  margin-top: 20px;
}
`

const LinkHome = styled(Link)`
font-family: 'League Spartan', sans-serif;
color: gray;
text-decoration: none;
width: 100vw;
text-align: center;

@media (min-width: 768px) {
  margin-top: 20px;
  font-size: 18px;
}
`


const SecretText = styled.h1`
font-family: 'Shrikhand', cursive;
color: green;
text-shadow: 5px 5px blue;
font-size: 60px;
text-align: center;
margin: 5px;

@media (min-width: 768px) {
  font-size: 110px;
  margin: 0;
}
`
const SecretTitle = styled(SecretText)`
color: lightskyblue;
text-shadow: 5px 5px blue;
font-size: 40px;

@media (min-width: 768px) {
  font-size: 80px;
}
`

export default Main