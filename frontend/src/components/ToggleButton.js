import React, { useState } from "react";

export const ToggleButton = ({ mode, setModeinApp }) => {
	const handleClick = () => {
		console.log("clickButton");
		if (mode === "signUp") {
			setModeinApp("signIn");
		}
		if (mode === "signIn") {
			setModeinApp("signUp");
		}
	};

	return (
		<button onClick={() => handleClick()} type="button">
			Button
		</button>
	);
};
