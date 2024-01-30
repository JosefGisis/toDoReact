import { useReducer } from 'react'
import listReducer from './listReducer.js'
import ListContext from './ListContext.js'

// active list contains information about the active list's id, title, and creation date, .id, .title, .creationDate

const ListProvider = ({ children }) => {
	const [activeList, dispatch] = useReducer(listReducer, null)

	return <ListContext.Provider value={{ activeList, dispatch }}>{children}</ListContext.Provider>
}

export default ListProvider
