import { useCallback, useMemo, useState } from 'react'
import { useListContext } from '../../../hooks/useListContext'
import { useDeleteList } from '../../Lists/hooks/useDeleteList'
import { actions } from '../../../state-management/List/listReducer'
import { useDeleteListToDos } from '../../Lists/hooks/useDeleteListToDos'

export default function AllToDosCompletedMessage() {
	const [isLoading, setIsLoading] = useState(false)
	const [errors, setErrors] = useState(null)

	const { activeList, toDos, dispatch, removeActiveList } = useListContext()
	const { deleteList } = useDeleteList()
	const { deleteListToDos } = useDeleteListToDos()

	const onDelete = useCallback(async (listId) => {
		setIsLoading(true)
		try {
			const [deleteListToDosError] = await deleteListToDos(listId)
			if (deleteListToDosError) {
				setErrors({ message: deleteListToDosError })
				return
			}
			const [deleteListError] = await deleteList(listId)
			if (deleteListError) {
				setErrors({ message: deleteListError })
				return
			}
			dispatch({ type: actions.REMOVE_LIST_TODOS, payload: listId })
			dispatch({ type: actions.REMOVE_LIST, payload: listId })
			// removeActiveList sets activeList to to-dos (default list)
			removeActiveList()
		} catch (error) {
			setErrors({ message: error.message })
		} finally {
			setIsLoading(false)
		}
	}, [])

	const activeToDos = useMemo(() => (activeList ? activeList.toDos : toDos), [activeList, toDos])
	const activeListId = useMemo(() => (activeList ? activeList.id : null), [activeList])

	return (
		<>
			{!activeToDos?.find?.((toDo) => !toDo.completed) ? (
				<div className="my-4">
					<p className="text-xl mb-2">Looks like you completed all to-dos in this list</p>
					{activeListId && (
						<div className="flex">
							<p className="mr-3 hover:underline text-info cursor-pointer" onClick={removeActiveList}>
								default list
							</p>
							<p onClick={() => onDelete(activeListId)} className="text-rose-500 hover:underline cursor-pointer">
								delete list?
							</p>
						</div>
					)}
				</div>
			) : null}
		</>
	)
}
