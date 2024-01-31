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
				: null}
		</div>
	)
}

export default ToDoList
