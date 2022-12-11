;import styled from "styled-components";

export const Button = styled.button`
  padding: 10px;
  background-color: blue;
  color: white;
  border-radius: 10px;
  border: none;
  margin: 10px;
  font-family: 'Josefin Sans', sans-serif;

  &:hover {
    background-color: lightblue;
  }
  `

  export const LikeBtn = styled.button`
    border-radius: 50%;
    padding: 14px;
    border: none;
    font-size: 17px;
    background-color: #ffaead;
  `

export const ButtonDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`