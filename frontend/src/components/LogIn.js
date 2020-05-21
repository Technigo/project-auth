import React, { useState } from 'react'
import { Form } from '../shared/shared'

export const LogIn = () => {
  const [userName, setUserName] = useState('')
  const [userPassword, setUserPassword] = useState('')
  return (
    <Form>
      <h1>
        LOG IN HERE:
      </h1>
      <label>
        Name:
      <input
          type='text'
          required='true'
          value={userName}
          // onChange={setUserName()}
          placeholder='name'>
        </input>
      </label>
      <label>
        Password:
      <input
          type='password'
          required='true'
          value={userPassword}
          // onChange={setUserPassword()}
          placeholder="password">
        </input>
      </label>
      <button
        type='submit'>
        ENTER
      </button>
    </Form>
  )
}