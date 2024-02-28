import { useState, useCallback, useEffect } from 'react'
import { GoSortAsc, GoSortDesc } from 'react-icons/go'

import { useListContext } from '../../../hooks/useListContext'

export default function ListOrderControls({ setOrderedLists }) {
	const [sort, setSort] = useState({ by: 'creationDate', order: 'DESC' })
	const { lists } = useListContext()

	const sortOptions = [
		{ value: 'title', label: 'Title' },
		{ value: 'creationDate', label: 'Created' },
		{ value: 'lastModified', label: 'Updated' },
	]

	const sortLists = useCallback((lists, criterion, order) => {
		// If lists are not of type array (e.g. null, object, undefined, etc.), orderedLists defaults to an empty list
		if (!Array.isArray) {
			setOrderedLists([])
			return
		}
		const isDesc = order === 'DESC'
		let greaterThanDir = isDesc ? -1 : 1
		let lessThanDir = isDesc ? 1 : -1
		const sortedLists = lists.sort((list1, list2) => {
			const prop1 = list1[criterion].toUpperCase()
			const prop2 = list2[criterion].toUpperCase()
			return prop1 === prop2 ? 0 : prop1 > prop2 ? greaterThanDir : lessThanDir
		})
		setOrderedLists([...sortedLists])
	}, [])
	useEffect(() => {
		sortLists(lists, sort.by, sort.order)
	}, [lists, sortLists, sort])

	function toggleSortOrder() {
		setSort((prevSort) => ({ ...prevSort, order: prevSort.order === 'ASC' ? 'DESC' : 'ASC' }))
	}

	return (
		<div className="flex items-center mb-4">
			{/* select for order.by */}
			<select
				value={sort.by}
				onChange={(e) => setSort({ ...sort, by: e.target.value })}
				className="select flex-auto select-secondary text-secondary w-full max-w-xs mr-2"
			>
				{sortOptions.map(({ value, label }, index) => (
					<option key={index} disabled={value === sort.by} value={value}>
						{label}
					</option>
				))}
			</select>

			{/* swap button for order.by */}
			<button className="btn btn-primary btn-outline grow-0" onClick={toggleSortOrder}>
				<div className="swap-off flex items-center justify-between grow-0 shrink-1">
					{sort.order === 'ASC' ? <GoSortAsc className="w-5 h-5" /> : <GoSortDesc className="w-5 h-5" />}
				</div>
			</button>
		</div>
	)
}
