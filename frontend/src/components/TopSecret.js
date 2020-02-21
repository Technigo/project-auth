import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

export const TopSecret = () => {
  const [secret, setSecret] = useState('')
  const { id } = useParams()
  const url = `http://localhost:8080/users/${id}`

  useEffect(() => {
    fetch(url, {
      headers: {
        Authorization: window.localStorage.accessToken
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setSecret(data.secret)
      }, [])
  })
  return (
    <h1>{secret}</h1>
  )
}