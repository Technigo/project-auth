import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {user} from '../reducer/user'

export const Secret = () => {
  const accessToken = useSelector((state) => (state.user.accessToken))
  const history = useHistory()
  const dispatch = useDispatch()

  const handleLogOut = () => {
    return (
      dispatch(user.actions.saveAccesToken({accessToken: null}))
    )
  }
  useEffect(() => {
    fetch("https://camilla-and-viktorias-secret.herokuapp.com/secrets", {
      headers: {
        Authorization: accessToken
      }
      })
      .then((res) => {
        if (!res.ok) {
           throw('error in secrets')   
        }return
         res.json() 
         console.log('secrets res ok') 
      }, [accessToken])
      .catch((err) => {
        history.push('/sign-in')
      })
  })

  return (
    <div className='secret-container'>
      <h1>Secret</h1>
      <iframe src="https://giphy.com/embed/l0HlUxUu3CqVAbees" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
      <p><a href="https://giphy.com/gifs/katelyntarver-l0HlUxUu3CqVAbees"></a></p>
      <input
          type='submit'
          value='Log out'
          className='button'
          onClick={handleLogOut}>
      </input>
    </div>
    
  )
}