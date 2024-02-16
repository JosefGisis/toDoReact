import { useCallback, useEffect, useMemo, useReducer, useState } from 'react'
import listReducer from './listReducer.js'
import ListContext from './ListContext.js'
import useToDos from '../../hooks/useToDos.js'
import useLists from '../../hooks/useLists.js'
import useListToDos from '../../hooks/useListToDos.js'
import { actions } from './listReducer.js'

const ListProvider = ({ children }) => {
	const [isLoading, setIsLoading] = useState(false)
	const [errors, setErrors] = useState(null)
	if (isLoading && errors) console.log(errors)

	const [{ activeListId, lists, toDos }, dispatch] = useReducer(listReducer, { activeListId: null, lists: [], toDos: [] })
	const { getToDos } = useToDos()
	const { getLists } = useLists()
	const { getListToDos } = useListToDos()

	const fetchData = useCallback(async () => {
		setIsLoading(true)
		try {
			const [listsError, lists] = await getLists()
			if (listsError) {
				setErrors({ message: listsError })
				return
			}

			const [toDosError, toDos] = await getToDos()
			if (toDosError) {
				setErrors({ message: toDosError })
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
	}, [])

	const fetchListToDos = useCallback(
		async (listId) => {
			if (listId === null) return
			const activeList = await lists.find((list) => list.id === listId)
			if (activeList?.toDos?.length) return
			setIsLoading(true)
			try {
				let [error, listToDos] = await getListToDos(listId)
				if (error) {
					setErrors({ message: error })
					return
				}
				if (!listToDos.length) dispatch({ type: actions.REMOVE_LIST_TODOS, payload: listId })
				else dispatch({ type: actions.ADD_LIST_TODOS, payload: listToDos })
			} catch (error) {
				console.log(error)
				setErrors({ message: error.message })
			} finally {
				setIsLoading(false)
			}
		},
		[lists]
	)
	useEffect(() => {
		fetchListToDos(activeListId)
	}, [activeListId])

	const setActiveList = (id) => dispatch({ type: 'SET_ACTIVE_LIST', payload: id })
	const removeActiveList = () => dispatch({ type: 'REMOVE_ACTIVE_LIST' })

	const activeList = useMemo(() => (activeListId && lists?.length ? lists?.find((list) => list.id === activeListId) : null), [activeListId, lists])
	const activeListToDos = useMemo(() => (activeList ? activeList?.toDos : []), [activeList])

	return (
		<ListContext.Provider value={{ activeList, activeListToDos, lists, toDos, setActiveList, removeActiveList, dispatch }}>
			{children}
		</ListContext.Provider>
	)
}

export default ListProvider
