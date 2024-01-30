import { useCallback, useContext, useEffect, useState } from 'react'
import AuthContext from '../../../state-management/Token/AuthContext'
import { useAuth } from '../../../hooks/useAuth'
import ListContext from '../../../state-management/List/ListContext'
import DataContext from '../../../state-management/data/DataContext'

const useToDos = () => {
	const { logout, getToken } = useAuth()
	const [loading, setLoading] = useState(false)
	const [errs, setErrs] = useState(null)
	const [toDos, setToDos] = useState(null)
	const { activeList } = useContext(ListContext)
	const { data, dispatch } = useContext(DataContext)
	const token = getToken()

	const getToDos = useCallback(async (listId) => {
		setLoading(true)
		try {
			const response = await fetch(`http://localhost:3000/api/1/lists/${listId}/to-dos`, {
				headers: {
					'content-type': 'application/json',
					authorization: `Bearer ${token}`,
				},
			})

			if (response.status === 401) {
				logout()
				return
			}

			if (response.status !== 200) {
				throw new Error('error')
			}

			const json = await response.json()
			dispatch({ type: 'ADD LIST TODOS', payload: json.data})
		} catch (error) {
			setErrs({ message: error.message})
		} finally {
			setLoading(false)
		}
	}, [])

	useEffect(() => {
		if (activeList !== null) getToDos(activeList.id)
	}, [activeList])

	return { toDos, loading, errs }
}

export default useToDos
