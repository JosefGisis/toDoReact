import { useCallback, useMemo, useState } from 'react'
import ToDo from './ToDo'
import EmptyListMessage from './EmptyListMessage'
import { useListContext } from '../../../hooks/useListContext'
import { GoChevronRight, GoChevronDown } from 'react-icons/go'

function ToDoList() {
	const [sort, setSort] = useState({ by: 'title', order: 'ASC' })
	const { toDos, activeList, lists } = useListContext()
	const [showCompleted, setShowCompleted] = useState(true)

	const sortOptions = [
		{ value: 'title', label: 'Title' },
		{ value: 'due_date', label: 'Due-date' },
		{ value: 'creation_date', label: 'Created' },
		{ value: 'last_modified', label: 'Updated' },
	]

	const sortToDos = useCallback((toDos, criterion, order) => {
		if (!toDos) return []
		const isDesc = order === 'DESC'
		let greaterThanDir = isDesc ? -1 : 1
		let lessThanDir = isDesc ? 1 : -1
		const sortedLists = toDos.sort((toDo1, toDo2) => {
			const prop1 = toDo1[criterion].toUpperCase()
			const prop2 = toDo2[criterion].toUpperCase()
			return prop1 === prop2 ? 0 : prop1 > prop2 ? greaterThanDir : lessThanDir
		})
		return sortedLists
	}, [])

	// function toggleSortOrder() {
	// 	setSort({ ...sort, order: sort.order === 'ASC' ? 'DESC' : 'ASC' })
	// }

	const sortedToDos = useMemo(() => {
		if (!activeList) sortToDos(toDos, sort.by, sort.order)
		else sortToDos(activeList?.toDos, sort.by, sort.order)
	}, [activeList, toDos, lists, sort])

	return sortedToDos.length ? (
		<div>
			<div>{sortedToDos?.map((toDo, i) => toDo.completed === 0 && <ToDo key={i} data={toDo}></ToDo>)}</div>

			{sortedToDos.find((toDo) => toDo.completed === 1) && (
				<button className="btn btn-success" onClick={() => setShowCompleted(!showCompleted)}>
					<div className="flex items-center">
						<p className="mr-2">completed</p>
						{showCompleted ? <GoChevronDown className="w-5 h-5" /> : <GoChevronRight className="w-5 h-5" />}
					</div>
				</button>
			)}
			{showCompleted && <div>{sortedToDos?.map((toDo, i) => toDo.completed === 1 && <ToDo key={i} data={toDo}></ToDo>)}</div>}
		</div>
	) : (
		<EmptyListMessage />
	)
}

export default ToDoList
