import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { API_URL } from '../utils/urls'
import user from '../reducers/user'
import styled from 'styled-components/macro'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

const BackgroundImage = styled.main`
  background-image: url('/assets/space_background2.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: bottom;
  height: 100%;
  width: 100%;
  display: flex;
  position: absolute;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`

const StyledForm = styled.div`
  background-color: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0px 0px 20px 10px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
`

const StyledFieldset = styled.fieldset`
  border: 3px solid #ccadb5;
  border-radius: 7px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 20px;
  margin-bottom: 10px;
`
const StyledInputField = styled.input`
  border: 1px solid transparent;
  width: 70%;
  height: 100%;
  border: none transparent;
  outline: none;
  font-size: 20px;
  font-family: inherit;
  &:active {
  }
`
const StyledLinkText = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  p {
    margin-right: 5px;
  }
`

const StyledButton = styled.button`
  background-color: #4a3b61;
  width: 100px;
  display: flex;
  justify-content: center;
  border: none;
  cursor: pointer;
  color: white;
  font-size: 20px;
  font-weight: 700;
  padding: 10px;
  border-radius: 5px;
  margin: 20px auto;
`

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [mode, setMode] = useState('signin')
  const [visible, setVisible] = useState(false)

  const accessToken = useSelector((store) => store.user.accessToken)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (accessToken) {
      navigate('/')
    }
  }, [accessToken, navigate])

  const onUsernameChange = (event) => {
    setUsername(event.target.value)
  }
  const onPasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    }

    fetch(API_URL(mode), options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        if (data.success) {
          batch(() => {
            dispatch(user.actions.setUserId(data.response.userId))
            dispatch(user.actions.setUsername(data.response.username))
            dispatch(user.actions.setAccessToken(data.response.accessToken))
            dispatch(user.actions.setError(null))
          })
        } else {
          batch(() => {
            dispatch(user.actions.setUserId(null))
            dispatch(user.actions.setUsername(null))
            dispatch(user.actions.setAccessToken(null))
            dispatch(user.actions.setError(data.response))
          })
        }
      })
  }
  const toggleVisible = () => {
    if (visible) {
      setVisible(false)
    } else {
      setVisible(true)
    }
  }

  return (
    <>
      <BackgroundImage>
        <StyledForm>
          <h1 style={{ color: '#4a3b61' }}>NASA: Space Nerd Facts</h1>

          <span role="img" aria-label="sheep" style={{ fontSize: 40 }}>
            🚀
          </span>
          <h3 style={{ color: 'grey' }}>
            {mode === 'signup' ? 'Create new account' : 'Login to your account'}
          </h3>
          <form onSubmit={handleFormSubmit}>
            <StyledFieldset>
              <legend>Username:</legend>
              <StyledInputField
                type="text"
                value={username}
                onChange={onUsernameChange}
              />
            </StyledFieldset>
            <StyledFieldset>
              <legend>Password:</legend>
              <StyledInputField
                type={visible ? 'text' : 'password'}
                value={password}
                onChange={onPasswordChange}
              />
              {visible ? (
                <FaEye
                  onClick={toggleVisible}
                  style={{ height: 20, width: 20, color: '#4a3b61' }}
                />
              ) : (
                <FaEyeSlash
                  onClick={toggleVisible}
                  style={{ height: 20, width: 20, color: 'grey' }}
                />
              )}
            </StyledFieldset>
            {/* {mode === 'signup' && (
          <fieldset>
            <legend>Email:</legend>
            <input
              type="email"
              placeholder="email"
              value={password}
              onChange={onPasswordChange}
            />
          </fieldset>
        )} */}
            {mode === 'signin' ? (
              <StyledButton type="submit">Sign in</StyledButton>
            ) : (
              <StyledButton type="submit">Sign up</StyledButton>
            )}
          </form>
          <div>
            {mode === 'signin' ? (
              <StyledLinkText>
                <p>Do not have an account? </p>
                <p
                  onClick={() => setMode('signup')}
                  style={{
                    fontWeight: '700',
                    cursor: 'pointer',
                    color: '#4a3b61',
                  }}>
                  Sign up!
                </p>
              </StyledLinkText>
            ) : (
              <StyledLinkText>
                <p>Already have an account? </p>
                <p
                  onClick={() => setMode('signin')}
                  style={{
                    fontWeight: '700',
                    cursor: 'pointer',
                    color: '#4a3b61',
                  }}>
                  Login
                </p>
              </StyledLinkText>
            )}
          </div>
        </StyledForm>
      </BackgroundImage>
    </>
  )
}

export default Login
