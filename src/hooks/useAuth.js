import { useCallback, useContext } from 'react'
import AuthContext from '../state-management/Token/AuthContext'

export function useAuth() {
	const { token, dispatch } = useContext(AuthContext)

	const login = useCallback(() => {
		const JWTToken = localStorage.getItem('jwt')
		if (JWTToken) dispatch({ type: 'LOGIN', payload: JWTToken })
		else dispatch({ type: 'LOGOUT' })
	})

	const logout = useCallback(() => {
		dispatch({ type: 'LOGOUT' })
	})

	return { token, logout, login }
}
