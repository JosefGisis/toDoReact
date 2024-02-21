import { useCallback, useEffect, useState } from 'react'
import { GoSortAsc, GoSortDesc } from 'react-icons/go'

import { useListContext } from '../../../hooks/useListContext'

function ToDoOrderControls({ setOrderedToDos }) {
	const [sort, setSort] = useState({ by: 'title', order: 'ASC' })
	const { toDos, activeList } = useListContext()

	// sort options are to-do parameters for sorting
	const sortOptions = [
		{ value: 'title', label: 'Title' },
		{ value: 'due_date', label: 'Due-date' },
		{ value: 'creation_date', label: 'Created' },
		{ value: 'last_modified', label: 'Updated' },
	]

	const sortToDos = useCallback((toDos, criterion = 'title', order = 'ASC') => {
		// If to-dos are not of type array (e.g. null, object, undefined, etc.), orderedToDos defaults to an empty list
		if (!Array.isArray(toDos)) {
			setOrderedToDos([])
			return
		}
		const isDesc = order === 'DESC'
		let greaterThanDir = isDesc ? -1 : 1
		let lessThanDir = isDesc ? 1 : -1
		const sortedToDos = toDos.sort((toDo1, toDo2) => {
			const prop1 = toDo1[criterion]?.toUpperCase()
			const prop2 = toDo2[criterion]?.toUpperCase()
			return prop1 === prop2 ? 0 : prop1 > prop2 ? greaterThanDir : lessThanDir
		})
		setOrderedToDos([...sortedToDos])
	}, [])
	useEffect(() => {
		// checks if non-list to-dos need to be sorted or vice versa
		activeList ? sortToDos(activeList.toDos, sort.by, sort.order) : sortToDos(toDos, sort.by, sort.order)
	}, [activeList, toDos, sort])

	function toggleSortOrder() {
		setSort((prevSort) => ({ ...prevSort, order: prevSort.order === 'ASC' ? 'DESC' : 'ASC' }))
	}

	return (
		<div>
			<div className="flex items-center max-w-[15rem]">
				{/* select for order.by */}
				<select
					value={sort.by}
					onChange={(e) => setSort((prevSort) => ({ ...prevSort, by: e.target.value }))}
					className="select flex-auto select-secondary text-secondary mr-2"
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