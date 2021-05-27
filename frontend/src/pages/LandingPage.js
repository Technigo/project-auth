import React, { useEffect } from 'react' 
import { useSelector, useDispatch, batch } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'

import { API_URL } from '../reusable/urls'
import thoughts from '../reducers/thoughts'
import user from '../reducers/user'


const LandingPage = () => {
  const accessToken = useSelector(store => store.user.accessToken)
  console.log(accessToken)
  const thoughtsList = useSelector(store => store.thoughts.items)
  console.log(thoughtsList)
  const dispatch = useDispatch()
  const history = useHistory()

  // Redirect to signup or login/signin in our case week 20
  useEffect(() => {
    if (!accessToken) {
      history.push('/login')
    }
  }, [accessToken, history])

  useEffect(() => {

    const options = {
      method: 'GET',
      headers: {
        Authorization: accessToken
      }
    }
    fetch(API_URL('thoughts'), options)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          batch(() => {
            dispatch(thoughts.actions.setThoughts(data.thoughts))
            dispatch(thoughts.actions.setErrors(null))
          })
        } else {
          console.log(data)
          dispatch(thoughts.actions.setErrors(data))
        }
      }) 
  }, [accessToken, dispatch])

  const onLogout = () => {
    dispatch(user.actions.setReturnInitialState(null))
  }

  return (
    <div>
       {thoughtsList.map(thought => {
        console.log(thought)
        return (
          <div key={thought._id}>
          <p>{thought.message}</p>
        </div>
        )
      })}
      <Link to="/login">To LOGOUT we go</Link>
      <button onClick={() => onLogout()}>Log out</button>
    </div>
  )
}

export default LandingPage