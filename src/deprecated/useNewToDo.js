import { useCallback, useState } from 'react'

import { useAuth } from '../hooks/useAuth'
import { BASE_URL } from '../constants/url'

export const useNewToDo = () => {
	const [meta, setMeta] = useState({ loading: false, errors: null })
	const { logout, getToken } = useAuth()
	const token = getToken()

	const createNewToDo = useCallback(async (listId, values) => {
		setMeta({ ...meta, loading: true })
		const url = listId ? `${BASE_URL}/lists/${listId}/to-dos` : `${BASE_URL}/to-dos`

		try {
			const { title, date } = values
			const response = await fetch(url, {
				method: 'POST',
				headers: {
					'content-type': 'application/json',
					authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					title,
					dueDate: date,
				}),
			})

			const json = await response.json()

			if (response.status === 200) {
				setMeta({ ...meta, errors: null })
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
	})

	return { meta, createNewToDo }
}
