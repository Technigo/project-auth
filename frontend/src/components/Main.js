import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { API_URL } from '../utils/constants';
import profile from '../reducers/profile';
import LogoutButton from './LogoutButton';
import styled from "styled-components";

// styled components

const Text = styled.p`
  text-align: center;
`;

const Heading = styled.h1`
	text-align: center;
  font-size: 22px;
  font-family: 'PT Sans', sans-serif;
  padding-top: 20px;
`;

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
    <>
    	<Heading>Welcome to your personal profile page:</Heading>
      <Text>Here is the profile page, only for users</Text>
			{/* {profileMessage} */}
      <LogoutButton/>
    </>
	
	);
};

export default Main;
