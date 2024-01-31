import { useCallback, useContext, useState } from 'react'
import { useAuth } from '../../../hooks/useAuth'
import DataContext from '../../../state-management/data/DataContext'

export function useDeleteList() {
	const [meta, setMeta] = useState({ loading: false, errors: null })
	const { dispatch } = useContext(DataContext)

	const { logout, getToken } = useAuth()
	const token = getToken()

	const deleteList = useCallback(async (listId) => {
		setMeta({ ...meta, loading: true })
		try {
			const response = await fetch(`http://localhost:3000/api/1/lists/${listId}`, {
				method: 'DELETE',
				headers: {
					'content-type': 'application/json',
					authorization: `Bearer ${token}`,
				},
			})

			if (response.status === 200) {
				dispatch({ type: 'REMOVE LIST', payload: listId })
			} else if (response.status === 401) {
				logout()
				throw new Error('unauthorized user')
			} else {
				const json = await response.json()	
				console.log(json.message)
				throw new Error('error deleting list')
			}
		} catch (error) {
			setMeta({ ...meta, errors: {message: error.message} })
		} finally {
			setMeta({ ...meta, loading: false })
		}
	}, [])

	return { meta, deleteList }
}
