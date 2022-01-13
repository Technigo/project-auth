import styled from "styled-components/macro";

export const MainSection = styled.section`
  margin: 20vh auto;
  max-width: 650px;
  border: red solid 1px;
  padding: 10px;
`;

export const FormDiv = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Field = styled.fieldset`
  border: 1px solid;
  margin: 10px;
  min-width: 300px;
  border-radius: 1%;
`;

export const LegendStyle = styled.legend`
  border-radius: 2%;
  min-width: auto;
`;

export const TextField = styled.input`
  width: 100%;
`;

export const LoginButton = styled.button`
  padding: 10px 1.5em;
  border: 2px solid #ffcc67;
  border-radius: 20px;
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
  color: #ffcc67;
  min-width: 300px;

  &::before {
    content: "";
    width: 0;
    height: 300%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(45deg);
    background: #ffcc67;
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
`;
