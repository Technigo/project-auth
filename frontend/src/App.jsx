import { useState, useEffect } from "react";

export const App = () => {
  const [inputName, setInputName] = useState('')
  const [inputEmail, setInputEmail] = useState('')
  const [inputPassword, setInputPassword] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userData, setUserData] = useState(null)
  const [loginError, setLoginError] = useState(null)
  const [registrationError, setRegistrationError] = useState(null)

  useEffect(() => {
    // check if the user is already logged in by looking for the access token in local storage
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      setIsLoggedIn(true)
      // fetch user data using the access token
      fetchUserData(accessToken)
    }
  }, [])

  const postID = async (setRegistrationError) => {
    try {
      // const response = await fetch('https://one8-y5ov.onrender.com/users', {
      const response = await fetch('http://localhost:8080/users', {
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
        // update the registration error state
        setRegistrationError(errorData.message || 'could not create user')
        return
      }

      // handle response
      const data = await response.json()
      console.log(data)

      // store the access token in local storage
      localStorage.setItem('accessToken', data.accessToken)
      setIsLoggedIn(true) // update state bcs the localstorage has accesstoken saved
      fetchUserData(data.accessToken) // fetch user data after successful login
    } catch (error) {
      console.error('error:', error)
      setRegistrationError(error.message)
      // res is not used so no need to use this here
      // res.status(400).json({ message: 'could not create user', errors: error.message })
      // update the registration error state
      setRegistrationError(error.message || 'could not create user')
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
    postID(setRegistrationError)
  }

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: inputName, password: inputPassword}),
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error('Login failed:', errorData)
        setLoginError('Invalid email or password. Please try again.')
        return
      }

      const data = await response.json()

      // store token in localstorage
      localStorage.setItem('accessToken', data.accessToken)
      setIsLoggedIn(true) // update state bcs local has token
      fetchUserData(data.accessToken) // fetch data after login success
    } catch (error) {
      console.error('err during login:', error)
    }
  }

  const fetchUserData = async (accessToken) => {
    try {
      const response = await fetch('http://localhost:8080/user', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })

      const userData = await response.json()
      setUserData(userData) // store fetched userdata in state
      // const { createdAt } = await response.json()
      // setUserData({ createdAt }) // store fetched creatAt in state
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <h1>Welcome, User!</h1>
          {/* <p>to see userData exists or not, i add ternary operator to check</p> */}
          {/* <p>You are joined on {new Date(userData?.createdAt).toLocaleString()}</p> */}
          <p>You are joined on {userData && userData.createdAt ? new Date(userData?.createdAt).toLocaleString() : 'there is no such thing'}</p>
          <button onClick={handleLogout}>try again?</button>
        </div>
      ) : (
        <div>
          <h2>Register</h2>
          <input type="text" placeholder="Name" value={inputName} onChange={handleNameChange} />
          <input type="text" placeholder="Email" value={inputEmail} onChange={handleEmailChange} />
          <input type="password" placeholder="Password" value={inputPassword} onChange={handlePasswordChange} />
          <button onClick={handleButtonClick}>submit</button>
          <p style={{ color: 'red' }}>{loginError}{registrationError}</p>
          <hr />
          <h2>Login</h2>
          <input type="text" placeholder="Name" value={inputName} onChange={handleNameChange} />
          <input type="password" placeholder="Password" value={inputPassword} onChange={handlePasswordChange}/>
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
  )
};


// handle error when post failed - i guess i have so? then where to check it?
// try to get the data at cloud.mongodb.com when you post