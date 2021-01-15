import React, { useState, useEffect } from "react";
import { getSecretUrl } from "../paths/api-paths";

import { ErrorMessage } from "./ErrorMessage";

export const Secret = ({ token }) => {
	const [secretMessage, setSecretMessage] = useState();
	const [gotSecret, setGotSecret] = useState();

	useEffect(() => {
		fetch(getSecretUrl, {
			method: "GET",
			headers: { Authorization: token },
		})
			.then((res) => {
				if (res.status === 201) {
					return res.json();
				} else throw new Error(res.status);
			})
			.then((data) => {
				setSecretMessage(data.secretMessage);
				setGotSecret(true);
			})
			.catch((error) => {
				setGotSecret(false);
			});
	}, [token]);

	return (
		<section>
			{gotSecret === false && (
				<ErrorMessage message={"Something went wrong."} />
			)}
			{gotSecret === true && (
				<div className="image-container">
					<img
						className="secret-message-image"
						src={secretMessage.imageUrl}
						alt="secretMessage"
					/>
				</div>
			)}
		</section>
	);
};
