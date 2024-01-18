import ListsList from "./component/ListsList"

const data = [
  { name:'Have You?', toDoCount:4, updatedAt:'1/1/24'},
  { name:'Shopping', toDoCount:7, updatedAt:'1/1/24'},
  { name:'to-do project', toDoCount:4, updatedAt:'1/1/24'},
  { name:'utilities', toDoCount:2, updatedAt:'1/1/24'},
  { name:'house chores', toDoCount:10, updatedAt:'1/1/24'},
]

export default function Lists() {
  
  return (
    <div>
      <ListsList data={data} />
    </div>
  )
}
