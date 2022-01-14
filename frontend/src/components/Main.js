import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import user from "../reducers/user";
import programmingMeme from '../utils/programmingMeme.jpeg'

const Main = () => {
	const accessToken = useSelector((store) => store.user.accessToken);

	const dispatch = useDispatch();
	const navigate = useNavigate();
	
	const signOut = () => {
		dispatch(user.actions.setUserId(null));
		dispatch(user.actions.setUsername(null));
		dispatch(user.actions.setAccessToken(null));
		dispatch(user.actions.setError(null));
	}

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
			<div>
				<Link to="/login">To '/login'</Link>
			</div>
			<h1>Protected coding meme:</h1>
			<img src={programmingMeme} alt="programming meme" />
		</div>
	);
};

export default Main;
