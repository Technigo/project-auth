import { useState } from "react";

export const App = () => {
  const [inputName, setInputName] = useState('')
  const [inputEmail, setInputEmail] = useState('')
  const [inputPassword, setInputPassword] = useState('')

  const postID = async () => {
    try {
      const response = await fetch('https://one8-y5ov.onrender.com/users', {
        method: 'POST',
        // mode: 'no-cors',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({ name: inputName, email: inputEmail, password: inputPassword })
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

  const handleNameChange = (event) => {
    setInputName(event.target.value)
  }

  const handleEmailChange = (event) => {
    setInputEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setInputPassword(event.target.value)
  }

  const handleButtonClick = () => {
    // trigger the POST request when the button is clicked
    postID()
  }
  return (
    <div>
      <input type="text" placeholder="Name" value={inputName} onChange={handleNameChange} />
      <input type="text" placeholder="Email" value={inputEmail} onChange={handleEmailChange} />
      <input type="password" placeholder="Password" value={inputPassword} onChange={handlePasswordChange} />
      <button onClick={handleButtonClick}>submit</button>
    </div>
  )
};


// handle error when post failed - i guess i have so? then where to check it?
// try to get the data at cloud.mongodb.com when you post