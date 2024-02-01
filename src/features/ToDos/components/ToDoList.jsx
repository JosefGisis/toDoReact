import { useCallback, useContext, useEffect, useState } from 'react'
import ToDo from './ToDo'
import DataContext from '../../../state-management/data/DataContext'
import ListContext from '../../../state-management/List/ListContext'
import useToDos from '../hooks/useToDos'
import EmptyListMessage from './EmptyListMessage'

function ToDoList() {
	const { data } = useContext(DataContext)
	const { activeList } = useContext(ListContext)
	const { getToDos } = useToDos()

	const { dispatch } = useContext(DataContext)

	const [listIndex, setListIndex] = useState(null)
	const [isLoading, setIsLoading] = useState(false)
	const [toDos, setToDos] = useState(null)
	const [errors, setErrors] = useState(null)

	useEffect(() => {
		assignToDos()
	}, [activeList])

	const assignToDos = useCallback(async () => {
		if (!activeList || !data) return
		try {
			const listIndex = await data?.lists?.findIndex((list) => list.id === activeList.id)
			setListIndex(listIndex)

			if (!data?.lists[listIndex]?.toDos.length) {
				const [error, toDos] = await getToDos(activeList.id)
				if (error) {
					setErrors({ message: error })
					return
				}
				dispatch({ type: 'ADD LIST TODOS', payload: toDos })
			}
		} catch (error) {
			setErrors({ message: error.message })
		} finally {
			setIsLoading(false)
		}
	}, [activeList, data])

	return (
		<div>
			{activeList === null ? (
				data?.toDos?.map((toDo, i) => <ToDo key={i} data={toDo}></ToDo>)
			) : data?.lists[listIndex]?.toDos?.length ? (
				data?.lists[listIndex]?.toDos?.map((toDo, i) => <ToDo key={i} data={toDo}></ToDo>)
			) : ( 
			<EmptyListMessage />
			)}
		</div>
	)
}

export default ToDoList
