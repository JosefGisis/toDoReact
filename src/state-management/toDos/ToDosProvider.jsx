import { useReducer } from 'react'
import ToDosContext from './toDosContext.js'
import toDosReducer from './toDosReducer.js'

const ToDosProvider = ({ children }) => {
	const [activeList, dispatch] = useReducer(toDosReducer, {})

	return <ToDosContext.Provider value={{ activeList, dispatch }}>{children}</ToDosContext.Provider>
}

export default ToDosProvider
