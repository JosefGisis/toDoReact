import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function useAuth() {
	const [token, setToken] = useState(null)
	const navigate = useNavigate()

	useEffect(() => {
		const token = localStorage.getItem('jwt')
		if (token) setToken(token)
		if (!token) navigate('/login')
	}, [])

	return { token }
}
