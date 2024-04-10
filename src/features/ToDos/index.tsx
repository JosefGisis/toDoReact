import type { ToDo } from '../../api/toDosSlice'
import ToDoList from './ToDoList'

export default function ToDos({ orderedToDos }: { orderedToDos: ToDo[]}) {
	return <ToDoList orderedToDos={orderedToDos} />
}
