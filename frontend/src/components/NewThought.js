import React, { useState } from 'react';
// The newMessage state is passed in as a prop to the component
// The handleNewThoughtsChange function is called when
// the user interacts with the input field and and onFormSubmit when user submits the form.
export const NewThought = ({ newMessage, handleNewThoughtsChange, onFormSubmit }) => {
  const [remainingChars, setRemainingChars] = useState(160 - newMessage.length);

  const handleInputChange = (event) => {
    const input = event.target.value;
    const remaining = 140 - input.length;
    setRemainingChars(remaining);
    handleNewThoughtsChange(event);
  };

  return (
    <form className="message-container" onSubmit={onFormSubmit}>
      <p className="thought-text">share some shiet</p>
      <textarea
        placeholder="What's up?"
        value={newMessage}
        onChange={handleInputChange} />
      <div className="main">
        <div className="char-count">{remainingChars}  / 140</div>
        <button className="submit-btn" type="submit" disabled={newMessage.length < 1 || newMessage.length > 160}>
          ❤️ Send a Happy Thought ❤️
        </button>
      </div>
    </form>
  );
};