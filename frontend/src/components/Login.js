import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { API_URL } from '../utils/constants';
import user from '../reducers/user';

import img from '../assets/background1.jpg';

//Styled components
const WholeWrapper = styled.div`
	display: flex;
`;

const BackgroundImg = styled.div`
	background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)),
		url(${img});
	background-repeat: no-repeat, repeat;
	background-position: center;
	background-size: cover;
	height: auto;
	width: 100%;
`;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	text-align: center;
	align-items: center;
	justify-content: center;
	height: 90vh;
	gap: 20px;
`;

const RadioWrapper = styled.div`
	display: flex;
	width: 200px;
	justify-content: space-between;
	align-items: center;
`;

const Username = styled.div`
	display: flex;
	width: 200px;
	align-items: center;
	flex-direction: column;
`;

const Password = styled.div`
	display: flex;
	width: 200px;
	align-items: center;
	flex-direction: column;
`;

const Input = styled.input`
	::placeholder {
		text-align: center;
		letter-spacing: 2px;
	}
	:hover {
		background-color: #a3e4db;
	}
	border-radius: 20px;
	width: 92%;
	height: 30px;
	padding-left: 15px;
`;

const Label = styled.label`
	font-family: 'Poppins', sans-serif;
	font-weight: 600;
`;
const Form = styled.form`
	display: flex;
	flex-direction: column;
	gap: 10px;
	width: 200px;
`;

const Button = styled.button`
	background-color: #9a9483;
	color: white;
	height: 40px;
	margin-top: 20px;
	border-radius: 20px;
	font-family: 'Poppins', sans-serif;
	font-size: 16px;
	font-weight: 700;
	:hover {
		background-color: #1c6dd0;
		color: white;
	}
`;

const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [mode, setMode] = useState('signup'); //default signup

	const accessToken = useSelector((store) => store.user.accessToken);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (accessToken) {
			navigate('/');
		}
	}, [accessToken, navigate]);

	const onFormSubmit = (event) => {
		//prevents a default behaviour
		event.preventDefault();

		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ username, password }),
		};

		// added mode instead of signup
		fetch(API_URL(mode), options)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				if (data.success) {
					//batch increase the performance speed by combining dispatches below
					//updates them all in one go instead of one at a time
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

	//To check the radio buttons
	// console.log('MODE', mode);

	//Connecting label and input via id and htmlFor for accessibility reasons
	return (
		<>
			<WholeWrapper>
				<BackgroundImg></BackgroundImg>
				<Wrapper>
					<RadioWrapper>
						<Label htmlFor="signup">Sign Up</Label>
						<input
							placeholder="Username"
							id="signup"
							type="radio"
							//only checked if the mode is set to signup
							checked={mode === 'signup'}
							onChange={() => setMode('signup')}
						/>

						<Label htmlFor="signin">Sign In</Label>
						<input
							id="signin"
							type="radio"
							checked={mode === 'signin'}
							onChange={() => setMode('signin')}
						/>
					</RadioWrapper>
					<Form onSubmit={onFormSubmit}>
						<Username>
							<Label htmlFor="username">Username</Label>
							<Input
								id="username"
								type="text"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
							/>
						</Username>
						<Password>
							<Label htmlFor="password">Password</Label>
							<Input
								id="password"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</Password>

						<Button type="submit">Submit</Button>
					</Form>
				</Wrapper>
			</WholeWrapper>
		</>
	);
};

export default Login;
