import { useCallback, useContext, useState } from 'react'
import { useAuth } from '../../../hooks/useAuth'
import DataContext from '../../../state-management/data/DataContext'

export function useDeleteList() {
	const [listDeleted, setListDeleted] = useState(false)
	const [errs, setErrs] = useState(null)
	const [isLoading, setIsLoading] = useState(false)
	const { logout, getToken } = useAuth()
	const token = getToken()
	const { dispatch } = useContext(DataContext)

	const deleteList = useCallback(async (listId) => {
		setIsLoading(true)

		try {
			const response = await fetch(`http://localhost:3000/api/1/lists/${listId}`, {
				method: 'DELETE',
				headers: {
					'content-type': 'application/json',
					authorization: `Bearer ${token}`,
				},
			})

			if (response.status === 401) {
				logout()
				return
			}

			if (response.status !== 200) throw new Error('error stuff')

			const json = await response.json()
			setListDeleted(json.data)
			dispatch({ type: 'REMOVE LIST', payload: listId })
		} catch (error) {
			setErrs(error.message)
			throw new Error(error.message)
		} finally {
			setIsLoading(false)
		}
	}, [])

	return { isLoading, errs, listDeleted, deleteList }
}