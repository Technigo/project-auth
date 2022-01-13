import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <>
      <div>
        <h2>Service unavailable</h2>
      </div>
      <button type='button' onClick={() => navigate('/login')}>
        Back
      </button>
    </>
  )
}

export default NotFound
