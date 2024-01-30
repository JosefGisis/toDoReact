import { useDeleteList } from '../hooks/useDeleteList'
import { useAccessList } from '../hooks/useAccessList'
import { useContext, useEffect } from 'react'
import DataContext from '../../../state-management/data/DataContext'

export default function ToDoListsList() {
	const { deleteList } = useDeleteList()
	const { activeList, accessList } = useAccessList()
	const { data } = useContext(DataContext)

	useEffect(() => {
		console.log(data?.lists)
	}, [data?.lists])

	const onSelect = (list) => {
		accessList(list)
	}

	const onDelete = (list) => {
		deleteList(list.id)
	}

	return (
		<div>
			<div>
				<div
					className={'flex flex-row justify-between px-4 my-3 ' + (!activeList ? 'bg-slate-500 text-sky-200 py-4' : 'bg-slate-700 py-2')}
					onClick={() => {
						onSelect(null)
					}}
				>
					To-dos
				</div>

				{data.lists &&
					data?.lists?.map((list, i) => (
						<div
							key={i}
							className={
								'flex flex-row justify-between px-4 my-3 ' +
								(activeList?.id === list?.id ? 'bg-slate-500 text-sky-200 py-4' : 'bg-slate-700 py-2')
							}
							onClick={() => onSelect(list)}
						>
							<div>{list.title}</div>
							<div>{new Date(list?.creation_date?.split('T')[0]).toDateString()}</div>
							<button className="bg-sky-500 w-20 rounded-md focus:outline-sky-500" type="button" onClick={() => onDelete(list)}>
								delete
							</button>
						</div>
					))}
			</div>
		</div>
	)
}
