import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { API_URL } from '../utils/constants';
import secrets from '../reducers/secrets';
import styled from 'styled-components';

//Styled components
const MainWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	height: 90vh;
`;
const Title = styled.h1`
	font-family: 'Poppins', sans-serif;
`;

const SecretMessages = styled.div`
	justify-content: space-between;
	font-family: 'Poppins', sans-serif;
`;

const Main = () => {
	const secretsItems = useSelector((store) => store.secrets.items);
	const accessToken = useSelector((store) => store.user.accessToken);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		if (!accessToken) {
			navigate('/login');
		}
	}, [accessToken, navigate]);

	useEffect(() => {
		const options = {
			method: 'GET',
			headers: {
				Authorization: accessToken,
			},
		};

		//don't need to add '/' before secrets, already added in endpoint
		fetch(API_URL('secrets'), options)
			.then((res) => res.json())
			.then((data) => {
				if (data.success) {
					dispatch(secrets.actions.setItems(data.response));
					dispatch(secrets.actions.setError(null));
				} else {
					dispatch(secrets.actions.setItems([]));
					dispatch(secrets.actions.setError(data.response));
				}
			});
	}, [accessToken, dispatch]);

	return (
		<MainWrapper>
			<div>
				<Link to="/login"> To '/login' ! </Link>
			</div>
			<Title>Super Secret information:</Title>
			{secretsItems.map((item) => (
				<SecretMessages key={item._id}>{item.message} </SecretMessages>
			))}
			{/*<link onClick={() => {
            	dispatch(accessToken.actions.logOut())
            	localStorage.removeItem('user')
            }}>Log out</link>*/}
		</MainWrapper>
	);
};

export default Main;
