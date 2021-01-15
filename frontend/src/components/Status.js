/* eslint-disable no-unused-vars */
import React from 'react'
import { useSelector } from 'react-redux'

export const Status = () => {
  const statusMessage = useSelector((store) => store.user.login.statusMessage)
  return (
    <>
      <h3>Status:</h3><p>{`${statusMessage}`}</p>
    </>
  )
}