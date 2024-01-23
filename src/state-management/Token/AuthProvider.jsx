import { useEffect, useReducer } from 'react'
import authReducer from './authReducer.js'
import AuthContext from './AuthContext.js'

function AuthProvider({ children }) {
	const [token, dispatch] = useReducer(authReducer, {})

	useEffect(() => {
		const JWTToken = localStorage.getItem('jwt')
		if(JWTToken){
			dispatch({ type: 'LOGIN', value: {token: JWTToken} })
		}
	}, [])
	
	return <AuthContext.Provider value={{ token, dispatch }}>{children}</AuthContext.Provider>
}

export default AuthProvider
