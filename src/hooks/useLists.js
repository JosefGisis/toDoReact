import { useCallback, useState } from 'react'
import { useAuth } from './useAuth'

import { BASE_URL } from '../constants/url'

function useLists() {
	const [meta, setMeta] = useState({ loading: false, errors: null })

	const { logout, getToken } = useAuth()
	const token = getToken()

	const getLists = useCallback(async () => {
		try {
			const response = await fetch(`${BASE_URL}/lists`, {
				headers: {
					'content-type': 'application/json',
					authorization: `Bearer ${token}`,
				},
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

			if (response.status === 400) {
				setMeta({ ...meta, errors: { message: json.message } })
				return [json.message]
			}

			throw new Error(json.message)
		} catch (error) {
			setMeta({ ...meta, errors: { message: error.message } })
			return [error.message]
		} finally {
			setMeta({ ...meta, loading: false })
		}
	}, [])

	return { meta, getLists }
}

export default useLists
