import { useCallback, useState } from 'react'
import { useAuth } from '../../../hooks/useAuth'

export const useNewToDo = () => {
	const [meta, setMeta] = useState({ loading: false, errors: null })
	const { logout, getToken } = useAuth()
	const token = getToken()

	const createNewToDo = useCallback(async (listId, values) => {
		setMeta({ ...meta, loading: true })
		const url = listId ? `http://localhost:3000/api/1/lists/${listId}/to-dos` : `http://localhost:3000/api/1/to-dos`

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

			if (response.status === 200) {
				const json = await response.json()
				setMeta({ ...meta, errors: null })
				return [null, json.data]
			}

			if (response.status === 401) {
				logout()
				setMeta({ ...meta, errors: { message: 'unauthorized user' } })
				return ['unauthorized user']
			}

			const json = await response.json()
			throw new Error(json.message)
		} catch (error) {
			setMeta({ ...meta, errors: { message: error.message } })
			return [error.message]
		} finally {
			setMeta({ ...meta, loading: false })
		}
	})
	return { meta, createNewToDo }
}
