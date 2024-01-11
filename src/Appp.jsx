import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import Login from './pages/Login'
import SignUpPage from './pages/SignUpPage'
import Dashboard from './pages/Dashboard'
import { useParams } from 'react-router-dom'
import { list } from 'postcss'

function Appp() {
	return (
		<Router>
			<Routes>
				<Route path="/login" Component={Login} />
				<Route path="/signup" Component={SignUpPage} />
				<Route path="/" Component={Dashboard} />
				<Route path="/lists" Component={Lists}></Route>
				<Route path="/lists/:listId" Component={List}></Route>
				<Route path="/profile"></Route>
			</Routes>
		</Router>
	)
}

function Lists() {
	const lists = [1, 2, 3, 4, 5, 6]

	return (
		<div>
            <ul>
                {lists.map((list) => (
                    <li key={list}>
                        <Link to={`lists/${list}`}>list #{list}</Link>
                    </li>
                ))}
            </ul>
		</div>
	)
}

function List() {
	const { listId } = useParams()
	return (
        <div>
            <h1>list {listId}</h1>
        </div>
    )
}

export default Appp
