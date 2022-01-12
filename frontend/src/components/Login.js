import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

import { API_URL } from '../utils/constants';
import user from '../reducers/users';

import { 
  PageWrapper,
  Form,
  Wrapper,
  Radiowrapper,
  RadioButton,
  H1,
  H2,
  Radios,
  Radiolabel,
  Input,
  Label,
  Button,
} from './styles_login'

const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [mode, setMode] = useState('signup');

	const accessToken = useSelector((store) => store.user.accessToken);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (accessToken) {
			navigate('/');
		}
	}, [accessToken, navigate]);

	const onFormSubmit = (event) => {
		event.preventDefault();

		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ username, password }),
		};

		fetch(API_URL(mode), options)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				if (data.success) {
					batch(() => {
						dispatch(user.actions.setUserId(data.response.userId));
						dispatch(user.actions.setUsername(data.response.username));
						dispatch(user.actions.setAccessToken(data.response.accessToken));
						dispatch(user.actions.setError(null));
					});
				} else {
					batch(() => {
						dispatch(user.actions.setUserId(null));
						dispatch(user.actions.setUsername(null));
						dispatch(user.actions.setAccessToken(null));
						dispatch(user.actions.setError(data.response));
					});
				}
			});
	};

	return (
		<PageWrapper>
			<div>
				<Link to="/">To '/' !</Link>
			</div>
            <div>
                <H1>Hello! Sign up!</H1>
                <H2> Already a user? - Sign in!</H2>
            </div>
            <Radios>
                <Radiowrapper>
                    <RadioButton
                        id="signup"
                        type="radio"
                        checked={mode === 'signup'}
                        onChange={() => setMode('signup')}
                    />
                    <Radiolabel htmlFor="signup">Sign up</Radiolabel>
                </Radiowrapper>
                <Radiowrapper>
                    <RadioButton
                        id="signin"
                        type="radio"
                        checked={mode === 'signin'}
                        onChange={() => setMode('signin')}
                    />
                    <Radiolabel htmlFor="signin">Sign in</Radiolabel>
                </Radiowrapper>
            </Radios>
			<Form onSubmit={onFormSubmit}>
                <Wrapper>
                        <Label htmlFor="username">Username</Label>
                        <Input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                </Wrapper>
                
                <Wrapper>
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                </Wrapper>

				<Button type="submit">Submit</Button>
			</Form>
		</PageWrapper>
	);
};

export default Login;
