import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { API_URL } from '../utils/constants'
import user from '../reducers/user'
import { Footer } from './Footer'

import { 
  Header,
  FormWrapper,
  Form,
  H1,
  H2,
  Input,
  Label,
  Button,
  Heart,
  Key,
  Flexboxinput,
  ButtonWrapper,
  P,
} from './styles_login'

const Login = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [mode, setMode] = useState('signup')

	const [errorMessage, setErrorMessage] = useState(null)


	const accessToken = useSelector((store) => store.user.accessToken)
	// const errors = useSelector((store) => store.user.error)


	const dispatch = useDispatch()
	const navigate = useNavigate()

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
						dispatch(user.actions.setUserId(data.response.userId))
						dispatch(user.actions.setUsername(data.response.username))
						dispatch(user.actions.setAccessToken(data.response.accessToken))
						dispatch(user.actions.setError(null))
						setErrorMessage(null)
						localStorage.setItem(
							"user",
							JSON.stringify({
							  userId: data.response.userId,
							  username: data.response.username,
							  email: data.response.email,
							  accessToken: data.response.accessToken,
							})
						  )
					});
				} else {
					batch(() => {
						dispatch(user.actions.setUserId(null))
						dispatch(user.actions.setUsername(null))
						dispatch(user.actions.setAccessToken(null))
						dispatch(user.actions.setError(data.response))
						setErrorMessage(data.message)
					})
				}
			})
	}

	return (
        <>
        <Header>
            <H1>Hello! Hej! Moi! Ciao! Bonjour! Hola! Zdravo! Namaste! Olá! </H1>
            <H2>Ever been asked to share some of your most secret secrets? Psst... don't tell anyone, but if you log in I will give you some advice! Not a user yet? Just sign up!</H2>
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

				{/* <Button type="submit">Submit</Button> */}
				{setErrorMessage !== null && (
            		<P>{errorMessage}</P>
          			)}
                <ButtonWrapper>
				
                    <Button type='submit' onClick={() => setMode('signin')}>
                        Sign in
                    </Button>
                    <Button type='submit' onClick={() => setMode('signup')}>
                        Sign up
                    </Button>
                </ButtonWrapper>
			</Form>
		</FormWrapper>
        <Footer />
        </>
	)
}

export default Login
