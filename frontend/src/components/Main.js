import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'

import { API_URL } from '../utils/constants'
import profiles from '../reducers/profiles'


const Main = () => {
  const profilesItems = useSelector((store) => store.profiles.items)
  const accessToken = useSelector((store) => store.user.accessToken)

  const navigate = useNavigate()

  useEffect(() => {
    if (!accessToken) {
      navigate('/signin')
    }
  }, [accessToken, navigate])

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        Authorization: accessToken,
      },
    }

    fetch(API_URL('profiles'), options)
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        dispatch(profiles.actions.setItems(data.response))
        dispatch(profiles.actions.setError(null))
      } else {
        dispatch(profiles.actions.setItems([]))
        dispatch(profiles.actions.setError(data.response))
      }
    })
    }, [accessToken])

  return (
    <div>
      <div>
        <Link to="/signin">To 'signin' !</Link>
      </div>
      <h1>Profile</h1>
      {/* {profilesItems.map(item => (
        <div key={item._id}>{item.message}</div>
      ))} */}
    </div>
  )
}  

export default Main