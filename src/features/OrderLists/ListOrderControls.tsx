import { useState, useCallback, useEffect } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useGetListsQuery } from '../../api/listsSlice'

import { GoSortAsc, GoSortDesc } from 'react-icons/go'

import type { List as ListType } from '../../api/listsSlice'

import type { OrderListsProps } from '.'
import { CustomErrorType } from 'api/types'

// List sort parameter options
export type ListSortByType = 'title' | 'creationDate' | 'lastModified'

// List sort order options
export type ListSortOrderType = 'ASC' | 'DESC'

// sort by and sort order type
export type ListSortType = {
	by: ListSortByType
	order: ListSortOrderType
}

export default function ListOrderControls({ setOrderedLists, setListsStatus }: OrderListsProps) {
	const [sort, setSort] = useState<ListSortType>({ by: 'creationDate', order: 'DESC' })
	const { logout } = useAuth()

	const {
		data: listsList,
		error,
		isLoading,
	} = useGetListsQuery()

	// sort options for dropdown options menu
	const sortOptions = [
		{ value: 'title', label: 'Title' },
		{ value: 'creationDate', label: 'Created' },
		{ value: 'lastModified', label: 'Updated' },
	]

	const sortLists = useCallback((lists: ListType[], criterion: ListSortByType, order: ListSortOrderType) => {
		// If lists are not of type array (e.g. null, object, undefined, etc.), orderedLists defaults to an empty list
		if (!Array.isArray(lists)) return []

		const isDesc = order === 'DESC'
		let greaterThanDir = isDesc ? -1 : 1
		let lessThanDir = isDesc ? 1 : -1

		// Copy the lists array to avoid mutating the original array
		const listCopy = [...lists]

		const sortedLists = listCopy.sort((list1, list2) => {
			const prop1 = list1[criterion].toUpperCase()
			const prop2 = list2[criterion].toUpperCase()
			return prop1 === prop2 ? 0 : prop1 > prop2 ? greaterThanDir : lessThanDir
		})

		return sortedLists
	}, [])

	// handle changes in listsList and sets orderedLists and listsStatus
	useEffect(() => {
		if (isLoading || !Array.isArray(listsList)) {
			setListsStatus('loading')
			setOrderedLists([])
			return
		}

		const sortedLists = sortLists(listsList, sort.by, sort.order)

		if (sortedLists?.length) {
			setOrderedLists([...sortedLists])
			setListsStatus('hasLists')
		} else {
			setOrderedLists([])
			setListsStatus('noLists')
		}
	}, [listsList, error, sortLists, sort])

	// Logout user if error status is 401
	useEffect(() => {
		const anyError = error as CustomErrorType
		if (anyError?.status === 401) return logout()
	}, [error])

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
			<button
				className="btn btn-primary btn-outline grow-0"
				onClick={() => setSort((prevSort) => ({ ...prevSort, order: prevSort.order === 'ASC' ? 'DESC' : 'ASC' }))}
			>
				<div className="swap-off flex items-center justify-between grow-0 shrink-1">
					{sort.order === 'ASC' ? <GoSortAsc className="w-5 h-5" /> : <GoSortDesc className="w-5 h-5" />}
				</div>
			</button>
		</div>
	)
}
