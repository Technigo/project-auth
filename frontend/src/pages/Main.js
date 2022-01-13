import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { NASA_URL } from '../utils/urls'
import user from '../reducers/user'
import styled from 'styled-components'
import { FaPowerOff } from 'react-icons/fa'
import Lottie from 'react-lottie';
import animationData from '../components/lotties/spaceman'

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
    if (accessToken) {
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
    }
  }, [accessToken])
  const onRestartClick = () => {
    dispatch(user.actions.restart())
  }

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  }

  return (
    <StyledBackground>
      <StyledWrapper>
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
            <Lottie
              options={defaultOptions}
              height={300}
              width={300}
            />
          </StyledDescription>
        </StyledContainer>
      </StyledWrapper>
    </StyledBackground>
  )
}

export default Main

const StyledBackground = styled.div`
  display: flex;
  background-color: #ccadb5;
  width: 100vw;
  height: 100vh;
  padding-bottom: 10px;
  @media (min-width: 992px) {
    justify-content: center;
  }
`

const StyledDescription = styled.div`
  overflow: auto;
  height: 400px;
  @media (min-width: 992px) {
    overflow: none;
    height: auto;

  }
`

const StyledImage = styled.img`
  width: 95%;
  border-radius: 30px;
  margin: 10px auto;
  display: flex;
  justify-content: center;
  position: relative;
  @media (min-width: 992px) {
    max-height: 700px;
    width: auto;
  }
`
const StyledContainer = styled.div`
  position: relative;
  background-color: #4a3b61;
  color: white;
  top: -50px;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;
  border-radius: 30px;
  padding: 10px 10px;
  width: 80%;
  @media (min-width: 768px) {
    padding: 20px 40px;
  }
  @media (min-width: 992px) {
    width: 500px;
    height: 800px;
    position: relative;
    top: 0;
    left: -75px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
  }
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
  @media (min-width: 768px) {
    width: 35px;
    height: 35px;
  }
`
const StyledIconText = styled.h6`
  font-size: 15px;
  opacity: 0.6;
  color: white;
  margin: 0;
  @media (min-width: 768px) {
    font-size: 20px;
  }
  @media (min-width: 992px) {
    font-size: 22px;
  }
`
const StyledIconContainer = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  right: 35px;
  top: 35px;
  cursor: pointer;
`

const StyledWrapper = styled.div`
  @media (min-width: 992px) {  
    display: flex;
  align-items: center;
  justify-content: space-around;
  }
`
