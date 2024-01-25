import useToDos from '../hooks/useToDos'
import ToDo from './ToDo'

function ToDoList() {
	const { toDos } = useToDos()

	return (
		<div>
			{toDos?.map((toDo, i) => (
				<ToDo key={i} data={toDo}></ToDo>
			))}
		</div>
	)
}

export default ToDoList
