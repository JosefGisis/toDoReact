import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import DashboardPage from './pages/DashboardPage'
import FourOFourPage from './pages/404Page'
import ProtectedRoute from './components/ProtectedRoute'
import AuthProvider from './state-management/Token/AuthProvider'

function App() {
	return (
		<AuthProvider>

			<Router>
				<Routes>

					<Route path="/" element={<ProtectedRoute />}>
						<Route path="" element={<DashboardPage />} />
					</Route>
					<Route path="/login" element={<LoginPage />} />
					<Route path="/signup" element={<SignUpPage />} />
					<Route path="*" element={<FourOFourPage />} />
					
				</Routes>
			</Router>

		</AuthProvider>
	)
}

export default App
