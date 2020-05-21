import React from 'react'
import { Button } from '../shared/shared'

export const Welcome = () => {
  const username = "bob"
  return (
    <div>
      <h1>
        HELLO {username.toUpperCase()} 👋🏼
      </h1>
      <Button
        onClick={() => alert("bob logged out")}>
        SIGN OUT
      </Button>
    </div>
  )
}