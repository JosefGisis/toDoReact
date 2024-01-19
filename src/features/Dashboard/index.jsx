import SectionFrame from '../../components/SectionFrame'
import ActiveList from '../ActiveList/ActiveList'
import NewToDoForm from '../NewToDo/NewToDoForm'
import ToDos from '../ToDos'
import Lists from '../Lists/index'
import NewList from '../NewList/index'
import AuthProvider from '../../state-management/Token/AuthProvider'
import ActiveListProvider from '../../state-management/ActiveList/ActiveListProvider'

function Dashboard() {
	return (
			<ActiveListProvider>

				<Lists />
				<NewList />

				<SectionFrame>
					<ActiveList />
					<NewToDoForm />
					<ToDos />
				</SectionFrame>

			</ActiveListProvider>
	)
}

export default Dashboard
