import { useCallback, useState } from 'react'

import { useAuth } from '../../../hooks/useAuth'
import { BASE_URL } from '../../../constants/url'

export function useUpdateToDo() {
	const [meta, setMeta] = useState({ loading: false, errors: null })

	const { logout, getToken } = useAuth()
	const token = getToken()

	const updateToDo = useCallback(async (toDoId, update) => {
		setMeta({ ...meta, loading: true })
		const url = update?.membership ? `${BASE_URL}/lists/${update.membership}/to-dos/${toDoId}` : `${BASE_URL}/to-dos/${toDoId}`

		try {
			const { title, due_date, completed, membership } = update
			const response = await fetch(url, {
				method: 'PUT',
				headers: {
					'content-type': 'application/json',
					authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					title,
					dueDate: due_date,
					completed,
					membership,
				}),
			})

			const json = await response.json()

			if (response.status === 200) {
				return [null, json.data]
			} 
			
			if (response.status === 401) {
				logout()
				setMeta({ ...meta, errors: { message: 'unauthorized user' } })
				return ['unauthorized user']
			} 
			
			throw new Error(json.message)
		} catch (error) {
			console.log(error.message)
			setMeta({ ...meta, errors: { message: error.message } })
			return [error.message]
		} finally {
			setMeta({ ...meta, loading: false })
		}
	}, [])

	return { meta, updateToDo }
}
