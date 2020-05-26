import React, { useState, useEffect } from 'react'

import styled from "styled-components/macro"

const giphyURL = `https://api.giphy.com/v1/gifs/random?api_key=${process.env.REACT_APP_API_KEY}&tag=fairytale&rating=G`

export const Giphy = () => {
  const [gif, setGif] = useState([])

  useEffect(() => {
    fetch(giphyURL, {
      method: 'GET'
    })
      .then(res => res.json())
      .then(json => {
        console.log('GIF', json.data)
        setGif(json.data)
      })
  }, [])


  return (
    <div>
        <GIF src={gif.image_url} alt={gif.title} />
    </div>
  )
}

const GIF = styled.img`
  width: 400px;
  height: 400px;
`