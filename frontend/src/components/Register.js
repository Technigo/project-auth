import React, { useState } from 'react'
import { Form } from '../shared/shared'
export const Register = () => {
  const [userName, setUserName] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [email, setEmail] = useState('')

  return (
    <Form>
      <h1>
        REGISTER HERE:
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
        Email:
      <input
          type='email'
          required='true'
          value={userName}
          // onChange={setUserName()}
          placeholder='e-mail'>
        </input>
      </label>
      <label>
        Password:
      <input
          type='password'
          required='true'
          value={userPassword}
          // onChange={setUserPassword()}
          placeholder='password'>
        </input>
      </label>
      <button
        type='submit'>
        REGISTER
      </button>
    </Form>
  )
}