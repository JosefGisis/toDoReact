import { useCallback, useEffect, useState } from 'react'
import { GoSortAsc, GoSortDesc } from 'react-icons/go'

import { useListContext } from '../../../hooks/useListContext'

function ToDoOrderControls({ setOrderedToDos }) {
	const [sort, setSort] = useState({ by: 'title', order: 'ASC' })
	const { toDos, activeList } = useListContext()

	const sortOptions = [
		{ value: 'title', label: 'Title' },
		{ value: 'due_date', label: 'Due-date' },
		{ value: 'creation_date', label: 'Created' },
		{ value: 'last_modified', label: 'Updated' },
	]

	const sortToDos = useCallback((toDos, criterion = 'title', order = 'ASC') => {
		if (!toDos) return []
		if (!toDos.length) return []
		const isDesc = order === 'DESC'
		let greaterThanDir = isDesc ? -1 : 1
		let lessThanDir = isDesc ? 1 : -1
		const sortedToDos = toDos.sort((toDo1, toDo2) => {
			const prop1 = toDo1[criterion].toUpperCase()
			const prop2 = toDo2[criterion].toUpperCase()
			return prop1 === prop2 ? 0 : prop1 > prop2 ? greaterThanDir : lessThanDir
		})
		setOrderedToDos([...sortedToDos])
	}, [])

	function toggleSortOrder() {
		setSort({ ...sort, order: sort.order === 'ASC' ? 'DESC' : 'ASC' })
	}

	useEffect(() => {
		activeList ? sortToDos(activeList.toDos, sort.by, sort.order) : sortToDos(toDos, sort.by, sort.order)
	}, [activeList, toDos, sort])

	return (
		<div>
			<div className="flex items-center">
				<select
					value={sort.by}
					onChange={(e) => setSort({ ...sort, by: e.target.value })}
					className="select flex-auto select-secondary text-secondary w-full max-w-xs mr-2"
				>
					{sortOptions.map(({ value, label }, index) => (
						<option key={index} disabled={value === sort.by} selected={value === sort.by} value={value}>
							{label}
						</option>
					))}
				</select>

				<button className="btn btn-primary btn-outline grow-0" onClick={toggleSortOrder}>
					<div className="swap-off flex items-center justify-between grow-0 shrink-1">
						{sort.order === 'ASC' ? <GoSortAsc className="w-5 h-5" /> : <GoSortDesc className="w-5 h-5" />}
					</div>
				</button>
			</div>
		</div>
	)
}

export default ToDoOrderControls
