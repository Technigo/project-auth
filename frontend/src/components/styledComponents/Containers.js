import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(339deg, #D35B00, #51B500, #f57370);
  min-height: 100vh;
  width: 100%;
`;

export const ContentContainer = styled.div`
  display: flex;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 15px;
  border-radius: 10px;
`;

export const LoginRegister = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
  min-width: 20rem;
  min-height: 30rem;
  background-color: ${(props) => (props.primary ? '#e8e7e7' : 'none')};
  border-radius: ${(props) => (props.primary ? '10px' : '10p')};

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  input,
  textarea {
    background-color: #e8e7e7;
    padding: 1rem;
    width: 15rem;
    margin-bottom: 2rem;
    border-width: 2px;
    border-image: linear-gradient(to right, #D35B00, #51B500) 1;
  }

  h1 {
    color: ${(props) => (props.primary ? '#51B500' : '#edb2b7')};
  }

  h2 {
    color: ${(props) => (props.primary ? '#D35B00' : '#edb2b7')};
    font-size: 1rem;
  }

  button {
    padding: 1rem;
    border: none;
    border-radius: 16px;
    min-width: 15rem;
    background-image: linear-gradient(322deg, #51B500, #00964B);
    color: white;
    margin-bottom: 1.5rem;
  }
`;