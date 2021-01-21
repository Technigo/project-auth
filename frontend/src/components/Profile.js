import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { user } from '../reducers/user';

export const Profile = () => {
	const dispatch = useDispatch();
	const accessToken = useSelector((store) => store.user.login.accessToken);
	const userId = useSelector((store) => store.user.login.userId);
	const secretMessage = useSelector((store) => store.user.login.secretMessage);
	const statusMessage = useSelector((store) => store.user.login.statusMessage);

	const SECURE_URL = `https://nadlillmar.herokuapp.com/users/${userId}`;

	const loginSuccess = (loginResponse) => {
		dispatch(
			user.actions.setStatusMessage({
				statusMessage: loginResponse.statusMessage,
			})
		);

		dispatch(
			user.actions.setSecretMessage({
				secretMessage: loginResponse.secretMessage,
			})
		);
	};

	const loginFailed = (loginError) => {
		dispatch(user.actions.setStatusMessage({ statusMessage: loginError }));
	};

	const handleLogout = () => {
		dispatch(user.actions.logout);
		dispatch(user.actions.toggleLoggedState(false));
		window.location.reload();
	};

	const showSecret = () => {
		fetch(SECURE_URL, {
			method: 'GET',
			headers: { Authorization: accessToken },
		})
			.then((res) => {
				if (!res.ok) {
					throw new Error('Secret failed');
				}
				return res.json();
			})
			.then((json) => loginSuccess(json))
			.catch((err) => loginFailed(err));
	};

	if (!accessToken) {
		return <></>;
	}

	return (
		<Container>
			<h2>Profile</h2>
			You are logged in!
			<p>userId: {`${userId}`}</p>
			<Button onClick={showSecret}>test secret</Button>
			<p>{secretMessage}</p>
			<Button onClick={handleLogout}>Logout</Button>
		</Container>
	);
};

const Container = styled.form`
	margin: -100px 0 0 0;
	background: rgba(255, 255, 255, 0.3);
	padding: 3em;
	height: 300px;
	width: 250px;
	border-radius: 20px;
	border-left: 1px solid rgba(255, 255, 255, 0.3);
	border-top: 1px solid rgba(255, 255, 255, 0.3);
	backdrop-filter: blur(5px);
	box-shadow: 20px 20px 40px -6px rgba(0, 0, 0, 0.2);
	text-align: left;
	position: relative;
`;
const Button = styled.button`
	display: block;
	margin-top: 10px;
	height: 30px;
	width: 150px;
	border-radius: 50px;
	background: transparent;
	border-top: 1px solid rgba(255, 255, 255, 0.2);
	font-size: 18px;
	font-weight: bold;
	color: grey;
	&:hover {
		background: lightgreen;
		cursor: pointer;
	}
`;
