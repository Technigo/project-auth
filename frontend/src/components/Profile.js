import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { user } from '../reducers/user';

export const Profile = () => {
	const dispatch = useDispatch();
	const accessToken = useSelector((store) => store.user.login.accessToken);
	const userId = useSelector((store) => store.user.login.userId);
	const statusMessage = useSelector((store) => store.user.login.statusMessage);
	const secretMessage = useSelector((store) => store.user.login.secretMessage);

	const SECURE_URL = `https://nadlillmar.herokuapp.com/users/${userId}`;

	const loginSuccess = (loginResponse) => {
		console.log(`Inne i loginSuccess`)
		const secretMessage = JSON.stringify(loginResponse);
		dispatch(
			user.actions.setSecretMessage({secretMessage})
		);
	};

	const loginFailed = (loginError) => {
		dispatch(user.actions.setStatusMessage({ statusMessage: loginError }));
	};

	const handleLogout = () => {
		dispatch(user.actions.logout);
	};

	const showSecret = () => {
		const myToken = accessToken;
		fetch(`${SECURE_URL}`, {
			method: 'GET',
			headers: { Authorization: accessToken },
		})
			.then((res) => {
				if (!res.ok) {
					throw 'Secret failed';
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
			<h2>Secretmessage: {`${secretMessage}`}</h2>
			<Button onClick={showSecret}>test secret</Button>
			You are logged in! <Button onClick={handleLogout}>Logout</Button>
		</div>
	);
};

const Button = styled.button`
	margin: 5px;
`;
