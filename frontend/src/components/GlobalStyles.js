import styled from "styled-components";

export const OuterWrapper = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  background-color: #ddeef0;
  font-family: 'Roboto', sans-serif;
`


export const InnerWrapper = styled.section`
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 15vh;
  box-shadow: 0px 0px 7px 0px #888888;
  padding: 40px 20px;
  background-color: #FEF5ED;
  min-height: 35vh;

  @media (min-width: 668px) {
    width: 60%;
  }
  @media (min-width: 1025px){ 
    padding: 40px;
    width: 50%;
  }
`

export const FormSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`