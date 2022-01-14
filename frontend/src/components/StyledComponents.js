import styled from "styled-components";

// Wrappers
export const MainSection = styled.section`
  margin: 20vh auto;
  max-width: 650px;

  padding: 10px;
`;
export const FormDiv = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 10px;
`;
export const FlexItem = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin: 10px;
  padding: 5px;
  border-radius: 5px;
  word-break: break-word;
  max-width: 650px;
  padding: 10px;
  font-size: 16px;
`;
export const Logo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #646464;
  margin: 10px auto;

  border-radius: 10px;
  font-size: 16px;

  .empty-image {
    width: 20%;
  }
`;
export const MessageDiv = styled.div`
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px;
  padding: 5px;
  border: 1px solid black;
  border-radius: 4px;
  word-break: break-word;
  font-size: 16px;
  width: 70%;
  break-inside: auto;
`;
export const MessageBox = styled.div`
  margin: 10px;
  padding: 5px;
  word-break: break-word;
  font-size: 16px;
  width: 70%;
  break-inside: auto;
`;

// Inputs
export const Field = styled.fieldset`
  border: 1px solid;
  margin: 10px 0;
  min-width: 300px;
  border-radius: 5px;
  background-color: lightgrey;
`;
export const LegendStyle = styled.legend`
  border-radius: 2%;
  min-width: auto;
`;
export const TextField = styled.input`
  width: 100%;
  border: none;
  padding: 0.5em 1em;
  font-size: 16px;
  border-radius: 5px;
  outline: none;
`;
// Buttons
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
  cursor: pointer;
  min-width: 300px;

  &::before {
    content: "";
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
`;
export const LogoutButton = styled.button`
  border: none;
  background-color: #000;
  color: #fff;
  cursor: pointer;
  margin: 5px;
  height: 20px;

  &:hover {
    background-color: #bbb;
    color: #000;
  }
`;
export const ChangeModeBtn = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  margin: 5px;

  &:hover {
    text-decoration: underline;
  }
`;
