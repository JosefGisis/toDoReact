import ToDoListsList from './ToDoListsList'

const data = [
  { name:'List 1', toDoCount:4, updatedAt:'1/1/24'},
  { name:'List 2', toDoCount:4, updatedAt:'1/1/24'},
  { name:'List 3', toDoCount:4, updatedAt:'1/1/24'},
  { name:'List 4', toDoCount:4, updatedAt:'1/1/24'},
  { name:'List 5', toDoCount:4, updatedAt:'1/1/24'},
]

export default function index() {
  
  return (
    <div>
      <ToDoListsList data={data} />
    </div>
  )
}
