import { useState } from 'react'
import { GoChevronRight, GoChevronDown } from 'react-icons/go'

import ToDo from './ToDo'
import EmptyListMessage from './EmptyListMessage'
import AllToDosCompletedMessage from './AllToDosCompletedMessage'
import FullPageLoadingIndicator from '../../components/FullPageLoadingIndicator'

import type { ToDosProps } from '.'
import type { ToDo as ToDoType } from '../../api/toDosSlice'
import type { Dispatch, SetStateAction } from 'react'

export interface ToDoPropsWithEditingId{
	toDoData: ToDoType
	editingId: null | number
	setEditingId: Dispatch<SetStateAction<null | number>>
}

function ToDoList({ orderedToDos, toDosStatus }: ToDosProps) {
	const [showCompleted, setShowCompleted] = useState(true)
	const [editingId, setEditingId] = useState<null | number>(null)

	// conditional rendering for to-do list
	if (toDosStatus === 'loading') return <FullPageLoadingIndicator />

	if (toDosStatus === 'hasToDos') return (
		<div>
			{/* message for completed list and controls for completed list */}
			<AllToDosCompletedMessage orderedToDos={orderedToDos} />
			{/* displays non-completed to-dos */}
			<div>{orderedToDos?.map((toDo, i) => !toDo.completed && <ToDo key={i} toDoData={toDo} editingId={editingId} setEditingId={setEditingId}></ToDo>)}</div>

			{/* button to toggle completed to-dos visibility */}
			{orderedToDos?.find((toDo) => toDo.completed) && (
				<div>
					<hr className="border-2 border-neutral mb-3" />
					<button className="btn btn-secondary flex items-center mb-2" onClick={() => setShowCompleted(!showCompleted)}>
						<p className="mr-2">completed</p>
						{showCompleted ? <GoChevronDown className="w-5 h-5" /> : <GoChevronRight className="w-5 h-5" />}
					</button>
				</div>
			)}

			{/* displays completed to-dos */}
			<div className="mt-3">
				{showCompleted && <div>{orderedToDos?.map((toDo, i) => toDo.completed && <ToDo key={i} toDoData={toDo} editingId={editingId} setEditingId={setEditingId}></ToDo>)}</div>}
			</div>
		</div>
	)
	
	return <EmptyListMessage />
}

export default ToDoList
