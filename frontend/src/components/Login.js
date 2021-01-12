import React, {useState} from "react"
import {useDispach, useSelector} from "react-redux"
import {user} from "../reducers/user"
import {UserProfile} from "./UserProfile"
const SIGNUP = "https://project-auth-liza-kat.herokuapp.com/users"
const LOGIN = "https://project-auth-liza-kat.herokuapp.com/sessions"

export const Login = () => {
	const dispatch = useDispach()
	const accessToken = useSelector((store) => store.user.login.accessToken)
	const [name, setName] = useState("")
	const [password, setPassword] = useState("")

	const handleLogin = (loginResponse) => {
		dispatch(
			user.actions.setAccessToken({accessToken: loginResponse.accessToken})
		)
	}
	dispatch(user.actions.setUserId({userId: loginResponse.userId}))
	dispatch(user.actions.setStatusMessage({setStatusMessage: 'Success! You are now logged in.'}))

	const handleLoginFailed = (loginError) => {}

	//Sign-up as a user
	const handleSignup = (signupResponse) => {
		signupResponse.preventDefault()

		fetch(SIGNUP, {
			method: "POST",
			body: JSON.stringify({name, password}),
			headers: {"Content-Type": "application/json"}
		})
		.then((res) => res.json())
		.then((json) => handleLogin(json))
		.catch((err) => handleLoginFailed(err))
	}
	//Sign-up a user
	const handleLogin = (signupResponse) => {
		signupResponse.preventDefault()

		fetch(LOGIN, {
			method: "POST",
			body: JSON.stringify({name, password}),
			headers: {"Content-Type": "application/json"}
		})
		.then((res) => res.json())
		.then((json) => handleLogin(json))
		.catch((err) => handleLoginFailed(err))
	}

//Show log in form if user is logged out
if(!accessToken) {
	return(
		<div>
			<UserProfile/>
			<form>
				<h1>Sign up</h1>
				<label>
					Name
					<input
						required
						value={name}
						onChange={(event)=>setName(event.target.value)}
					/>
				</label>
				<label>
					Password
					<input
						required
						value={password}
						onChange={(event)=>setPassword(event.target.value)}
					/>
				</label>
				<button type="submit" onClick={handleSignup}>
						Sign up
				</button>
				<button type="submit" onClick={handleLogin}>
						Login
				</button>
			</form>
		</div>
	)
} else {
	return <UserProfile/>
	}
}
export default Login