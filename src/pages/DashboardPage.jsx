import ListProvider from '../state-management/List/ListProvider'
import Lists from '../features/Lists'
import NewList from '../features/NewList'
import SectionFrame from '../components/SectionFrame'
import ActiveList from '../features/ActiveList'
import NewToDoForm from '../features/NewToDo/components/NewToDoForm'
import ToDos from '../features/ToDos'
import Avatar from '../components/Avatar'
import ThemeToggler from '../components/ThemeToggler'

function DashboardPage() {
	return (
		<div className="max-w-screen-lg m-auto px-4 ">
			<div className="navbar">
				<div className="flex-1">
					<a href="/" className="btn btn-ghost text-xl">
						UNTITLED TO-DO APP
					</a>
				</div>
				<div className="flex-none">
					<ThemeToggler />
					<Avatar />
				</div>
			</div>

				<ListProvider>
			<div className='flex flex-row'>
				<div className='w-[25%]'>
					<Lists />
					<NewList />
				</div>
				<div className='w-[75%]'>
					<SectionFrame>
						<ActiveList />
						<NewToDoForm />
						<ToDos />
					</SectionFrame>
				</div>

			</div>
				</ListProvider>
		</div>
	)
}

export default DashboardPage
