import { useCallback, useState } from 'react'
import { BASE_URL } from '../../../constants/url'

export function useSignUp() {
	const [meta, setMeta] = useState({ loading: false, errors: null })

	const signUp = useCallback(async (values) => {
		setMeta({ ...meta, loading: true })
		try {
			const { username, email, password } = values
			if (!username || !email, !password ) throw new Error('missing parameters: username/email/password')

			const response = await fetch(`${BASE_URL}/auth/register`, {
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify({ username, email, password }),
			})
			
			const json = await response.json()

			if (response.status === 200) {
				setMeta({ ...meta, errors: null })
				return [null, json.token]
			}
			if (response.status === 400) {
				setMeta({ ...meta, errors: json.message })
				return [json.message]
			}

			throw new Error(json.message)
		} catch (error) {
			setMeta({ ...meta, error: error.message })
			return ['Error creating user. Please try again later']
		} finally {
			setMeta({ ...meta, loading: false })
		}
	})

	return { meta, signUp }
}
