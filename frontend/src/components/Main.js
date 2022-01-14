import React, { useEffect } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { API_URL } from '../utils/constants';
import secrets from '../reducers/secrets';
import styled from 'styled-components';
import user from '../reducers/user';

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

const SecretMessges = styled.div`
	justify-content: space-between;
	font-family: 'Poppins', sans-serif;
`;

const ButtonWrapper = styled.ul`
	text-decoration: none;
`;

const Button = styled.button`
	background-color: #9a9483;

	justify-content: center;
	text-align: center;
	color: white;
	height: 40px;
	border-radius: 20px;
	font-family: 'Poppins', sans-serif;
	font-size: 16px;
	font-weight: 700;
	:a:link {
		color: white;
	}
	:hover {
		background-color: #191919;
		color: white;
	}
`;
const linkStyle = {
	textDecoration: 'none',
	color: 'white',
};

const Main = () => {
	const secretsItems = useSelector((store) => store.secrets.items);
	const accessToken = useSelector((store) => store.user.accessToken);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const signOut = () => {
		batch(() => {
			dispatch(user.actions.setUserId(null));
			dispatch(user.actions.setUsername(null));
			dispatch(user.actions.setAccessToken(null));
		});
	};

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
			<Title>Super Secret information:</Title>
			{secretsItems.map((item) => (
				<SecretMessges key={item._id}>{item.message} </SecretMessges>
			))}
			<ButtonWrapper>
				<Button>
					<Link to="/" style={linkStyle} onClick={signOut}>
						Log out
					</Link>
				</Button>
			</ButtonWrapper>
		</MainWrapper>
	);
};
export default Main;
