import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { FEELING_URL } from '../reusable/urls'

const Page = () => {
  //const [feelings, setFeelings] = useState('')

  const accessToken = useSelector(store => store.user.accessToken)
  const userId = useSelector(store => store.user.userId)
  const history = useHistory()

  useEffect(() => {
    if (!accessToken) {
      history.push('/');
    }
  }, [accessToken, history]);

  const onButtonClick = (e) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': accessToken
      }, 
      body: JSON.stringify({ feelings: e.target.value })
    }
    fetch(FEELING_URL(userId), options)
      .then(res => res.json())
      .then(data => console.log(data))
  }

  return (
    <div>
      <h1>Profile page</h1>
      <button
        className="feeling-button"
        value="angry"
        onClick={onButtonClick}
      >
        Angry
      </button>
      <button
        className="feeling-button"
        value="happy"
        onClick={onButtonClick}
      >
        Happy
      </button>
      <button
        className="feeling-button"
        value="sad"
        onClick={onButtonClick}
      >
        Sad
      </button>
      <button
        className="feeling-button"
        onClick={onButtonClick}
        value="fearless"
      >
        Fearless
      </button>
      <button
        className="feeling-button"
        value="surprised"
        onClick={onButtonClick}
      >
        Surprised
      </button>
      <button
        className="feeling-button"
        value="curious"
        onClick={onButtonClick}
      >
        Curious
      </button>
    </div>
  )
}

export default Page