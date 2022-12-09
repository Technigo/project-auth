import React from "react";
import styled from "styled-components";

const NewMessage = () => {
  return (
    <NewMessageSection>
      <div>
        <form>
          <textarea
            id="newMessage"
            placeholder="Post new message" 
            type="text"
            value=""
            />
          <button type="submit">Post new message</button>
        </form>
      </div>
    </NewMessageSection>
  )
}

export default NewMessage

const NewMessageSection = styled.section`
  background-color: #FFEEE3;
  padding: 30px;
  border-radius: 20px;
`