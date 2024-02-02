import { useMemo, useReducer } from 'react'
import listReducer from './listReducer.js'
import ListContext from './ListContext.js'

const ListProvider = ({ children }) => {
	const [{ activeListId, lists, toDos }, dispatch] = useReducer(listReducer, null)

	const setActiveList = (id) => dispatch('SET_ACTIVE_LIST', { id })
	const activeList = lists.find((list) => list.id === activeListId)
	const activeListToDos = useMemo(() => toDos.filter((toDo) => toDo.membership === activeListId), [activeListId, toDos])

	return <ListContext.Provider value={{ activeList, activeListToDos, setActiveList }}>{children}</ListContext.Provider>
}

export default ListProvider
