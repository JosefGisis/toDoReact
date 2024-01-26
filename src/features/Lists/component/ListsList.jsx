import { useLists } from '../hooks/useLists'
import { useDeleteList } from '../hooks/useDeleteList'
import { useAccessList } from '../hooks/useAccessList'
import { useEffect } from 'react'

export default function ToDoListsList() {
	const { lists, loading, getLists } = useLists()
	const { listDeleted, deleteList } = useDeleteList()
	const { activeList, accessList } = useAccessList()

	useEffect(() => {
		getLists()
	}, [listDeleted])

	const handleClick = (list) => {
		accessList(list)
	}

	const onDelete = (list) => {
		deleteList(list.id)
	}

	return (
		<div>
			{loading && <div className="px-4 my-3 text-sky-200 py-4 bg-slate-700">getting your lists...</div>}
			<div>
				{!lists?.length && (
					<div className={'flex flex-row justify-between px-4 my-3 bg-slate-700 text-sky-200 py-4'}>
						<div>You do not have any lists. Create a list to start creating to-dos</div>
					</div>
				)}

				{lists &&
					lists?.map((list, i) => (
						<div
							key={i}
							className={
								'flex flex-row justify-between px-4 my-3 ' +
								(activeList?.id === list?.id ? 'bg-slate-500 text-sky-200 py-4' : 'bg-slate-700 py-2')
							}
							onClick={() => handleClick(list)}
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
