import { useContext, useEffect } from 'react'
import SectionFrame from '../../components/SectionFrame'
import ActiveList from '../ActiveList/ActiveList'
import NewToDoForm from '../NewToDo/components/NewToDoForm'
import ToDos from '../ToDos'
import Lists from '../Lists/index'
import NewList from '../NewList/index'
import AuthContext from '../../state-management/Token/AuthContext'
import useAuth from './hooks/useAuth'

function Dashboard() {
	useAuth()
	const { token } = useContext(AuthContext)
	
	useEffect(() => {
		console.log(token)
	}, [token])

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
