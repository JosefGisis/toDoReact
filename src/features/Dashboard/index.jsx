import SectionFrame from '../../components/SectionFrame'
import ActiveList from '../ActiveList'
import NewToDoForm from '../NewToDo/components/NewToDoForm'
import ToDos from '../ToDos'
import Lists from '../Lists/index'
import NewList from '../NewList/index'

function Dashboard() {
	return (
		<>
			<Lists />
			<NewList />

			<SectionFrame>
				<ActiveList />
				<NewToDoForm />
				<ToDos />
			</SectionFrame>
		</>
	)
}

export default Dashboard
