import React from 'react'
import error from '../img/error.jpeg'

export const NotFound = () => {
  return (
    <div className="error-container">
      <img
        src={error}
        height={350}
        width={700}
        style={{ alignSelf: 'center' }}
      />
    </div>
  )
}
