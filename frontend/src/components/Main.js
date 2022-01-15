import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { API_URL } from '../utils/constants';
import profile from '../reducers/profile';
import LogoutButton from './LogoutButton';

const Main = () => {
	const profileMessage = useSelector((store) => store.profile.message);
	const accessToken = useSelector((store) => store.user.accessToken);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (!accessToken) {
			navigate('/signin');
		}
	}, [accessToken, navigate]);

	useEffect(() => {
		const options = {
			method: 'GET',
			headers: {
				Authorization: accessToken,
			},
		};

		fetch(API_URL('profile'), options)
			.then((res) => res.text())
			.then((data) => {
				dispatch(profile.actions.setMessage(data));
				dispatch(profile.actions.setError(null));
			});
	}, [accessToken, dispatch]);


	return (
		<div>
			<h1>Welcome to your personal profile page:</h1>
			{profileMessage}
      <LogoutButton/>
		</div>
	);
};

export default Main;
