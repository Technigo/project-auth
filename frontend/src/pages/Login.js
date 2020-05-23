import React from 'react'

export const Login = () => {
  //både namn och email?
  return (
  <form>
    <input
      type='text'
      value={name}
      onChange={event => setName(event.target.value)}
      requiered
    />
    <input
      type='email'
      value={email}
      onChange={event => setEmail(event.target.value)}
      requiered />
    <input
      type='password'
      value={password}
      onChange={event => setPassword(event.target.value)} reuiered />
    <button onClick={handleClick}>Submit</button>
  </form>
  )
}