import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../../../state-management/Token/AuthContext'

function useAuth() {
	const { token, dispatch } = useContext(AuthContext)
	const navigate = useNavigate()

	useEffect(() => {
		console.log('first')
		const JWTToken = localStorage.getItem('jwt')
		if (JWTToken) {
			dispatch( {type: 'LOGIN', value: {token: JWTToken} } )
		}
		if (!JWTToken) {
			dispatch({ type: 'LOGOUT', value: {}})
			navigate('/login')
		}
	}, [])
}

export default useAuth