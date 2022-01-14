import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import user from "../reducers/user";
import programmingMeme from "../utils/programmingMeme.jpeg";

const Main = () => {
	const accessToken = useSelector((store) => store.user.accessToken);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	// function to sign out user
	const signOut = () => {
		dispatch(user.actions.setUserId(null));
		dispatch(user.actions.setUsername(null));
		dispatch(user.actions.setAccessToken(null));
		dispatch(user.actions.setError(null));
	};

	// checks if user is authorized, if yes - sends user to main page
	useEffect(() => {
		if (!accessToken) {
			navigate("/login");
		}
	}, [accessToken, navigate]);

	return (
		<div>
			<div>
				<button onClick={signOut}>Sign out</button>
			</div>
			<MemeContainer>
				<h1>Meme just for you:</h1>
				<Meme src={programmingMeme} alt="programming meme" />
			</MemeContainer>
		</div>
	);
};

export default Main;

const MemeContainer = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: center;
`;

const Meme = styled.img`
	max-width: 70%;
`;
