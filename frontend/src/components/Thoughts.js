import React, { useEffect, useState } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';
import thoughtSlice from 'reducers/thoughtSlice';
import { useNavigate } from 'react-router-dom';
import { API_URL, LIKE_URL } from 'utils/utils';
import userSlice from 'reducers/userSlice';
/* import LogOut from './Logout'; */
import styled from 'styled-components';
import { formatDistance } from 'date-fns';

const Thoughts = () => {
	/* const values = useSelector((state) => state.thoughts); */
	const accessToken = useSelector((state) => state.user.accessToken);
	const username = useSelector((state) => state.user.username);

	const [mode, setMode] = useState('thoughts');
	const [thoughts, setThoughts] = useState([]);
	const [newThought, setNewThought] = useState('');
	//const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (!accessToken) {
			navigate('/');
		}
	}, [accessToken]);

	//get the thoughts posts in display, fire at new posts added
	/*  useEffect(() => {
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
 */
	const getThoughts = () => {
		const options = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: accessToken,
			},
		};
		fetch(API_URL(mode), options)
			.then((res) => res.json())
			.then((data) => setThoughts(data))
			.catch((error) => console.error(error));
	};

	useEffect(() => {
		getThoughts();
	}, []);

	const onSendThought = (event) => {
		event.preventDefault();
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: accessToken,
			},
			body: JSON.stringify({ message: newThought }),
		};

		fetch(API_URL(mode), options)
			.then((res) => res.json())
			.then((data) => {
				if (data.success) {
					batch(() => {
						dispatch(thoughtSlice.actions.addThoughts(data.response.value));
					});
				} else {
					batch(() => {
						dispatch(thoughtSlice.actions.addThoughts(null));
					});
				}
			});
	};

	/* Add likes to messages  */

	const handleLikeChange = (thoughtsID) => {
		const option = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				//Authorization: accessToken,
			},
		};
		fetch(LIKE_URL(mode)(thoughtsID), option)
			.then((Response) => Response.json())
			.then(console.log('yey it works.'))
			.catch((error) => console.error(error))
			.finally(() => getThoughts());
		/* try {
			fetch(API_URL(`${thoughtsID}/like`), option);
		} catch (err) {
			console.log(error);
		} */
	};

	/* LOG OUT BUTTON- CANT MAKE IT WORK WITH THE SLICER.. */
	const logout = () => {
		batch(() => {
			dispatch(userSlice.actions.addUsername(null));
			dispatch(userSlice.actions.addAccessToken(null));
		});
	};

	return (
		<Wrapper>
			<LogoutBtn className="logout" onClick={logout}>
				Logout
			</LogoutBtn>
			<HeadingContainer>
				<Heading>What's making you happy right now?</Heading>
			</HeadingContainer>
			<Form onSubmit={onSendThought}>
				<InputText
					type="text"
					value={newThought}
					onChange={(e) => setNewThought(e.target.value)}
				/>
				<BtnSend>Post</BtnSend>
			</Form>
			<ThoughtContainer>
				{thoughts &&
					thoughts.map((item) => {
						return (
							<ThoughtCard key={item._id}>
								<Message>{item.message}</Message>
								<DateFormat>
									{formatDistance(new Date(item.createdAt), Date.now(), {
										addSuffix: true,
									})}
									{/* {item.createdAt} */}
								</DateFormat>
								<LikeArea>
									<HeartBtn
										type="button"
										className="btn-heart"
										onClick={() => {
											handleLikeChange(item._id);
										}}
										style={{
											background: item.hearts >= 1 ? '#F6C6E9' : '#f2f2f2',
										}}
									>
										❤️
									</HeartBtn>
									<p>x {item.hearts}</p>
								</LikeArea>
							</ThoughtCard>
						);
					})}
				{/* <LogOut /> */}
			</ThoughtContainer>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
	justify-content: center;
	justify-content: center;
`;

const InputText = styled.input`
	width: 90%;
	height: 50%;
	margin: auto;
	display: block;
`;

const BtnSend = styled.button`
	margin-top: 5px;
	margin-bottom: 50px;
	align-items: center;
	display: block;
	padding: 10px;
	border: none;
	color: #fff;
	background-color: transparent;
	border: none;
	text-shadow: 0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #5271ff,
		0 0 82px #5271ff, 0 0 92px #5271ff, 0 0 102px #5271ff, 0 0 151px #5271ff;
	text-align: center;
	font-weight: 400;
	font-size: 1.7rem;
	animation: pulsate 0.11s ease-in-out infinite alternate;
	&:hover {
		opacity: 80%;
	}

	@keyframes pulsate {
		100% {
			text-shadow: 0 0 4px #fff, 0 0 11px #fff, 0 0 19px #fff, 0 0 40px #5271ff,
				0 0 80px #5271ff, 0 0 90px #5271ff, 0 0 100px #5271ff, 0 0 150px #5271ff;
		}

		0% {
			text-shadow: 0 0 4px #fff, 0 0 10px #fff, 0 0 18px #fff, 0 0 38px #5271ff,
				0 0 73px #5271ff, 0 0 80px #5271ff, 0 0 94px #5271ff, 0 0 140px #5271ff;
		}
	}
`;

const ThoughtCard = styled.div`
	margin: 30px 0 30px 0;
	width: 250px;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	background-color: rgba(229, 229, 229, 0.4);
`;

const ThoughtContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
	gap: 10px;
	grid-column: span 5;
`;

const LogoutBtn = styled.button`
	grid-column: 3 / 4;
	color: #fff;
	background-color: transparent;
	border: none;
	text-shadow: 0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #5271ff,
		0 0 82px #5271ff, 0 0 92px #5271ff, 0 0 102px #5271ff, 0 0 151px #5271ff;
	text-align: center;
	font-weight: 400;
	font-size: 1.7rem;
	animation: pulsate 0.11s ease-in-out infinite alternate;
	&:hover {
		font-weight: bold;
		font-size: 2.5rem;
	}

	@keyframes pulsate {
		100% {
			text-shadow: 0 0 4px #fff, 0 0 11px #fff, 0 0 19px #fff, 0 0 40px #5271ff,
				0 0 80px #5271ff, 0 0 90px #5271ff, 0 0 100px #5271ff, 0 0 150px #5271ff;
		}

		0% {
			text-shadow: 0 0 4px #fff, 0 0 10px #fff, 0 0 18px #fff, 0 0 38px #5271ff,
				0 0 73px #5271ff, 0 0 80px #5271ff, 0 0 94px #5271ff, 0 0 140px #5271ff;
		}
	}
`;

const Form = styled.form`
	grid-column: 3 / 4;
`;

const HeadingContainer = styled.div`
	grid-column: 3 / 4;
	text-align: center;
`;
const Heading = styled.h4`
	color: #fff;
	text-shadow: 0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #5271ff,
		0 0 82px #5271ff, 0 0 92px #5271ff, 0 0 102px #5271ff, 0 0 151px #5271ff;
	text-align: center;
	font-weight: 400;
	font-size: 1.7rem;
	animation: pulsate 0.11s ease-in-out infinite alternate;

	@keyframes pulsate {
		100% {
			text-shadow: 0 0 4px #fff, 0 0 11px #fff, 0 0 19px #fff, 0 0 40px #5271ff,
				0 0 80px #5271ff, 0 0 90px #5271ff, 0 0 100px #5271ff, 0 0 150px #5271ff;
		}

		0% {
			text-shadow: 0 0 4px #fff, 0 0 10px #fff, 0 0 18px #fff, 0 0 38px #5271ff,
				0 0 73px #5271ff, 0 0 80px #5271ff, 0 0 94px #5271ff, 0 0 140px #5271ff;
		}
	}
`;

const Message = styled.h1`
	padding-top: 15px;
	color: white;
	font-weight: bold;
	text-align: center;
`;

const DateFormat = styled.p`
	margin-top: 80px;
	margin-right: 10px;
	color: white;
	font-weight: bold;
	text-align: right;
`;

const HeartBtn = styled.button`
	border-style: none;
	width: 30px;
	height: 30px;
	border-radius: 50%;
`;

const LikeArea = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	padding-right: 1rem;
	gap: 8px;
`;

export default Thoughts;
