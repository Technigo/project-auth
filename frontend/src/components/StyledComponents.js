import styled from "styled-components";

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
`;

export const FlexItem = styled.div`
  background: #646464;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin: 10px;
  padding: 5px;
  border: #969696 solid 2px;
  border-radius: 5px;
  word-break: break-word;
  max-width: 650px;
  padding: 10px;
  font-size: 16px;
`;

export const EmptyTodoDiv = styled.div`
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

export const MainMessage = styled.div`
  word-break: break-word;
  align-items: center;
  break-inside: auto;
  width: 300px;
  margin: 20px;
`;

export const MessageContainer = styled.div`
  background: white;
  border: 1px solid #000;
  padding: 10px;
  justify-content: center;
  width: 100%;
`;

export const MessageDiv = styled.div`
  background: #646464;
  display: flex;
  justify-content: space-between;
  margin: 10px;
  padding: 5px;
  border: #969696 solid 2px;
  border-radius: 10px;
  word-break: break-word;
  font-size: 16px;
`;

export const RadioDiv = styled.div`
  display: flex;
  justify-content: center;
  min-width: 300px;
`;

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
  background-color: blue;
  cursor: pointer;
  margin: 5px;
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
