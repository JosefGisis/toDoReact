import { useCallback } from 'react'

const JWT_KEY = 'jwt'

export function useAuth() {
	const logout = useCallback(() => {
		localStorage.removeItem(JWT_KEY)
	}, [])

	const getToken = useCallback(() => {
		return localStorage.getItem(JWT_KEY)
	}, [])

	const setToken = useCallback((token) => {
		localStorage.setItem(JWT_KEY, token)
	}, [])

	return { logout, getToken, setToken}
}
