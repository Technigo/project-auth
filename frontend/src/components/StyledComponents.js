import styled from 'styled-components'

export const MainSection = styled.section`
  margin: 20vh auto;
  max-width: 650px;
  border: red solid 1px;
  padding: 10px;
`

export const FormDiv = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: lightpink;
`

export const RadioDiv = styled.div`
  display: flex;
  justify-content: center;
  min-width: 300px;
`

export const Field = styled.fieldset`
  border: 1px solid;
  margin: 10px 0;
  min-width: 300px;
  border-radius: 5px;
  background-color: lightgrey;
`

export const LegendStyle = styled.legend`
  border-radius: 2%;
  min-width: auto;
`

export const TextField = styled.input`
  width: 100%;
  padding: 10px 0;
`

export const LoginButton = styled.button`
  padding: 10px 1.5em;
  border: 1px solid black;
  border-radius: 5px;
  position: relative;
  overflow: hidden;
  background-color: transparent;
  text-align: center;
  text-transform: uppercase;
  font-size: 16px;
  color: #ddd;
  transition: 0.3s;
  z-index: 1;
  font-family: inherit;
  color: black;
  min-width: 325px;

  &::before {
    content: '';
    width: 0;
    height: 300%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(45deg);
    background: grey;
    transition: 0.5s ease;
    display: block;
    z-index: -1;
  }

  &:hover::before {
    width: 105%;
  }

  &:hover {
    color: #111;
  }
`
