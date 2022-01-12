import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { API_URL } from '../utils/constants';
import secrets from '../reducers/secrets';
import users from '../reducers/users';

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
		<div>
            <div>
                <button onClick={() => {dispatch(users.actions.logout())}}>Logout</button>
            </div>
			<h1>Protected happy thoughts:</h1>
			{secretItems.map((item) => (
				<div key={item._id}>{item.message}</div>
			))}
		</div>
	);
};

export default Main
