import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

export const Content = () => {
const [ imgsrc, setImgsrc ] = useState('')

useEffect(() => {
  fetch('http://localhost:8080/session', {
    headers: {
      'Authorization': 'ebb90396c81903663c327c0aa62ec76b1fdd8592e04688c87169901f44b017fc389e438207a677fd98014db07ff3755eafba308c717af95fe1bf4ab2af000947415512cf5877686f86cd28c28257923f6dc2df91397d82fede6779ca70221e2fe37b0cf30294304cda85a90c856b46b588a12fdc0e77db2ecb0d44a4ce01cf64',
    }
  })
    .then(response => response.json())
    .then(data => {
      setImgsrc(data[0].url)
    })
    .catch((error) => {
      console.error('Error:', error);
    })
  },[])

  return (
    <>
    {imgsrc ? <img src={imgsrc} alt="cat" /> : <p>Loading image...</p>}
    </>
  )
}