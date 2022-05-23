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
    { quote ? (
    <div className="quote-container">
    <h1>Welcome to your page!</h1>
    <p>Here's a quote for you</p>

    <h2>{quote.title}</h2>
    <p>Author: {quote.author}</p>
    <p>{quote.quote}</p>
    <p>Source: {quote.source}</p>
    </div>
    
    ) : (
      <p>Sorry, no quote found</p>
    )}

    </>

)
}

export default Main