import { useContext, useEffect } from 'react'
import { useLists } from '../hooks/useLists'
import ActiveListContext from '../../../state-management/ActiveList/ActiveListContext'

export default function ToDoListsList() {
	const { lists, isLoading, errs } = useLists()
	const { activeList, dispatch } = useContext(ActiveListContext)

	const handleClick = (list) => {
		dispatch({ type: 'ASSIGN', payload: { id: list.id, title: list.title, creationDate: list.creation_date } })
	}

	// useEffect(() => {
	// 	if (!activeList.length && lists) {
	// 		dispatch({ type: 'ASSIGN', payload: { id: lists[0].id, title: lists[0].title, creationDate: lists[0].creation_date }})
	// 	}
	// }, [lists])

	return (
		<div>
			{isLoading && <div className="px-4 my-3 text-sky-200 py-4 bg-slate-700">getting your lists...</div>}

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
						<div>{list.creation_date}</div>
						<div>{list.last_modified}</div>
					</div>
				))}
		</div>
	)
}
