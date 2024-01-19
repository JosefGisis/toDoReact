import ToDo from './ToDo'

function ToDoList({ data }) {
	return (
        <div>
            {data && data.map((toDo, i) => (
                <ToDo key={i} data={toDo}></ToDo>
            ))}
		</div>
	)
}
export default ToDoList
