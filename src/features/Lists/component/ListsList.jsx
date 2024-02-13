import { useCallback, useMemo, useState } from 'react'
import { useListContext } from '../../../hooks/useListContext'
import { GoSortAsc, GoSortDesc, GoHome } from 'react-icons/go'
import List from './List'

export default function ToDoListsList() {
	const { activeList, lists, removeActiveList, } = useListContext()
	const [sort, setSort] = useState({ by: 'title', order: 'ASC' })

	const sortOptions = [
		{ value: 'title', label: 'Title' },
		{ value: 'creation_date', label: 'Created' },
		{ value: 'last_accessed', label: 'Updated' },
	]

	const [isLoading, setIsLoading] = useState(false)
	const [errors, setErrors] = useState(null)

	if (errors && isLoading) console.log(errors)

	const sortLists = useCallback((lists, criterion, order) => {
		if (!lists?.length) return []
		const isDesc = order === 'DESC'
		let greaterThanDir = isDesc ? -1 : 1
		let lessThanDir = isDesc ? 1 : -1
		const sortedLists = lists.sort((list1, list2) => {
			const prop1 = list1[criterion].toUpperCase()
			const prop2 = list2[criterion].toUpperCase()
			return prop1 === prop2 ? 0 : prop1 > prop2 ? greaterThanDir : lessThanDir
		})
		return sortedLists
	}, [])

	function toggleSortOrder() {
		setSort({ ...sort, order: sort.order === 'ASC' ? 'DESC' : 'ASC' })
	}

	const sortedLists = useMemo(() => sortLists(lists, sort.by, sort.order), [lists, sortLists, sort])

	return (
		<div className="">
			<div className='sticky top-0 pt-6 pb-4 z-[10] bg-base-100'>

			<div
				className={
					'flex flex-row items-center justify-between rounded-lg px-2 mb-3 border-2 border-primary ' +
					(activeList ? 'bg-base-300 py-2' : 'bg-neutral py-3')
				}
				onClick={() => {
					removeActiveList()
				}}
				>
				<div className="flex items-center">
					<div className="mr-2">
						<GoHome />
					</div>
					<p>To-dos</p>
				</div>
			</div>

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
			<div className='mt-4'>
			{sortedLists?.map?.((list, i) => (
				<div key={i}>
					<List listData={list}></List>
				</div>
			)) || null}
			</div>
		</div>
	)
}
