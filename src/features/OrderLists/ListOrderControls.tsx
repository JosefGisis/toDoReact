import { useState, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { GoSortAsc, GoSortDesc } from 'react-icons/go'

import { useGetListsQuery } from '../../api/listsSlice'

export default function ListOrderControls({ setOrderedLists }) {
	const [sort, setSort] = useState({ by: 'creationDate', order: 'DESC' })
	const navigate = useNavigate()
	
	const { data: lists, error } = useGetListsQuery()

	const sortOptions = [
		{ value: 'title', label: 'Title' },
		{ value: 'creationDate', label: 'Created' },
		{ value: 'lastModified', label: 'Updated' },
	]

	const sortLists = useCallback((lists, criterion, order) => {
		// If lists are not of type array (e.g. null, object, undefined, etc.), orderedLists defaults to an empty list
		if (!Array.isArray(lists)) {
			setOrderedLists([])
			return
		}
		const isDesc = order === 'DESC'
		let greaterThanDir = isDesc ? -1 : 1
		let lessThanDir = isDesc ? 1 : -1
		const listCopy = [...lists]
		const sortedLists = listCopy.sort((list1, list2) => {
			const prop1 = list1[criterion].toUpperCase()
			const prop2 = list2[criterion].toUpperCase()
			return prop1 === prop2 ? 0 : prop1 > prop2 ? greaterThanDir : lessThanDir
		})
		setOrderedLists([...sortedLists])
	}, [])
	useEffect(() => {
			if (error?.originalStatus === 401) navigate('/login')
			sortLists(lists, sort.by, sort.order)
	}, [lists, error, sortLists, sort])

	function toggleSortOrder() {
		setSort((prevSort) => ({ ...prevSort, order: prevSort.order === 'ASC' ? 'DESC' : 'ASC' }))
	}

	return (
		<div className="flex items-center">
			{/* select for order.by */}
			<select
				value={sort.by}
				onChange={(e) => setSort({ ...sort, by: e.target.value })}
				className="select select-secondary text-secondary w-40 mr-3"
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
