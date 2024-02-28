import { useState } from 'react'

import ListProvider from '../state-management/List/ListProvider'
import Lists from '../features/Lists'
import NewList from '../features/NewList'
import ActiveList from '../features/ActiveList'
import NewToDoForm from '../features/NewToDo/components/NewToDoForm'
import ToDos from '../features/ToDos'
import Navigation from '../features/Navigation'
import DefaultList from '../features/DefaultList'
import OrderLists from '../features/OrderLists'
import OrderToDos from '../features/OrderToDos'

function DashboardPage() {
	const [orderedLists, setOrderedLists] = useState([])
	const [orderedToDos, setOrderedToDos] = useState([])

	return (
		<ListProvider>
			<div className="w-screen h-screen overflow-hidden">
				{/* navigation bar with profile controls */}
				<div className="flex items-center h-[80px]">
					<Navigation />
				</div>

				<div className='px-3'>
					<div className="flex flex-row max-w-screen-lg mx-auto" style={{ height: 'calc(100vh - 80px)' }}>
						{/* List Column */}
						<div className="flex flex-col px-2 grow-0 shrink-0 basis-3/12">
							<div className="flex-none my-2">
								<DefaultList />
							</div>

							<div className="flex-none">
								<OrderLists setOrderedLists={setOrderedLists} />
							</div>

							<div className="flex-auto overflow-y-auto">
								<Lists orderedLists={orderedLists} />
							</div>

							<div className="py-6 flex-none">
								<NewList />
							</div>
						</div>

						{/* ToDos Column */}
						<div className="flex flex-col flex-auto px-2">
							{/* ToDos List Header */}
							<div className="flex-none my-2">
								<ActiveList />
							</div>

							<div className="flex-none mb-6">
								<OrderToDos setOrderedToDos={setOrderedToDos} />
							</div>

							<div className="overflow-y-auto flex-auto">
								<ToDos orderedToDos={orderedToDos} />
							</div>

							<div className="py-6 flex-none">
								<NewToDoForm />
							</div>
						</div>
					</div>
				</div>
			</div>
		</ListProvider>
	)
}

export default DashboardPage
