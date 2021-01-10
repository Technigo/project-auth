import React, { useState } from "react";

export const SignIn = ({ signIn }) => {
	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");

	const handleSignIn = (event) => {
		event.preventDefault();
		console.log("sign in");
		const user = {
			userName: userName,
			password: password,
		};
		signIn(user);
	};
	//flytta onclick till onsubmit på formuläret.
	return (
		<section>
			<form onSubmit={(event) => handleSignIn(event)} className="sign-in-form">
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
					placeholder="Password"
					onChange={(event) => setPassword(event.target.value)}
					value={password}
				></input>
				<button type="submit">Sign in</button>
			</form>
		</section>
	);
};
