import { useState } from 'react'
import { BackHome } from './BackHome'

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
		console.log("Form submitted");
    console.log("Login Data:", loginData);
		try {
			const response = await fetch("http://localhost:8080/login", {
				method: "POST",
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(loginData),
			})
			if (!response.ok) throw new Error('Failed to login') 
			const result = await response.json()
					console.log("Login successful:", result);

			} catch (error) {
			console.error('Error', error)
		}
	}

	return (
		<>
			< BackHome />
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
            type="password"
            name="password"
            id=""
            value={loginData.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Login</button>
      </form>
    </>
  );
}
