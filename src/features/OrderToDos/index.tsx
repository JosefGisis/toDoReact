import ToDoOrderControls from './ToDoOrderControls.jsx'

import type { ToDo as ToDoType } from '../../api/toDosSlice.js'
import type { Dispatch, SetStateAction } from 'react'

function OrderToDos({
	setOrderedToDos,
	setToDosStatus,
}: {
	setOrderedToDos: Dispatch<SetStateAction<ToDoType[]>>
	setToDosStatus: Dispatch<SetStateAction<'loading' | 'hasToDos' | 'noToDos'>>
}) {
	return <ToDoOrderControls setOrderedToDos={setOrderedToDos} setToDosStatus={setToDosStatus} />
}
export default OrderToDos
