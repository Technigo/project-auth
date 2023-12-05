import { useState } from "react";

export const App = () => {
  const [inputID, setInputID] = useState('')

  const postID = async () => {
    try {
      const response = await fetch('https://one8-y5ov.onrender.com/users', {
        method: 'POST',
        // do i need headers? what for?
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({ data: inputID })
      }) 
    } catch (error) {
      console.error('error:', error)
    }
  }

  const handleInputChange = (event) => {
    setInputID(event.target.value)
  }

  const handleButtonClick = () => {
    // trigger the POST request when the button is clicked
    postID()
  }
  return <div><input type="text" value={inputID} onChange={handleInputChange} /><button onClick={handleButtonClick}>submit</button></div>;
};
