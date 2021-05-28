import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { FEELING_URL } from '../reusable/urls'
import user from '../reducers/user'
import { feelingsArray } from '../reusable/constants'

const Page = () => {
  const [feelings, setFeelings] = useState('')
  const name = useSelector(state => state.user.username)
  const accessToken = useSelector(store => store.user.accessToken)
  const userId = useSelector(store => store.user.userId)
  const feelingsHistory = useSelector(store => store.user.feelings)

  const dispatch = useDispatch()
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
      .then(data => dispatch(user.actions.setFeelings(data.feelings)))
    setFeelings(e.target.value)
  }

  const onFeelingsRegistred = (feelings) => {
    switch (feelings) {
      case 'angry':
        return 'Why are you so angry? Call a friend asap!';
      case 'happy': 
        return 'We are happy that you feel happy today!';
      case 'sad': 
        return 'Oh noo, why? Buy yourself some ice-cream'; 
      case 'fearless': 
        return 'Cool, you should try some bungee jumping!';
      case 'surprised': 
        return 'Why so surprised? Well well, surprise!';
      default: 
        return 'What should we explore today?';
    }
  }

  return (
    <section className="profile-container">
      { !feelings &&
        <>
          <h1 className="form-heading">Hello {name}! How are you feeling today?</h1>
          <div>
            {feelingsArray.map((item, index) => {
              return (
                <button
                  key={`key-${index}`}
                  className="form-button"
                  value={item}
                  onClick={onButtonClick}
                >
                  {`${item.charAt(0).toUpperCase()}${item.slice(1)}`}
                </button>
              )
            })
            }
          </div>
        </>
      }
      {feelings &&
        <div>
          <h2>{onFeelingsRegistred(feelings)}</h2>
          <p>All of your feelings so far:</p>
          <div>
            {feelingsHistory.map((feeling, index) => <p key={`key-${index}`}>{feeling}</p>)}
          </div>
        </div>

      }
    </section>
  )
}

export default Page