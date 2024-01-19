import { useReducer } from 'react'
import authReducer from './authReducer.js'
import AuthContext from './AuthContext.js'

function AuthProvider({ children }) {
	const [token, dispatch] = useReducer(authReducer, {})
	return <AuthContext.Provider value={{ token, dispatch }}>{children}</AuthContext.Provider>
}

export default AuthProvider
