import React, { useState } from "react";

import { SignUp } from "./components/SignUp";
import { SignIn } from "./components/SignIn";
import { Secret } from "./components/Secret";
import { signUpUrl, signInUrl, getSecretUrl } from "./paths/api-paths";
import { ToggleButton } from "./components/ToggleButton";

export const App = () => {
	const [mode, setMode] = useState("signUp");
	const [token, setToken] = useState();
	const [signUpOk, setSignUpOk] = useState();
	//Spara token i localstorage
	// const tokenFromStorage = () => Number(window.localStorage.getItem("tokenAuth")) || 0;
	//const [ token2, setToken2 ] = useState(tokenFromStorage);

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
			})
			.catch((error) => console.log(error));
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
				} else throw new Error(res.status);
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
			{!token && mode === "signIn" && <SignIn signIn={signInUser} />}
			{!token && mode === "signUp" && <SignUp signUp={signUpUser} />}
			{!token && <ToggleButton mode={mode} setModeinApp={handleChangeMode} />}
			{token && <Secret token={token} />}
		</main>
	);
};

/*
Kvar att göra
1. Secret - anrop med token. 
2. Logga ut-knapp i secret-komponenten
3. Spara token i localstorage 
4. Felmeddelanden
5. Styling
*/
