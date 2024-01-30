import MainLayout from '../layouts/MainLayout'
import MainFrame from '../components/MainFrame'
import ListProvider from '../state-management/List/ListProvider'
import Lists from '../features/Lists'
import NewList from '../features/NewList'
import SectionFrame from '../components/SectionFrame'
import ActiveList from '../features/ActiveList'
import NewToDoForm from '../features/NewToDo/components/NewToDoForm'
import ToDos from '../features/ToDos'
import DataProvider from '../state-management/data/DataProvider'

function DashboardPage() {
	return (
		<MainLayout>
			<MainFrame>

				<ListProvider>
					<DataProvider>

					<>
						<Lists />
						<NewList />

						<SectionFrame>
							<ActiveList />
							<NewToDoForm />
							<ToDos />
						</SectionFrame>
					</>

					</DataProvider>
				</ListProvider>

			</MainFrame>
		</MainLayout>
	)
}

export default DashboardPage
