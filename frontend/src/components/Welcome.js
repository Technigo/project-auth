import React, { useState, useEffect } from 'react';
import { Button } from '../shared/shared';

export const Welcome = ({ currentUser, setCurrentUser, setLoggedIn }) => {
	const username = 'bob';
	const [ user, setUser ] = useState('');
	console.log(currentUser);
	useEffect(
		() => {
			const fetchData = async () => {
				let response = await fetch(`http://localhost:8080/users/${currentUser._id}`, {
					method: 'GET',
					headers: {
						Authorization: currentUser.accessToken,
						'Content-Type': 'application/json;charset=utf-8'
					}
				});

				let result = await response.json();
				console.log('authorization result', result);

				if (result.name) {
					setUser(result.name);
				} else {
					setLoggedIn(false);
				}
			};
			fetchData();

			return () => {
				setCurrentUser({});
			};
		},
		[ currentUser ]
	);

	return (
		<div>
			<h1>HELLO {user.toUpperCase()} 👋🏼</h1>
			<Button onClick={() => setLoggedIn(false)}>SIGN OUT</Button>
		</div>
	);
};
