import styled from 'styled-components/macro'

export const MainContainer  = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`

export const SubContainer = styled.div`
  width: 80%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  border-radius: 20px;
  align-items: center;
  margin: 60px auto;
  padding: 10px;
  background-color: rgba(244,244,244,0.5); 
   @media (min-width: 768px) {
    max-width: 650px;
    margin: 100px auto;
}
`

export const Header = styled.h1`
  margin-top: 40px;
  font-size: 24px;
  text-align: center;
    @media (min-width: 768px) {
      font-size: 30px;
    }
`

export const Text = styled.p`
  font-size: 12px;
  font-family: 'Roboto', sans-serif;
  text-align: center;
`

export const Anchor = styled.a`
  text-decoration: none;
  color: black;
`

export const Button = styled.button`
    border-radius: 10px;
    font-size: 16px;
    font-weight: 200;
    width: fit-content;
    padding: 10px 15px;
    margin: 10px 0;
    border: 1px solid white;
    background-color: rgba(254,91,138,0.5);
    &:hover {
        background-color: rgb(254,91,138);
    }
    cursor: pointer;
      @media (min-width: 768px) {
        font-size: 20px;
      }
`