import { useCallback, useState } from 'react'
import { useAuth } from './useAuth'

import { BASE_URL } from '../constants/url'

function useUser() {
	const [meta, setMeta] = useState({ loading: false, errors: null })

	const { logout, getToken } = useAuth()
	const token = getToken()

	const getUser = useCallback(async () => {
		setMeta({ ...meta, loading: true })
		try {
			const response = await fetch(`${BASE_URL}/profile`, {
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
	
			throw new Error(json.message)
		} catch (error) {
			setMeta({ ...meta, errors: { message: error.message } })
			return [error.message]
		} finally {
			setMeta({ ...meta, loading: false })
		}
	}, [])
	return { meta, getUser }
}

export default useUser
