import ActiveList from "../ActiveList/ActiveList"
import NewToDoForm from "../NewToDo/NewToDoForm"
import ToDoList from "./components/ToDoList"
import ToDosFrame from "../../components/ComponentFrame"

const data = [
  {title: 'buy milk', created: '01/01/2024', dueDate: '01/01/2024', completed: false },
  {title: 'buy cheese', created: '01/01/2024', dueDate: '01/01/2024', completed: false },
  {title: 'buy bread', created: '01/01/2024', dueDate: '01/01/2024', completed: false },
  {title: 'buy paper', created: '01/01/2024', dueDate: '01/01/2024', completed: false },
  {title: 'buy rick', created: '01/01/2024', dueDate: '01/01/2024', completed: false },
  {title: 'buy rolled', created: '01/01/2024', dueDate: '01/01/2024', completed: false },
  {title: 'buy cream', created: '01/01/2024', dueDate: '01/01/2024', completed: false },
  {title: 'buy bags', created: '01/01/2024', dueDate: '01/01/2024', completed: false }
]

export default function index() {
  
  return (
    <ToDosFrame>
        <ActiveList />
        <NewToDoForm />
        <ToDoList
            data={data}
        ></ToDoList>
    </ToDosFrame>
  )
}
