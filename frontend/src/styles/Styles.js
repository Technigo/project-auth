import styled from "styled-components/macro";

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 370px;
  background-color: rgba(255, 255, 255, 0.7);
  box-shadow: 2px 5px 8px 3px #596466;
  border-radius: 5px;
`;

export const Label = styled.label`
  font-size: 16px;
  margin: 10px;
`;

export const Input = styled.input`
  margin: 10px 10px 10px 0;
  background-color: transparent;
  border: 1px solid #b5d6d4;
  padding: 5px;
  width: 100%;
`;

export const H1 = styled.h1`
  font-family: "Roboto Slab", serif;
  color: #e9f9fa;
  text-shadow: 1px 2px #6a9292;
`;

export const H2 = styled.h2`
  font-family: "Roboto Slab", serif;
  color: #e9f9fa;
  text-shadow: 1px 2px #6a9292;
`;

export const H3 = styled.h3`
  font-family: "Roboto Slab", serif;
  color: #e9f9fa;
  text-shadow: 1px 2px #6a9292;
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 20px;
`;

export const InnerWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const MainWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const FormButton = styled.button`
  font-size: 18px;
  margin: 10px;
  background-color: #4fb5b7;
  border: none;
  padding: 4px 6px;
  color: #e9f9fa;
  font-weight: 500;
  width: 200px;
  &:hover {
    opacity: 0.8;
  }
`;
export const FormParagraph = styled.p`
  margin: 0;
  font-size: 16px;
`;

export const HR = styled.hr`
  margin: 20px 0;
  width: 200px;
  opacity: 0.5;
`;

export const SecretParagraph = styled.p`
  color: #000;
`;
