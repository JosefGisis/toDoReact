import { Navigate, Outlet } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../state-management/Token/AuthContext'

function ProtectedRoute() {
	const { token } = useContext(AuthContext)

	if (token === null) return <Navigate to="/login" />

	if (token === 'loading') return null

	return <Outlet />
}

export default ProtectedRoute