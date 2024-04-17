import ToDoOrderControls from './ToDoOrderControls.jsx'

import type { ToDo as ToDoType } from '../../api/toDosSlice.js'
import type { Dispatch, SetStateAction } from 'react'

function OrderToDos({ setOrderedToDos }: { setOrderedToDos: Dispatch<SetStateAction<ToDoType[]>> }) {
	return <ToDoOrderControls setOrderedToDos={setOrderedToDos} />
}
export default OrderToDos
