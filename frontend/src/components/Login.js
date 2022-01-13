import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { API_URL } from '../utils/constants';
import user from '../reducers/users';

import { 
  Header,
  FormWrapper,
  Form,
  Radiowrapper,
  RadioButton,
  H1,
  H2,
  Radios,
  Radiolabel,
  Input,
  Label,
  Button,
  Heart,
  Key,
  Flexboxinput,
  RadioButtonTest,
  HiddenRadioButton,
} from './styles_login'

const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [mode, setMode] = useState('signup');

	const accessToken = useSelector((store) => store.users.accessToken);

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
        <>
        <div>
            <RadioButtonTest 
                id="signup"
                type="radio"
                checked={mode === 'signup'}
                onChange={() => setMode('signup')}
            />
            <RadioButtonTest 
                id="signin"
                type="radio"
                checked={mode === 'signin'}
                onChange={() => setMode('signin')}
            />
            </div>
        <Header>
        <H1>Hello! Hej! Moi! Ciao! Bonjour! Hola! Zdravo! Namaste! Olá! </H1>
        <H2> Already a user? - Sign in!</H2>
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
            
    </Header>

		<FormWrapper>
			<Form onSubmit={onFormSubmit}>
                        <Label htmlFor="username">Username</Label>
                        <Flexboxinput>
                            <Heart />
                            <Input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Flexboxinput>

                        <Label htmlFor="password">Password</Label>
                        <Flexboxinput>
                            <Key />
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Flexboxinput>

				<Button type="submit">Submit</Button>
			</Form>
		</FormWrapper>
        </>
	)
}

export default Login
