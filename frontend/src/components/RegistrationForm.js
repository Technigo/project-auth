import { useSelector, useDispatch, batch } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { user } from '../reducers/user';
import { THOUGHTS_URL } from '../reusable/Urls';

export const RegistrationForm = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [mode, setMode] = useState(null);
	const accessToken = useSelector((store) => store.user.accessToken);
	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(() => {
		if (accessToken) {
			history.push('/thoughts');
		}
	}, [accessToken, history]);

	const onFormSubmit = (e) => {
		e.preventDefault();

		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ username, password }),
		};
		fetch(THOUGHTS_URL(mode), options)
			.then((res) => res.json())
			.then((data) => {
				if (data.success) {
					batch(() => {
						dispatch(user.actions.setUsername(data.username));
						dispatch(user.actions.setAccessToken(data.accessToken));
						dispatch(user.actions.setErrors(null));
					});
				} else {
					dispatch(user.actions.setErrors(data));
				}
			})
			.catch();
	};

	return (
		<Main>
			<img
				alt='Key hole'
				src='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgd2lkdGg9IjIzNS41MDhweCIgaGVpZ2h0PSIyMzUuNTA4cHgiIHZpZXdCb3g9IjAgMCAyMzUuNTA4IDIzNS41MDgiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDIzNS41MDggMjM1LjUwODsiDQoJIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPGc+DQoJCTxwYXRoIGQ9Ik0yMzUuNTA4LDkwLjc3MmMwLTYuNzM0LTEuNzE1LTEzLjQzMS00Ljk3My0xOS4zNWMtNy4wNzctMTIuNzcyLTIwLjUzOC0yMC43MjctMzUuMTIxLTIwLjcyNw0KCQkJYy00LjA0LDAtOC4wNDcsMC42MjEtMTEuNTksMS43NTljMC4wMDgtMC4wMzQsMC4wMTctMC4wNjQsMC4wMTctMC4wOTZjMS4zMS00LjAwMSwxLjk2Ny04LjE2NSwxLjk2Ny0xMi4zNzMNCgkJCWMwLTE0LjU1OS03Ljk0Mi0yOC4wMS0yMC43MzgtMzUuMTEzYy0xNC44OTYtOC4yMjUtMzQuNTQ0LTUuNjMtNDYuNzYzLDUuODczQzEwNi4wNDEtMC43MzgsODYuNDU3LTMuMzUzLDcxLjQ5Myw0Ljg3Mw0KCQkJYy0xMi43OCw3LjA4MS0yMC43MTksMjAuNTI4LTIwLjcxOSwzNS4xMTNjMCw0LjA1MiwwLjYyNyw4LjA4MSwxLjc1MSwxMS41OTZjLTAuMDI0LDAtMC4wNDYtMC4wMTYtMC4wNzYtMC4wMTYNCgkJCWMtMTguMTczLTUuOTMzLTM4LjM5MSwyLjMtNDcuNDksMTguNzczQzEuNzE5LDc2LjIzMywwLDgyLjkyMSwwLDg5LjY3MmMwLDEwLjI5OSwzLjkwMSwyMC4wMzUsMTAuODU0LDI3LjQxNQ0KCQkJQzMuOTAxLDEyNC41MDIsMCwxMzQuMjczLDAsMTQ0LjU1MWMwLDYuNzI1LDEuNzE5LDEzLjQzNCw0Ljk4MSwxOS4zNjRjNy4wNzcsMTIuNzcxLDIwLjUzMiwyMC43MTQsMzUuMTA5LDIwLjcxNA0KCQkJYzQuMDgyLDAsOC4xMjctMC42MTIsMTEuNTg3LTEuNzYzYy0wLjAwOCwwLjAzMi0wLjAxNCwwLjA2NC0wLjAxNCwwLjEwOGMtMS4zMiwzLjk4Ny0xLjk4Nyw4LjEzNS0xLjk4NywxMi4zNTgNCgkJCWMwLDE0LjU4Nyw3Ljk0MiwyOC4wMzYsMjAuNzIyLDM1LjEyNWMxNC45MDQsOC4yNDMsMzQuNTQ2LDUuNjMxLDQ2Ljc4My01Ljg3YzcuNDA2LDYuOTQ0LDE3LjE2NCwxMC44NDgsMjcuNDUxLDEwLjg0OA0KCQkJYzYuNzQsMCwxMy40MjUtMS43MTEsMTkuMzUyLTQuOTc4YzEyLjc4OC03LjA3MywyMC43MTUtMjAuNTIxLDIwLjcxNS0zNS4xMjVjMC00LjA0Ny0wLjYxMy04LjA1MS0xLjc0OC0xMS41NzcNCgkJCWMwLjAyOCwwLDAuMDYxLDAuMDE2LDAuMDkzLDAuMDE2YzE3Ljk1Myw1LjgzNSwzOC4zNjctMi4yNiw0Ny40OTItMTguNzU5YzMuMjQxLTUuOTAyLDQuOTczLTEyLjU5NSw0Ljk3My0xOS4zNTINCgkJCWMwLTEwLjI5NS0zLjg5OS0yMC4wNTMtMTAuODUyLTI3LjQzNUMyMzEuNjA5LDExMC44MzEsMjM1LjUwOCwxMDEuMDcxLDIzNS41MDgsOTAuNzcyeiBNMjI2LjYwOCwxNDUuNjY5DQoJCQljMCw1LjI2Mi0xLjMzOCwxMC40NzItMy44NzEsMTUuMDQ0Yy03LjA5NywxMi44MTYtMjEuNTI4LDE5LjU2NC0zNy4zMzMsMTQuNDg3Yy0yLjQwOC0wLjUzNy01LjA3Ny0xLjYyMy04LjE0NC0zLjMyNg0KCQkJYy0xLjcwMy0wLjk1LTMuODcxLTAuNjYxLTUuMjczLDAuNzIxYy0xLjQxLDEuMzg3LTEuNzQ3LDMuNTExLTAuODEzLDUuMjU4YzEuNTE5LDIuOTE0LDIuNDkyLDUuMzUxLDMuMDksNy45MDcNCgkJCWMxLjAyMSwzLjExNywxLjU0Myw2LjM0OCwxLjU0Myw5LjU5YzAsMTEuMzM3LTYuMTgsMjEuODA5LTE2LjEyMiwyNy4zMTRjLTEyLjc4NCw3LjAwMS0yOS43NDcsMy43ODctMzkuMDc2LTcuNDA2DQoJCQljLTAuODQ2LTEuMDI1LTIuMTAxLTEuNjEtMy40MjctMS42MWMtMS4zMjgsMC0yLjU4MSwwLjU5Ny0zLjQyOCwxLjYxYy05LjI5NiwxMS4yMzMtMjYuMjk5LDE0LjQ1OS0zOS4wNDEsNy40MDYNCgkJCWMtOS45NDgtNS40OS0xNi4xMzQtMTUuOTYyLTE2LjEzNC0yNy4zMTRjMC0zLjI2NywwLjUyNS02LjQ4LDEuNjYzLTEwLjAyM2MwLjUyOS0yLjM3NiwxLjYwOS01LjAzMywzLjMxNi04LjEyMw0KCQkJYzAuOTQ1LTEuNzM0LDAuNjUxLTMuODc1LTAuNzI2LTUuMjc3Yy0xLjM4LTEuNDIzLTMuNDk5LTEuNzY0LTUuMjY2LTAuODE3Yy0yLjg5MiwxLjUyMi01LjMyNiwyLjQ5Ny03Ljg5MSwzLjA5DQoJCQljLTEzLjgzNCw0LjYyOC0yOS43OTktMS43NzEtMzYuODk2LTE0LjU2Yy0yLjU2OS00LjY4NS0zLjg3OS05Ljc1NC0zLjg3OS0xNS4wNTZjMC05LjMwMSw0LjEyNC0xOC4wNjUsMTEuMjg5LTI0LjAzNg0KCQkJYzEuMDE0LTAuODQyLDEuNjA5LTIuMTI0LDEuNjAxLTMuNDM4YzAtMS4zMzMtMC41ODctMi41NzUtMS42MDktMy40MzhjLTcuMTczLTUuOTMzLTExLjI4OS0xNC42ODgtMTEuMjg5LTIzLjk5DQoJCQljMC01LjI0NCwxLjM0NC0xMC40NTgsMy44NzktMTUuMDQyQzE4LjI3Niw2NC42OTYsMjguNzQxLDU4LjUsNDAuMDgzLDU4LjVjMy4yMjgsMCw2LjQ2NCwwLjUxNywxMC4wMjQsMS42NjMNCgkJCWMyLjM1MSwwLjUxMSw1LjAwOSwxLjU5NSw4LjE0MSwzLjMxMmMxLjcyMSwwLjk2NiwzLjg3MSwwLjY1MSw1LjI2OC0wLjcyN2MxLjM5OC0xLjM4NCwxLjczNS0zLjUxMywwLjgxNS01LjI1MQ0KCQkJYy0xLjUyOS0yLjkxNC0yLjUwMy01LjM2NC0zLjA5NC03LjkwOWMtMS4wMi0zLjExNS0xLjU0NS02LjM1Mi0xLjU0NS05LjYwMmMwLTExLjMxMSw2LjE3OS0yMS43ODQsMTYuMTItMjcuMzA5DQoJCQljMTIuNzY0LTcuMDUzLDI5Ljc0MS0zLjgwMSwzOS4wODYsNy40MThjMC44NDgsMS4wMTIsMi4xMDMsMS41OTUsMy40MjUsMS41OTVoMC4wMDhjMS4zMjYsMCwyLjU4MS0wLjU5NywzLjQxOC0xLjYwOQ0KCQkJYzkuMzEzLTExLjIwNSwyNi4zMzMtMTQuNDMzLDM5LjAyOC03LjQwNGM5Ljk1OSw1LjUwMiwxNi4xNDYsMTUuOTc0LDE2LjE0NiwyNy4zMDljMCwzLjI2Ni0wLjUyMSw2LjQ4Ni0xLjY1NSwxMC4wMTMNCgkJCWMtMC41MjksMi4zNzYtMS42MTksNS4wNjMtMy4zMyw4LjE2NWMtMC45NDEsMS43MjMtMC42NDIsMy44NjcsMC43MzcsNS4yODJjMS4zNzQsMS40MDMsMy41MTEsMS43NjcsNS4yNTgsMC44MDENCgkJCWMyLjg5NC0xLjUxNSw1LjMzOC0yLjQ4OCw3Ljg4My0zLjA5NGMxNC4xNTMtNC42NTQsMjkuODM5LDEuNzk4LDM2LjkxMiwxNC41NjljMi41NDEsNC42MDEsMy44NzksOS43OTgsMy44NzksMTUuMDQyDQoJCQljMCw5LjMwMy00LjEyNCwxOC4wNjItMTEuMjkzLDI0LjAzOGMtMS4wMSwwLjgzMi0xLjYwNiwyLjExMi0xLjU5MSwzLjQyOWMwLDEuMzM0LDAuNTgxLDIuNTkzLDEuNjA3LDMuNDM1DQoJCQlDMjIyLjQ5MywxMjcuNjA4LDIyNi42MDgsMTM2LjM1NiwyMjYuNjA4LDE0NS42Njl6Ii8+DQoJCTxwYXRoIGQ9Ik0xNDYuMjI3LDEwMC45NTNjMC0xNS43MTUtMTIuNzQ3LTI4LjQ3My0yOC40NzMtMjguNDczYy0xNS43MjMsMC0yOC40NTcsMTIuNzU4LTI4LjQ1NywyOC40NzMNCgkJCWMwLDkuOTc5LDUuMTQ4LDE4LjcyMSwxMi45MTQsMjMuODE4bC0xNC45ODgsMzguMDg3aDYxLjA1OWwtMTQuOTk2LTM4LjA4N0MxNDEuMDc4LDExOS42NzMsMTQ2LjIyNywxMTAuOTIzLDE0Ni4yMjcsMTAwLjk1M3oiLz4NCgk8L2c+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8L3N2Zz4NCg=='
			/>
			<h1>Log In to See a Bee!</h1>
			<form onSubmit={onFormSubmit}>
				<div>
					<input
						required
						placeholder='Choose your username'
						type='text'
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
					<input
						required
						placeholder='Choose your Password'
						type='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<div>
					<button type='submit' onClick={() => setMode('signin')}>
						Sign in
					</button>

					<button type='submit' onClick={() => setMode('registration')}>
						Sign up
					</button>
				</div>
			</form>
		</Main>
	);
};

const Main = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
background-color: #c5e6de;
height: 100vh;
align-items: center;

img{
    height: 70px;
    margin: 20px<,
}

h1{
    font-size: 16px;
    font-weight: 800;
    color: #626f80;
}

form{
    display: flex;
    flex-direction: column;
    border: 2px solid green;
    background-color: #c5d2e6;
    heights: 300px:
    width: 600px:
    padding: 30px;
    margin: 0 auto;
}

input {
    padding: 20px;
    margin: 10px;
    cursor: text;
}

button{
    padding: 10px 20px 10px 20px;
    margin: 10px;
    border-radius: 7px;
    background-color: #e2e6c5;
    cursor: pointer;
}
`;
