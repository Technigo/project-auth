import React, { useEffect } from 'react' 
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'

import { API_URL } from '../reusable/urls'
import thoughts from '../reducers/thoughts'


const LandingPage = () => {
  const accessToken = useSelector(store => store.user.accessToken)
  const dispatch = useDispatch()
  const history = useHistory()

  // Redirect to signup or login/signin in our case week 20
  useEffect(() => {
    if (!accessToken) {
      history.push('/signup')
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
      .then(data => dispatch(thoughts.actions.setThoughts(data)))
  }, [accessToken, dispatch])

  return (
    <div>
      Hej hej Landing Page
      <Link to="/signup">To LOGIN we go</Link>
    </div>
  )
}

export default LandingPage