import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { users } from '../reducers/user'

import { Giphy } from './Giphy'

const narniaURL = 'https://auth-narnia.herokuapp.com/narnia'

export const Narnia = () => {
  const accessToken = useSelector((store) => store.users.accessToken)

  const dispatch = useDispatch()
  const history = useHistory()

  const handleLogOut = () => {
    dispatch(users.actions.logOut())
  }

  useEffect(() => {
    fetch(narniaURL, {
      method: 'GET',
      headers: { Authorization: accessToken }
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Please log in!')
        } else {
          return res.json()
        }
      })
      .catch((err) => {
        history.push('/login')
      })
  }, [history, accessToken])


  return (
    <div>
    <Giphy />
    <Link to='/login'>
      <button
        type="button"
        onClick={handleLogOut}>
        Log out!
      </button>
      </Link>
      {/* <img src={process.env.PUBLIC_URL + '/lion.jpg'} alt="Lion" /> */}
    </div>
  )
}