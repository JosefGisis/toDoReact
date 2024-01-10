import MainLayout from "./layouts/MainLayout"
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"
import NewList from "./features/NewList"
import ToDoLists from "./features/ToDoLists"
import ToDos from "./features/ToDos/"

function App() {

	// implement context and provider
	// implement redux
	return (
		<Router>
			<MainLayout>
				<ul>
					<li className="text-lg text-rose-500 underline"><Link to="/">Home</Link></li>
					<li className="text-lg text-rose-500 underline"><Link to="/hello-there">Hello There!</Link></li>
					<li className="text-lg text-rose-500 underline"><Link to="/hello-world">Hello World!</Link></li>
					<li className="text-lg text-rose-500 underline"><Link to="/bye-now">Bye Now!</Link></li>
				</ul>
				<ToDoLists /> 
				<NewList />
				<ToDos />

				<Routes>
					<Route path='/' element={ <h1>Nothing here</h1> } />
					<Route path='/hello-there' element={ <h1>hello there</h1> } />
					<Route path='/hello-world' element={ <h1>hello world</h1> } />
					<Route path='/bye-now' element={ <h1>bye now</h1> } />
				</Routes>
			</MainLayout>
		</Router>
	)
}

export default App
