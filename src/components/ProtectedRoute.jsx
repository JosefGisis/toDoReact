import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../state-management/Token/AuthProvider'

function ProtectedRoute() {
	const { getToken } = useAuth()
	const token = getToken()
	return token !== null ? <Outlet /> : <Navigate to="/login" />
}

export default ProtectedRoute
