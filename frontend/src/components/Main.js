import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import user from "../reducers/user";
import programmingMeme from "../utils/programmingMeme.jpeg";

// Styling
import { ContentWrapper, Button } from '../styling/GlobalStyling'
import styled from "styled-components";

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
		<ContentWrapper>
			<MemeContainer>
				<h1>Meme just for you:</h1>
				<Meme src={programmingMeme} alt="programming meme" />
				<Button
					onClick={signOut}>
						Sign out
				</Button>
			</MemeContainer>
			<div>
				
			</div>
		</ContentWrapper>
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
	max-width: 80%;

	@media (min-width: 768px) {
		max-width: 90%;
		max-height: 70vh;
	}
`;
