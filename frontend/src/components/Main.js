import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Logout } from "./Logout";

const Main = () => {
	// const thoughtsItems = useSelector((store) => store.thoughts.items);
	const accessToken = useSelector((store) => store.user.accessToken);

	const navigate = useNavigate();

	useEffect(() => {
		if (!accessToken) {
			navigate("/login");
		}
	}, [accessToken, navigate]);

	return (
		<div>
			<div>
				<Link to="/login">To '/login' !</Link>
			</div>
			<h1>Secret heading:</h1>
			{/* {thoughtsItems.map((item) => (
				<div key={item._id}>{item.message}</div>
			))} */}
			<Logout />
		</div>
	);
};

export default Main;
