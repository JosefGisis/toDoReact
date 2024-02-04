import { useCallback, useEffect, useMemo, useReducer, useState } from 'react'
import listReducer from './listReducer.js'
import ListContext from './ListContext.js'
import useToDos from '../../hooks/useToDos.js'
import useLists from '../../hooks/useLists.js'
import { actions } from './listReducer.js'

const ListProvider = ({ children }) => {
	const [isLoading, setIsLoading] = useState(false)
	const [errors, setErrors] = useState(null)

	const [{ activeListId, lists, toDos }, dispatch] = useReducer(listReducer, null)
	const { getToDos } = useToDos()
	const { getLists } = useLists()

	const fetchData = useCallback(async () => {
		setIsLoading(true)
		try {
			const [listsError, lists] = await getLists()
			const [toDosError, toDos] = await getToDos()
			if (listsError || toDosError) {
				setErrors({ message: 'errors present' })
				return
			}
			dispatch({ type: actions.ADD_LISTS, payload: lists })
			dispatch({ type: actions.ADD_TODOS, payload: toDos })
		} catch (error) {
			setErrors({ message: error.message })
		} finally {
			setIsLoading(false)
		}
	}, [])

	useEffect(() => {
		fetchData()
		if (isLoading && errors) console.log(errors)
	}, [])

	const setActiveList = (id) => dispatch({ type: 'SET_ACTIVE_LIST', payload: id })
	const removeActiveList = () => dispatch({ type: 'REMOVE_ACTIVE_LIST' })
	const activeList = useMemo(() => (activeListId && lists?.length ? lists?.find((list) => list.id === activeListId) : null), [activeListId])
	const activeListToDos = useMemo(() => (activeList ? activeList.toDos : []), [activeList, lists])

	return (
		<ListContext.Provider value={{ activeList, activeListToDos, lists, toDos, setActiveList, removeActiveList, dispatch }}>
			{children}
		</ListContext.Provider>
	)
}

export default ListProvider
