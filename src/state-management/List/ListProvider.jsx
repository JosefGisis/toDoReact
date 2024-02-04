import { useMemo, useReducer } from 'react'
import listReducer from './listReducer.js'
import ListContext from './ListContext.js'

const ListProvider = ({ children }) => {
	const [{ activeListId, lists, toDos }, dispatch] = useReducer(listReducer, null)

	const setActiveList = (id) => dispatch({ type: 'SET_ACTIVE_LIST', payload: id })
	const removeActiveList = () => dispatch({ type: 'REMOVE_ACTIVE_LIST' })
	const activeList = useMemo(() => (activeListId ? lists.find((list) => list.id === activeListId) : null), [activeListId])
	const activeListToDos = useMemo(() => activeList? activeList.toDos : [], [activeList, lists])

	return (
		<ListContext.Provider value={{ activeList, activeListToDos, lists, toDos, setActiveList, removeActiveList, dispatch }}>
			{children}
		</ListContext.Provider>
	)
}

export default ListProvider
