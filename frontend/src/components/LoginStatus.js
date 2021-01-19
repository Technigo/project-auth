import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { user } from '../reducers/user'

const Container = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  margin: 0;
  padding: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const StatusCard = styled.div`
  background-color: white;
  color: #454545;
  text-align: left;
  padding: 20px;
  box-shadow: 6px 6px 25px 1px #696969;
  display: flex;
  flex-direction: column;
  justify-content: center;
`
const Button = styled.button`
  display:inline-block;
  padding:0.35em 1.2em;
  border:0.1em solid #454545;
  margin:0 0.3em 0.3em 0;
  border-radius:0.12em;
  box-sizing: border-box;
  text-decoration:none;
  color:#454545;
  text-align:center;
  transition: all 0.2s;
  font: inherit;
  margin: 15px;
  cursor: pointer;
`

export const LoginStatus = () => {
  const dispatch = useDispatch()

  const statusMessage = useSelector((store) => store.user.login.statusMessage)
  const accessToken = useSelector((store) => store.user.login.accessToken)
  const secret = useSelector((store) => store.user.login.secret)

  const logOut = () => {
    dispatch(user.actions.setAccessToken({ accessToken: null }))
  }

  const fetchSecret = () => {
    fetch('https://project-auth-sara-amanda.herokuapp.com/secret', {
      method: 'GET',
      headers:
      {
        'Content-Type': 'application/json',
        'Authorization': accessToken
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error ("https://64.media.tumblr.com/tumblr_lt7bswjhFd1r4ghkoo1_250.gifv")
        }
        return res.json()
      })
      .then((json) => {
        dispatch(user.actions.setSecret({ secret: json.secret }))
      })
      .catch((err) => {
        dispatch(user.actions.setSecret({ secret: err.message }))
      })
  }

  return (
    <Container>
      <StatusCard>
        <p>{statusMessage && statusMessage}</p>
        {accessToken && <Button onClick={logOut}>Log out</Button>}
        <Button onClick={fetchSecret}>Test Authentication</Button>
        <p>{secret && <img alt='gif of cat' src={secret} width="100%" height="100%" frameBorder="0"></img>}</p>
      </StatusCard>
    </Container>
  )
}
