import ToDoList from './components/ToDoList'

const data = [
	{ title: 'buy milk', created: '01/01/2024', dueDate: '01/01/2024', completed: false },
	{ title: 'buy cheese', created: '01/01/2024', dueDate: '01/01/2024', completed: false },
	{ title: 'buy bread', created: '01/01/2024', dueDate: '01/01/2024', completed: false },
	{ title: 'buy paper', created: '01/01/2024', dueDate: '01/01/2024', completed: false },
	{ title: 'buy rick', created: '01/01/2024', dueDate: '01/01/2024', completed: false },
	{ title: 'buy rolled', created: '01/01/2024', dueDate: '01/01/2024', completed: false },
	{ title: 'buy cream', created: '01/01/2024', dueDate: '01/01/2024', completed: false },
	{ title: 'buy bags', created: '01/01/2024', dueDate: '01/01/2024', completed: false },
]

export default function ToDos() {
	return <ToDoList data={data}></ToDoList>
}
