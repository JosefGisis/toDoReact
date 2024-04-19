import type { ToDo } from '../../api/toDosSlice'
import ToDoList from './ToDoList'

export default function ToDos({ orderedToDos, toDosStatus }: { orderedToDos: ToDo[], toDosStatus: 'loading' | 'hasToDos' | 'noToDos'}) {
	return <ToDoList orderedToDos={orderedToDos} toDosStatus={toDosStatus} />
}
