import ToDo from './ToDo'
import EmptyListMessage from './EmptyListMessage'
import { useListContext } from '../../../hooks/useListContext'
import { useEffect, useState } from 'react'

function ToDoList() {
	const { toDos, activeList } = useListContext()
	const [activeToDos, setActiveToDos] = useState(toDos || [])

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
			{activeToDos.find((toDo) => toDo.completed === 1) && <div className="mt-3 mb-6 h-2 bg-slate-500"></div>}
			<div>{activeToDos?.map((toDo, i) => toDo.completed === 1 && <ToDo key={i} data={toDo}></ToDo>)}</div>
		</div>
	) : (
		<EmptyListMessage />
	)
}

export default ToDoList