import { useCallback, useContext, useEffect, useState } from 'react'
import ToDo from './ToDo'
import DataContext from '../../../state-management/data/DataContext'
import ListContext from '../../../state-management/List/ListContext'
import useToDos from '../hooks/useToDos'

function ToDoList() {
	const { data } = useContext(DataContext)
	const { activeList } = useContext(ListContext)

	return (
		<div>
			{activeList === null
				? data?.toDos?.map((toDo, i) => <ToDo key={i} data={toDo}></ToDo>)
				: data?.lists[0]?.toDos?.map((toDo, i) => <ToDo key={i} data={toDo}></ToDo>)}
		</div>
	)
}

export default ToDoList
