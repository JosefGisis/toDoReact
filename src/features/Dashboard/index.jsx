import SectionFrame from '../../components/SectionFrame'
import ActiveList from '../ActiveList/ActiveList'
import NewToDoForm from '../NewToDo/NewToDoForm'
import ToDos from '../ToDos'
import Lists from '../Lists/index'
import NewList from '../NewList/index'
import { useAuth } from './hooks/useAuth'

function Dashboard() {
    const { token } = useAuth()
    console.log(token)

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
