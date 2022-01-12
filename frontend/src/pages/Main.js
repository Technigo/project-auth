import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { NASA_URL } from '../utils/urls'
import user from '../reducers/user'
import styled from 'styled-components'
import { FaPowerOff } from 'react-icons/fa'

const Main = () => {
  const [dailySpace, setDailySpace] = useState({})

  const navigate = useNavigate()
  const accessToken = useSelector((store) => store.user.accessToken)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!accessToken) {
      navigate('/login')
    }
  }, [accessToken, navigate])

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        headers: {
          Authorization: accessToken,
        },
      },
    }

    fetch(NASA_URL, options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setDailySpace(data)
      })
  }, [])
  const onRestartClick = () => {
    dispatch(user.actions.restart())
  }

  return (
    <div>
      <StyledImage src={`${dailySpace.url}`} />
      <StyledIconContainer onClick={onRestartClick}>
        <StyledIcon />
        <StyledIconText>logout</StyledIconText>
      </StyledIconContainer>
      <StyledContainer>
        <StyledTitle>{dailySpace.title}</StyledTitle>
        <StyledDescription>
          <StyledDescriptionText>
            {dailySpace.explanation}
          </StyledDescriptionText>
        </StyledDescription>
      </StyledContainer>
    </div>
  )
}

export default Main

const StyledDescription = styled.div`
  overflow: auto;
  height: 400px;
`

const StyledImage = styled.img`
  height: 400px;
  width: 95%;
  border-radius: 30px;
  margin: 10px auto;
  display: flex;
  justify-content: center;
  position: relative;
`
const StyledContainer = styled.div`
  position: absolute;
  background-color: #4a3b61;
  color: white;
  top: 370px;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 10px;
  border-radius: 30px;
  padding: 10px 10px;
  /* left: 10%; */
  width: 80%;
`
const StyledTitle = styled.h1`
  text-align: center;
  font-size: 25px;
`
const StyledDescriptionText = styled.p`
  line-height: 1.5;
`
const StyledIcon = styled(FaPowerOff)`
  width: 20px;
  height: 20px;
  opacity: 0.6;
  color: white;
  margin-right: 4px;
`
const StyledIconText = styled.h6`
  font-size: 15px;
  opacity: 0.6;
  color: white;
  margin: 0;
`
const StyledIconContainer = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  right: 35px;
  top: 35px;
  cursor: pointer;
`
