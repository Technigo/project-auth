import React, { useEffect, useState } from 'react'

export const ContentPage = ({ id }) => {
  const [message, setMessage] = useState("")
  const accessToken = localStorage.getItem("accessToken")

  useEffect(() => {
    fetch(`http://localhost:8080/users/${id}`, {
      method: "GET",
      headers: { "Authorization": accessToken }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Access denied')
        }
        return res.json()
      })
      .then(json => setMessage(json.message))
      .catch(err => {
        console.log(err.message)
      })
  }, [accessToken, id])

  return (
    <div>
      {message}
    </div>
  )
}
