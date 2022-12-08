/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable comma-dangle */
import React from "react";
import styled from "styled-components/macro";

export const GreetingsInput = () => {
  return (
    <InputWrapper>
      {/* <InputForm className="form-container" onSubmit="">
        <textarea
          rows="5"
          value=""
          required
          onChange=""
          placeholder="Create some magic here"
        >
          Text here
        </textarea>

        <Button type="submit" className="post-button" value="Post btn">
          🎄 Send Christmas Greeting 🎄
        </Button>
      </InputForm> */}
    </InputWrapper>
  );
};

const InputWrapper = styled.div`
  margin: 0 auto;
  width: 60vw;
`;

const InputForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  width: 300px;
`;
