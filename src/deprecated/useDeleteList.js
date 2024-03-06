import { useCallback, useState } from 'react'
import { useAuth } from '../hooks/useAuth'

import { BASE_URL } from '../constants/url'

export function useDeleteList() {
	const [meta, setMeta] = useState({ loading: false, errors: null })

	const { logout, getToken } = useAuth()
	const token = getToken()

	const deleteList = useCallback(async (listId) => {
		setMeta({ ...meta, loading: true })
		try {
			const response = await fetch(`${BASE_URL}/lists/${listId}`, {
				method: 'DELETE',
				headers: {
					'content-type': 'application/json',
					authorization: `Bearer ${token}`,
				},
			})

			const json = await response.json()

			if (response.status === 200) {
				return [null]
			}
			
			if (response.status === 401) {
				logout()
				setMeta({ ...meta, errors: { message: 'unauthorized user' }})
				return ['unauthorized user']
			} 

			throw new Error(json.message)
		} catch (error) {
			console.log(error.message)
			setMeta({ ...meta, errors: {message: error.message} })
			return [error.message]
		} finally {
			setMeta({ ...meta, loading: false })
		}
	}, [])

	return { meta, deleteList }
}
