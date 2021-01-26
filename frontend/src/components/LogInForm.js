import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { user, login } from '../reducers/user'
import { Profile } from '../pages/Profile'

const SIGNUP_URL = 'https://auth-api-technigo.herokuapp.com/users'

export const LogInForm = () => {
	const dispatch = useDispatch()
	const accessToken = useSelector((store) => store.user.login.accessToken)
	const [name, setName] = useState('')
	const [password, setPassword] = useState('')
	const err = useSelector((store) => store.user.login.errorMessage)
    
    //RELATED TO SIGNING UP
  const handleSignUp = (event) => {
    event.preventDefault()
    
		fetch(SIGNUP_URL, {
			method: 'POST',
			body: JSON.stringify({name, password}),
			headers: {'Content-Type': 'application/json'},
		})
		.then((res) => {
			if (!res.ok) {
				throw new Error('Could not create account.  Try a different username/password.')
			}
			return res.json()
			})

		.then((json) => {
    // Save the login info
			dispatch(user.actions.setAccessToken({accessToken: json.accessToken}))
			dispatch(user.actions.setUserId({ userId: json.userId }))
		})
		.catch((err) => {
			dispatch(user.actions.setErrorMessage({ errorMessage: err.toString() }))
		})
	}
    //SIGNING IN - THUNK IS IN THE REDUCER
	const handleLogin = (event) => {
		event.preventDefault()
		dispatch(login(name, password))
	}
 
	if(accessToken) {
		return (
			<Profile />
	)}

	return (
		<form className="login-signup">
			<h1>Login/Sign up</h1>
			<div className="text-fields">
				<label>Name
					<input 
						required
						value={name}
						onChange={event => setName(event.target.value)}
						placeholder="Name"
					/>
				</label>
				<label>Password
					<input 
						required
						value={password}
						type="password"
						placeholder="Password"
						onChange={event => setPassword(event.target.value)}
						minLength="5"
					/>
				</label> 
			</div>
			<div className="buttons">
				<button type="submit" onClick={handleLogin}>LOGIN</button>
				<button type="submit" onClick={handleSignUp}>SIGN UP</button>
			</div>
				{err && <div className="error">{`${err}`}</div>}             
		</form>
	)
}