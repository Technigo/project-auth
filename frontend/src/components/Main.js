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

    fetch(API_URL('quotes'), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setQuote(data.response)
        }
      })
  }, [accessToken])


return (

  <>
    <h1>Welcome!</h1>
    <p>Here you go, a quote</p>
    
  <fieldset>
    {quote ? (
      <div className='quote-container'>
        <>
          <h2>{quote.title}</h2>
          <p className='author-name'>Author: {quote.author}</p>
          <p className='quote-text'>{quote.quote}</p>
          <p className='source-link'>Source: {quote.source}</p>
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