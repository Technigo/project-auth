import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import thoughtSlice from 'reducers/thoughtSlice';
import { useNavigate } from 'react-router-dom';
import { API_URL } from 'utils/utils';
import userSlice from 'reducers/userSlice';

const Thoughts = () => {
	const [thoughts, setThoughts] = useState('');
	const values = useSelector((state) => state.thoughts.value);
	const accessToken = useSelector((state) => state.user.accessToken);
	const username = useSelector((state) => state.user.username);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const options = {
		method: 'GET',
		header: {
			Authorization: accessToken,
		},
	};

	useEffect(() => {
		if (!accessToken) {
			navigate('/login');
		}
	}, [accessToken]);

	//get the thoughts posts in display, fire at new posts added
	useEffect(() => {
		try {
			fetch(API_URL('thoughtSlice'), options)
				.then((res) => res.json())
				.then((data) => dispatch(thoughtSlice.actions.addThoughts(data)));
		} catch (err) {
			console.log(error);
		}
	}, [thoughts]);

	//in the thought page to be able to post
	const onThoughtsSubmit = (e) => {
		e.preventDefault();

		const options = {
			method: 'POST',
			header: {
				'Content-Type': 'application/json',
			},
			body: json.stringify({
				username: username,
				message: thoughts,
				accessToken: accessToken,
			}),
		};

		try {
			fetch(API_URL('thoughts'), options);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<p>What's making you happy right now?</p>
			<Form>
				onSubmit={onThoughtsSubmit}
				<input
					type="text"
					value={thoughts}
					onChange={(e) => setThoughts(e.target.value)}
				/>
				<button>Post</button>
			</Form>
			<>
				{values.map((item) => {
					return (
						<div>
							<p>{item.message}</p>
						</div>
					);
				})}
			</>
		</>
	);
};

export default Thoughts;
