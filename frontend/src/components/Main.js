import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { API_URL } from 'utils/url'
import user from '../reducers/user'


const Main = () => {
  const [quote, setQuote] = useState(null)

  const accessToken = useSelector((store) => store.user.accessToken)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    // accessToken === null
    if (!accessToken) {
      navigate('/login')
    }
  }, [accessToken, navigate])

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        Authorization: accessToken,
      },
    }

    fetch(API_URL('quote'), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setQuote(data.response)
        }
      })
  }, [accessToken])


return (

  <>
  <div className='main-headline-text'>
    <h1>Welcome to our page</h1>
    <p>Here's a little poem treat from us</p>
  </div>
  <fieldset>
    {quote ? (
      <div className='quote-container'>
        <>
          <h2>{poem.title}</h2>
          <p className='author-name'>Author: {poem.author}</p>
          <p className='quote-text'>{poem.poem}</p>
          <p className='source-link'>Source: {poem.source}</p>
        </>
      </div>
    ) : (
      <p>Sorry, no quote found</p>
    )}
  </fieldset>
  <div className='logout-btn'>
    <button
      type='button'
      onClick={() => dispatch(user.actions.setAccessToken(null))}
    >
      Log out
    </button>
  </div>
</>
)
}

export default Main