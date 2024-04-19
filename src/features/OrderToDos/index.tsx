import ToDoOrderControls from './ToDoOrderControls.jsx'

import type { ToDo as ToDoType } from '../../api/toDosSlice.js'
import type { Dispatch, SetStateAction } from 'react'

export interface OrderToDosProps {
	setOrderedToDos: Dispatch<SetStateAction<ToDoType[]>>
	setToDosStatus: Dispatch<SetStateAction<'loading' | 'hasToDos' | 'noToDos'>>
}

function OrderToDos({ setOrderedToDos, setToDosStatus }: OrderToDosProps) {
	return <ToDoOrderControls setOrderedToDos={setOrderedToDos} setToDosStatus={setToDosStatus} />
}
export default OrderToDos
