import React, { useEffect, useState } from 'react'

export const ContentPage = ({ id }) => {
  const [message, setMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const accessToken = localStorage.getItem("accessToken")

  useEffect(() => {
    setErrorMessage('')
    fetch(`http://localhost:8080/users/${id}`, {
      method: "GET",
      headers: { "Authorization": accessToken }
    })
      .then(res => {
        console.log("Testar inloggning", res.ok)
        if (!res.ok) {
          throw new Error('Access denied')
        }
        return res.json()
      })
      .then(json => setMessage(json.message))
      .catch(err => {
        setErrorMessage(err.message)
      })
  }, [accessToken, id])


  return (
    <div>
      hello
    </div>
  )
}
