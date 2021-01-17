import styled from "styled-components";

export const MainContainer = styled.section`
  background-color: #85cdca;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const Headline = styled.h1`
  font-family: "Montserrat", sans-serif;
  font-size: 50px;
  font-weight: 400;
  color: #fff;
  margin: 15px;
`;

export const SubHeadline = styled.h2`
  font-family: "Montserrat", sans-serif;
  font-size: 25px;
  color: #fff;
`;

export const FormContainer = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const Button = styled.button`
  width: 220px;
  height: 50px;
  border-radius: 30px;
  border: 0;
  margin: 10px;
  font-family: "Montserrat", sans-serif;
  background-color: #e27d60;
  color: white;
  font-size: 20px;
`;

export const Label = styled.label`
  margin: 10px;
`;

export const Paragraph = styled.p`
  font-family: "Montserrat", sans-serif;
  text-align: center;
  margin: 5px;
  color: #fff;
  font-size: 20px;
`;

export const InputField = styled.input`
  width: 220px;
  height: 50px;
  border-radius: 30px;
  border: 2px solid #e27d60;
  text-align: left;
  font-family: "Montserrat", sans-serif;
  padding-left: 10px;
  box-sizing: border-box;
  margin: 0px;
  background-color: #85cdca;
  color: #fff;
  font-size: 17px;

  ::placeholder {
    color: #5b8f8c;
  }
`;
