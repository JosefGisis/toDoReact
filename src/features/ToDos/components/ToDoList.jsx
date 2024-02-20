import { useState } from 'react'
import { GoChevronRight, GoChevronDown } from 'react-icons/go'

import ToDo from './ToDo'
import EmptyListMessage from './EmptyListMessage'

function ToDoList({ orderedToDos }) {
	const [showCompleted, setShowCompleted] = useState(true)

	return (
			<div>
				{orderedToDos?.length ? (
					<div>
						<div>{orderedToDos?.map((toDo, i) => toDo.completed === 0 && <ToDo key={i} data={toDo}></ToDo>)}</div>

						{orderedToDos?.find((toDo) => toDo.completed === 1) && (
							<button className="btn btn-success" onClick={() => setShowCompleted(!showCompleted)}>
								<div className="flex items-center">
									<p className="mr-2">completed</p>
									{showCompleted ? <GoChevronDown className="w-5 h-5" /> : <GoChevronRight className="w-5 h-5" />}
								</div>
							</button>
						)}
						{showCompleted && <div>{ orderedToDos?.map((toDo, i) => toDo.completed === 1 && <ToDo key={i} data={toDo}></ToDo>)}</div>}
					</div>
				) : (
					<EmptyListMessage />
				)}
			</div>
	)
}

export default ToDoList
