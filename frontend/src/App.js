import React, { useState } from 'react';
import styled from 'styled-components';

import { FormLogin } from './components/FormLogin';
import { FormSignup } from './components/FormSignup';

export const App = () => {
	const [displaySignup, setDisplaySignup] = useState(false);
	const [displayLogin, setDisplayLogin] = useState(true);

	const signupOnClick = () => {
		setDisplayLogin(false);
		setDisplaySignup(true);
	};

	return (
		<Container>
			{displayLogin && (
				<>
					<FormLogin />
					<Button onClick={signupOnClick}>Signup</Button>
				</>
			)}

			{displaySignup && <FormSignup />}
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 250px;
`;

const Button = styled.button`
	margin: 5px;
`;
