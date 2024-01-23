import { BrowserRouter as Router, Route, Routes, Redirect } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import DashboardPage from './pages/DashboardPage'
import FourOFourPage from './pages/404Page'

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" Component={DashboardPage} />
				<Route path="/login" Component={LoginPage} />
				<Route path="/signup" Component={SignUpPage} />
				<Route path="*" Component={FourOFourPage} />
			</Routes>
		</Router>
	)
}

export default App
