import React, { useState } from "react";

import { ErrorMessage } from "./ErrorMessage";

export const SignUp = ({ signUp, signUpStatus }) => {
	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const [repeatPassword, setRepeatPassword] = useState("");

	const checkPasswordMatch = () => {
		if (password === repeatPassword) {
			return true;
		} else return false;
	};

	const handleRegistration = (event) => {
		event.preventDefault();
		const user = {
			userName: userName,
			password: password,
		};
		if (checkPasswordMatch()) {
			signUp(user);
		} else console.log("passwords don't match");
	};

	return (
		<section>
			<form onSubmit={(event) => handleRegistration(event)} className="form">
				<h2>Sign up here</h2>
				<input
					type="email"
					id="userName"
					required
					placeholder="E-mail address"
					onChange={(event) => setUserName(event.target.value)}
					value={userName}
					pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
					disabled={signUpStatus}
				></input>
				<input
					type="password"
					id="passWord"
					required
					placeholder="Password"
					onChange={(event) => setPassword(event.target.value)}
					value={password}
					minLength="5"
					disabled={signUpStatus}
				></input>
				<input
					type="password"
					id="repeatPassword"
					required
					placeholder="Repeat your password"
					onChange={(event) => setRepeatPassword(event.target.value)}
					value={repeatPassword}
					minLength="5"
					disabled={signUpStatus}
				></input>
				<output>
					{signUpStatus === false && (
						<ErrorMessage message={"Sign up failed."} />
					)}
				</output>
				<output className="sign-up-success">
					{signUpStatus === true &&
						"Registration successful. Continue to sign in."}
				</output>
				<button className="button" type="submit" disabled={signUpStatus}>
					Sign Up
				</button>
			</form>
		</section>
	);
};
