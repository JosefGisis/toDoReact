import useToDos from '../hooks/useToDos'
import ToDo from './ToDo'

function ToDoList() {
    const {toDos} = useToDos()
    if (typeof(toDos) === typeof([])) return <div>{toDos.map((toDo, i) => <ToDo key={i} data={toDo}></ToDo>)}</div>
    return null
}
export default ToDoList
