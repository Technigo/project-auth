import { useState } from "react";

export const App = () => {
  const [inputID, setInputID] = useState('')

  const postID = async () => {
    try {
      const response = await fetch('https://one8-y5ov.onrender.com/users', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({ data: inputID })
      }) 
      
      // handle error response till.ex. cors error
      // it is currently not working, then what is this for?
      if (!response.ok) {
        const errorData = await response.json()
        console.error('Error response:', errorData)
        return
      }

      // handle response
      const data = await response.json()
      console.log(data)
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


// handle error when post failed - i guess i have so? then where to check it?
// try to get the data at cloud.mongodb.com when you post