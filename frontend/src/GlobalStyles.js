import styled from 'styled-components/macro'

export const StyledDiv = styled.div`
  color: white;
  background: #9534343b;
  border-radius: 30px;
  width: 80%;
  min-height: 160px;
  padding: 20px;
  max-width: 400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1, h2 {
    margin-bottom: 20px;
  }

  @media (min-width: 667px) {
    min-height: 300px;
    max-width: 600px;

  } 
  `

export const StyledButtonGroup = styled.div`
display: flex;

a + a {
    margin-left: 30px;
  }
`
export const StyledButton = styled.button`
  color: white;
  background: none;
  border: 2px solid white;
  padding: 5px 10px;
  border-radius: 10px;

  &:hover {
    color: #b84545;
    background-color: white;
    transition: 0.5s background-color ease-in-out;
    cursor: pointer;
  }
  &:active {
    transform: translateY(3px);
  }
`
