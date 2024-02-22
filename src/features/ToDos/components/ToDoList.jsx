import { useState } from 'react'
import { GoChevronRight, GoChevronDown } from 'react-icons/go'

import ToDo from './ToDo'
import EmptyListMessage from './EmptyListMessage'
import AllToDosCompletedMessage from './AllToDosCompletedMessage'

function ToDoList({ orderedToDos }) {
	const [showCompleted, setShowCompleted] = useState(true)

	return (
		<>
			{orderedToDos?.length ? (
				<div>
					{/* message for completed list and controls for completed list */}
					<AllToDosCompletedMessage />
					{/* displays non-completed to-dos */}
					<div>{orderedToDos?.map((toDo, i) => toDo.completed === 0 && <ToDo key={i} toDoData={toDo}></ToDo>)}</div>

					{/* button to toggle completed to-dos visibility */}
					{orderedToDos?.find((toDo) => toDo.completed === 1) && (
						<button className="btn btn-success flex items-center" onClick={() => setShowCompleted(!showCompleted)}>
							<p className="mr-2">completed</p>
							{showCompleted ? <GoChevronDown className="w-5 h-5" /> : <GoChevronRight className="w-5 h-5" />}
						</button>
					)}

					{/* displays completed to-dos */}
					{showCompleted && <div>{orderedToDos?.map((toDo, i) => toDo.completed === 1 && <ToDo key={i} toDoData={toDo}></ToDo>)}</div>}
				</div>
			) : (
				<EmptyListMessage />
			)}
		</>
	)
}

export default ToDoList
