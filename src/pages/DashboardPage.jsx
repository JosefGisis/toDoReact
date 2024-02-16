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
			<div className="w-screen h-screen max-h-screen overflow-hidden flex flex-col">
				{/* navigation is fixed, so it is placed at the top for clarity.  */}
				<div className="flex flex-row border border-red-300" style={{ flex: '0 0 120px' }}>
					<Navigation />
				</div>

				<div className="flex flex-row gap-2 flex-auto" >
					{/* List Column */}
					<div className="flex flex-col justify-between h-full border px-2 border-yellow-500" style={{flex:'0 0 25%'}}>
							<DefaultList />

						<div className="overflow-y-auto flex flex-auto">

							<Lists />
						</div>
						<div className="flex bottom-0 bg-base-100 z-[10] py-6">
							<NewList />
						</div>
					</div>

					{/* ToDos Column */}
					<div className="flex flex-col border border-green-400  px-2" style={{flex:'1 1 auto'}}>
						{/* ToDos List Header */}
						<div className="bg-base-100 z-[10] border border-red-400" style={{ flex: '0 0 60px' }}>
							<ActiveList />
						</div>

						<div className="border border-red-400 overflow-y-auto" style={{ flex: '1 1 auto' }}>
							<ToDos />
						</div>

						<div className="bg-base-100 z-[10] py-6 border border-red-500" style={{ flex: '0 0 60px' }}>
							<NewToDoForm />
						</div>
					</div>
				</div>
			</div>
		</ListProvider>
	)
}

export default DashboardPage
