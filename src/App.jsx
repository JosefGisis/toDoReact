import MainLayout from "./layouts/MainLayout"
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"
import NewList from "./features/NewList"
import ToDoLists from "./features/ToDoLists"
import ToDos from "./features/ToDos/"

function App() {

	// implement context and provider
	// implement redux
	return {
			<MainLayout>
				<ToDoLists /> 
				<NewList />
				<ToDos />
			</MainLayout>
	)
}

export default App
