import React from 'react'
import styled from 'styled-components/macro'

export const Form = styled.form`
  width: 60%;
  margin: 1em auto;
  --background: white;
  --border: rgba(0, 0, 0, 0.125);
  --borderDark: rgba(0, 0, 0, 0.25);
  --borderDarker: rgba(0, 0, 0, 0.5);
  --bgColorH: 0;
  --bgColorS: 0%;
  --bgColorL: 98%;
  --fgColorH: 210;
  --fgColorS: 50%;
  --fgColorL: 38%;
  --shadeDark: 0.3;
  --shadeLight: 0.7;
  --shadeNormal: 0.5;
  --borderRadius: 0.125rem;
  --highlight: #306090;
  background: white;
  box-shadow: 0 1rem 1rem -0.75rem var(--border);
  display: flex;
  flex-direction: column;
  border-radius: 6px 6px;
`
export const InfoDiv = styled.div`
  margin: 2em auto;
  display: flex;
  flex-direction: column;
  width: 40%;
`
export const Input = styled.input`
  height: 2.5em;
  margin-top: 1em;
  border: 1px solid #ccc;
  background-color: #fff;
`;