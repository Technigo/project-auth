import React, { useState } from "react";

import { SignUp } from "./components/SignUp";
import { SignIn } from "./components/SignIn";
import { Secret } from "./components/Secret";
import { signUpUrl, signInUrl } from "./paths/api-paths";
import { ToggleButton } from "./components/ToggleButton";
import { SignOutButton } from "./components/SignOutButton";
import { ErrorMessage } from "./components/ErrorMessage";

export const App = () => {
	const [mode, setMode] = useState("signIn");
	const tokenFromStorage = () => window.localStorage.getItem("tokenAuth") || "";
	const [token, setToken] = useState(tokenFromStorage);
	const [userId, setUserId] = useState();
	const [signUpOk, setSignUpOk] = useState();
	const [signInOk, setSignInOk] = useState();

	const handleChangeMode = (modeFromButton) => {
		console.log("Changing mode in App");
		setMode(modeFromButton);
	};

	const signInUser = (user) => {
		console.log("Sign in in app", user.userName, user.password);
		//call fetch function
		const myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
		const userInfo = JSON.stringify({
			username: user.userName,
			password: user.password,
		});
		const requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: userInfo,
		};

		fetch(signInUrl, requestOptions)
			.then((res) => {
				console.log(res.status);
				if (res.status === 200) {
					return res.json();
				} else throw new Error(res.status);
			})
			.then((data) => {
				console.log(data);
				setToken(data.accessToken);
				window.localStorage.setItem("tokenAuth", data.accessToken);
				setUserId(data.userId);
			})
			.catch((error) => {
				console.log(error);
				setSignInOk(false);
			});
	};

	const signUpUser = (user) => {
		console.log("Sign up in app", user.userName, user.password);
		//call fetch function
		const myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
		const userInfo = JSON.stringify({
			username: user.userName,
			password: user.password,
		});
		const requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: userInfo,
		};

		fetch(signUpUrl, requestOptions)
			.then((res) => {
				console.log(res.status);
				if (res.status === 201) {
					return res.json();
				} else throw new Error(res);
			})
			.then((data) => {
				console.log(data);
				setSignUpOk(true);
			})
			.catch((error) => {
				setSignUpOk(false);
				console.log(error);
			});
	};

	return (
		<main>
			{!token && mode === "signIn" && (
				<SignIn signInStatus={signInOk} signIn={signInUser} />
			)}
			{!token && mode === "signUp" && (
				<SignUp signUpStatus={signUpOk} signUp={signUpUser} />
			)}
			{!token && <ToggleButton mode={mode} setModeinApp={handleChangeMode} />}

			{token && <SignOutButton signOut={setToken} />}
			{token && <Secret token={token} />}
		</main>
	);
};

/*
Kvar att göra
1. Secret - anrop med token. Spara token i localstorage -> klart
2. Logga ut-knapp i secret-komponenten -> klart
4. Felmeddelanden -> klart
5. Styling-> klart

6. städa koden
7. deploya backend, databas och siten på netlify
*/
