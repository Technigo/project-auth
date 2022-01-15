import React from "react";
import styled from "styled-components";

const NotFoundContainer = styled.div`
	background: #8e0e00; /* fallback for old browsers */
	background: -webkit-linear-gradient(
		to right,
		#1f1c18,
		#8e0e00
	); /* Chrome 10-25, Safari 5.1-6 */
	background: linear-gradient(
		to right,
		#1f1c18,
		#8e0e00
	); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
	height: 100vh;
	width: 100vw;
	display: flex;
	justify-content: center;
	align-items: center;

	@media (min-width: 768px) {
		height: 40vh;
		width: 50vw;
	}
`;

const NotFoundBox = styled.div`
	width: 200px;
`;

const NotFoundH1 = styled.h1`
	color: white;
	text-align: center;
`;

const NotFound = () => {
	return (
		<NotFoundContainer>
			<NotFoundBox>
				<NotFoundH1>Not found...</NotFoundH1>;
			</NotFoundBox>
		</NotFoundContainer>
	);
};

export default NotFound;
