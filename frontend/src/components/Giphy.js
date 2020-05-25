import React, { useEffect } from 'react'

const giphyURL = `api.giphy.com/v1/gifs/random&${process.env.REACT_APP_API_KEY}`

export const Giphy = () => {

  useEffect(() => {
    fetch(giphyURL, {
      method: 'GET'
    })
      .then(res => res.json())
      .then(json => {
        console.log(json)
      })
  }, [])


  return (
    <div>

    </div>
  )
}