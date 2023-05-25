import styled from 'styled-components/macro';

export const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 80px 0px;
  gap: 40px;

  label {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 1.1rem;
    color: darkgray;
    font-family: 'Sora', helvetica, sans-serif;
    font-weight: 800;
    margin-bottom: 10px;
    cursor: pointer;
  }

  input[type='radio'] {
    display: none;
  }

  input[type='radio']:checked + span {
    background-color: pink;
  }

  span {
    display: flex;
    width: 24px;
    height: 24px;
    margin-top: 10px;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    border: 4px solid darkgray;
    transition: background-color 0.3s ease-in-out;
  }

  @media (max-width: 490px) {
    flex-direction: column;

    label {
      font-size: 1.4rem;
      font-family: 'Sora', helvetica, sans-serif;
      font-weight: 600;
      margin-bottom: 10px;
    }
  }
`;

export const FormWrapper = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    
    .inputLabel {
        font-size: 1.5rem;
        color: darkgray;
        font-family: 'Sora', helvetica, sans-serif;
        font-weight: 800;
        cursor: pointer;
    }

    .inputField {
        font-size: 1.5rem;
        color: darkgray;
        font-family: 'Sora', helvetica, sans-serif;
        font-weight: 800;
        border: none;
        // border: 5px solid darkgray;
        padding: 10px;
        border-radius: 5px;
        width: 200px;
        text-align: center;
        margin-bottom: 40px;
    }

    .submitButton {
        margin: 40px 0px;
        font-size: 1.2rem;
        color: darkgray;
        font-family: 'Sora', helvetica, sans-serif;
        font-weight: 800;
        padding: 10px 20px;
        border: 4px solid darkgray;
        border-radius: 45px;
        cursor: pointer;
        transition: background-color 0.2s ease-in-out, color 0.3s ease-in-out;

        &:hover {
            background-color: darkgray;
            color: white;
        }
    }

    @media (max-width: 490px) {
        .inputLabel, .inputField, .submitButton {
            font-size: 1.4rem;
        }
    }
`;
