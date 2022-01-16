import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { API_URL } from '../utils/constants'
import secrets from '../reducers/secrets'
import user from '../reducers/user'

import { Footer } from './Footer'

import { 
	PageWrapper,
	SecretWrapper,
	Header,
	H1,
	H2,
	Preamble,
	Button,
	Secret,
	HeadingSpan,
	TextSpan,
	Form,
	Label,
	Input,
	ShareButton,
} from './styles_main'

const Main = () => {
	const secretItems = useSelector((store) => store.secrets.items)
	const accessToken = useSelector((store) => store.user.accessToken)

	const [message, setMessage] = useState("")
	const [text, setText] = useState("")

	const dispatch = useDispatch()
	const navigate = useNavigate()

	const onFormSubmit = (event) => {
		event.preventDefault()

		const options = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ message, text })
		}
		fetch(API_URL('secrets'), options)
			.then((res) => res.json())
			.then((data) => {
				if (data.success) {
					batch(() => {
						dispatch(secrets.actions.setNewItems(data.response))
						dispatch(secrets.actions.setError(null))
						setMessage("")
						setText("")
					})
					} else {
						dispatch(secrets.actions.setError(data.response))
					}
				})}
	

	useEffect(() => {
		if (!accessToken) {
			navigate('/login')
		}
	}, [accessToken, navigate])

	useEffect(() => {
		const options = {
			method: 'GET',
			headers: {
				Authorization: accessToken,
			},
		}

		fetch(API_URL('secrets'), options)
			.then((res) => res.json())
			.then((data) => {
				if (data.success) {
					dispatch(secrets.actions.setItems(data.response))
					dispatch(secrets.actions.setError(null))
				} else {
					dispatch(secrets.actions.setItems([]))
					dispatch(secrets.actions.setError(data.response))
				}
			})
	}, [accessToken, dispatch])

	// Logout function setting store state to null and removes localStorage
	const logout = () => {
		batch(() => {
		  dispatch(user.actions.setUserId(null))
		  dispatch(user.actions.setUsername(null))
		  dispatch(user.actions.setAccessToken(null))
		})
		localStorage.removeItem("user")
	  }

	return (
		<>
		<PageWrapper>

			<Header>
				<H1>Share a secret!</H1>
				<H2> (Promise I won't tell anyone!)</H2>
				<Preamble>Have you ever been asked to share one of your secrets while playing truth or dare game with your friends at a slumber party or at some hangout with colleagues? When it comes to sharing, we often find ourselves confused about the extent to which we want to disclose ourselves to others. Secrets are considered to be very personal thus revealing them to someone is tough yet it can be fun at times as well as a source to develop a stronger bond with them.</Preamble>
			</Header>
			<Form onSubmit={onFormSubmit}>
				<Label htmlFor='Message'>Title</Label>
					<Input 
					type="text"
					id="message"
					value={message}
					onChange={(event) => setMessage(event.target.value)}
					/>

				<Label htmlFor='Text'>Secret</Label>
					<Input 
					type="text"
					id="text"
					value={text}
					onChange={(event) => setText(event.target.value)}
					/>

				<ShareButton type="submit">Share</ShareButton> 
			</Form>

			<Button onClick={() => logout()}>Logout</Button>

			<SecretWrapper>
				{secretItems.map((item) => (
					<Secret key={item._id}>
						<HeadingSpan>{item.message}</HeadingSpan>
						<TextSpan>{item.text}</TextSpan>
					</Secret>
				))}
			</SecretWrapper>
						
		</PageWrapper>
		<Footer />
		</>
	)
}

export default Main
