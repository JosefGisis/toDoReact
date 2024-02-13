import ToDo from './ToDo'
import EmptyListMessage from './EmptyListMessage'
import { useListContext } from '../../../hooks/useListContext'
import { useEffect, useState } from 'react'
import { GoChevronRight, GoChevronDown } from 'react-icons/go'

function ToDoList() {
	const { toDos, activeList } = useListContext()
	const [activeToDos, setActiveToDos] = useState(toDos || [])
	const [showCompleted, setShowCompleted] = useState(true)

	useEffect(() => {
		if (activeList) {
			setActiveToDos(activeList.toDos)
			return
		}

		if (!activeList) {
			setActiveToDos(toDos)
		}
	}, [activeList, toDos])

	return activeToDos.length ? (
		<div>
			<div>{activeToDos?.map((toDo, i) => toDo.completed === 0 && <ToDo key={i} data={toDo}></ToDo>)}</div>

			{activeToDos.find((toDo) => toDo.completed === 1) && (
				<button className="btn btn-success" onClick={() => setShowCompleted(!showCompleted)}>
					<div className='flex items-center'>
						<p className='mr-2'>completed</p>
						{ showCompleted ? 
						<GoChevronDown className='w-5 h-5'/> :
						<GoChevronRight className='w-5 h-5' />
						}
					</div>
				</button>
			)}
			{
				showCompleted && 
				<div>{activeToDos?.map((toDo, i) => toDo.completed === 1 && <ToDo key={i} data={toDo}></ToDo>)}</div>

			}

		</div>
	) : (
		<EmptyListMessage />
	)
}

export default ToDoList
