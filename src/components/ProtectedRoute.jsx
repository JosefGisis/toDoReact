import { Navigate, Outlet } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../state-management/Token/AuthContext'

function ProtectedRoute() {
	const { token } = useContext(AuthContext)
	return token !== null ? <Outlet /> : <Navigate to="/login" />
}

export default ProtectedRoute
