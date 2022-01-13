import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { API_URL } from '../utils/urls'
import user from '../reducers/user'
import styled from 'styled-components/macro'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import Loading from '../components/Loading'


const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [mode, setMode] = useState('signin')
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)

  const accessToken = useSelector((store) => store.user.accessToken)
  const errorText = useSelector((store) => store.user.error)
  console.log(errorText ? errorText.code : '')

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
  const onEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()
    setLoading(true)
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password, email }),
    }

    setTimeout(() =>
      fetch(API_URL(mode), options)
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          if (data.success) {
            batch(() => {
              dispatch(user.actions.setUserId(data.response.userId))
              dispatch(user.actions.setUsername(data.response.username))
              dispatch(user.actions.setEmail(data.response.email))
              dispatch(user.actions.setAccessToken(data.response.accessToken))
              dispatch(user.actions.setError(null))
            })
          } else {
            batch(() => {
              dispatch(user.actions.setUserId(null))
              dispatch(user.actions.setEmail(null))
              dispatch(user.actions.setUsername(null))
              dispatch(user.actions.setAccessToken(null))
              dispatch(user.actions.setError(data.response))
              // console.log(data.response.errors.email.message)
            })
          }
          setLoading(false)
        }), 1500)
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
        {loading && <Loading />}
        {!loading && (
          <StyledForm>
            <h1 style={{ color: '#4a3b61', textAlign: 'center' }}>
              NASA: Space Nerd Facts
            </h1>
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
              <StyledErrorMessage>
                {errorText ? errorText.code ? errorText.code === 11000 ? 'Username is not unique' : '' : '' : ''}
              </StyledErrorMessage>
              <StyledErrorMessage>
                {errorText ? errorText.errors ? errorText.errors.username ? errorText.errors.username.message : '' : '' : ''}
              </StyledErrorMessage>
              {mode === 'signup' && (
                <StyledFieldset>
                  <legend>Email:</legend>
                  <StyledInputField
                    type="email"
                    value={email}
                    onChange={onEmailChange}
                  />
                </StyledFieldset>
              )}
              <StyledErrorMessage>
                {errorText ? errorText.errors ? errorText.errors.email ? errorText.errors.email.message : '' : '' : ''}
              </StyledErrorMessage>
              <StyledFieldset>
                <legend>Password:</legend>
                <StyledInputField
                  type={visible ? 'text' : 'password'}
                  value={password}
                  minLength='5'
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
                    onClick={() => {
                      setMode('signin')
                      dispatch(user.actions.setError(null))
                      setUsername('')
                      setPassword('')
                    }}
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
        )}
      </BackgroundImage>
    </>
  )
}

export default Login


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
  width: 60%;
  background-color: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0px 0px 20px 10px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (min-width: 992px) {
    width: auto;
  }
`

const StyledFieldset = styled.fieldset`
  border: 3px solid #ccadb5;
  border-radius: 7px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 20px;
  margin-bottom: 10px;
  margin-top: 3px;
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
  flex-direction: column;
  justify-content: center;
  text-align: center;
  margin: 0 auto;
  p {
    margin: 5px;
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

const StyledErrorMessage = styled.h6`
  color: red;
  font-size: 11px;
  margin: 0;
  text-align: center;
`