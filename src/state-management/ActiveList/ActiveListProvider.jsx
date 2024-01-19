import { useReducer } from 'react'
import activeListReducer from './activeListReducer.js'
import ActiveListContext from './ActiveListContext.js'

// active list contains information about the active list's id, title, and creation date, .id, .title, .creationDate

const ActiveListProvider = ({ children }) => {
	const [activeList, dispatch] = useReducer(activeListReducer, {})
	return <ActiveListContext.Provider value={{ activeList, dispatch }}>{children}</ActiveListContext.Provider>
}

export default ActiveListProvider 