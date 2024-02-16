import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import DashboardPage from './pages/DashboardPage'
import ProfilePage from './pages/ProfilePage'
import FourOFourPage from './pages/404Page'

import ProtectedRoute from './components/ProtectedRoute'
import UserProvider from './state-management/User/UserProvider'

export default function App() {
	return (
		<Router>
			<UserProvider>

				<Routes>
					<Route path="/" element={<ProtectedRoute />}>
						<Route path="" element={<DashboardPage />} />
						<Route path="profile" element={<ProfilePage />} />
					</Route>
					<Route path="/login" element={<LoginPage />} />
					<Route path="/signup" element={<SignUpPage />} />
					<Route path="*" element={<FourOFourPage />} />
				</Routes>
				
			</UserProvider>
		</Router>
	)
}
