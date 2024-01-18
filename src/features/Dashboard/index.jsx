import SectionFrame from '../../components/SectionFrame'
import ActiveList from '../ActiveList/ActiveList'
import NewToDoForm from '../NewToDo/NewToDoForm'
import ToDos from '../ToDos'
import Lists from '../Lists/index'
import NewList from '../NewList/index'
import { useAuth } from './hooks/useAuth'
import { useReducer } from 'react'
import activeListReducer from '../../state-management/reducers/activeListReducer'
import ActiveListContext from '../../state-management/contexts/ActiveListContext'

function Dashboard() {
	const { token } = useAuth()
	console.log(token)
	const [activeList, dispatch] = useReducer(activeListReducer, {})

	return (
		<ActiveListContext.Provider value={{ activeList, dispatch }}>
			<Lists />
			<NewList />

			<SectionFrame>
				<ActiveList />
				<NewToDoForm />
				<ToDos />
			</SectionFrame>
		</ActiveListContext.Provider>
	)
}

export default Dashboard
