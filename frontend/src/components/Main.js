import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { API_URL } from '../utils/utils'

import { jokes } from '../reducers/jokes'

export const Main = () => {
  const jokesItems = useSelector((store) => store.quotes.items)
  const accessToken = useSelector((store) => store.user.accessToken)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // Function for logout
  // const logout = () => {
  //   batch(() => {
  //     dispatch(user.actions.setUsername(null))
  //     dispatch(user.actions.setAccessToken(null))

  //     localStorage.removeItem('user')
  //   })
  // }

  useEffect(() => {
    if (!accessToken) {
      navigate('/login')
    }
  }, [accessToken])

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
      },
    }

    fetch(API_URL('jokes'), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatch(jokes.actions.setItems(data.response))
          dispatch(jokes.actions.setError(null))
        } else {
          dispatch(jokes.actions.setError(data.response))
          dispatch(jokes.actions.setItems([]))
        }
      })
  }, [])

  return (
    <>
      <Link to='/login'> LINK TO /login</Link>
      <main className='main-container'>
        <div className='form-container'>
          <h1>Welcome!</h1>
          <button className='submit-button' type='submit' value='logout'>
            Log out
          </button>
        </div>
      </main>
    </>
  )
}
