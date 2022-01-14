import React, { useEffect } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { API_URL } from '../utils/constants'
import secrets from '../reducers/secrets'
import user from '../reducers/user'

import { 
	PageWrapper,
	SecretWrapper,
	Header,
	H1,
	H2,
	Button,
	Secret,
	HeadingSpan,
	TextSpan,
} from './styles_main'

const Main = () => {
	const secretItems = useSelector((store) => store.secrets.items)
	const accessToken = useSelector((store) => store.user.accessToken)

	const dispatch = useDispatch()
	const navigate = useNavigate()

	useEffect(() => {
		if (!accessToken) {
			navigate('/login')
		}
	}, [accessToken, navigate]);

	useEffect(() => {
		const options = {
			method: 'GET',
			headers: {
				Authorization: accessToken,
			},
		};

		fetch(API_URL('secrets'), options)
			.then((res) => res.json())
			.then((data) => {
				if (data.success) {
					dispatch(secrets.actions.setItems(data.response))
					dispatch(secrets.actions.setError(null));
				} else {
					dispatch(secrets.actions.setItems([]));
					dispatch(secrets.actions.setError(data.response))
				}
			});
	}, [accessToken, dispatch])

	const onButtonClick = () => {
		batch(() => {
		  dispatch(user.actions.setUserId(null));
		  dispatch(user.actions.setUsername(null));
		  dispatch(user.actions.setAccessToken(null));
		});
		localStorage.removeItem("user");
	  };

	return (
		<PageWrapper>

			<Header>
				<H1>Psst... don't tell ANYONE!</H1>
				<H2>Have you ever been asked to share one of your secrets while playing truth or dare game with your friends at a slumber party or at some hangout with colleagues? When it comes to sharing, we often find ourselves confused about the extent to which we want to disclose ourselves to others. Secrets are considered to be very personal thus revealing them to someone is tough yet it can be fun at times as well as a source to develop a stronger bond with them.</H2>
			</Header>

			<SecretWrapper>
				{secretItems.map((item) => (
					<Secret key={item._id}>
						<HeadingSpan>{item.message}</HeadingSpan>
						<TextSpan>{item.text}</TextSpan>
					</Secret>
				))}
			</SecretWrapper>
			
			<Button onClick={() => onButtonClick()}>Logout</Button>
			
		</PageWrapper>
	)
}

export default Main
