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

	if (listIndex && isLoading && errors) console.log()

	useEffect(() => {
		assignToDos()
	}, [activeList, data])

	const assignToDos = useCallback(async () => {
		try {
			if (!data) return
			if (!activeList) {
				setToDos(data.toDos)
				return
			}
			const listIndex = await data?.lists?.findIndex((list) => list.id === activeList.id)
			setListIndex(listIndex)

			if (!data?.lists[listIndex]?.toDos.length) {
				let [error, toDos] = await getToDos(activeList.id)
				if (error) {
					setErrors({ message: error })
					return
				}
				if (toDos.length) dispatch({ type: 'ADD LIST TODOS', payload: toDos })
			}
			setToDos(data.lists[listIndex].toDos)
		} catch (error) {
			setErrors({ message: error.message })
		} finally {
			setIsLoading(false)
		}
	}, [activeList, data])

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
