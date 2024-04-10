import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeActiveList, selectActiveList } from '../../app/activeListSlice'
import { useDeleteListMutation } from '../../api/listsSlice'
import { useDeleteToDosByListMutation } from '../../api/toDosSlice'

import type { ToDo as ToDoType } from '../../api/toDosSlice'

export default function AllToDosCompletedMessage({ orderedToDos }: { orderedToDos: ToDoType[] }) {
	const activeList = useSelector(selectActiveList)
	const dispatch = useDispatch()

	const [deleteList] = useDeleteListMutation()
	const [deleteToDosByList] = useDeleteToDosByListMutation()

	const onDelete = useCallback(async (activeListId: number) => {
		try {
			await deleteToDosByList({ membership: activeListId }).unwrap()
			await deleteList(activeListId).unwrap()
			dispatch(removeActiveList())
		} catch (error) {
			console.log(error)
		}
	}, [])

	return (
		<>
			{!orderedToDos?.find?.((toDo) => !toDo.completed) ? (
				<div className="my-4">
					<p className="text-xl mb-2">Looks like you completed all to-dos in this list</p>
					{activeList?.id && (
						<div className="flex">
							<p className="mr-3 hover:underline text-info cursor-pointer" onClick={() => dispatch(removeActiveList())}>
								default list
							</p>
							<p onClick={() => onDelete(activeList.id)} className="text-rose-500 hover:underline cursor-pointer">
								delete list?
							</p>
						</div>
					)}
				</div>
			) : null}
		</>
	)
}
