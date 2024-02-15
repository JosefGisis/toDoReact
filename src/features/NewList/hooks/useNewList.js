import { useCallback, useState } from 'react'

import { useAuth } from '../../../hooks/useAuth'

export const useNewList = () => {
	const [meta, setMeta] = useState({ loading: false, errors: null })

	const { logout, getToken } = useAuth()
	const token = getToken()

	const createList = useCallback(async (values) => {
		setMeta({ ...meta, loading: true })
		try {
			const { title } = values
			const response = await fetch('http://localhost:3000/api/1/lists', {
				method: 'POST',
				headers: {
					'content-type': 'application/json',
					authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ title }),
			})

			const json = await response.json()

			if (response.status === 401) {
				logout()
				setMeta({ ...meta, errors: { message: 'unauthorized user' } })
				return ['unauthorized user']
			}

			if (response.status !== 200) throw new Error('error creating new list')

			setMeta({ ...meta, errors: null })
			return [null, json.data]
		} catch (error) {
			setMeta({ ...meta, errors: { message: error.message } })
			return [error.message]
		} finally {
			setMeta({ ...meta, loading: false })
		}
	}, [])
	return { meta, createList }
}