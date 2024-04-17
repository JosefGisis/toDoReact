import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectActiveList } from '../../app/activeListSlice'
import { useGetToDosQuery } from '../../api/toDosSlice'
import { useAuth } from '../../hooks/useAuth'

import { ToDo as ToDoType } from '../../api/toDosSlice'

import { GoSortAsc, GoSortDesc } from 'react-icons/go'

export type ToDoSortByType = 'title' | 'creationDate' | 'lastModified'

export type ToDoSortOrderType = 'ASC' | 'DESC'

export type ToDoSortType = {
	by: ToDoSortByType
	order: ToDoSortOrderType
}

function ToDoOrderControls({ setOrderedToDos }: { setOrderedToDos: React.Dispatch<React.SetStateAction<ToDoType[] | []>> }) {
	const [sort, setSort] = useState<ToDoSortType>({ by: 'title', order: 'ASC' })
	const activeList = useSelector(selectActiveList)

	const { logout } = useAuth()
	const { data: toDosList, error } = useGetToDosQuery() as {
		data: ToDoType[]
		error: any
	}

	// sort options are to-do parameters for sorting
	const sortOptions = [
		{ value: 'title', label: 'Title' },
		{ value: 'dueDate', label: 'Due-date' },
		{ value: 'creationDate', label: 'Created' },
		{ value: 'lastModified', label: 'Updated' },
	]

	const sortToDos = useCallback((toDos: ToDoType[], criterion: ToDoSortByType = 'title', order: ToDoSortOrderType = 'ASC') => {
		// If to-dos are not of type array (e.g. null, object, undefined, etc.), orderedToDos defaults to an empty list
		if (!Array.isArray(toDos)) {
			setOrderedToDos([])
			return
		}
		const isDesc = order === 'DESC'
		let greaterThanDir = isDesc ? -1 : 1
		let lessThanDir = isDesc ? 1 : -1
		const toDosCopy = [...toDos]
		const sortedToDos = toDosCopy.sort((toDo1, toDo2) => {
			const prop1 = toDo1[criterion]?.toUpperCase()
			const prop2 = toDo2[criterion]?.toUpperCase()
			return prop1 === prop2 ? 0 : prop1 > prop2 ? greaterThanDir : lessThanDir
		})
		setOrderedToDos([...sortedToDos])
	}, [])
	useEffect(() => {
		if (error?.status === 401) {
			logout()
			return
		}

		let toDos
		if (toDosList) {
			if (activeList) toDos = toDosList.filter((toDo) => toDo.membership === activeList.id)
			else toDos = toDosList.filter((toDo) => toDo.membership === null)
		}
		
		if (toDos) sortToDos(toDos, sort.by, sort.order)
		else setOrderedToDos([])
	}, [activeList, toDosList, sort])

	function toggleSortOrder() {
		setSort((prevSort) => ({ ...prevSort, order: prevSort.order === 'ASC' ? 'DESC' : 'ASC' }))
	}

	return (
		<div>
			<div className="flex items-center max-w-[15rem]">
				{/* select for order.by */}
				<select
					value={sort.by}
					onChange={(e) => setSort((prevSort) => ({ ...prevSort, by: e.target.value as ToDoSortByType }))}
					className="select select-secondary text-secondary w-40 mr-3"
				>
					{sortOptions.map(({ value, label }, index) => (
						<option key={index} disabled={value === sort.by} value={value}>
							{label}
						</option>
					))}
				</select>

				{/* swap button for order.by */}
				<button className="btn btn-primary btn-outline" onClick={toggleSortOrder}>
					<div className="swap-off flex items-center justify-between">
						{sort.order === 'ASC' ? <GoSortAsc className="w-5 h-5" /> : <GoSortDesc className="w-5 h-5" />}
					</div>
				</button>
			</div>
		</div>
	)
}

export default ToDoOrderControls
