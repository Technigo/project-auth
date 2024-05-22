import { useState } from 'react'

export const LoginForm = () => {
	const [loginData, setLoginData] = useState({
		username: '',
		password: '',
	})

	const handleChange = (e) => {
		setLoginData({
			...loginData,
			[e.target.name]: e.target.value,
		})
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const response = await fetch('mongodb://localhost/project-mongo', {
				method: POST,
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(loginData),
			})
			const result = await response.json()
			if (response.ok) {
				//return id and access token
			} else {
				throw new Error('Failed to login')
			}
		} catch (error) {
			console.error('Error', error)
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			<label>
				Username:
				<input
					type="text"
					name="username"
					id=""
					value={loginData.username}
					onChange={handleChange}
				/>
			</label>
			<label>
				Password:
				<input
					type="text"
					name="password"
					id=""
					value={loginData.password}
					onChange={handleChange}
				/>
			</label>
		</form>
	)
}
