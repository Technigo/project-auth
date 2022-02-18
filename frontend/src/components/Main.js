import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'

import { API_URL } from '../utils/constants'
import thoughts from '../reducers/thoughts'

const Main = () => {
  const thoughtsItems = useSelector((store) => store.thoughts.items)
  const accessToken = useSelector((store) => store.user.accessToken)
  const navigate = useNavigate()
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
        Authorization: accessToken
      }
    }
    fetch(API_URL('thoughts'), options)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          dispatch(thoughts.actions.setItems(data.response))
          dispatch(thoughts.actions.setError(null))
        } else {
          dispatch(thoughts.actions.setItems([]))
          dispatch(thoughts.actions.setError(data.response))
        }
      })
  }, [])
  return (
    <section>
      <div>
        <Link to="/login">To `/login`!</Link>
      </div>
      <h1>Protected Happy Thoughts:</h1>
      {thoughtsItems.map((item) => (
        <article key={item.id}>{item.message}</article>
      ))}
    </section>
  )
}

export default Main