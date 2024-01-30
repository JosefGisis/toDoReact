import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

const JWT_KEY = 'jwt'

export function useAuth() {
	const navigate = useNavigate()
	
	const logout = useCallback(() => {
		localStorage.removeItem(JWT_KEY)
		navigate('login')
	}, [])

	const getToken = useCallback(() => {
		return localStorage.getItem(JWT_KEY)
	}, [])

	const setToken = useCallback((token) => {
		localStorage.setItem(JWT_KEY, token)
	}, [])

	return { logout, getToken, setToken}
}
