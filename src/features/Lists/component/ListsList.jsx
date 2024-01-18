import { useState, useReducer } from 'react'
import DeleteListButton from './DeleteListButton'
import { useLists } from '../hooks/useLists'
import Spinner from '../../../components/Spinner'
import listIdReducer from '../../../state-management/reducers/listIdReducer'

export default function ToDoListsList() {
	const { lists, isLoading, errs } = useLists()
	const [listId, dispatch] = useReducer(listIdReducer)

	const handleClick = (list) => {
		dispatch({ type: 'ASSIGN', value: list.id} )
	}

	return (
		<div>
			{isLoading && <div className='px-4 my-3 text-sky-200 py-4 bg-slate-700'>getting your lists...</div>}

			{lists &&
				lists?.map((list, i) => (
					<div
						key={i}
						className={
							'flex flex-row justify-between px-4 my-3 ' +
							(listId === list?.id ? 'bg-slate-500 text-sky-200 py-4' : 'bg-slate-700 py-2')
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
