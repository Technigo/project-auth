import React from 'react';
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
		const secretMessage = JSON.stringify(loginResponse);
		dispatch(
			user.actions.setStatusMessage({
				statusMessage: loginResponse.secretMessage,
			})
		);
	};

	const loginFailed = (loginError) => {
		dispatch(user.actions.setStatusMessage({ statusMessage: loginError }));
	};

	const handleLogout = () => {
		dispatch(user.actions.logout);
		dispatch(user.actions.toggleLoggedState(false));
	};

	const showSecret = () => {
		fetch(`${SECURE_URL}`, {
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
		<div>
			<h2>userId: {`${userId}`}</h2>
			<Button onClick={showSecret}>test secret</Button>
			You are logged in!
			<Button onClick={handleLogout}>Logout</Button>
			<p>{secretMessage}</p>
		</div>
	);
};

const Button = styled.button`
	margin: 30px 0;
	height: 30px;
	width: 90px;
	border-radius: 5px;
	background: ${(props) => props.background || 'transparent;'};
	border-top-color: transparent;
	font-size: 18px;
	font-weight: bold;
	color: ${(props) => props.color || 'grey'};
	&:hover {
		background: ${(props) => props.hover || 'lightgreen'};
		cursor: pointer;
	}
`;
