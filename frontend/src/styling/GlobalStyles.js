import styled from 'styled-components/macro';


// Global styles
export const MainContainer = styled.div`
  margin: 30px;
  padding: 20px;
  border-radius: 8px;
  background: #00544F;
  height: 400px;
  width: 290px;
`;

export const StyledButton = styled.button`
  background: #00544F;
  border: none;
  font-size: 12px;
  padding: 0;
  text-decoration: underline;
  font-family:  -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
`;

export const FormButton = styled.button`
  border-radius: 20px;
  border: none;
  padding: 8px;
  align-self: center;
  cursor: pointer;
  margin-top: 20px;
  width: 130px;
  font-weight: bold;
  background: #fff;
  color: #00544F;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
`;

export const Heading = styled.h2`
  padding: 8px;
  align-items: center;
  color: #fff;
  font-size: 20px;
`;

export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const InputField = styled.input`
  background: #00544F;
  border: none;
  border-bottom: 1px solid #749694;
  margin: 8px;
  padding: 10px 6px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  /* Styling of placeholder text */
  ::-webkit-input-placeholder {
    color: #749694;
  }
  ::-moz-placeholder { /* Firefox 19+ */
    color: #749694;
  }
  :-ms-input-placeholder { /* IE 10+ */
    color: #749694;
  }
  :-moz-placeholder { /* Firefox 18- */
    color: #749694;
  }
`;