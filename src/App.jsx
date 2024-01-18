import { BrowserRouter as Router, Route, Routes, Link, Navigate, Outlet } from 'react-router-dom'
import Login from './pages/Login'
import SignUpPage from './pages/SignUpPage'
import Dashboard from './pages/Dashboard'
import FourOFour from './pages/404'

// implement context and provider
// implement redux

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" Component={Dashboard} />
				<Route path="/login" Component={Login} />
				<Route path="/signup" Component={SignUpPage} />
				<Route path="/profile"></Route>
				<Route path="*" Component={FourOFour}></Route>
			</Routes>
		</Router>
	)
}

export default App
