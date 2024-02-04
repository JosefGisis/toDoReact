import { useCallback, useEffect, useState } from 'react'
import ToDo from './ToDo'
import useToDos from '../hooks/useToDos'
import EmptyListMessage from './EmptyListMessage'
import { useListContext } from '../../../hooks/useListContext'
import { actions } from '../../../state-management/List/listReducer'

function ToDoList() {
	const { activeList, lists, toDos, activeListToDos, dispatch } = useListContext()
	const { getToDos } = useToDos()

	const [listIndex, setListIndex] = useState(null)
	const [isLoading, setIsLoading] = useState(false)
	const [errors, setErrors] = useState(null)

	if (listIndex && isLoading && errors) console.log()

	useEffect(() => {
		fetchToDos()
	}, [activeList, toDos ])

	const fetchToDos = useCallback(async () => {
		try {
			if (!lists) return
			const listIndex = await lists?.findIndex((list) => list.id === activeList.id)
			setListIndex(listIndex)

			if (!lists[listIndex]?.toDos.length) {
				let [error, toDos] = await getToDos(activeList.id)
				if (error) {
					setErrors({ message: error })
					return
				}
				if (toDos.length) dispatch({ type: actions.ADD_LIST_TODOS, payload: toDos })
			}
		} catch (error) {
			setErrors({ message: error.message })
		} finally {
			setIsLoading(false)
		}
	}, [activeList, lists ])

	return toDos?.length ? (
		<div>
			<div>{toDos?.map((toDo, i) => (toDo.completed === 0 && <ToDo key={i} data={toDo}></ToDo>))}</div>
			{ toDos.find(toDo => toDo.completed === 1) && <div className="mt-3 mb-6 h-2 bg-slate-500"></div>}
			<div>{toDos?.map((toDo, i) => (toDo.completed === 1 && <ToDo key={i} data={toDo}></ToDo>))}</div>
		</div>
	) : (
		<EmptyListMessage />
	)

}

export default ToDoList
