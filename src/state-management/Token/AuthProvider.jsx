import { useEffect, useReducer, useState } from 'react'
import authReducer from './authReducer.js'
import AuthContext from './AuthContext.js'

function AuthProvider({ children }) {
	const [token, dispatch] = useReducer(authReducer, 'loading')
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const JWTToken = localStorage.getItem('jwt')
		if (JWTToken) dispatch({ type: 'LOGIN', payload: JWTToken })
		else dispatch({ type: 'LOGOUT' })
		setLoading(false)
	}, [])

	if (loading) return null

	return <AuthContext.Provider value={{ token, dispatch }}>{children}</AuthContext.Provider>
}

export default AuthProvider