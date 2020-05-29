import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { H1, P } from 'components/TextStyles'


const nasaApi = 'https://api.nasa.gov/planetary/apod?api_key=08iR4WWfCjNzN30nufKyaR5LGHFjgXgynks7MDcF'


export const NasaDaily = () => {
  const [nasa, setNasa] = useState([])

  useEffect(() => {
    fetch(nasaApi)
      .then(res => res.json())
      .then(json => setNasa(json))
  }, [])

  return (
    <div>
      <H1>{nasa.title}</H1>
      <Image src={nasa.url} />
      <P>{nasa.explanation}</P>
    </div>
  )
}

const Image = styled.img`
  width: 100%;
  height: auto;
  z-index: 5;
  `
