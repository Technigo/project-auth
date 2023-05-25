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
    color: #777;
    font-family: 'Sora', helvetica, sans-serif;
    font-weight: 800;
    margin-bottom: 10px;
    cursor: pointer;
  }

  input[type='radio'] {
    display: none;
  }

  input[type='radio']:checked + span {
    background-color: #8cffb6;
  }

  span {
    display: flex;
    width: 24px;
    height: 24px;
    margin-top: 10px;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    border: 4px solid #777;
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
        color: #777;
        font-family: 'Sora', helvetica, sans-serif;
        font-weight: 800;
        cursor: pointer;
    }

    .inputField {
    font-size: 1.5rem;
    color: #777;
    font-family: 'Sora', helvetica, sans-serif;
    font-weight: 800;
    border: none;
    padding: 10px;
    border-radius: 5px;
    width: 200px;
    text-align: center;

    &:focus {
        outline: 2px solid #8cffb6; // this line changes the outline color to pink when the input field is focused
    }
}

    .submitButton {
        margin: 40px 0px;
        font-size: 1.2rem;
        color: #777;
        font-family: 'Sora', helvetica, sans-serif;
        font-weight: 800;
        padding: 10px 20px;
        border: 4px solid #777;
        border-radius: 45px;
        cursor: pointer;
        transition: background-color 0.2s ease-in-out, color 0.3s ease-in-out;

        &:hover {
            background-color: #777;
            color: white;
        }
    }

    @media (max-width: 490px) {
        .inputLabel, .inputField, .submitButton {
            font-size: 1.4rem;
        }
    }
`;
