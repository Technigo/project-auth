import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <section className='notfound-section'>
      <h2>Service unavailable</h2>
      <button type='button' onClick={() => navigate('/login')}>
        Back
      </button>
    </section>
  )
}

export default NotFound
