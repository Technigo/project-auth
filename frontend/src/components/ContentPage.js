import React, { useEffect, useState } from 'react'

export const ContentPage = () => {
    const [message, setMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState("")

    // Hämtar accessToken från local storage i webbläsaren,
    // och skickar in den i headers
    const accessToken = window.localStorage.getItem('accessToken')

    useEffect(() => {
      setErrorMessage('')
      fetch("http://localhost:8080/content", {
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
              setErrorMessage(err.message)
          })
    }, [accessToken])

    if (!message) {
      return <div>… L O A D I N G …</div>
    }

    return (
      <>
        <div>
          <h1>Welcome!</h1>
          <h3>You´ve successfully signed in!</h3>
          <h5>{message}</h5>
          <img className="img-checked" src="/assets/checked.png" alt="checked" />
        </div>
          {errorMessage && <div>{errorMessage}</div>}
      </>
    )
}
