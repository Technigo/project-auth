import React from 'react'

export const ErrorMessage = ({ errorMessage }) => {
  return (
    <span className="error-message">
      {errorMessage}
    </span>
  )
}