import React from "react";

export const SignOutButton = ({ signOut }) => {
	const handleSignOut = () => {
		signOut("");
	};
	return (
		<button
			onClick={() => handleSignOut()}
			className="button-sign-out"
			type="button"
		>
			Sign Out
		</button>
	);
};
