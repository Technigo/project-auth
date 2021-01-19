import React from "react";

export const ToggleButton = ({ mode, setModeinApp }) => {
	const handleClick = () => {
		if (mode === "signUp") {
			setModeinApp("signIn");
		}
		if (mode === "signIn") {
			setModeinApp("signUp");
		}
	};

	return (
		<button
			onClick={() => handleClick()}
			type="button"
			className="button-toggle"
		>
			{mode === "signUp" ? "Sign in" : "Sign up"}
		</button>
	);
};
