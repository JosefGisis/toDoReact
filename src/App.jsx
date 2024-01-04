import List from './list.jsx'
import Alert from './alert.jsx'

function App() {
  return (
  <div>
    <List listTitle='Have You?' listToDos={["buy milk", "buy bread", "buy cheese"]}/>
    <Alert>Hello there</Alert>
  </div>
  )
}

export default App
