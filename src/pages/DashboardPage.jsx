import ListProvider from '../state-management/List/ListProvider'
import Lists from '../features/Lists'
import NewList from '../features/NewList'
import ActiveList from '../features/ActiveList'
import NewToDoForm from '../features/NewToDo/components/NewToDoForm'
import ToDos from '../features/ToDos'
import Navigation from '../features/Navigation'
import DefaultList from '../features/DefaultList'

function DashboardPage() {
	return (
		<ListProvider>
			<div className="max-w-screen-lg m-auto px-4">
				{/* navigation is fixed, so it is placed at the top for clarity.  */}
				<Navigation />

				<div className="flex flex-row justify-between">
					<div className="w-[25%] pt-16 flex flex-col justify-between overflow-y-scroll h-screen">
						<DefaultList />
						<Lists />
						<div className="sticky bottom-0 bg-base-100 z-[10] py-6">
							<NewList />
						</div>
					</div>

					<div className="w-[73%] pt-16 flex flex-col justify-between overflow-y-scroll h-screen">
						<div>
							<div className="sticky top-0 bg-base-100 z-[10] py-6">
								<ActiveList />
							</div>
							<div>
								<ToDos />
							</div>
						</div>
						<div className="sticky bottom-0 bg-base-100 z-[10] py-6">
							<NewToDoForm />
						</div>
					</div>
				</div>
			</div>
		</ListProvider>
	)
}

export default DashboardPage
