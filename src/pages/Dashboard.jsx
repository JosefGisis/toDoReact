import MainLayout from '../layouts/MainLayout'
import ToDoLists from '../features/ToDos/components/ToDoList'
import NewList from '../features/NewList'
import ToDos from '../features/ToDos'

function Home() {
	return (
		<MainLayout>
			<ToDoLists />
			<NewList />
			<ToDos />
		</MainLayout>
	)
}

export default Home
