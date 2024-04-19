import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function ProtectedRoute() {
	const { getToken } = useAuth()
	const token = getToken()
	return token !== null ? <Outlet /> : <Navigate to="/login" />
}
