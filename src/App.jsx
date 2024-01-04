import List from './list.jsx'
import Alert from './alert.jsx'
import Form from './form.jsx'

function App() {
  return (
  <div>
    <List listTitle='Have You?' listToDos={["buy milk", "buy bread", "buy cheese"]}/>
    <Alert>Hello there</Alert>
    <Form/>
  </div>
  )
}

export default App
