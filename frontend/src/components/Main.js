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
      navigate("/main") //change to "login" instead of "main" when styled
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
      <SecretText>Live</SecretText>
      <SecretText>Love</SecretText>
      <SecretText>Laugh</SecretText>
      {/* {contentItems.map((item) => {
        return <div key={item._id}>{item.message}</div>
      })} */}
    <LinkHome to="/">Ok thank you..</LinkHome>
    </Wrapper>
    </MainWrapper>
  )
}

const MainWrapper = styled.section`
display: flex;
justify-content: center;
`

const Wrapper = styled.div`

`

const LinkHome = styled(Link)`
font-family: monospace;
`


const SecretText = styled.h1`
font-family: 'Shrikhand', cursive;
color: purple;
font-size: 70px;
text-align: center;
margin: 5px;
`
export default Main