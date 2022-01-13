import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import { API_URL } from "utils/urls";

const Main = () => {
	const accessToken = useSelector((store) => store.user.accessToken);

	const navigate = useNavigate();

	useEffect(() => {
		if (!accessToken) {
			navigate("/login");
		}
	}, [accessToken, navigate]);

	useEffect(() => {
		const options = {
			method: "GET",
			headers: {
				Authorization: accessToken,
			},
		};

		fetch(API_URL("memes"), options).then((res) => res.json());
	}, [accessToken]);

	return (
		<div>
			<div>
				<Link to="/login">To '/login'</Link>
			</div>
			<h1>Protected coding meme:</h1>
			<img src="../public/programmingMeme.jpeg" alt="programming meme" />
		</div>
	);
};

export default Main;
