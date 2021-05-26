import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { useSelector } from 'react-redux'

import { API_URL, THOUGHTS } from '../reusable/urls'

const Feed = () => {

  const [thoughts, setThoughts] = useState([])

  const account = useSelector(store => store.account)

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${account.accessToken}` 
    }
  }

  useEffect(() => {
    fetch(API_URL(THOUGHTS), options)
      .then(res => res.json())
      .then(data => setThoughts(data))
  }, [API_URL, THOUGHTS])

  console.log(thoughts)

  return (
    <section className="feed-section">
      <div className="card-wrapper">
        {thoughts.map((thought) => (
          <div className="card">
            <p>{thought.username}</p>
            <p>{moment(thought.createdAt).fromNow()}</p>
            <p>{thought.message}</p>
          </div>
        ))
        }
      </div>
    </section>

  )
}

export default Feed 