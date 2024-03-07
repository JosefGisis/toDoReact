import { useCallback, useState } from 'react'

import { useAuth } from '../hooks/useAuth'
import { BASE_URL } from '../constants/url'

export const useDeleteToDo = () => {
	const [meta, setMeta] = useState({ loading: false, errors: null })

	const { logout, getToken } = useAuth()
	const token = getToken()

	const deleteToDo = useCallback(async (toDo) => {
		setMeta({ ...meta, loading: true })
		const url = toDo?.membership ? `${BASE_URL}/lists/${toDo.membership}/to-dos/${toDo.id}` : `${BASE_URL}/to-dos/${toDo.id}`
		
		try {
			const response = await fetch(url, {
				method: 'DELETE',
				headers: {
					'content-type': 'application/json',
					authorization: `Bearer ${token}`,
				},
			})

			const json = await response.json()

			if (response.status === 200) return [null]

			if (response.status === 401) {
				logout()
				setMeta({ ...meta, errors: { message: 'unauthorized user' } })
				return ['unauthorized user']
			}

			throw new Error(json.message)
		} catch (error) {
			console.log(error.message)
			setMeta({ ...meta, errors: { message: error.message } })
			return ['error deleting to-do']
		} finally {
			setMeta({ ...meta, loading: false })
		}
	}, [])

	return { meta, deleteToDo }
}
