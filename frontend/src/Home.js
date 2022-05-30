import React from 'react'
import { Navbar } from 'Navbar'
import styled from 'styled-components';

export const Home = () => {

  const HeadingText = styled.h1`
    text-align: center;
  `;

  return (
    <div>
        <Navbar />
        <HeadingText>Welcome</HeadingText>
    </div>
  )
}
