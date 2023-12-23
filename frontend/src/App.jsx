import { useState, useEffect } from "react";

export const App = () => {
  const [inputName, setInputName] = useState('')
  const [inputEmail, setInputEmail] = useState('')
  const [inputPassword, setInputPassword] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // check if the user is already logged in by looking for the access token in local storage
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      setIsLoggedIn(true)
    }
  }, [])

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

      // store the access token in local storage
      localStorage.setItem('accessToken', data.accessToken)
      setIsLoggedIn(true) // update state bcs the localstorage has accesstoken saved
    } catch (error) {
      console.error('error:', error)
    }
  }

  const handleLogout = () => {
    // clear the access token from local storage
    localStorage.removeItem('accessToken')
    setIsLoggedIn(false) // update state saying the user is logged out
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
      {isLoggedIn ? (
        <div>
          <h1>Welcone, User!</h1>
          <button onClick={handleLogout}>try again?</button>
        </div>
      ) : (
        <div>
          <input type="text" placeholder="Name" value={inputName} onChange={handleNameChange} />
          <input type="text" placeholder="Email" value={inputEmail} onChange={handleEmailChange} />
          <input type="password" placeholder="Password" value={inputPassword} onChange={handlePasswordChange} />
          <button onClick={handleButtonClick}>submit</button>
        </div>
      )}
    </div>
  )
};


// handle error when post failed - i guess i have so? then where to check it?
// try to get the data at cloud.mongodb.com when you post