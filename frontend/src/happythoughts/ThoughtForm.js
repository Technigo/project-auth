import React from 'react';

const ThoughtForm = ({ handleFormSubmit, onNewThoughtChange, newThought }) => {
  return (
  <section className="form-section">
    <form onSubmit={handleFormSubmit}>
      
      <label htmlFor="newThought">
      <p>What's making you happy now?</p></label>
      <textarea
        type="text"
       value={newThought} 
       onChange={onNewThoughtChange} >
      </textarea>
      <div className="counter-characters">
         <p>{newThought.length}/140</p>
      </div>

    <div className="submit-button">
     

      <button
      className="submit-btn" type="submit" 
      disabled={newThought.length < 5 || newThought.length > 140} >
      <span className="heart-emoji" role="image" aria-label="heart"/>
      <p>❤️ Send happiness ❤️</p>
      </button>
      </div>
    
    </form>
    </section>
  );
}
export default ThoughtForm;