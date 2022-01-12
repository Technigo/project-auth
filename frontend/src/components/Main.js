import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'

import { API_URL } from '../utils/constants';
import secrets from '../reducers/secrets';

const Main = () => {
	const secretItems = useSelector((store) => store.secret.items)
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

	return (
		<div>
			<div>
				<Link to="/login">To '/login' !</Link>
			</div>
			<h1>Protected happy thoughts:</h1>
			{secretItems.map((item) => (
				<div key={item._id}>{item.message}</div>
			))}
		</div>
	);
};

export default Main
