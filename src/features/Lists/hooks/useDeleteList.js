import { useCallback, useState } from 'react'
import { useAuth } from '../../../hooks/useAuth'
import { useListContext } from '../../../hooks/useListContext'
import { actions } from '../../../state-management/List/listReducer'

export function useDeleteList() {
	const [meta, setMeta] = useState({ loading: false, errors: null })
	const { dispatch } = useListContext()

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
				dispatch({ type: actions.REMOVE_LIST, payload: listId })
				return [null]
			} else if (response.status === 401) {
				logout()
				setMeta({ ...meta, errors: { message: 'unauthorized user' }})
				return ['unauthorized user']
			} else {
				const json = await response.json()	
				console.log(json.message)
				setMeta({ ...meta, errors: { message: json.message }})
				return ['error deleting list']
			}
		} catch (error) {
			setMeta({ ...meta, errors: {message: error.message} })
			return [error.message]
		} finally {
			setMeta({ ...meta, loading: false })
		}
	}, [])

	return { meta, deleteList }
}
