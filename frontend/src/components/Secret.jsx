import React from 'react'
import { userStore } from '../stores/userStore'
import { useEffect } from 'react'

export const Secret = () => {
    const { user, isLoggedIn, setIsLoggedIn } = userStore()

    useEffect(() => {
        fetchSecret()
    }, [user])

    const fetchSecret = async () => {
        try {
            const response = await fetch('http://localhost:8081/starter', {
                method: 'GET',
                headers: {
                    Authorization: user.accessToken,
                }
            })

            if (response.ok) {
                const data = await response.json()
                setIsLoggedIn(true)
            } else {
                console.error('Failed')
            }
        } catch (error) {
            console.error('Error when fetching', error)
        }
    }

    return (
        <div>SECRET!!!</div>
    )
}
