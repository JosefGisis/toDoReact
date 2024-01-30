import { useCallback, useReducer, useEffect } from 'react'
import DataContext from './DataContext'
import dataReducer from './dataReducer'
import { useAuth } from '../../hooks/useAuth'

const DataProvider = ({ children }) => {
	const [data, dispatch] = useReducer(dataReducer, [])
	const { logout, getToken } = useAuth()
	const token = getToken()

	const getLists = useCallback(async () => {
		try {
			const response = await fetch('http://localhost:3000/api/1/lists?sortBy=last_accessed&order=desc', {
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
			const data = { lists: [] }
			json.data.map((list) => data.lists.push({ ...list, toDos: [] }))
			dispatch({ type: 'ALTER DATA', payload: {...data}})
		} catch (error) {
			throw new Error(error.message)
		}
	}, [])

	const getDefaultToDos = useCallback(async () => {
		try {
			const response = await fetch('http://localhost:3000/api/1/to-dos', {
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
			dispatch({ type: 'ADD TODOS', payload: json.data})
		} catch (error) {
			throw new Error(error.message)
		}
	}, [])
	
	useEffect(() => {
		getLists()
		getDefaultToDos()
	}, [])

	return <DataContext.Provider value={{ data, dispatch }}>{children}</DataContext.Provider>
}

export default DataProvider
