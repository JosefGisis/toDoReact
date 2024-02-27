import { useCallback, useState } from 'react'

import { useAuth } from '../../../hooks/useAuth'
import { BASE_URL } from '../../../constants/url'

export const useNewList = () => {
	const [meta, setMeta] = useState({ loading: false, errors: null })

	const { logout, getToken } = useAuth()
	const token = getToken()

	const createList = useCallback(async (values) => {
		setMeta({ ...meta, loading: true })
		try {
			const { title } = values
			const response = await fetch(`${BASE_URL}/lists`, {
				method: 'POST',
				headers: {
					'content-type': 'application/json',
					authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ title }),
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
	return { meta, createList }
}
