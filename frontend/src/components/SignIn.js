import React, { useState } from "react";

import { ErrorMessage } from "./ErrorMessage";

export const SignIn = ({ signIn, signInStatus }) => {
	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");

	const handleSignIn = (event) => {
		event.preventDefault();
		const user = {
			userName: userName,
			password: password,
		};
		signIn(user);
	};

	return (
		<section>
			<form onSubmit={(event) => handleSignIn(event)} className="form">
				<h2>Sign in here</h2>
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
				<button className="button" type="submit">
					Sign in
				</button>
				<output>
					{signInStatus === false && (
						<ErrorMessage message={"Sign in failed."} />
					)}
				</output>
			</form>
		</section>
	);
};
