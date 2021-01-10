import React, { useState } from "react";

export const SignUp = ({ signUp }) => {
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
			<form
				onSubmit={(event) => handleRegistration(event)}
				className="sign-up-form"
			>
				<input
					type="email"
					id="userName"
					required
					placeholder="E-mail address"
					onChange={(event) => setUserName(event.target.value)}
					value={userName}
					pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
				></input>
				<input
					type="password"
					id="passWord"
					required
					placeholder="password"
					onChange={(event) => setPassword(event.target.value)}
					value={password}
					minLength="5"
				></input>
				<input
					type="password"
					id="repeatPassword"
					required
					placeholder="Repeat your password"
					onChange={(event) => setRepeatPassword(event.target.value)}
					value={repeatPassword}
					minLength="5"
				></input>
				<button type="submit">Sign Up</button>
			</form>
		</section>
	);
};
