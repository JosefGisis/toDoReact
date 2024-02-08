import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useEditList } from '../hooks/useEditList'
import { useListContext } from '../../../hooks/useListContext'
import { GoSortAsc, GoSortDesc, GoHome } from 'react-icons/go'
import List from './List'

export default function ToDoListsList() {
	const { activeList, lists, removeActiveList } = useListContext()
	const [_lists, setLists] = useState(lists)
	const [sort, setSort] = useState({ by: 'sort by', order: 'ASC'})

	const sortOptions = ['sort by', 'title', 'created', 'last updated']
	const dropDownOptions = ['edit', 'delete']

	const [isLoading, setIsLoading] = useState(false)
	const [_errors, setErrors] = useState(null)

	const { editList } = useEditList()

	useEffect(() => {
		console.log(activeList)
	}, [activeList])
	const {
		register,
		reset,
		formState: { errors, isValid },
	} = useForm()

	if (errors && isValid && editList && isLoading) console.log()

	useEffect(() => {
		console.log(_lists)
		if (sort.by !== 'title') return
		let sortedLists
		const sortByTitleDesc = async () => {
			sortedLists = await lists.sort((list1, list2) => {
				const title1 = list1.title.toUpperCase()
				const title2 = list2.title.toUpperCase()
				if (title1 > title2) return -1
				return 1
			})
			setLists(sortedLists)
		}
		sortByTitleDesc()
	}, [sort])

	function toggleSortOrder() {
		setSort({ ...sort, order: sort.order === 'ASC' ? 'DESC' : 'ASC' })
	}

	useEffect(() => {
		console.log(sort)
	}, [sort])

	return (
		<div className="">
			<div
				className={
					'flex flex-row items-center justify-between rounded-lg px-2 mb-3 border-2 border-primary ' +
					(!activeList ? 'bg-default py-3' : 'bg-base-300 py-2')
				}
				onClick={() => {
					removeActiveList()
				}}
			>
				{' '}
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
					className="select select-secondary text-secondary w-full max-w-xs mr-2"
				>
					{sortOptions.map((sort, index) => (
						<option key={index} disabled={sort === sort.by} selected={sort === sort.by}>
							{sort}
						</option>
					))}
				</select>

				<button className="btn btn-outline btn-primary" onClick={toggleSortOrder}>
					<div className="swap-off flex items-center justify-between w-14">
						{sort.order}
						{sort.order === 'ASC' ? <GoSortAsc className="w-5 h-5" /> : <GoSortDesc className="w-5 h-5" />}
					</div>
				</button>
			</div>

			{lists &&
				lists.map((list, i) => (
					<div key={i}>
						<List listData={list}></List>
					</div>
				))}

			{_errors && <p> {_errors.message} </p>}
		</div>
	)
}
