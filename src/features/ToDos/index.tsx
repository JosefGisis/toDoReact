import type { ToDo } from '../../api/toDosSlice'
import ToDoList from './ToDoList'

export interface ToDosProps {
	orderedToDos: ToDo[]
	toDosStatus: 'loading' | 'hasToDos' | 'noToDos'
}

export default function ToDos({ orderedToDos, toDosStatus }: ToDosProps) {
	return <ToDoList orderedToDos={orderedToDos} toDosStatus={toDosStatus} />
}
