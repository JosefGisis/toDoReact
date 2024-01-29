import AuthContext from './AuthContext.js'

function AuthProvider({ children }) {
	return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>
}

export default AuthProvider