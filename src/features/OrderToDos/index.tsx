import ToDoOrderControls from './ToDoOrderControls.jsx'

import type { ToDo as ToDoType } from '../../api/toDosSlice.js'

function OrderToDos({ setOrderedToDos }: { setOrderedToDos: React.Dispatch<React.SetStateAction<ToDoType[] | []>> }) {
	return <ToDoOrderControls setOrderedToDos={setOrderedToDos} />
}
export default OrderToDos
