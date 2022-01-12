import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'

import { API_URL } from 'utils/urls';
import thoughts from '../reducers/thoughts'

export const Main = () => {
// this comp available only for users 
  const thoughtsItems = useSelector(store => store.thoughts.items)
  // hämtar accesstoken from resux store 
  const accessToken = useSelector(store => store.user.accessToken)

  const navigate = useNavigate()
  const dispatch = useDispatch()


  useEffect(() => {
    if(!accessToken) {
      navigate('/login')
    }
  }, [accessToken, navigate])

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'Authorization': accessToken
      }
    }
  
    fetch(API_URL('thoughts'), options)
      .then(res => res.json())
      .then((data) => {
        if(data.success) {
          dispatch(thoughts.actions.setItems(data.response))
          dispatch(thoughts.actions.setError(null))
        } else {
          dispatch(thoughts.actions.setItems([]))
          dispatch(thoughts.actions.setError(data.response))
        }

      })
  }, [accessToken, navigate])

  return (
    <div>
      <div>
        <Link to="/login">To "/login" !</Link>
      </div>
      <h1>Protected Happy Thoughts</h1>
      {/*{thoughtsItems.map(item => (
        <div key={item._id}>{item.message}</div>
      ))}*/}
    </div>
  )
}