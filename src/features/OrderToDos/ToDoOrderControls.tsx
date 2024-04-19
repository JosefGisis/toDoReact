import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectActiveList } from '../../app/activeListSlice'
import { useGetToDosQuery } from '../../api/toDosSlice'
import { useAuth } from '../../hooks/useAuth'

import { GoSortAsc, GoSortDesc } from 'react-icons/go'

import type { ToDo as ToDoType } from '../../api/toDosSlice'
import type { OrderToDosProps } from '.'
import type { CustomErrorType } from 'api/types'

// to-do sort parameter options
export type ToDoSortByType = 'title' | 'creationDate' | 'lastModified'

// to-do sort order options
export type ToDoSortOrderType = 'ASC' | 'DESC'

// sort by and sort order type
export type ToDoSortType = {
	by: ToDoSortByType
	order: ToDoSortOrderType
}

function ToDoOrderControls({ setOrderedToDos, setToDosStatus }: OrderToDosProps) {
	const [sort, setSort] = useState<ToDoSortType>({ by: 'title', order: 'ASC' })
	const activeList = useSelector(selectActiveList)

	const { logout } = useAuth()
	const {
		data: toDosList,
		error,
		isLoading,
	} = useGetToDosQuery()

	// sort options are to-do parameters for sorting
	const sortOptions = [
		{ value: 'title', label: 'Title' },
		{ value: 'dueDate', label: 'Due-date' },
		{ value: 'creationDate', label: 'Created' },
		{ value: 'lastModified', label: 'Updated' },
	]

	const filterToDos = useCallback((toDosList: ToDoType[], activeListId?: number) => {
		if (activeListId) return toDosList.filter((toDo) => toDo.membership === activeListId)
		else return toDosList.filter((toDo) => toDo.membership === null)
	}, [])

	const sortToDos = useCallback((toDos: ToDoType[], criterion: ToDoSortByType = 'title', order: ToDoSortOrderType = 'ASC') => {
		// If to-dos are not of type array (e.g. null, object, undefined, etc.), orderedToDos defaults to an empty list
		if (!Array.isArray(toDos)) return []

		const isDesc = order === 'DESC'
		let greaterThanDir = isDesc ? -1 : 1
		let lessThanDir = isDesc ? 1 : -1

		// need to create a copy of toDos to avoid mutating the original array
		const toDosCopy = [...toDos]

		const sortedToDos = toDosCopy.sort((toDo1, toDo2) => {
			const prop1 = toDo1[criterion]?.toUpperCase()
			const prop2 = toDo2[criterion]?.toUpperCase()
			return prop1 === prop2 ? 0 : prop1 > prop2 ? greaterThanDir : lessThanDir
		})

		return sortedToDos
	}, [])
	useEffect(() => {
		// if isLoading or no to-dos, set orderedToDos to empty array
		if (isLoading || !Array.isArray(toDosList)) {
			setToDosStatus('loading')
			setOrderedToDos([])
			return
		}

		// need to select to-dos based on activeList or no activeList
		let toDos: ToDoType[] | undefined = undefined
		if (toDosList) toDos = filterToDos(toDosList, activeList?.id)

		// If nothing is set to toDos, set orderedToDos to empty array
		if (!toDos) {
			setToDosStatus('loading')
			setOrderedToDos([])
			return
		}

		// sort to-dos based on sort.by and sort.order
		const sortedToDos = sortToDos(toDos, sort.by, sort.order)

		// if sortedToDos has length, set orderedToDos to sortedToDos, else set orderedToDos to empty array
		if (sortedToDos?.length) {
			setOrderedToDos([...sortedToDos])
			setToDosStatus('hasToDos')
		} else {
			setOrderedToDos([])
			setToDosStatus('noToDos')
		}
	}, [activeList, toDosList, sort, isLoading])

	// handle error
	useEffect(() => {
		const anyError = error as CustomErrorType
		if (anyError?.status === 401) return logout()
	}, [error])

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
				<button
					className="btn btn-primary btn-outline"
					onClick={() => setSort((prevSort) => ({ ...prevSort, order: prevSort.order === 'ASC' ? 'DESC' : 'ASC' }))}
				>
					<div className="swap-off flex items-center justify-between">
						{sort.order === 'ASC' ? <GoSortAsc className="w-5 h-5" /> : <GoSortDesc className="w-5 h-5" />}
					</div>
				</button>
			</div>
		</div>
	)
}

export default ToDoOrderControls
