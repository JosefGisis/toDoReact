import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../state-management/Token/AuthContext'

export function useAuth() {
	const [token, dispatch] = useContext(AuthContext)
	const navigate = useNavigate()

	useEffect(() => {
		const JWTToken = localStorage.getItem('jwt')
		if (token) dispatch({ type: 'LOGIN', payload: JWTToken })
		if (!token) {
			dispatch({ type: 'LOGOUT' })
			navigate('/login')
		} 
	}, [])

	return { token }
}
