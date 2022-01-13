import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { API_URL } from '../utils/constants';
import secrets from '../reducers/secrets';
import users from '../reducers/users';

import { 
	PageWrapper,
	SecretWrapper,
	Header,
	H1,
	Button,
	Secret,
} from './styles_main'

const Main = () => {
	const secretItems = useSelector((store) => store.secrets.items)
	const accessToken = useSelector((store) => store.users.accessToken)

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

	return (
		<PageWrapper>

			<Header>
				<H1>Psst... don't tell ANYONE!</H1>
			</Header>

			<SecretWrapper>
				{secretItems.map((item) => (
					<Secret key={item._id}>{item.message}</Secret>
				))}
			</SecretWrapper>
			
			<Button onClick={() => {dispatch(users.actions.logout())}}>Logout</Button>
		</PageWrapper>
	)
}

export default Main
