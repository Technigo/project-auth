import React, { useEffect } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import moment from 'moment'

import { thoughts } from '../reducers/thoughts'

import { API_URL, THOUGHTS } from '../reusable/urls'

const Feed = () => {
  const account = useSelector(store => store.account)
  const thoughtsItems = useSelector(store => store.thoughts.items)

  const dispatch = useDispatch()

  

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${account.accessToken}` 
      }
    }

    fetch(API_URL(THOUGHTS), options)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          batch(() => {
            dispatch(thoughts.actions.setThoughts(data.thoughts))
            dispatch(thoughts.actions.setErrors(null))
          })
        } else {
          dispatch(thoughts.actions.setErrors(data))
        }
      })
  }, [account.accessToken, dispatch])

  return (
    <section className="feed-section">
      <div className="feed-card-wrapper">
        {thoughtsItems.map((thought) => (
          <div key={thought._id} className="feed-card">
            <div className="feed-item-info">
              <p className="feed-item-name">{thought.username}</p>
              <p className="feed-item-posted">{moment(thought.createdAt).fromNow()}</p>
            </div>
            <p className="feed-item-message">{thought.message}</p>
          </div>
        ))
        }
      </div>
    </section>

  )
}

export default Feed 