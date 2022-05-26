import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { API_URL } from 'utils/utils'
import styled from 'styled-components'

import thoughts from 'reducers/thoughts'


const Main = () => {

  const accessToken = useSelector((store) => store.user.accessToken)
  // const thoughtItems = useSelector((store) => store.thoughts.items)
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

    fetch(API_URL("thoughts"), options)
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        dispatch(thoughts.actions.setItems(data.response))
        dispatch(thoughts.actions.setError(null))
      } else {
        dispatch(thoughts.actions.setError(data.response))
        dispatch(thoughts.actions.setItems([]))
      }
    })
  }, [])


  return(
    <MainWrapper>
    <Wrapper>
    <LinkHome to="/">Go home</LinkHome>
      <SecretText>Live</SecretText>
      <SecretText>Love</SecretText>
      <SecretText>Laugh</SecretText>
      {/* {thoughtItems.map((item) => {
        return <div key={item._id}>{item.message}</div>
      })} */}
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