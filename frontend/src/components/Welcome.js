import React from "react";


export const Welcome = () => {
  const accessToken = localStorage.getItem('accessToken');

  fetch ('https://project-auth-ca23vvjbjq-lz.a.run.app/welcome'), {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': accessToken
  }
}
  .then((response) => response.json())
  .then((data) => {
    console.log('Success:', data)
  })
  .catch((error) => {
    console.error('Error:', error);
  });

  return(
    <h2>{data.response}</h2>
  )
}
