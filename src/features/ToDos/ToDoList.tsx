import { useState } from 'react'
import { GoChevronRight, GoChevronDown } from 'react-icons/go'

import ToDo from './ToDo'
import EmptyListMessage from './EmptyListMessage'
import AllToDosCompletedMessage from './AllToDosCompletedMessage'
import ToDoSkeleton from './ToDoSkeleton'

import type { ToDosProps } from '.'

function ToDoList({ orderedToDos, toDosStatus }: ToDosProps) {
	const [showCompleted, setShowCompleted] = useState(true)

	// conditional rendering for to-do list
	let content
	if (toDosStatus === 'loading') {
		content = (
			<>
				<ToDoSkeleton />
				<ToDoSkeleton />
				<ToDoSkeleton />
				<ToDoSkeleton />
			</>
		)
	} else if (toDosStatus === 'hasToDos') {
		content = (
			<div>
				{/* message for completed list and controls for completed list */}
				<AllToDosCompletedMessage orderedToDos={orderedToDos} />
				{/* displays non-completed to-dos */}
				<div>{orderedToDos?.map((toDo, i) => !toDo.completed && <ToDo key={i} toDoData={toDo}></ToDo>)}</div>

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
					{showCompleted && <div>{orderedToDos?.map((toDo, i) => toDo.completed && <ToDo key={i} toDoData={toDo}></ToDo>)}</div>}
				</div>
			</div>
		)
	} else {
		content = <EmptyListMessage />
	}

	return <>{content}</>
}

export default ToDoList
