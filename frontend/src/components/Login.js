import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { API_URL } from "../utils/constants";
import user from "../reducers/user";

const Container = styled.main`
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 100vh;
	color: #ffffff;
`;

const LoginBox = styled.div`
	height: 100vh;
	width: 100vw;
	background: rgb(2, 0, 36);
	background: linear-gradient(
		90deg,
		rgba(2, 0, 36, 1) 0%,
		rgba(55, 55, 198, 1) 35%,
		rgba(0, 212, 255, 1) 100%
	);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	@media (min-width: 768px) {
		height: 60vh;
		width: 60vw;
	}
`;

const Wrapper = styled.div`
	border: solid 1px red;
	width: 300px;
`;

const LoginHeadline = styled.h1`
	margin-bottom: 20px;
`;

const LoginForm = styled.form`
	display: flex;
	flex-direction: column;
`;

const TextInput = styled.input`
	padding: 8px;
	font-size: 16px;
	border: none;
	border-radius: 3px;
	margin-bottom: 20px;
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
`;

const SubmitButton = styled.button`
	border: none;
	padding: 8px;
	border-radius: 3px;
	font-size: 16px;
`;

const ErrorH1 = styled.h1`
	color: red;
	font-size: 0.9em;
	font-style: italic;
`;

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [mode, setMode] = useState("signup");

	const accessToken = useSelector((store) => store.user.accessToken);
	const error = useSelector((store) => store.user.error);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (accessToken) {
			navigate("/");
		}
	}, [accessToken, navigate]);

	const onFormSubmit = (event) => {
		event.preventDefault();

		const options = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify({ username, password }),
		};

		fetch(API_URL(mode), options)
			.then((res) => res.json())
			.then((data) => {
				if (data.success) {
					batch(() => {
						dispatch(user.actions.setUserId(data.response.userId));
						dispatch(user.actions.setUsername(data.response.username));
						dispatch(user.actions.setAccessToken(data.response.accessToken));
						dispatch(user.actions.setError(null));
					});
				} else {
					batch(() => {
						dispatch(user.actions.setUserId(null));
						dispatch(user.actions.setUsername(null));
						dispatch(user.actions.setAccessToken(null));
						dispatch(user.actions.setError(data.response));
					});
				}
			});
	};

	return (
		<Container>
			<LoginBox>
				<Wrapper>
					<LoginHeadline>
						{mode === "signin" ? "Welcome back" : "Create account"}
					</LoginHeadline>
					{error && <ErrorH1>{error}</ErrorH1>}
					<LoginForm onSubmit={onFormSubmit}>
						<label htmlFor="username">Username</label>
						<TextInput
							id="username"
							type="text"
							placeholder="Enter your username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
						<label htmlFor="password">Password</label>
						<TextInput
							id="password"
							type="password"
							placeholder="Enter your password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<SubmitButton type="submit">
							{mode === "signup" ? "Sign up" : "Sign in"}
						</SubmitButton>
					</LoginForm>

					{mode === "signup" && (
						<>
							<p>Already have an account?</p>
							<button onClick={() => setMode("signin")}>Sign in</button>
						</>
					)}

					{mode === "signin" && (
						<>
							<p>Don't have an account?</p>
							<button onClick={() => setMode("signup")}>Sign up</button>
						</>
					)}
				</Wrapper>
			</LoginBox>
		</Container>
	);
};

export default Login;
