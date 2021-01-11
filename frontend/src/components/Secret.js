import React, { useState, useEffect } from "react";
import { getSecretUrl } from "../paths/api-paths";
import { ErrorMessage } from "./ErrorMessage";

export const Secret = ({ token }) => {
	const [secretMessage, setSecretMessage] = useState();
	const [gotSecret, setGotSecret] = useState();

	useEffect(() => {
		console.log("fetching secret", token);
		//call fetch function

		fetch(getSecretUrl, {
			method: "GET",
			headers: { Authorization: token },
		})
			.then((res) => {
				console.log(res.status);
				if (res.status === 201) {
					return res.json();
				} else throw new Error(res.status);
			})
			.then((data) => {
				console.log(data);
				setSecretMessage(data.secretMessage);
				setGotSecret(true);
			})
			.catch((error) => {
				setGotSecret(false);
				console.log(error);
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

//  fetch(url, {
//       method: 'GET',
//       headers: { 'Authorization': accessToken }
//     })
//       .then(res => {
//         if (!res.ok) {
//           throw error('Access denied')
//         }
//         res.json()
//       })
//       .catch(err => {
//         setError(err.message)
//       })
//   })

//   if (localStorage.getItem('accessToken')) {

//   return (
