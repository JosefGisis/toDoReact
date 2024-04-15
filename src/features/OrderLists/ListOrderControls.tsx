import { useState, useCallback, useEffect, Dispatch, SetStateAction } from 'react'
import { useAuth } from '../../hooks/useAuth'

import { useGetListsQuery } from '../../api/listsSlice'

import { GoSortAsc, GoSortDesc } from 'react-icons/go'

import type { List as ListType } from '../../api/listsSlice'

export type ListSortByType = 'title' | 'creationDate' | 'lastModified'

export type ListSortOrderType = 'ASC' | 'DESC'

export type ListSortType = {
	by: ListSortByType
	order: ListSortOrderType
}

interface ListOrderControlsProps {
	setOrderedLists: Dispatch<SetStateAction<ListType[] | []>>
}

export default function ListOrderControls({ setOrderedLists }: ListOrderControlsProps) {
	const [sort, setSort] = useState<ListSortType>({ by: 'creationDate', order: 'DESC' })
	const { logout } = useAuth()

	const { data: listsList, error } = useGetListsQuery() as {
		data: ListType[]
		error: any	
	}

	const sortOptions = [
		{ value: 'title', label: 'Title' },
		{ value: 'creationDate', label: 'Created' },
		{ value: 'lastModified', label: 'Updated' },
	]

	const sortLists = useCallback((lists: ListType[], criterion: ListSortByType, order: ListSortOrderType) => {
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
		if (error?.status === 401) {
			logout()
			return
		}

		if (listsList) sortLists(listsList, sort.by, sort.order)
		else setOrderedLists([])
	}, [listsList, error, sortLists, sort])

	function toggleSortOrder() {
		setSort((prevSort) => ({ ...prevSort, order: prevSort.order === 'ASC' ? 'DESC' : 'ASC' }))
	}

	return (
		<div className="flex items-center">
			{/* select for order.by */}
			<select
				value={sort.by}
				onChange={(e) => setSort({ ...sort, by: e.target.value as ListSortByType })}
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
