import { useState } from 'react'

import Lists from '../features/Lists'
import NewList from '../features/NewList'
import ActiveList from '../features/ActiveList'
import NewToDo from '../features/NewToDo'
import ToDos from '../features/ToDos'
import Navigation from '../features/Navigation'
import DefaultList from '../features/DefaultList'
import OrderLists from '../features/OrderLists'
import OrderToDos from '../features/OrderToDos'

import type { List as ListType } from '../api/listsSlice'
import type { ToDo as ToDoType } from '../api/toDosSlice'

function DashboardPage() {
	const [orderedLists, setOrderedLists] = useState<ListType[]>([])
	const [listsStatus, setListsStatus] = useState<'loading' | 'hasLists' | 'noLists'>('loading')
	const [orderedToDos, setOrderedToDos] = useState<ToDoType[]>([])
	const [toDosStatus, setToDosStatus] = useState<'loading' | 'hasToDos' | 'noToDos'>('loading')

	return (
		<div className="w-screen h-screen overflow-hidden">
			{/* navigation bar with profile controls */}
			<div className="flex items-center h-[80px] bg-base-300">
				<Navigation />
			</div>

			{/* main content section */}
			{/* following div creates a responsive horizontal buffer that only applies on smaller screen */}
			<div className="px-3">
				<div className="flex flex-row max-w-screen-lg mx-auto" style={{ height: 'calc(100vh - 80px)' }}>
					{/* List Column */}
					<div className="flex flex-col px-2 grow-0 shrink-0 basis-4/12 bg-base-200">
						{/* default list (non list associated to-dos) button */}
						<div className="flex-none mt-2 mb-4">
							<DefaultList />
						</div>

						{/* separates default list button and order controls  */}
						<hr className="border-2 border-neutral" />

						{/* list sort controls */}
						<div className="flex-none mt-4">
							<OrderLists setOrderedLists={setOrderedLists} setListsStatus={setListsStatus} />
						</div>

						{/* lists list */}
						<div className="flex-auto overflow-y-auto pr-1 mt-4">
							<Lists orderedLists={orderedLists} listsStatus={listsStatus} />
						</div>

						{/* new list form */}
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

						{/* to-do sort controls */}
						<div className="flex-none mb-6">
							<OrderToDos setOrderedToDos={setOrderedToDos} setToDosStatus={setToDosStatus} />
						</div>

						{/* to-do list */}
						<div className="overflow-y-auto flex-auto pr-1">
							<ToDos orderedToDos={orderedToDos} toDosStatus={toDosStatus} />
						</div>

						{/* new to-do form */}
						<div className="py-6 flex-none">
							<NewToDo />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default DashboardPage
