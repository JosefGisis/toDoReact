import { useCallback, useMemo, useState } from 'react'
import ToDo from './ToDo'
import EmptyListMessage from './EmptyListMessage'
import { useListContext } from '../../../hooks/useListContext'
import { GoChevronRight, GoChevronDown, GoSortAsc, GoSortDesc } from 'react-icons/go'

function ToDoList() {
	const [sort, setSort] = useState({ by: 'title', order: 'ASC' })
	const { toDos, activeList } = useListContext()
	const [showCompleted, setShowCompleted] = useState(true)

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
		return sortedToDos
	}, [])

	function toggleSortOrder() {
		setSort({ ...sort, order: sort.order === 'ASC' ? 'DESC' : 'ASC' })
	}

	const sortedToDos = useMemo(() => ( activeList ? sortToDos(activeList.toDos, sort.by, sort.order) : sortToDos(toDos, sort.by, sort.order)), [activeList, toDos, sort])

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

			<div>
				{sortedToDos?.length ? (
					<div>
						<div>{sortedToDos?.map((toDo, i) => toDo.completed === 0 && <ToDo key={i} data={toDo}></ToDo>)}</div>

						{sortedToDos?.find((toDo) => toDo.completed === 1) && (
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
				)}
			</div>
		</div>
	)
}

export default ToDoList
